import React from 'react';

import Carousel from './Carousel';
import Scene from './Scene'
import Media from './Media'

import DATA from '../data/pages.json';

class Page extends React.Component {


    componentDidMount() {    

    }




    render() {

		return (
            <React.Fragment>
                <Scene></Scene>
                <h1>Betina Dalope</h1>
                <p>Philadelphia, PA</p>

                <h2>Contact</h2>
                <p><strong>Email: </strong> betina.devwork@gmail.com</p>
                <p><strong>LinkedIn: </strong>https://www.linkedin.com/in/mbetina/</p>

                <h2>Work</h2>
                
                <Carousel data={ DATA[1].projects } use_stage/>

                <h2>Prototypes</h2>

                <Carousel data={ DATA[2].projects } use_stage/>

                <h2>Music and Sound Design</h2>

            </React.Fragment>
            
		);		
	}
}

export default Page;