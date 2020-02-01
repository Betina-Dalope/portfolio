import React from 'react';
import ColorLightPanels from './ColorLightPanels';
import Flickity from 'flickity'

import '../styles/partials/_carousel.scss';


class Carousel extends React.Component {

    state = {
        active_index: -1
    }

    componentDidMount() {
        this.slides = new Flickity( this.refs.slides , { });
    }

    componentDidUpdate() {
        this.slides.resize();
    }

    onSlideClick = (index) => {
        this.setState({ active_index: index });
    }

    render() {

        var listItemsHTML = [];
        for (var i in this.props.data) {
            listItemsHTML.push(
                // <button className="slide" onClick={ this.onSlideClick } data-img={ this.props.data[i].image }>
                //     { this.props.data[i].title }
                // </button>
                <div className="slide text-box">
                    <h3>{ this.props.data[i].title }</h3>
                    <p className="description">{ this.props.data[i].description }</p>
                    <a className="btn">Visit</a>
                    <button className="btn" onClick={ this.onSlideClick.bind(this, i) }>More</button>
                </div>
            );
        }

		return (
			<div ref="component" className="carousel">
                <ColorLightPanels
                    box={ this.props.box }
                    image_src={ this.state.active_index > -1 ? this.props.data[ this.state.active_index ].image : null }
                    grid_size={ this.props.grid_size } />
                <div ref="slides" className="slides">{ listItemsHTML }</div>
                
                { this.state.active_index > -1
                ?   <div ref="details" className="details text-box">
                        <h3>{ this.props.data[ this.state.active_index ].title }</h3>
                        <p className="description">{ this.props.data[ this.state.active_index ].description }</p>
                        <p className="role">{ this.props.data[ this.state.active_index ].role }</p>
                        <p className="tech">{ this.props.data[ this.state.active_index ].tech }</p>
                        <a className="btn">Visit</a>
                    </div>
                : null }
                
            </div>
		);		
	}
}

export default Carousel;