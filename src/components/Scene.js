import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Box from './Box';
import '../styles/partials/_scene.scss';

import PAGES from '../data/pages.json';


class Scene extends React.Component {

    state = {
        grid_size: {
            width: 16,
            height: 12,
            depth: 16
        },
        font: null
    }

	constructor(props) {
        super(props);


        // 1. set up renderer

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = true;
        this.scene = new THREE.Scene();

        // 2. set up camera
        
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        this.camera.position.set(0, 16, 0);
        this.camera.lookAt(0,0,0)
        this.scene.add(this.camera);

        var controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.target.set(0,4,0);

        var ambientLight = new THREE.AmbientLight("white", .3);
        this.scene.add(ambientLight);
    }

    componentDidMount() {
        this.refs.component.appendChild(this.renderer.domElement);


        // 3. load font
        new THREE.FontLoader().load( 'fonts/helvetiker.json', ( font ) => {
            console.log("here");
            this.setState({font: font});
        } );

        this.animate();
    }

    animate = (delta) => {
        requestAnimationFrame(this.animate);
        
        this.renderer.render(this.scene, this.camera);
    }

	render() {

        var boxes = [
            { title: "Home", position: {x: 8, y: 6, z: 8, rotation: 0 } },
            { title: "Work", position: {x: 8, y: 10, z: -8, rotation: Math.PI / -3 } },
            { title: "Prototypes", position: {x: -8, y: 6, z: -8, rotation: 0 } },
            { title: "Contact", position: {x: -8, y: 6, z: 8, rotation: 0} }
        ]

        var boxHTML = [];
        for (var i in boxes) {
            // 1. check which param was passed in url
            var is_active = this.props.match.params.box_title && PAGES[i].title.toLowerCase() == this.props.match.params.box_title.toLowerCase();

            if (is_active ) {
                this.camera.position.set( boxes[i].position.x, boxes[i].position.y, boxes[i].position.z )
                this.camera.lookAt( 0, 0, 0 );
            }
            boxHTML.push(
                <Box
                    key={ "box" + i }
                    index={ parseInt(i) }
                    isActive={ is_active }
                    scene={ this.scene }
                    data={ PAGES[i] }
                    position={ boxes[i].position }
                    font={ this.state.font }
                />
            );
        }
        

		return (
			<div ref="component" className="scene">
                { boxHTML }
            </div>
		);		
	}
}

export default Scene;