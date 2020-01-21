import React from 'react';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

const NUM_PARTICLES = 100;

class Lines extends React.Component {


	constructor(props) {
        super(props);


        var point_a = new THREE.Vector3(-5,5,0);
        var point_b = new THREE.Vector3(5,5,0);

        var spacedPositions = new THREE.LineCurve3(point_a, point_b).getSpacedPoints(NUM_PARTICLES);

        var particlePositions = new Float32Array( NUM_PARTICLES * 3 );
        var particleScales = new Float32Array( NUM_PARTICLES );
        var particleOpacities = new Float32Array( NUM_PARTICLES );

        for (var i = 0; i < NUM_PARTICLES; i++) {
            var index = 3 * i;
            particlePositions[ index ] = spacedPositions[i].x + this.randomNumberGenerator(-.25, .25);
            particlePositions[ index + 1] = spacedPositions[i].y + this.randomNumberGenerator(-.25, .25);
            particlePositions[ index + 2] = spacedPositions[i].z + this.randomNumberGenerator(-.25, .25);

            particleScales[ i ] = this.randomNumberGenerator(.5, 1.5);
            particleOpacities[ i ] = this.randomNumberGenerator(.2, 1);

        }

        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ) );
        geometry.setAttribute( 'scale', new THREE.BufferAttribute( particleScales, 1 ) );
        geometry.setAttribute( 'opacity', new THREE.BufferAttribute( particleOpacities, 1 ) );


        var material = new THREE.ShaderMaterial( {

            uniforms: {
                color: { value: new THREE.Color( "blue" ) }
            },
            vertexShader: this.vertexShader(),
            fragmentShader: this.fragmentShader(),
            transparent: true

        } );

        this.particles = new THREE.Points( geometry, material )

        this.props.scene.add( this.particles );


        var testgeo = new THREE.BoxBufferGeometry(1,1,1);
        var testmat = new THREE.MeshLambertMaterial( { color: "red" } );
        this.props.scene.add( new THREE.Mesh( testgeo, testmat ));
        
    }

    randomNumberGenerator = (a, b) => {
        var random = a + Math.random() * (b - a)
        return random;
    }

    vertexShader = () => {
        return `
            attribute float scale;
            attribute float opacity;

            // attributes can only be passed to vertex shaders.  but variables can be sent from vertex to fragment using varying
            varying float vOpacity;

            void main() {

                vOpacity = opacity;

                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

                gl_PointSize = scale * ( 300.0 / - mvPosition.z );

                gl_Position = projectionMatrix * mvPosition;

            }
        `;
    }

    fragmentShader = () => {
        return `
            uniform vec3 color;
            
            varying float vOpacity;

            void main() {

                if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

                gl_FragColor = vec4( color, vOpacity );

            }
        `;
    }

    componentDidMount() {
        var particles = this.particles.geometry.attributes.position.array;
        console.log(this.particles.geometry.attributes.position);
        for (var i = 0; i < NUM_PARTICLES; i++) {
            var index = 3 * i;
            TweenMax.to(particles, .5, {
                [ index + 1 ]: 5,
                delay: i * .05,
                onUpdate: () => { //every time the animation frame updates!!
                    this.particles.geometry.attributes.position.needsUpdate = true;
                }
            });
        }
        
    }


	render() {
		return null;		
	}
}

export default Lines;