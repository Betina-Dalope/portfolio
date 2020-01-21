import React from 'react';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import ColorLightPanels from './ColorLightPanels';
import Lines from './Lines';


class Scene extends React.Component {


	constructor(props) {
        super(props);


        // 1. set up renderer

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.scene = new THREE.Scene();

        // 2. set up camera
        
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
        this.camera.position.set(0, 5, -18);
        this.camera.lookAt(0,4,0)
        this.scene.add(this.camera);

        //var controls = new OrbitControls( this.camera, this.renderer.domElement );

        // 3. set up light
        var ambientLight = new THREE.AmbientLight("white", 1)
        this.scene.add(ambientLight);

        

    }

    componentDidMount() {
        this.refs.component.appendChild(this.renderer.domElement);

        this.animate();
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        this.renderer.render(this.scene, this.camera);
    }

	render() {

		return (
			<div ref="component">
                <Lines scene={ this.scene } />
                <ColorLightPanels scene={ this.scene }/>
            </div>
		);		
	}
}

export default Scene;