import React from 'react';



class DefaultMedia extends React.Component {

    state = {

    }


	render() {



		return (

			<img src={ this.props.src } onLoad={ this.props.onLoad } onError={ this.props.onError }/>

		);		
	}
}

export default DefaultMedia;