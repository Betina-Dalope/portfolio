import React from 'react';



class DefaultMedia extends React.Component {

    state = {

    }


	render() {



		return (

			<img src={ this.props.src } />

		);		
	}
}

export default DefaultMedia;