import React from 'react';
import { BrowserRouter, Switch, Route, Link, withRouter } from 'react-router-dom';

import PixelColorTest from './components/PixelColorTest';
import AverageColorTest from './components/AverageColorTest';
import Page from './components/Page';
import BasicPage from './components/BasicPage';
import Scene from './components/Scene';

import './styles/App.scss';

import PAGES from './data/pages.json'

class App extends React.Component {

	state = {
		isMenuOpen: false
	}

	onMenuToggleClick = (event) => {
		this.setState({ isMenuOpen: !this.state.isMenuOpen });
	}

	render() {
		var menuItemsHTML = [];
		for (var i in PAGES) {
			menuItemsHTML.push(

				<li><Link to={"/initial-scene" + PAGES[i].title.toLowerCase()} onClick={ this.onMenuToggleClick }>{ PAGES[i].title }</Link></li>
			);
		}

		return (
			
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={BasicPage}/>
					<Route exact path='/initial-scene' render={(props) =>
						<React.Fragment>
						<nav className={ "menu" + (this.state.isMenuOpen ? " menu--open" : "") }>
							<h1 id="menu-title" className="u-sr-only">Menu</h1>
							<button className="toggle" onClick={ this.onMenuToggleClick }>Menu</button>
							<ul aria-labelledby="menu-title">
								{ menuItemsHTML }
							</ul>
						</nav>
						<Scene {...props} isMenuOpen={ this.state.isMenuOpen } controls/>
						</React.Fragment>
					} />
					<Route path='/test-1' component={PixelColorTest} />
					<Route path='/test-2' component={AverageColorTest} />
					<Route path='/page' component={Page}/>
					<Route path='/initial-scene/:box_title' render={(props) => <Scene {...props} isMenuOpen={ this.state.isMenuOpen } />} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App; // so we can access the location
