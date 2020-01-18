import React from 'react';

const GRID_COLUMNS = 12;
const GRID_ROWS = 9;
const IMG = "./IMG_2709.jpeg";

class AverageColorTest extends React.Component {

	state = {
		pixel_color_obj: {}
	}

	componentDidMount() {
		// 1. create image object
		var image = new Image;
		image.src = IMG;

		// 2. add image to canvas and fit image inside canvas and center
		var canvasContext = this.refs.canvas.getContext("2d");
		image.onload = () => {
			var hRatio = this.refs.canvas.width / image.width;
			var vRatio = this.refs.canvas.height / image.height;
			var ratio  = Math.min ( hRatio, vRatio );
			var centerShift_x = ( this.refs.canvas.width - image.width*ratio ) / 2;
			var centerShift_y = ( this.refs.canvas.height - image.height*ratio ) / 2; 

			canvasContext.drawImage(image, 0, 0, image.width, image.height,
				centerShift_x, centerShift_y, image.width*ratio, image.height*ratio);

			// 3. get average color of the perimeter
            this.canvasData = canvasContext.getImageData( 0, 0, this.refs.canvas.width, this.refs.canvas.height );
            for (var i = 0; i < GRID_COLUMNS; i++) {
                this.colorCellFromPixel(i, 0) //top
                this.colorCellFromPixel(i, GRID_ROWS - 1) //bottom
            }

            for (var i = 0; i < GRID_ROWS; i++) {
                this.colorCellFromPixel(0, i) //left
                this.colorCellFromPixel(GRID_COLUMNS - 1, i) //right
            }
		}
    }

    colorCellFromPixel = (x, y) => {
        var row = this.refs.colorTable.childNodes[y];
        var cell = row.childNodes[x]
        var colorObj = this.getPixel( this.canvasData, x, y);
        cell.style.backgroundColor = "rgb( " + colorObj.r + ", " + colorObj.g + ", " + colorObj.b + ", " + colorObj.a + ")";
    }

	getPixel = ( imagedata, x, y ) => {

		var position = ( x + (imagedata.width * y) ) * 4;
		var data = imagedata.data;
		return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };
	
	}

	render() {

        var tile_color = "rgb( " + this.state.pixel_color_obj.r + ", " + this.state.pixel_color_obj.g + ", " + this.state.pixel_color_obj.b + ", " + this.state.pixel_color_obj.a + ")";
        
        var colorGridHTML = [];
        for ( var i = 0; i < GRID_ROWS; i++ ) {
            var colorGridColumnHTML = [];
            for ( var j = 0; j < GRID_COLUMNS; j++) {
                colorGridColumnHTML.push(
                    <td style={{height: '20px', width: '20px', backgroundColor: tile_color}}></td>
                )
            }
            colorGridHTML.push(
                <tr>{ colorGridColumnHTML }</tr>
            )
        }


		return (
			<React.Fragment>
				<h1>Test Average Color Extender</h1>
				<canvas ref="canvas" width={ GRID_COLUMNS } height={ GRID_ROWS } style={{backgroundColor: 'red'}}></canvas>
                <div style={{ position: 'relative'}}>
                    <table ref="colorTable">{ colorGridHTML }</table>
                    <img src={IMG} height={ 165 } width={ GRID_COLUMNS * 20 } style={{objectFit: 'contain', position: 'absolute', top: 26, left: 25 }}/>
                </div>

			</React.Fragment>
		);		
	}
}

export default AverageColorTest;
