import React from 'react';
import { Link } from '@reach/router';

const footer = () => (
    <footer className="footer-light">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-6 col-xs-12">
                    <div className="widget">
                        CNFTGE`NIE.IO is a Cardano Non-Fungible Token marketplace. We are
                        based in Austin,TX, a new silicone valley. While we are not the
                        first market place based on the Cardano blockchain, we are the
                        best and can officially say that we are the first to offer both an
                        exchange and minting on the same platform. Additionally, we offer
                        an auction feature as another way to sell your NFTs. <br></br>If
                        you need any help, then please Contact Us, and we will be happy to
                        assist` you!
                    </div>
                </div>
                <div className="col-md-2 col-sm-6 col-xs-12">
                    <div className="widget">
                        <h5 className="text-white">MARKET PLACE</h5>
                        <ul>
                            <li><Link to="">All Art</Link></li>
                            <li><Link to="">Photo</Link></li>
                            <li><Link to="">Music</Link></li>
                            <li><Link to="">Video</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2 col-sm-6 col-xs-12">
                    <div className="widget">
                        <h5 className="text-white">MY ACCOUNT</h5>
                        <ul>
                            <li><Link to="">Profile</Link></li>
                            <li><Link to="">My Favourites</Link></li>
                            <li><Link to="">Log in or Sign up</Link></li>
                            <li><Link to="">Log out</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2 col-sm-6 col-xs-12">
                    <div className="widget">
                        <h5 className="text-white">RESOURCES</h5>
                        <ul>
                            <li><Link to="">Helps Support</Link></li>
                            <li><Link to="">Auctions</Link></li>
                            <li><Link to="">Royalty System</Link></li>
                            <li><Link to="">How to use Smart Contracts</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2 col-sm-6 col-xs-12">
                    <div className="widget">
                        <h5 className="text-white">MENU</h5>
                        <ul>
                            <li><Link to="">Buy</Link></li>
                            <li><Link to="">Sell</Link></li>
                            <li><Link to="">Auction</Link></li>
                            <li><Link to="">Mint</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="subfooter">
            <div className="container">
                <div className="row">
                    <div className="col-md-12" align="center">
                        2022 copyright CNFTGENIE, LLC, all rights reserved.
                    </div>
                </div>
            </div>
        </div>
    </footer>
);
export default footer;