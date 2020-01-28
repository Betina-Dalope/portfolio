import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import PixelColorTest from './components/PixelColorTest';
import AverageColorTest from './components/AverageColorTest';
import Scene from './components/Scene';

import './styles/App.scss';

import PAGES from './data/pages.json'

class App extends React.Component {

	onMenuToggleClick = (event) => {
		this.refs.menu.classList.toggle("menu--open");
	}

	render() {
		var menuItemsHTML = [];
		for (var i in PAGES) {
			menuItemsHTML.push(

				<li><Link to={"/" + PAGES[i].title.toLowerCase()}>{ PAGES[i].title }</Link></li>
			);
		}

		return (
			<BrowserRouter>
				<nav ref="menu" className="menu">
					<h1 id="menu-title" className="u-sr-only">Menu</h1>
					<button className="toggle" onClick={ this.onMenuToggleClick }>Menu</button>
					<ul aria-labelledby="menu-title">
						{ menuItemsHTML }
					</ul>
				</nav>
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
