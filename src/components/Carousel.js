import React from 'react';
import ColorLightPanels from './ColorLightPanels';
import Flickity from 'flickity';

import Media from './Media';


class Carousel extends React.Component {

    state = {
        active_index: 0
    }

    componentDidMount() {

        this.main_slides = new Flickity( this.refs.main_slides , {
            cellAlign: "center",
            pageDots: false,
            on: {
                change: (index) => {
                    if ( index == this.state.active_index ) return;
                    this.setState({ active_index: index })
                    this.nav_slides.select( index );
                }
            }
        });

        this.nav_slides = new Flickity( this.refs.nav_slides , {
            cellAlign: "left",
            contain: true,
            prevNextButtons: false,
            on: {
                change: (index) => {
                    if ( index == this.state.active_index ) return;
                    this.setState({ active_index: index })
                    this.main_slides.select( index );
                }
            }
        });
    }

    componentDidUpdate() {
        this.nav_slides.resize();
    }

    onSlideClick = (index) => {
        this.setState({ active_index: index });
        this.main_slides.select( index );
    }


    render() {

        var listItemsHTML = [];
        var mainSlidesHTML = [];
        for (var i in this.props.data) {
            listItemsHTML.push(
 
                <button className="slide" onClick={ this.onSlideClick.bind(this, i) }>
                    <h3>{ this.props.data[i].title }</h3>
                    <p className="tech">{ this.props.data[ i ].tech }</p>
                </button>
            );

            mainSlidesHTML.push(
                <div className="carousel__content">
                        <div className="carousel__content-image">
                            <Media
                                type={ this.props.use_stage ? "stage" : ""}
                                src={ this.props.data[ i ].image }
                            />
                        </div>

                        { this.props.data[ i ].description
                        ?   <div className="carousel__content-text">
                                <h3>{ this.props.data[ i ].title }</h3>
                                <p>{ this.props.data[ i ].description }</p>
                                <p><strong>Role:</strong> { this.props.data[ i ].role }</p>

                                { this.props.data[ i ].url
                                ?   <a target="_blank" href={ this.props.data[ i ].url }>View</a>
                                :   null }
                            </div>
                        : null }
                </div>                
            )
        }

        



		return (
			<div ref="component" className={"carousel" + (this.state.active_index > -1 ? " carousel--show-details" : "")}>

                { this.props.box
                ?   <ColorLightPanels
                        box={ this.props.box }
                        image_src={ this.state.active_index > -1 ? this.props.data[ this.state.active_index ].image : null }
                        grid_size={ this.props.grid_size } />
                : null }

                { this.props.use_stage
                ?   <div className="carousel__content">
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
                : <div ref="main_slides" className="main-slides">{ mainSlidesHTML }</div> }

                <div ref="nav_slides" className="nav-slides">{ listItemsHTML }</div>
                
            </div>
		);		
	}
}

export default Carousel;