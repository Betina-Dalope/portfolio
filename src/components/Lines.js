import React from 'react';
import * as THREE from 'three';
import { TweenMax, Expo } from 'gsap';

const NUM_PARTICLES_PER_LINE = 500;

class Lines extends React.Component {


	constructor(props) {
        super(props);

        this.grid = this.constructGridCurves(props.grid_size.width, props.grid_size.height, props.grid_size.depth);
        var array_size = props.grid_size.width * props.grid_size.height * props.grid_size.depth;

       
        var particlePositions = new Float32Array( NUM_PARTICLES_PER_LINE * 3 * array_size );
        var particleScales = new Float32Array( NUM_PARTICLES_PER_LINE * array_size);
        var particleOpacities = new Float32Array( NUM_PARTICLES_PER_LINE * array_size);


        for (var path_index in this.grid.concat) {

            var spacedPositions = this.grid.concat[ path_index ].getSpacedPoints(NUM_PARTICLES_PER_LINE);
            
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
                color: { value: new THREE.Color( "grey" ) }
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
        //this.particles.position.y = props.grid_size.height / 2;

        this.props.box.add( this.particles );        
    }

    constructGridCurves = (width, height, depth) => {
        var grid = {
            horizontals: [],
            verticals: [],
            concat: []
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

        for (var i = 0; i < width; i++) {
            var point_a = new THREE.Vector3( i - width / 2, -height / 2, -depth / 2);
            var point_b = new THREE.Vector3( i - width / 2, height / 2, -depth / 2);
            var point_c = new THREE.Vector3( i - width / 2 , height / 2, depth / 2);
            var point_d = new THREE.Vector3( i - width / 2 , -height / 2, depth / 2);

            var path = new THREE.CurvePath();
            path.add(new THREE.LineCurve3(point_a, point_b));
            path.add(new THREE.LineCurve3(point_b, point_c));
            path.add(new THREE.LineCurve3(point_c, point_d));
            path.add(new THREE.LineCurve3(point_d, point_a));
            grid.verticals[i] = path;
        }

        for (var i = 0; i < depth; i++) {
            var point_a = new THREE.Vector3( width / 2, height / 2, i - depth / 2);
            var point_b = new THREE.Vector3( width / 2, -height / 2, i - depth / 2);
            var point_c = new THREE.Vector3( -width / 2 , -height / 2, i - depth / 2);
            var point_d = new THREE.Vector3( -width / 2 , height / 2, i - depth / 2);

            var path = new THREE.CurvePath();
            path.add(new THREE.LineCurve3(point_a, point_b));
            path.add(new THREE.LineCurve3(point_b, point_c));
            path.add(new THREE.LineCurve3(point_c, point_d));
            path.add(new THREE.LineCurve3(point_d, point_a));
            grid.verticals[i + width] = path;
        }

        grid.concat = grid.horizontals.concat( grid.verticals );

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
        this.initAni();
    }

    initAni = () => {
        var particles_position = this.particles.geometry.attributes.position.array;
        var particles_scale = this.particles.geometry.attributes.scale.array;

        

        for (var path_index in this.grid.concat) {

            var spacedPositions = this.grid.concat[ path_index ].getSpacedPoints(NUM_PARTICLES_PER_LINE);
            
            var base_index = NUM_PARTICLES_PER_LINE * path_index;
            for (var i = 0; i < NUM_PARTICLES_PER_LINE; i++) {

                var delay = i * .02 + (path_index * .1);

                TweenMax.from(particles_scale, .5, {
                    [ base_index + i ]: 0,
                    delay: delay,
                    yoyo: true,
                    repeat: -1,
                    repeatDelay: 1,
                    onUpdate: () => { //every time the animation frame updates!!
                        this.particles.geometry.attributes.scale.needsUpdate = true;
                    }
                });

                var pos_index = (3 * base_index) + ( 3 * i );

                TweenMax.to(particles_position, .5, {
                    [ pos_index ]: spacedPositions[i].x,
                    [ pos_index + 1 ]: spacedPositions[i].y,
                    [ pos_index + 2 ]: spacedPositions[i].z,
                    delay: delay,
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

    restingAni = () => {
        var particles = this.particles.geometry.attributes.position.array;

        for (var path_index in this.grid.concat) {

            var spacedPositions = this.grid.concat[ path_index ].getSpacedPoints(NUM_PARTICLES_PER_LINE);
            
            var base_index = NUM_PARTICLES_PER_LINE * path_index;
            for (var i = 0; i < NUM_PARTICLES_PER_LINE; i++) {
                
                var pos_index = (3 * base_index) + ( 3 * i );

                TweenMax.to(particles, .5, {
                    [ pos_index ]: spacedPositions[i].x,
                    [ pos_index + 1 ]: spacedPositions[i].y,
                    [ pos_index + 2 ]: spacedPositions[i].z,
                    delay: i * .02 + (path_index * .5),
                    yoyo: true,
                    repeat: -1,
                    repeatDelay: 2,
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