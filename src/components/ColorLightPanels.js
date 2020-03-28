import React from 'react';
import * as THREE from 'three';
import { TweenMax } from 'gsap';

var GRID_COLUMNS;
var GRID_ROWS;

/*
 maybe each of the cells gets userData: {canvas_x, canvas_y, distance_from_screen}
*/

class ColorLightPanels extends React.Component {


	constructor(props) {
        super(props);

        GRID_COLUMNS = props.grid_size.width;
        GRID_ROWS = props.grid_size.height;

        // 1. set up grid structre
        this.ceiling = new THREE.Group()
        this.floor = new THREE.Group()
        this.wall_right = new THREE.Group()
        this.wall_left = new THREE.Group()

        this.grid = new THREE.Group();
        this.grid.add(this.ceiling, this.floor, this.wall_right, this.wall_left);
        this.grid.position.set(0, -GRID_ROWS/2, 0)
        this.grid.visible = false;

        props.box.add(this.grid);

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
            //this.grid.children[i].add( new THREE.GridHelper(width, width, "red") );

            this.grid.children[i].add( this.constructColorPanels(width) );
        }

        var screenGeometry = new THREE.PlaneBufferGeometry(GRID_COLUMNS, GRID_ROWS);
        var screenMaterial = new THREE.MeshBasicMaterial( {color: "black", side: THREE.FrontSide} );
        this.screen = new THREE.Mesh( screenGeometry, screenMaterial );
        this.screen.position.set(0, 0, (GRID_COLUMNS / 2) - 0.1);
        this.screen.rotation.y = Math.PI;
        props.box.add(this.screen);

    
    }

    componentDidMount() {
        this.grid.visible = true;
        this.loadImage();
    }

    componentDidUpdate(prevProps, prevState) {
        // 1. make grid visible
        this.grid.visible = true;

        // 2. load image if new image, remove image if no image
        if (!this.props.image_src)
            this.unloadImage();
        else if (prevProps.image_src != this.props.image_src)
            this.loadImage();
        

    }


    constructColorPanels = (numPanels) => {

        var colorPanels = new THREE.Group();
        colorPanels.name = "color panels";

        var geometry = new THREE.PlaneBufferGeometry();
        var midPoint = numPanels / 2;
        var halfSize = .5;

        for( var i = 0; i < numPanels; i++) {
            var colorPanelGroup = new THREE.Group();
            var numCells = Math.round(Math.random() * (this.props.grid_size.depth -1)) + 1; //random int between 1 and numPanels
            
            for ( var j = 0; j < numCells - 1; j++) {
                var material = new THREE.MeshBasicMaterial( {color: "black", side: THREE.DoubleSide} ); //need to make a new material for ever cell because we modify each cell invidually
                var plane = new THREE.Mesh( geometry, material );
    
                plane.position.set( i - midPoint + halfSize, 0, midPoint - halfSize - j);
                plane.rotation.x = Math.PI / 2;

                colorPanelGroup.add( plane );
            }


            colorPanels.add( colorPanelGroup );
        }
        
        return colorPanels;
    }

    loadImage = () => {

		// 1. create image object
		var image = new Image();
		image.src = this.props.image_src;

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

        }
        
        // 3. add image to scene
        //var loader = new THREE.TextureLoader();
        // var screenGeometry = new THREE.PlaneBufferGeometry(GRID_COLUMNS, GRID_ROWS);
        // var screenMaterial = new THREE.MeshBasicMaterial({
        //     map: loader.load(this.props.image_src),
        //     side: THREE.FrontSide,
        //     transparent: true
        // });
        // var screen = new THREE.Mesh( screenGeometry, screenMaterial );
        // screen.position.set(0, 0, (GRID_COLUMNS / 2) - 0.1);
        // screen.rotation.y = Math.PI;
        // this.props.box.add(screen);

        var _this = this;

        this.refs.image.onload = function(event) {
            var texture = new THREE.Texture( this );
            texture.needsUpdate = true;

            var screenGeometry = new THREE.PlaneBufferGeometry(GRID_COLUMNS, GRID_ROWS);
            var screenMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.FrontSide,
                transparent: true
            });
            var screen = new THREE.Mesh( screenGeometry, screenMaterial );
            screen.position.set(0, 0, (GRID_COLUMNS / 2) - 0.1);
            screen.rotation.y = Math.PI;
            _this.props.box.add(screen);
        }
    }

    unloadImage = () => {
        // console.log(this.grid.children, this.grid.getObjectByName( "color panels"));
        // for (var i in this.grid.children) {
        //     var panel = this.grid.children[i].getObjectByName( "color panels");
        //     var 
        // }

        this.grid.visible = false;
    }

    colorCellFromPixel = (canvasData, loop_index, x, y, panel) => {
        var panel = panel.getObjectByName( "color panels" );

        var panelGroup = panel.children[ panel.children.length - loop_index - 1 ];

        var position = ( x + (canvasData.width * y) ) * 4;
        var red = canvasData.data[ position ] / 255;
        var green = canvasData.data[ position + 1 ] / 255;
        var blue = canvasData.data[ position + 2 ] / 255;
        var alpha = canvasData.data[ position + 3 ] / 255;


        for (var i in panelGroup.children) {
            var cell = panelGroup.children[i];
            changeCellColor(i, cell);

        }

        function changeCellColor(i, cell) {
            TweenMax.delayedCall(i * .1 + Math.random(), () => {
                cell.material.color.setRGB(red, green, blue);
                cell.material.opacity = alpha;
            });
        }
    }


	render() {

		return (
            <React.Fragment>
                <canvas ref="image_loader" className="image-loader" width={ this.props.grid_size.width } height={ this.props.grid_size.height }></canvas>
                <img ref="image" style={{display: 'none'}} src={ this.props.image_src } />
            </React.Fragment>
		);		
	}
}

export default ColorLightPanels;