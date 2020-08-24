import React from 'react';

import { FilmsPage } from './pages/films';
import './App.css';


const Pages = {
  FILMS: 'films',
};


const Menu = ({activeMenuItem, onMenuItemClick}) => ( 
  <ul>
    <li
    className={activeMenuItem === Pages.FILMS ? "active-menu-item" : ''}
    onClick={() => onMenuItemClick(Pages.FILMS)}
    >
      Films
    </li>
  </ul>

)

class App extends React.Component {
  state = {
    page: Pages.FILMS,
  };
  
  render() {
    return(
      <>
      <Menu 
      activeMenuItem={this.state.page}
      onMenuItemClick={(page) => this.setState({page})}
      />
      {this.state.page === Pages.FILMS && <FilmsPage /> }
      </>
    )
  }
}


export default App;
