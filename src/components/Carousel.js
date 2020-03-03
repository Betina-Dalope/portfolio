import React from 'react';
import ColorLightPanels from './ColorLightPanels';
import Flickity from 'flickity'

import '../styles/partials/_carousel.scss';
import AverageColorTest from './AverageColorTest';


class Carousel extends React.Component {

    state = {
        active_index: -1
    }

    componentDidMount() {
        this.slides = new Flickity( this.refs.slides , { cellAlign: 'left' });
    }

    componentDidUpdate() {
        this.slides.resize();
    }

    onSlideClick = (index) => {
        this.setState({ active_index: index });
    }

    onBackToClick = (event) => {
        this.setState({ active_index: -1 });
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
                    {/* <p className="description">{ this.props.data[i].description }</p> */}
                    <p className="tech">{ this.props.data[ i ].tech }</p>
                    {/* <a className="btn" target="_blank" href={ this.props.data[i].url }>Visit</a> */}
                    {/* <button className="btn" onClick={ this.onSlideClick.bind(this, i) }>More</button> */}
                </div>
            );
        }

		return (
			<div ref="component" className={"carousel" + (this.state.active_index > -1 ? " carousel--show-details" : "")}>

                { this.props.box
                ?   <ColorLightPanels
                        box={ this.props.box }
                        image_src={ this.state.active_index > -1 ? this.props.data[ this.state.active_index ].image : null }
                        grid_size={ this.props.grid_size } />
                :   null }

                <div ref="slides" className="slides">{ listItemsHTML }</div>
                <button className="btn back-to-projects" onClick={ this.onBackToClick }>All Projects</button>

                { this.state.active_index > -1
                ?   (
                    <div ref="details" className="details text-box">
                        <h3>{ this.props.data[ this.state.active_index ].title }</h3>
                        <p className="description">{ this.props.data[ this.state.active_index ].description }</p>
                        <p className="role">{ this.props.data[ this.state.active_index ].role }</p>
                        <p className="tech">{ this.props.data[ this.state.active_index ].tech }</p>
                        <a className="btn" target="_blank" href={ this.props.data[ this.state.active_index ].url }>Visit</a>
                    </div> )
                : null }
                
            </div>
		);		
	}
}

export default Carousel;