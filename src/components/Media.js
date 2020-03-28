import React from 'react';

import '../styles/partials/_media.scss';

import 'react-dat-gui/dist/index.css';


import Stage from './media-types/Stage';
import Video from './media-types/Video';
import DefaultMedia from './media-types/DefaultMedia';


class Media extends React.Component {

    state = {

    }


    renderMedia = () => {
        switch (this.props.type) {
            case "stage":
                return <Stage src={ this.props.src }/>;
            case "video":
                return <Video src={ this.props.src }/>;
            default: 
                return <DefaultMedia src={ this.props.src } />;
        }
    }

	render() {

		return (

			<div ref="component" className={"media" + (this.props.type ? " media--" + this.props.type : "") }>
                { this.renderMedia() }
            </div>

		);		
	}
}

export default Media;