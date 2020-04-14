import React from 'react';

import '../styles/partials/_media.scss';

import 'react-dat-gui/dist/index.css';


import Stage from './media-types/Stage';
import Video from './media-types/Video';
import DefaultMedia from './media-types/DefaultMedia';

const ROOT = (window.location.hostname == "localhost") ? "./portfolio" : "."


class Media extends React.Component {

    state = {
        is_loaded: false,
    }

    renderMedia = () => {

        switch (this.props.type) {
            case "stage":
                return <Stage src={ ROOT + this.props.src }/>;
            case "video":
                return <Video src={ ROOT + this.props.src } onLoad={ this.onLoad } onError={ this.onError }/>;
            default: 
                return <DefaultMedia src={ ROOT + this.props.src } onLoad={ this.onLoad } onError={ this.onError }/>;
        }
    }

    onLoad = (event) => {
        console.log("here");
        this.setState({is_loaded: true});
    }

    onError = (event) => {
    }

	render() {

		return (

			<div ref="component" className={"media" + (this.props.type ? " media--" + this.props.type : "") + (this.state.is_loaded ? " media--is-loaded" : "")}>
                <p className="response-text">Loading...</p>
                { this.renderMedia() }
            </div>

		);		
	}
}

export default Media;