import React from 'react';

import './styles/App.css';

class App extends React.Component {

	state = {
		pixel_color_obj: {}
	}

	componentDidMount() {
		// 1. create image object
		var image = new Image;
		image.src = "./test-image.png";

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

			// 3. get average color of a small rectangle of the canvas
			this.canvasData = canvasContext.getImageData( 0, 0, this.refs.canvas.width, this.refs.canvas.height );
		}
	}

	getPixel = ( imagedata, x, y ) => {

		var position = ( x + (imagedata.width * y) ) * 4;
		var data = imagedata.data;
		return { r: data[ position ], g: data[ position + 1 ], b: data[ position + 2 ], a: data[ position + 3 ] };
	
	}

	onCanvasClick = (event) => {
		var rect = event.target.getBoundingClientRect(); 
		var x = Math.round(event.clientX - rect.left); 
		var y = Math.round(event.clientY - rect.top); 

		console.log("Coordinate x: " + x,  
					"Coordinate y: " + y);

		var pixel_color_obj = this.getPixel(this.canvasData, x, y);
		this.setState({ pixel_color_obj: pixel_color_obj });
	}

	render() {

		var tile_color = "rgb( " + this.state.pixel_color_obj.r + ", " + this.state.pixel_color_obj.g + ", " + this.state.pixel_color_obj.b + ", " + this.state.pixel_color_obj.a + ")";

		return (
			<React.Fragment>
				<h1>Test Color Extender</h1>
				<canvas ref="canvas" width="400" height="200" style={{backgroundColor: 'red'}} onClick={this.onCanvasClick}></canvas>
				<div ref="calculatedColor" style={{height: '20px', width: '20px', backgroundColor: tile_color}}></div>
				<p>R: { this.state.pixel_color_obj.r } G: { this.state.pixel_color_obj.g } B: { this.state.pixel_color_obj.b }</p>
			</React.Fragment>
		);		
	}
}

export default App;
