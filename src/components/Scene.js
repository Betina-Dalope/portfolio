import React from 'react';
import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import ColorLightPanels from './ColorLightPanels';
import Lines from './Lines';
import { TweenMax } from 'gsap/gsap-core';


class Scene extends React.Component {

    state = {
        grid_size: {
            width: 16,
            height: 12,
            depth: 16
        }
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
        this.camera.position.set(-8, 5, -2);
        this.camera.lookAt(4,5,-4)
        this.scene.add(this.camera);

        var controls = new OrbitControls( this.camera, this.renderer.domElement );
        controls.target.set(0,4,0);

        // 3. set up light
        this.light = new THREE.PointLight( "purple", .8, 100 );
        this.light.castShadow = true;
        this.light.position.y = this.state.grid_size.height / 2;
        this.scene.add(this.light);

        var ambientLight = new THREE.AmbientLight("white", .3);
        this.scene.add(ambientLight);

        // 4. set up background
        var box_geo = new THREE.BoxBufferGeometry(this.state.grid_size.width + .1, this.state.grid_size.height + .1, this.state.grid_size.depth + .1);
        var box_mesh = new THREE.MeshPhongMaterial({color: "pink", side: THREE.BackSide});
        var box = new THREE.Mesh(box_geo, box_mesh);
        box.position.y = this.state.grid_size.height / 2;
        box.receiveShadow = true;
        this.scene.add( box );

    }

    componentDidMount() {
        this.refs.component.appendChild(this.renderer.domElement);

        this.animate();

        TweenMax.to(this.light.color, 5, {
            r: 0,
            repeat: -1,
            yoyo: true
        });
    }

    animate = (delta) => {
        requestAnimationFrame(this.animate);
        
        this.renderer.render(this.scene, this.camera);
    }

	render() {

		return (
			<div ref="component">
                <Lines scene={ this.scene } grid_size={ this.state.grid_size }/>
                {/* <ColorLightPanels scene={ this.scene } grid_size={ this.state.grid_size }/> */}
            </div>
		);		
	}
}

export default Scene;