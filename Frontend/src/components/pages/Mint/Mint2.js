import React, { useState } from "react";

import { navigate } from "@reach/router";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createGlobalStyle } from 'styled-components';
import Footer from '../../components/footer';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

const GlobalStyles = createGlobalStyle`
    .home-container {
        position: relative;
    }
    .home-background {
        position: absolute;
        z-index: -2;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgb(74, 159, 146);
        background: linear-gradient( 180deg, #2536a0 0%, #163872 10%, #57b59a 45%, #163872 90%, #2536a0 100% );
    }
    section {
        padding-top: 10rem;
        padding-bottom: 1rem;
        @media screen and (max-width: 768px) {
            padding-top: 5rem;
        }
    }
    .form-container {
        background: rgb(66,146,145);
        border: solid 1px #ddd;
        border-radius: 1.5rem;
        padding: 40px;
        @media screen and (max-width: 768px) {
            padding: 20px;
        }
    }
    .panel-header {
        span {
            font-size: 1.2rem;
            @media screen and (max-width: 768px) {
                font-size: 1rem;
            }
        }
    }
    .select_panel {
        background: rgba(141,189,188,0.7);
        border-radius: 20px;
        padding: 35px 40px;
        @media screen and (max-width: 768px) {
            padding: 20px;
        }
    }
    #royalty_range {
        width: 25%;
        @media screen and (max-width: 768px) {
            width: 70%;
        }
    }
    .form-control {
        background: white;
    }
    .form_label {
        color: black;
    }
    .mr-0 {
        margin-right: 0 !important;
    }
`;

const Mint2 = () => {

    var params = {};

    const onInputChange = (e) =>
    {
        params = {...params,  [e.target.name]: e.target.value  }
    }

    const onNextButton = () => 
    {
        sessionStorage.setItem("item_name", params.item_name);
        sessionStorage.setItem("item_description", params.item_description);
        sessionStorage.setItem("item_creator", params.item_creator);
        sessionStorage.setItem("item_collection", params.item_collection);
        sessionStorage.setItem("item_link", params.item_link);
        sessionStorage.setItem("item_royalty", params.item_royalty);

        navigate("/mint3");
    }

    return (
        <>
            <GlobalStyles />
            <div className="home-container">
                <div className="home-background"></div>
                <section className='container'>
                    <Container className="form-container">
                        <div className="row">
                            <div className="col-lg-12 mb-2 panel-header">
                                <h2>Add metadata</h2>
                                <span className="text-black">
                                    Royalty fees may be set up to 15%; However, the lower your royalty fee, the better chance that your NFT(s) will sell, Royalty fees in excess of 10% are not recommended.
                                </span>
                            </div>
                            <div className="col-lg-12">
                                <div className="select_panel">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form_label" align="left" >Name</div>
                                            <input type="text" name="item_name" id="item_price" className="form-control mb-2"
                                                placeholder="Name your item" onChange={(e) => onInputChange(e)} />
                                            <div className="form_label" align="left" >Description</div>
                                            <textarea data-autoresize name="item_description" id="item_desc" className="form-control mb-2"
                                                placeholder="Description"  onChange={(e) => onInputChange(e)} ></textarea>
                                            <div className="form_label" align="left" >Creator(optional)</div>
                                            <input type="text" name="item_creator" id="item_price" className="form-control mb-2"
                                                placeholder="Creator"  onChange={(e) => onInputChange(e)}/>
                                            <div className="form_label" align="left" >Add to collection</div>
                                            <input type="text" name="item_collection" id="item_price" className="form-control mb-2"
                                                placeholder="Collection name"  onChange={(e) => onInputChange(e)}/>
                                            <div className="form_label" align="left" >Web link</div>
                                            <input type="text" name="item_link" id="item_price" className="form-control mb-2"
                                                placeholder="Web link" onChange={(e) => onInputChange(e)} />
                                            <div className="form_label" align="left" >Set your royalties</div>
                                            <div align="left">
                                                <span className="form_label">0%&nbsp;</span>
                                                <input type="range" id="royalty_range" name="item_royalty" max="15" min="0" onChange={(e) => onInputChange(e)}/>
                                                <span className="form_label">&nbsp;15%</span></div>
                                            <div className="form_label" align="left" >You can set up 15% royalty and get paid every time your nft sells.</div>
                                            <div className="form_label" align="left" >* We collect a 2.55 royalty fee each tome your NFT sells, click <a href="/mint2">here</a> for more information</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12" align='right'>
                                <button className="btn-main mr-0 mt-3" style={{ width: '12rem' }} onClick={() => onNextButton()}>Next</button>
                            </div>
                        </div>
                    </Container>
                </section>
                <Footer />
            </div>
        </>
    );
};

export default Mint2;
