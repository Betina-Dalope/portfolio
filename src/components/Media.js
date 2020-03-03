import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import ColorLightPanels from './ColorLightPanels';
import '../styles/partials/_scene.scss';

import DATA from '../data/pages.json';

import { TweenMax, Expo } from 'gsap/gsap-core';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';
import 'react-dat-gui/dist/index.css';


class Media extends React.Component {

    state = {
        grid_size: {
            width: 16,
            height: 12,
            depth: 8
        },
    }

	constructor(props) {
        super(props);

        var aspectRatio = 1.1805555555555556;

        // 1. set up renderer

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(aspectRatio);
        
        this.renderer.shadowMapEnabled = true;
        this.scene = new THREE.Scene();

        // 2. set up camera
        
        this.camera = new THREE.PerspectiveCamera(40, aspectRatio, 1, 100);
        this.camera.userData = { prevPosition: new THREE.Vector3(), prevRotation: new THREE.Vector3() };
        this.camera.position.set(0, 0, -16);
        this.camera.lookAt(0,0,0);
        this.scene.add(this.camera);

        // 3. maybe turn off when light turns black
        var ambientLight = new THREE.AmbientLight("white", .15);
        this.scene.add(ambientLight);

        var box_geo = new THREE.BoxBufferGeometry(this.state.grid_size.width , this.state.grid_size.height, this.state.grid_size.depth);
        var box_mesh = new THREE.MeshPhongMaterial({color: "white", opacity: 0, transparent: true});
        this.box = new THREE.Mesh(box_geo, box_mesh);
        this.box.position.set(0,0,0)

        this.scene.add( this.box );



    }

    componentDidMount() {
        console.log( this.refs.component.clientWidth / this.refs.component.clientHeight );
        this.renderer.setSize(this.refs.component.clientWidth, this.refs.component.clientHeight);
        this.refs.component.appendChild(this.renderer.domElement);


        this.animate();
    }

    componentDidUpdate( prevProps, prevState ) {
        // 1. move to menu view is menu is toggled open
        if (this.props.isMenuOpen && !prevProps.isMenuOpen) {
            var menuPosition = {x: 0, y: 42, z: 0};
            var menuRotation = {x: -1.570795326794897, y: 0, z: 0};
            this.moveCameraTo(menuPosition, menuRotation)
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

    addToScene = (obj) => {
        this.scene.add( obj );
    }

	render() {

		return (

			<div ref="component" className="media">
                <ColorLightPanels
                        box={ this.box }
                        image_src={ './images/test-image.png' }
                        grid_size={ this.state.grid_size} />

            </div>

		);		
	}
}

export default Media;