import React from 'react';
import ColorLightPanels from './ColorLightPanels';
import Flickity from 'react-flickity-component'

import '../styles/partials/_carousel.scss';


class Carousel extends React.Component {

    state = {
        panel_image: null,
    }

    onSlideClick = (event) => {
        this.setState({panel_image: event.target["data-img"]})
        console.log("click", event.target)
    }

    render() {

        var listItemsHTML = [];
        for (var i in this.props.data) {
            listItemsHTML.push(
                <button className="slide" onClick={ this.onSlideClick } data-img={ this.props.data[i].image }>{ this.props.data[i].title }</button>
            );
        }

		return (
			<div ref="component" className="carousel">
                <ColorLightPanels
                    box={ this.props.box }
                    image_src={ this.state.panel_image}
                    grid_size={ this.props.grid_size } />
                <Flickity className="slides">
                    { listItemsHTML }
                </Flickity>
                
            </div>
		);		
	}
}

export default Carousel;