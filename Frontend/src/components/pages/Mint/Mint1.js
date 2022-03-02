import React, { useState } from "react";

import { navigate } from "@reach/router";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createGlobalStyle } from 'styled-components';
import Footer from '../../components/footer';
import {NotificationManager} from "react-notifications";
import { create } from 'ipfs-http-client';
import api from "../../../core/api";


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
    .browse{
      position: relative;
      width: max-content;
      height: auto;
      margin: 0 auto;
      cursor: pointer;
      #upload_file{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
      &:hover{
        .btn-main{
          box-shadow: 2px 2px 20px 0px rgba(131, 100, 226, 0.5);
          transition: all 0.3s ease;
        }
      }
    }
    section {
        padding-top: 10rem;
        padding-bottom: 1rem;
    }
    .form-container {
        background: rgb(66,146,145);
        border: solid 1px #ddd;
        border-radius: 1.5rem;
        padding: 40px;
    }
    .select_panel {
        background: rgba(141,189,188,0.7);
        border-radius: 20px;
        .upload_panel {
            padding: 20px 10px;
            margin: 30px;
            border: 2px dashed grey;
            border-radius: 1rem;
        }
        .preview_panel {
            padding: 20px 10px;
            margin: 30px;
            border: 2px dashed grey;
            border-radius: 1rem;
        }
    }
    .mr-0 {
        margin-right: 0 !important;
    }
`;

const Mint1 = () => {


    const [filesArr, setFilesArr] = useState([]);
    const [selected_file, setSeletedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const onNextButton = async () => 
    {
        if(selected_file !== null)
        {
            setIsUploading(true);
            try{
                NotificationManager.info("Uploading now. Wait a moment.");

                const client = create('https://ipfs.infura.io:5001/api/v0');
                const image_hash = await client.add(selected_file);
                sessionStorage.setItem("selected_file", image_hash.cid.toString());
                console.log("api.ipfsUrl + image_hash.cid.toString()", api.ipfsUrl + image_hash.cid.toString());

                NotificationManager.info("Uploading succeed.");
                navigate("/mint2");

            }catch(error){
                NotificationManager.error("Uploading failed."+error);
            }            
            setIsUploading(false);
        }
        else{
            NotificationManager.warning("Select a picture and try again.");
        }
    }

    const onChangeSlectedFile = (e) => 
    {
        var files = e.target.files;
        if (files.length > 0) 
        {
            var filesArray = Array.prototype.slice.call(files);
            document.getElementById("image_icon_for_preview").style.display = "none";
            document.getElementById("get_file_2").style.display = "block";
            document.getElementById("get_file_2").style.width = "90%";
            document.getElementById("get_file_2").src = URL.createObjectURL(files[0]);
            setFilesArr(filesArray);
            sessionStorage.setItem("filesArr", filesArray);
            setSeletedFile(files[0]);
            sessionStorage.setItem("selected_file", files[0]);
            //this.setState({ files: [...this.state.files, ...filesArr], selected_file: files[0] });
        }
    }

    return (
        <>
            <GlobalStyles />
            <div className="home-container">
                <div className="home-background"></div>
                <section className='container'>
                    <Container className="form-container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2>Upload file for minting</h2>
                                <span className="text-black" style={{fontSize: '1.2rem'}}>
                                    The minting process on CNFT GENIE is simple and the NFT(s) may be sold on the
                                    marketplace using smart contracts, making the money exchange for NFT(s) occur
                                    automatically and simultaneously.
                                </span>
                            </div>
                            {/* <div className="col-lg-12" align='right'>
                                <button className="btn-main mr-0 mb-3" style={{width: '12rem'}}>Connect Wallet</button>
                            </div> */}
                            <div className="col-lg-12" style={{paddingTop : '1.2rem'}}>
                                <div className="select_panel">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="upload_panel">
                                                <div style={{ fontSize: "10rem", color: "black" }} align="center">
                                                    <i className="fa fa-cloud-upload"></i>
                                                </div>
                                                {
                                                    isUploading === false &&
                                                    <div className='browse'>
                                                        <input type="button" id="get_file" className="btn-main mr-0" value="&nbsp;&nbsp;Select file&nbsp;&nbsp;" />
                                                        <input id='upload_file' accept="image/*, video/*" type="file" onChange={(e) => onChangeSlectedFile(e)} />
                                                    </div>
                                                }
                                                {                                                    
                                                    isUploading === true &&
                                                    <div className='browse'>
                                                        <input type="button" id="get_file" className="btn-main mr-0" value="&nbsp;&nbsp;Select file&nbsp;&nbsp;" />
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <div className="preview_panel" align="center">
                                                
                                                   
                                                    <div style={{ fontSize: "10rem", color: "black" }}>
                                                        <i id="image_icon_for_preview" className="fa fa-image"></i>                                                        
                                                    </div>
                                                    <img id="get_file_2"  alt="image preview" style={{display: "none" }}></img>
                                                
                                                <div className="text-white" style={{fontSize: '20px', padding: '5px'}}>Preview</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12" align='right'>                                            
                               {!isUploading && <button className="btn-main mr-0 mt-3" style={{width: '12rem'}} onClick={() => onNextButton()}>Next</button>}
                               {isUploading && <button className="btn-main mr-0 mt-3" style={{ width: '12rem' }} >Processing...</button>}
                            </div>
                        </div>
                    </Container>
                </section>
                <Footer />
            </div>
        </>
    );
};

export default Mint1;
