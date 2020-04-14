import React from 'react';



class Video extends React.Component {

    state = {

    }


	render() {



		return (

			<video src={ this.props.src } autoPlay muted loop preload='auto' onLoadedData={ this.props.onLoad } onError={ this.props.onError }/>

		);		
	}
}

export default Video;