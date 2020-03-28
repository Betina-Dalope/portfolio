import React from 'react';
import Media from './Media';



class Gallery extends React.Component {

    state = {

    }

	render() {
    
        var itemsHTML = [];
        for (var i in this.props.data) {
            itemsHTML.push(
                <li>
                    <Media {...this.props.data[i]} />
                    {/* <div className="gallery__text">
                        <p>{ this.props.data[i].tech }</p>
                    </div> */}
                </li>
            );
        }

		return (

            <div ref="component" className="gallery">
                <ul>
                    { itemsHTML }
                </ul>
            </div>

		);		
	}
}

export default Gallery;