import React from 'react';
import { Router, Location, Redirect } from '@reach/router';
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Home from './pages/home';
import Explore from './pages/explore';
import RankingRedux from './pages/RankingRedux';
import Auction from './pages/Auction';
import Colection from './pages/colection';
import ItemDetailRedux from './pages/ItemDetailRedux';
import Author from './pages/Author';
import Wallet from './pages/wallet';
import Login from './pages/login';
import Register from './pages/register';
import Create2 from './pages/create2';
import Create3 from './pages/create3';
import Createoption from './pages/createOptions';
import Activity from './pages/activity';
import Minter from './pages/Minter';
import Mint1 from './pages/Mint/Mint1';
import Mint2 from './pages/Mint/Mint2';
import Mint3 from './pages/Mint/Mint3';
import {NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
  React.useEffect(() => window.scrollTo(0,0), [location])
  return children
}

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <div id='routerhang'>
        <div key={location.key}>
          <Router location={location}>
            {children}
          </Router>
        </div>
      </div>
    )}
  </Location>
);

const app= () => (
  <div className="wraper">
  <GlobalStyles />
    <Header/>
      <PosedRouter>
      <ScrollTop path="/">
        <Home exact path="/">
          <Redirect to="/home" />
        </Home>
        <Explore path="/explore" />
        <RankingRedux path="/rangking" />
        <Auction path="/Auction" />
        <Colection path="/colection/:collectionId" />
        <ItemDetailRedux path="/ItemDetail/:nftId" />
        <Author path="/Author/:authorId" />
        <Wallet path="/wallet" />
        <Login path="/login" />
        <Register path="/register" />
        <Create2 path="/create2" />
        <Create3 path="/create3" />
        <Createoption path="/createOptions" />
        <Activity path="/activity" />
        <Mint1 path="/mint1" />
        <Mint2 path="/mint2" />
        <Mint3 path="/mint3" />
        </ScrollTop>
      </PosedRouter>
    <ScrollToTopBtn />
    <NotificationContainer />
  </div>
);
export default app;