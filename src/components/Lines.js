import React from 'react';
import * as THREE from 'three';
import { TweenMax, Expo } from 'gsap';

const NUM_PARTICLES_PER_LINE = 1000;
const WIDTH = 16;
const HEIGHT = 12;

class Lines extends React.Component {


	constructor(props) {
        super(props);


        this.grid = this.constructGridCurves(WIDTH, HEIGHT , WIDTH);

       
        var particlePositions = new Float32Array( NUM_PARTICLES_PER_LINE * 3 * HEIGHT );
        var particleScales = new Float32Array( NUM_PARTICLES_PER_LINE * HEIGHT);
        var particleOpacities = new Float32Array( NUM_PARTICLES_PER_LINE * HEIGHT);


        for (var path_index in this.grid.horizontals) {

            var spacedPositions = this.grid.horizontals[ path_index ].getSpacedPoints(NUM_PARTICLES_PER_LINE);
            
            // var indexMin = path_index * NUM_PARTICLES_PER_LINE;

            // row 0 = 0 to 299 and 0 to 899
            // row 1 = 300 to 599 and 900 to 1799
            // row 2 = 600 to 899 and 1800 to 2699
            // row x = 300 * x to 300 * (x + 1) - 1 and 300 * 3 * x to 
            var base_index = NUM_PARTICLES_PER_LINE * path_index;
            for (var i = 0; i < NUM_PARTICLES_PER_LINE; i++) {
                
                var pos_index = (3 * base_index) + ( 3 * i );
                particlePositions[ pos_index ] = spacedPositions[i].x + this.randomNumberGenerator(-.5, .5);
                particlePositions[ pos_index + 1] = spacedPositions[i].y + this.randomNumberGenerator(-.5, .5);
                particlePositions[ pos_index + 2] = spacedPositions[i].z + this.randomNumberGenerator(-.5, .5);
    
                particleScales[ base_index + i ] = this.randomNumberGenerator(.2, .5);
                particleOpacities[ base_index + i ] = this.randomNumberGenerator(.2, 1);
            }
        }

        
        var geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ) );
        geometry.setAttribute( 'scale', new THREE.BufferAttribute( particleScales, 1 ) );
        geometry.setAttribute( 'opacity', new THREE.BufferAttribute( particleOpacities, 1 ) );


        var material = new THREE.ShaderMaterial( {

            uniforms: {
                color: { value: new THREE.Color( "white" ) }
            },
            vertexShader: this.vertexShader(),
            fragmentShader: this.fragmentShader(),
            transparent: true

        } );

        // var material = new THREE.PointsMaterial({
        //     color: 0xFFFFFF,
        //     size: .5,
        //     transparent: true,
        //     blending: THREE.AdditiveBlending,
        //   });

        this.particles = new THREE.Points( geometry, material );
        this.particles.position.y = HEIGHT / 2;

        this.props.scene.add( this.particles );        
    }

    constructGridCurves = (width, height, depth) => {
        var grid = {
            horizontals: [],
            verticals: []
        }

        for (var i = 0; i < height; i++) {
            var point_a = new THREE.Vector3( -width / 2, i - height / 2, -depth / 2);
            var point_b = new THREE.Vector3( width / 2, i - height / 2, -depth / 2);
            var point_c = new THREE.Vector3( width / 2 , i - height / 2, depth / 2);
            var point_d = new THREE.Vector3( -width / 2 , i - height / 2, depth / 2);

            var path = new THREE.CurvePath();
            path.add(new THREE.LineCurve3(point_a, point_b));
            path.add(new THREE.LineCurve3(point_b, point_c));
            path.add(new THREE.LineCurve3(point_c, point_d));
            path.add(new THREE.LineCurve3(point_d, point_a));
            grid.horizontals[i] = path;

        }

        return grid;
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
                // this is what makes it a circle
                if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

                gl_FragColor = vec4( color, vOpacity );

            }
        `;
    }

    componentDidMount() {
        var particles = this.particles.geometry.attributes.position.array;

        for (var path_index in this.grid.horizontals) {

            var spacedPositions = this.grid.horizontals[ path_index ].getSpacedPoints(NUM_PARTICLES_PER_LINE);
            
            var base_index = NUM_PARTICLES_PER_LINE * path_index;
            for (var i = 0; i < NUM_PARTICLES_PER_LINE; i++) {
                
                var pos_index = (3 * base_index) + ( 3 * i );

                TweenMax.to(particles, .5, {
                    [ pos_index ]: spacedPositions[i].x,
                    [ pos_index + 1 ]: spacedPositions[i].y, //y
                    [ pos_index + 2 ]: spacedPositions[i].z,
                    delay: i * .01 + (path_index * 1),
                    yoyo: true,
                    repeat: -1,
                    repeatDelay: 1,
                    onUpdate: () => { //every time the animation frame updates!!
                        this.particles.geometry.attributes.position.needsUpdate = true;
                    }
                });
    
                
            }
        }
        
    }


	render() {
		return null;		
	}
}

export default Lines;