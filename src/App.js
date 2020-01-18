import React from 'react';

import PixelColorTest from './components/PixelColorTest';
import AverageColorTest from './components/AverageColorTest';
import Scene from './components/Scene';

import './styles/App.css';

const GRID_COLUMNS = 6;
const GRID_ROWS = 4;

class App extends React.Component {



	render() {

		return (
			<React.Fragment>
				<Scene/>
				<AverageColorTest/>
				<PixelColorTest/>
			</React.Fragment>
		);		
	}
}

export default App;
