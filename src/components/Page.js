import React from 'react';

import Carousel from './Carousel';
import Scene from './Scene'
import Media from './Media'
import '../styles/partials/_carousel.scss';

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
                <div className="stage">
                    <div className="stage-image">
                        <Media></Media>
                    </div>
                    <div className="stage-text">
                        <h3>Project Title</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <button>View</button>
                    </div>
                </div>
                
                <Carousel data={ DATA[1].projects }/>

                <h2>Prototypes</h2>
                <div className="stage">
                    <div className="stage-image"></div>
                    <div className="stage-image"></div>
                </div>
                <Carousel data={ DATA[2].projects }/>

                <h2>Music and Sound Design</h2>

            </React.Fragment>
            
		);		
	}
}

export default Page;