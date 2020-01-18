import React from 'react';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

const GRID_COLUMNS = 12;
const GRID_ROWS = 9;

const IMG = "./test-image.png";

class ColorLightPanels extends React.Component {


	constructor(props) {
        super(props);

        // 1. set up grid structre
        this.ceiling = new THREE.Group()
        this.floor = new THREE.Group()
        this.wall_right = new THREE.Group()
        this.wall_left = new THREE.Group()

        this.grid = new THREE.Group();
        this.grid.add(this.ceiling, this.floor, this.wall_right, this.wall_left);

        this.props.scene.add(this.grid);

        // 2. set size of walls
        this.ceiling.userData = { width: GRID_COLUMNS };
        this.floor.userData = { width: GRID_COLUMNS };
        this.wall_right.userData = { width: GRID_ROWS };
        this.wall_left.userData = { width: GRID_ROWS };

        // 3. rotate and position grid to form a box
        this.ceiling.position.set(0, GRID_ROWS, 0);

        this.wall_right.rotation.z = Math.PI / 2;
        this.wall_right.position.set(GRID_COLUMNS / -2, GRID_ROWS / 2, (GRID_COLUMNS-GRID_ROWS) / 2);

        this.wall_left.rotation.z = Math.PI / 2;
        this.wall_left.position.set(GRID_COLUMNS / 2, GRID_ROWS / 2, (GRID_COLUMNS-GRID_ROWS) / 2)


        // 3. construct grid lines and color panels
        for (var i in this.grid.children) {
            var width = this.grid.children[i].userData.width;
            this.grid.children[i].add( new THREE.GridHelper(width, width, "red") );

            this.grid.children[i].add( this.constructColorPanels(width) );
        }

        

        this.constructColorPanels();
    }

    componentDidMount() {
        this.loadImage();
    }


    constructColorPanels = (numPanels) => {

        var colorPanels = new THREE.Group();
        colorPanels.name = "color panels";

        var geometry = new THREE.PlaneBufferGeometry();
        var midPoint = numPanels / 2;
        var halfSize = .5;

        for( var i = 0; i < numPanels; i++) {
            var material = new THREE.MeshBasicMaterial( {color: "yellow", side: THREE.DoubleSide} ); //need to make a new material for ever cell because we modify each cell invidually
            var plane = new THREE.Mesh( geometry, material );

            plane.position.set( i - midPoint + halfSize, 0, midPoint - halfSize);
            plane.rotation.x = Math.PI / 2;

            colorPanels.add( plane );
        }
        
        return colorPanels;
    }

    loadImage = () => {
		// 1. create image object
		var image = new Image();
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
                this.colorCellFromPixel(canvasData, i, i, 0, this.ceiling);
                this.colorCellFromPixel(canvasData, i, i, GRID_ROWS - 1, this.floor);
            }

            for (var i = 0; i < GRID_ROWS; i++) {
                this.colorCellFromPixel(canvasData, i, 0, i, this.wall_left) //left
                this.colorCellFromPixel(canvasData, i, GRID_COLUMNS - 1, i, this.wall_right) //right
            }
            console.log(this.wall_right.children);
        }
        
        // 3. add image to scene
        var loader = new THREE.TextureLoader();
        var screenGeometry = new THREE.PlaneBufferGeometry(GRID_COLUMNS, GRID_ROWS);
        var screenMaterial = new THREE.MeshBasicMaterial({
            map: loader.load(IMG),
            side: THREE.DoubleSide
        });
        var screen = new THREE.Mesh( screenGeometry, screenMaterial );
        screen.position.set(0, GRID_ROWS/2, GRID_COLUMNS / 2);
        screen.rotation.y = Math.PI;
        this.props.scene.add(screen);
    }

    colorCellFromPixel = (canvasData, loop_index, x, y, panel) => {
        var panel = panel.getObjectByName( "color panels" );

        var cell = panel.children[ panel.children.length - loop_index - 1 ];

        var position = ( x + (canvasData.width * y) ) * 4;
        var red = canvasData.data[ position ] / 255;
        var green = canvasData.data[ position + 1 ] / 255;
        var blue = canvasData.data[ position + 2 ] / 255;
        var alpha = canvasData.data[ position + 3 ] / 255;


        TweenMax.delayedCall(x * .1, () => {
            cell.material.color.setRGB(red, green, blue);
            cell.material.opacity = alpha;
        })
    }


	render() {

		return (
            <canvas ref="image_loader" width={ GRID_COLUMNS } height={ GRID_ROWS}></canvas>
		);		
	}
}

export default ColorLightPanels;