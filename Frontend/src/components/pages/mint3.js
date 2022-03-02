import React, { useState } from "react";

import { navigate } from "@reach/router";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createGlobalStyle } from 'styled-components';
import Footer from '../../components/footer';
import Modal from 'react-modal';
import { NotificationManager } from "react-notifications";
import ColumnFooter from '../../components/ColumnFooter';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgb(66,146,145)',
        border: 'solid 1px #ddd',
        borderRadius: '1.5rem',
        padding: '40px',
    }
};

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
        background: rgba(0,0,0, 0.2);
        border: solid 1px #ddd;
        border-radius: 1.5rem;
        padding: 40px;
        @media screen and (max-width: 768px) {
            padding: 20px;
        }
    }
    .panel-header {     
        padding-left:0.5rem;   
        h2{            
            color: #fff;
        }
        span {
            color: #fff !important;
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
        background: rgba(255, 255, 255, 0.3);
        padding-bottom: 1.5rem;
        margin-bottom: 1rem !important;
        color: #00ff00 !important;
    }
    .form-control::placeholder { /* Most modern browsers support this now. */
        color:    #FFFFFF;
     }
    .form_label, .form-check-label {
        color: white;
    }
    .form-check-label{
        margin-bottom: 1rem;
    }
    .mr-0 {
        margin-right: 0 !important;
    }
`;

const Mint2 = () => 
{
    const [propertiesCheck, setPropertiesCheck] = useState(false);
    const [item_properties, setItemProperties] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [collectionCheck, setCollectionCheck] = useState(false);

    var params = {};

    const onInputChange = (e) => {
        params = { ...params, [e.target.name]: e.target.value }
        console.log("params = ", params);
    }

    const onNextButton = () => 
    {
        let name = document.getElementById("item_name").value;
        if (name === null || name === "") {
            NotificationManager.warning("Name is invalid.");
            return;
        }
        if (propertiesCheck && item_properties.length === 0) {
            NotificationManager.warning("Properties are invalid.");
            return;
        }
        let collection = "";
        if(document.getElementById("collection_name") !== null)
        {
            collection = document.getElementById("collection_name").value;
            if (collectionCheck && (collection === "" || collection === null )) {
                NotificationManager.warning("Collection name is invalid.");
                return;
            }
        }
        sessionStorage.setItem("item_name", name);
        sessionStorage.setItem("item_description", params.item_description);
        sessionStorage.setItem("item_creator", params.item_creator);
        sessionStorage.setItem("item_collection", params.item_collection);
        sessionStorage.setItem("item_link", params.item_link);
        sessionStorage.setItem("item_royalty", params.item_royalty);
        sessionStorage.setItem("item_collection", collection);

        navigate("/mint3");
    }

    const onCollectionOptionSelect = () =>
    {
        setCollectionCheck(!collectionCheck);
    }

    const onOptionSelect = () => {
        setPropertiesCheck(!propertiesCheck);
    }

    const onAddProButton = () => {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    const closeModal = (flag) => {
        if (flag === true) {
            let name = params.prop_name;
            let description = params.prop_description;
            console.log("name = " + name + " desc = " + description);
            if (name !== "" && name !== undefined && description !== "" && description !== undefined) {
                let tempProperty = item_properties;
                tempProperty = [...tempProperty, { name, description }]
                console.log("tempProperty = ", tempProperty);
                setItemProperties(tempProperty);
            }
            setIsOpen(false);
        }
        else {
            setIsOpen(false);
        }
    }

    console.log("item_properties = ", item_properties);

    return (
        <>
            <GlobalStyles />
            <div className="home-container" >
                <div className="home-background"></div>
                <section className='container'>
                    <div className="col-lg-12 mb-2 panel-header">
                        <h2>Add metadata</h2>
                        <span className="text-black">
                            Royalty fees may be set up to 15%; However, the lower your royalty fee, the better chance that your NFT(s) will sell, Royalty fees in excess of 10% are not recommended.
                        </span>
                    </div>
                    <Container className="form-container" >
                        <div className="row">
                            <div className="col-lg-12" style={{paddingTop : '1rem'}}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <input type="text" name="item_name" id="item_name" className="form-control mb-2"
                                            placeholder="Name your item" onChange={(e) => onInputChange(e)} />
                                        <textarea data-autoresize name="item_description" id="item_desc" className="form-control mb-2"
                                            placeholder="Description(optional)" onChange={(e) => onInputChange(e)} ></textarea>
                                        <input type="text" name="item_creator" id="item_price" className="form-control mb-2"
                                            placeholder="Creator(optional)" onChange={(e) => onInputChange(e)} />
                                        <div className="form-check form-label">
                                            <input type="checkbox" className="form-check-input" id="collection_name_check" name="collection_name_check"
                                                checked={collectionCheck}
                                                onChange={() => onCollectionOptionSelect()}
                                            />
                                            <label className="form-check-label" htmlFor="collection_name_check">Add to collection</label>
                                        </div>
                                        {
                                            collectionCheck && 
                                            <input type="text" name="collection_name" id="collection_name" className="form-control mb-2"
                                                placeholder="Collection name" onChange={(e) => onInputChange(e)} />
                                        }
                                        <div className="form-check form-label">
                                            <input type="checkbox" className="form-check-input" id="item_name_check" name="item_name_check"
                                                checked={propertiesCheck}
                                                onChange={() => onOptionSelect()}
                                            />
                                            <label className="form-check-label" htmlFor="item_name_check">Properties</label>
                                        </div>
                                        {
                                            propertiesCheck &&
                                            <>
                                                <table className="form-control" style={{ }}>
                                                    <tr>
                                                        <th style={{ paddingRight: "50px", borderBottom: "1px #ffff00 solid"}}>Name</th>
                                                        <th style={{ borderBottom: "1px #ffff00 solid"}}>Description</th>
                                                    </tr>
                                                    {
                                                        item_properties &&
                                                        item_properties.map((prope, index) =>
                                                            <tr key={index}>
                                                                <td style={{ paddingRight: "20px" }}>{prope.name}</td>
                                                                <td>{prope.description}</td>
                                                            </tr>
                                                        )
                                                    }
                                                </table>
                                                <button className="btn-main mr-0 mt-3" style={{ width: '12rem', marginTop: '0rem !important', marginBottom: "1rem" }} onClick={() => onAddProButton()}>Add property</button>
                                            </>
                                        }
                                        <input type="text" name="item_link" id="item_price" className="form-control mb-2"
                                            placeholder="Web link(optional)" onChange={(e) => onInputChange(e)} />
                                        <div className="form_label" align="left" >Set your royalties</div>
                                        <div align="left">
                                            <span className="form_label">0%&nbsp;</span>
                                            <input type="range" id="royalty_range" name="item_royalty" max="15" min="0" onChange={(e) => onInputChange(e)} />
                                            <span className="form_label">&nbsp;15%</span></div>
                                        <div className="form_label" align="left" >You can set up 15% royalty and get paid every time your nft sells.</div>
                                        <div className="form_label" align="left" >* We collect a 2.55 royalty fee each tome your NFT sells, click <a href="/mint2">here</a> for more information</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12" align='left'>
                                <button className="btn-main mr-0 mt-3" style={{ width: '12rem' }} onClick={() => onNextButton()}>Next</button>
                            </div>
                        </div>
                    </Container>
                </section>

                <section className='container'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <ColumnFooter />
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>

            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    parentSelector={() => document.querySelector('.form-container')}
                    ariaHieApp={true}
                    appElement={document.querySelector('.form-container')}
                >
                    <div
                        style={{
                            color: "#fff",
                            fontSize: "25px",
                            paddingBottom: "25px"
                        }}
                    >New property</div>
                    <div align="center">
                        <div className="form_label" align="left" >Name</div>
                        <input type="text" name="prop_name" id="prop_name" className="form-control mb-2"
                            placeholder="e.g Color" onChange={(e) => onInputChange(e)} />
                        <div className="form_label" align="left" >Description</div>
                        <input type="text" name="prop_description" id="prop_description" className="form-control mb-2"
                            placeholder="e.g Blue" onChange={(e) => onInputChange(e)} />
            
                        <button className="btn-main mb-1" onClick={() => closeModal(true)}>Apply</button>
                        <button className="btn-main mb-1" onClick={() => closeModal(false)}>Cancel</button>
                        
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default Mint2;
