import React from 'react';
import ColorLightPanels from './ColorLightPanels';
import Flickity from 'flickity'

import Media from './Media';


class Carousel extends React.Component {

    state = {
        active_index: 0
    }

    componentDidMount() {
        this.slides = new Flickity( this.refs.slides , {
            //cellAlign: 'left',
            contain: true,
            on: {
                change: (index) => {
                    this.setState({ active_index: index })
                }
            }
        });
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
                <button className="slide" onClick={ this.onSlideClick.bind(this, i) }>
                    <h3>{ this.props.data[i].title }</h3>
                    {/* <p className="description">{ this.props.data[i].description }</p> */}
                    <p className="tech">{ this.props.data[ i ].tech }</p>
                    {/* <a className="btn" target="_blank" href={ this.props.data[i].url }>Visit</a> */}
                    {/* <button className="btn" onClick={ this.onSlideClick.bind(this, i) }>More</button> */}
                </button>
            );
        }


		return (
			<div ref="component" className={"carousel" + (this.state.active_index > -1 ? " carousel--show-details" : "")}>

                { this.props.box
                ?   <ColorLightPanels
                        box={ this.props.box }
                        image_src={ this.state.active_index > -1 ? this.props.data[ this.state.active_index ].image : null }
                        grid_size={ this.props.grid_size } />
                :   <div className="carousel__content">
                        <div className="carousel__content-image">
                            <Media
                                type={ this.props.use_stage ? "stage" : ""}
                                src={ this.props.data[ this.state.active_index ].image }
                            />
                        </div>

                        { this.props.data[ this.state.active_index ].description
                        ?   <div className="carousel__content-text">
                                <h3>{ this.props.data[ this.state.active_index ].title }</h3>
                                <p>{ this.props.data[ this.state.active_index ].description }</p>
                                <p><strong>Role:</strong> { this.props.data[ this.state.active_index ].role }</p>

                                { this.props.data[ this.state.active_index ].url
                                ?   <a target="_blank" href={ this.props.data[ this.state.active_index ].url }>View</a>
                                :   null }
                            </div>
                        : null }
                    </div>
                }

                <div ref="slides" className="slides">{ listItemsHTML }</div>
                
            </div>
		);		
	}
}

export default Carousel;