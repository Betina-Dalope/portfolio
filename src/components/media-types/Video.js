import React from 'react';



class Video extends React.Component {

    state = {

    }


	render() {



		return (

			<video src={ this.props.src } autoPlay muted loop/>

		);		
	}
}

export default Video;