import React from 'react';

import PixelColorTest from './components/PixelColorTest';
import AverageColorTest from './components/AverageColorTest';

import './styles/App.css';

const GRID_COLUMNS = 6;
const GRID_ROWS = 4;

class App extends React.Component {



	render() {

		return (
			<React.Fragment>
				<AverageColorTest></AverageColorTest>
				<PixelColorTest></PixelColorTest>
			</React.Fragment>
		);		
	}
}

export default App;
