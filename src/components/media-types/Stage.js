import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import ColorLightPanels from '../ColorLightPanels';
import '../../styles/partials/_scene.scss';

import DATA from '../../data/pages.json';

import { TweenMax, Expo } from 'gsap/gsap-core';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';
import 'react-dat-gui/dist/index.css';


class Media extends React.Component {

    state = {
        grid_size: {
            width: 18,
            height: 12,
            depth: 8
        },
    }

	constructor(props) {
        super(props);

        var aspectRatio = 1.333;
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
        this.renderer.setSize(this.refs.component.clientWidth, this.refs.component.clientHeight);
        this.refs.component.appendChild(this.renderer.domElement);


        this.animate();
    }

    componentDidUpdate( prevProps, prevState ) {

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

			<div ref="component" className="stage">
                <ColorLightPanels
                        box={ this.box }
                        image_src={ this.props.src }
                        grid_size={ this.state.grid_size} />

            </div>

		);		
	}
}

export default Media;