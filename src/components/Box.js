import React from 'react';
import * as THREE from 'three';
import Carousel from './Carousel';
import Lines from './Lines';
import { TimelineLite } from 'gsap/gsap-core';

import '../styles/partials/_box.scss';


class Box extends React.Component {

    state = {
        grid_size: {
            width: 16,
            height: 12,
            depth: 16
        }
    }

	constructor(props) {
        super(props);

        // 1. set up background
        var box_geo = new THREE.BoxBufferGeometry(this.state.grid_size.width , this.state.grid_size.height, this.state.grid_size.depth);
        var box_mesh = new THREE.MeshPhongMaterial({color: "white", side: THREE.BackSide, opacity: 0.5, transparent: true});
        this.box = new THREE.Mesh(box_geo, box_mesh);
        //box.position.y = this.state.grid_size.height / 2;
        this.box.position.set(props.data.position.x, props.data.position.y, props.data.position.z);
        this.box.rotation.y = props.data.position.rotation;
        this.box.receiveShadow = true;
        props.functions.addToScene( this.box );

        // 3. set up light
        this.light = new THREE.PointLight( "black", 1, 16 );
        this.light.castShadow = true;
        this.light.position.set(props.data.position.x, props.data.position.y, props.data.position.z);
        props.functions.addToScene( this.light) ;

    }

    componentDidMount() {

        var colors = [new THREE.Color("orange"), new THREE.Color("purple"), new THREE.Color("blue"), new THREE.Color("red")];
        var i = this.props.index;
        var timeline = new TimelineLite({repeat: -1});
        timeline
            .to(this.light.color, 5, { r: colors[ i % colors.length ].r, g: colors[ i % colors.length ].g, b: colors[ i % colors.length ].b })
            .to(this.light.color, 5, { r: colors[ (i+1) % colors.length ].r, g: colors[ (i+1) % colors.length ].g, b: colors[ (i+1) % colors.length ].b })
            .to(this.light.color, 5, { r: colors[ (i+2) % colors.length ].r, g: colors[ (i+2) % colors.length ].g, b: colors[ (i+2) % colors.length ].b })
            .to(this.light.color, 5, { r: colors[ (i+3) % colors.length ].r, g: colors[ (i+3) % colors.length ].g, b: colors[ (i+3) % colors.length ].b })
            .to(this.light.color, 5, { r: 0, g: 0, b: 0 })        
    }

    componentDidUpdate(prevProps) {
        
        // 1. add title to box
        var text_geo = new THREE.TextGeometry( this.props.data.title, {
            font: this.props.font,
            size: 1,
            height: .8,
            curveSegments: 8,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.05,
            bevelOffset: 0.01,
            bevelSegments: 1
        } );

        var text_mat = new THREE.MeshPhongMaterial({color:"white"});
        var text = new THREE.Mesh(text_geo, text_mat);
        text.position.set( (this.state.grid_size.width / -2) + 1, this.state.grid_size.height / -2, (this.state.grid_size.depth / -2) + .5);
        this.box.add(text);

        if (this.props.isActive) {
            this.calculateCameraPosition(new THREE.Vector3(-2,-2,9));
        }
    }

    calculateCameraPosition = (cameraPositionFromBoxOrigin) => {

        var cameraRotation = {
            x: 0,
            y: this.props.data.position.rotation - 0.34,
            z: 0
        };

        var worldPosition = this.box.localToWorld( cameraPositionFromBoxOrigin );

        console.log( worldPosition );
        this.props.functions.moveCameraTo( worldPosition, cameraRotation )

        // this.moveCameraTo
    }

    render() {

		return (
			<div ref="component" className={"box" + (this.props.isActive ? " box--active" : "") } >
                <Lines box={ this.box } grid_size={ this.state.grid_size }/>
                

                {/* { this.props.data.subtitle ?
                    <div className="content text-box subtitle" dangerouslySetInnerHTML={{__html: this.props.data.subtitle}}></div>
                : null }

                { this.props.data.description ?
                    <div className="content text-box" dangerouslySetInnerHTML={{__html: this.props.data.description}}></div>
                : null }

                { this.props.data.projects ?
                    <Carousel key={"carousel" + this.props.data } box={ this.box } data={ this.props.data.projects } grid_size={ this.state.grid_size }/>
                : null } */}


            </div>
		);		
	}
}

export default Box;