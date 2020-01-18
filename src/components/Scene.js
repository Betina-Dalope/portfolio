import React from 'react';
import * as THREE from 'three';

import ColorLightPanels from './ColorLightPanels';


class Scene extends React.Component {


	constructor(props) {
        super(props);


        // 1. set up renderer

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(600, 400);
        this.scene = new THREE.Scene();

        // 2. set up camera
        
        this.camera = new THREE.PerspectiveCamera(30, 600 / 400, 1, 100);
        this.camera.position.set(0, 5, -18);
        this.camera.lookAt(0,4,0)
        this.scene.add(this.camera);

        // 3. set up light
        var ambientLight = new THREE.AmbientLight("white", 1)
        this.scene.add(ambientLight);

    }

    componentDidMount() {
        this.refs.component.appendChild(this.renderer.domElement);

        //this.renderer.render(this.scene, this.camera);
        this.animate();
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        this.renderer.render(this.scene, this.camera);
       
    }

	render() {

		return (
			<div ref="component">
                <ColorLightPanels scene={ this.scene }/>
            </div>
		);		
	}
}

export default Scene;