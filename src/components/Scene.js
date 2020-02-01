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
        this.camera.userData = { prevPosition: new THREE.Vector3(), prevRotation: new THREE.Vector3() };
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
            this.setState({font: font});
        } );

        this.animate();
    }

    componentDidUpdate( prevProps, prevState ) {
        // 1. move to menu view is menu is toggled open
        if (this.props.isMenuOpen && !prevProps.isMenuOpen) {

            //eventually change to this.moveCameraTo()
            this.camera.userData.prevPosition.copy( this.camera.position );
            this.camera.userData.prevRotation.copy( this.camera.rotation );
            this.camera.position.set(0, 60, 0);
            this.camera.lookAt(0,0,0);
        }

        // 2. move back to previous position if menu is closed and url is not changed
        else if (!this.props.isMenuOpen && prevProps.isMenuOpen
            && (this.props.match.params.box_title == prevProps.match.params.box_title)) {
            console.log("did update", prevState, this.state);

            this.camera.position.set( this.camera.userData.prevPosition.x, this.camera.userData.prevPosition.y, this.camera.userData.prevPosition.z );
            this.camera.rotation.set( this.camera.userData.prevRotation.x, this.camera.userData.prevRotation.y, this.camera.userData.prevRotation.z );

        }
    }

    animate = (delta) => {
        requestAnimationFrame(this.animate);
        
        this.renderer.render(this.scene, this.camera);
    }

    moveCameraTo = (position, rotation) => {
        this.camera.userData.prevPosition = this.camera.position;
        this.camera.userData.prevRotation = this.camera.rotation;
        this.camera.position.set( position );
        this.camera.rotation.set( rotation );
    }

	render() {

        console.log("render");

        var boxHTML = [];
        for (var i in PAGES) {
            // 1. check which param was passed in url
            var is_active = this.props.match.params.box_title
                && PAGES[i].title.toLowerCase() == this.props.match.params.box_title.toLowerCase()
                && !this.props.isMenuOpen;

            if ( is_active ) {
                this.camera.position.set( PAGES[i].position.x, PAGES[i].position.y, PAGES[i].position.z )
                this.camera.lookAt( 0, PAGES[i].position.rotation, 0 );
            }

            boxHTML.push(
                <Box
                    key={ "box" + i }
                    index={ parseInt(i) }
                    isActive={ is_active }
                    scene={ this.scene }
                    data={ PAGES[i] }
                    position={ PAGES[i].position }
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