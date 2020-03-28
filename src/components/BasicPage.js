import React from 'react';

import Carousel from './Carousel';
import Gallery from './Gallery'

import DATA from '../data/pages.json';

class Page extends React.Component {


    componentDidMount() {    
        document.getElementsByTagName("BODY")[0].classList.add( "basic-page" );
    }




    render() {

		return (
            <React.Fragment>
                <h1>Betina Dalope</h1>
                <p>Philadelphia, PA</p>

                <h2>Contact</h2>
                <p><strong>Email: </strong> betina.devwork@gmail.com</p>
                <p><strong>LinkedIn: </strong>https://www.linkedin.com/in/mbetina/</p>

                <h2>Work</h2>
                
                <Carousel data={ DATA[1].projects }/>

                <h2>Prototypes</h2>
                <p>using Three.js, Gsap, React.js, and Sass (CSS)</p>

                <Gallery data={ DATA[2].gallery }/>

            </React.Fragment>
            
		);		
	}
}

export default Page;