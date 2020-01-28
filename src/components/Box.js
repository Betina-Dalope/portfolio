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
        this.box.position.set(props.position.x, props.position.y, props.position.z);
        this.box.rotation.y = props.position.rotation;
        this.box.receiveShadow = true;
        props.scene.add( this.box );

        // 3. set up light
        this.light = new THREE.PointLight( props.color, 1, 16 );
        this.light.castShadow = true;
        this.light.position.set(props.position.x, props.position.y, props.position.z);
        props.scene.add(this.light);

    }

    componentDidMount() {

        var colors = [new THREE.Color("yellow"), new THREE.Color("purple"), new THREE.Color("blue"), new THREE.Color("red")];
        var i = this.props.index;
        var timeline = new TimelineLite({repeat: -1});
        timeline
            .to(this.light.color, 5, { r: colors[ i % colors.length ].r, g: colors[ i % colors.length ].g, b: colors[ i % colors.length ].b })
            .to(this.light.color, 5, { r: colors[ (i+1) % colors.length ].r, g: colors[ (i+1) % colors.length ].g, b: colors[ (i+1) % colors.length ].b })
            .to(this.light.color, 5, { r: colors[ (i+2) % colors.length ].r, g: colors[ (i+2) % colors.length ].g, b: colors[ (i+2) % colors.length ].b })
            .to(this.light.color, 5, { r: colors[ (i+3) % colors.length ].r, g: colors[ (i+3) % colors.length ].g, b: colors[ (i+3) % colors.length ].b })
    }

    componentDidUpdate() {
        console.log("update");

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
    }

    render() {

		return (
			<div ref="component" className={"box" + (this.props.isActive ? " box--active" : "") } >
                <Lines box={ this.box } grid_size={ this.state.grid_size }/>
                

                { this.props.data.subtitle ?
                    <div className="text subtitle" dangerouslySetInnerHTML={{__html: this.props.data.subtitle}}></div>
                : null }

                { this.props.data.description ?
                    <div className="text" dangerouslySetInnerHTML={{__html: this.props.data.description}}></div>
                : null }

                { this.props.data.projects ?
                    <Carousel box={ this.box } data={ this.props.data.projects } grid_size={ this.state.grid_size }/>
                : null }


            </div>
		);		
	}
}

export default Box;