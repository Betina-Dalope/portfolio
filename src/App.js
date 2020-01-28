import React from 'react';

import PixelColorTest from './components/PixelColorTest';
import AverageColorTest from './components/AverageColorTest';
import Scene from './components/Scene';

import './styles/App.scss';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component {



	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Scene} />
					<Route path='/test-1' component={PixelColorTest} />
					<Route path='/test-2' component={AverageColorTest} />
					<Route path='/:box_title' component={Scene} />
				</Switch>
			</BrowserRouter>
		);		
	}
}

export default App;
