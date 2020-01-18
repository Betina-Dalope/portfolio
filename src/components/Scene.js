import React from 'react';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

const GRID_COLUMNS = 12;
const GRID_ROWS = 8;

const IMG = "./IMG_2709.jpeg";

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
        this.camera.position.set(0, 5, -15);
        this.camera.lookAt(0,3,0)
        this.scene.add(this.camera);

        // 3. set up light
        var ambientLight = new THREE.AmbientLight("white", 1)
        this.scene.add(ambientLight);


        //3. set up grid
        var grid = new THREE.GridHelper( GRID_COLUMNS, GRID_COLUMNS, new THREE.Color("red") );
        this.scene.add(grid);

        this.constructColorPanels();
    }

    componentDidMount() {
        this.refs.component.appendChild(this.renderer.domElement);

        //this.renderer.render(this.scene, this.camera);
        this.animate();
        this.loadImage();
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        this.renderer.render(this.scene, this.camera);
       
    }

    constructColorPanels = () => {

        var colorPanels = new THREE.Group();
        colorPanels.name = "color panels";

        var geometry = new THREE.PlaneBufferGeometry();
        var midPoint = GRID_COLUMNS / 2;
        var halfSize = .5;

        for( var i = 0; i < GRID_COLUMNS; i++) {
            var material = new THREE.MeshBasicMaterial( {color: "yellow", side: THREE.DoubleSide} ); //need to make a new material for ever cell because we modify each cell invidually
            var plane = new THREE.Mesh( geometry, material );
            plane.position.set( i - midPoint + halfSize, 0, midPoint - halfSize);
            plane.rotation.x = Math.PI / 2;
            colorPanels.add( plane );
        }
        this.scene.add( colorPanels );
    }

    loadImage = () => {
		// 1. create image object
		var image = new Image;
		image.src = IMG;

		// 2. add image to canvas (same size as grid) and fit image inside canvas and center
		var canvasContext = this.refs.image_loader.getContext("2d");
		image.onload = () => {
			var hRatio = GRID_COLUMNS / image.width;
			var vRatio = GRID_ROWS / image.height;
			var ratio  = Math.min ( hRatio, vRatio );
			var centerShift_x = ( GRID_COLUMNS - image.width*ratio ) / 2;
			var centerShift_y = ( GRID_ROWS - image.height*ratio ) / 2; 

			canvasContext.drawImage(image, 0, 0, image.width, image.height,
				centerShift_x, centerShift_y, image.width*ratio, image.height*ratio);

			// 3. get average color of the perimeter
            var canvasData = canvasContext.getImageData( 0, 0, GRID_COLUMNS, GRID_ROWS );
            for (var i = 0; i < GRID_COLUMNS; i++) {
                this.colorCellFromPixel(canvasData, i, 0) //top
                //this.colorCellFromPixel(i, GRID_ROWS - 1) //bottom
            }

            // for (var i = 0; i < GRID_ROWS; i++) {
            //     this.colorCellFromPixel(0, i) //left
            //     this.colorCellFromPixel(GRID_COLUMNS - 1, i) //right
            // }
        }
        
        // 3. add image to scene
        var loader = new THREE.TextureLoader();
        var screenGeometry = new THREE.PlaneBufferGeometry(GRID_COLUMNS, GRID_ROWS);
        var screenMaterial = new THREE.MeshBasicMaterial({
            map: loader.load(IMG),
            side: THREE.DoubleSide
        });
        var screen = new THREE.Mesh( screenGeometry, screenMaterial );
        screen.position.set(0, GRID_ROWS/2, 10);
        this.scene.add(screen);
    }

    colorCellFromPixel = (canvasData, x, y) => {
        var panel = this.scene.getObjectByName( "color panels" );
        var cell = panel.children[x];

        var colorObj = this.getPixel(canvasData, x, y);

        TweenMax.delayedCall(x * 1, () => {
            cell.material.color.setRGB(colorObj.r/255, colorObj.g/255, colorObj.b/255);
            console.log(cell.material.color)
        }, [x, cell, colorObj])
    }

    getPixel = ( imagedata, x, y ) => {

		var position = ( x + (imagedata.width * y) ) * 4;
		var data = imagedata.data;
		return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };
	
	}

	render() {

		return (
			<div ref="component">
                <canvas ref="image_loader" width={ GRID_COLUMNS } height={ GRID_ROWS}></canvas>
            </div>
		);		
	}
}

export default Scene;