import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import Box from './Box';
import '../styles/partials/_scene.scss';

import PAGES from '../data/pages.json';
import { TweenMax, Expo } from 'gsap/gsap-core';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';
import 'react-dat-gui/dist/index.css';


class Scene extends React.Component {

    state = {
        grid_size: {
            width: 16,
            height: 12,
            depth: 16
        },
        font: null,
        datgui: {
            position: {x: 0, y: 16, z: 0},
            lookAt: {x: 0, y: 4, z: 0}            
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
        this.camera.userData = { prevPosition: new THREE.Vector3(), prevRotation: new THREE.Vector3() };
        this.camera.position.set(3, 16, 4);
        this.camera.lookAt(3,0,2)
        //this.scene.background = new THREE.Color( 0xffffff );
        this.scene.add(this.camera);

        // var controls = new OrbitControls( this.camera, this.renderer.domElement );
        // controls.target.set(0,4,0);

        // 3. maybe turn off when light turns black
        var ambientLight = new THREE.AmbientLight("white", .15);
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

    moveCameraTo = (position, rotation) => {
        this.camera.userData.prevPosition.copy( this.camera.position );
        this.camera.userData.prevRotation.copy( this.camera.rotation );

        TweenMax.to(this.camera.position, 2, {x: position.x, y: position.y, z: position.z, ease: Expo.easeInOut});
        TweenMax.to(this.camera.rotation, 2, {x: rotation.x, y: rotation.y, z: rotation.z, ease: Expo.easeOut, delay: 2});
    }

    onUpdateDatGui = (newData) => {

        this.setState(prevState => ({
            datgui: { ...prevState.datgui, ...newData }
        }));

        this.camera.position.set(newData.position.x, newData.position.y, newData.position.z);
        this.camera.lookAt(newData.lookAt.x, newData.lookAt.y, newData.lookAt.z)
    }

	render() {

        var boxHTML = [];
        for (var i in PAGES) {
            // 1. check which param was passed in url
            if (this.props.match) {
            var is_active = this.props.match.params.box_title
                && PAGES[i].title.toLowerCase() == this.props.match.params.box_title.toLowerCase()
                && !this.props.isMenuOpen;
            }

            boxHTML.push(
                <Box
                    key={ "box" + i }
                    index={ parseInt(i) }
                    isActive={ is_active }
                    data={ PAGES[i] }
                    font={ this.state.font }
                    functions={ { addToScene: this.addToScene, moveCameraTo: this.moveCameraTo } }
                />
            );
        }
        
        const { datgui } = this.state

		return (
            <React.Fragment>
                {/* <DatGui data={ datgui } onUpdate={this.onUpdateDatGui}>

                    <DatNumber path='position.x' min={0} max={100} step={1} />
                    <DatNumber path='position.y' min={0} max={100} step={1} />
                    <DatNumber path='position.z' min={0} max={100} step={1} />

                </DatGui> */}
			<div ref="component" className="scene">
                { boxHTML }
            </div>
            </React.Fragment>
		);		
	}
}

export default Scene;