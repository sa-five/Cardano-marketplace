import React, { useState } from "react";

import { navigate } from "@reach/router";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createGlobalStyle } from 'styled-components';
import ColumnFooter from '../../components/ColumnFooter';
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
      margin: 0px auto;
      margin-bottom: 55px;
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
    .panel-header {     
        padding-left:1.0rem;   
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
    section {
        padding-top: 10rem;
        padding-bottom: 1rem;
    }
    .form-container {
        // opacity: 0.2;
        // color: rgba(0,0,0,1);
        // // transform-origin: 0px 0px
        // border: solid 1px #ddd;
        border-radius: 1.5rem;
        height: 755;
    }
    .select_panel {
		background: rgba(0,0,0,0.1);
        border-radius: 20px;
        padding-bottom: 30px;
        .upload_panel {
            padding: 10px 10px;
            margin: 110px;
            border: 2px dashed rgba(255,255,255,0.45);
            border-radius: 1rem;
            margin-bottom: 50px;
            height: 18rem;
            @media screen and (max-width: 768px) {
                font-size: 1rem;
                margin: 30px;
                margin-bottom: 10px;
            }
            @media screen and (max-width: 1024px) {
                font-size: 1rem;
                margin: 30px;
                margin-bottom: 15px;
            }
            @media screen and (max-width: 1280px) {
                font-size: 1rem;
                margin: 70px;
                margin-bottom: 30px;
            }
            #uploading_icon{
                display : inherit;
                width : 100%;
                height : 100%;
                objectFit : contain;
                vertical-align : middle;
                margin-top: 1.8rem;
                @media screen and (max-width: 992px) {
                    width: 9rem;
                    height: 9rem;
                    margin: 3.1rem 0.5rem;
                }
            }
        }
        .preview_panel {
            padding: 10px 10px;
            margin: 110px;
            border: 2px dashed rgba(255,255,255,0.45);
            border-radius: 1rem;
            margin-bottom: 50px;
            height: 18rem;
            background : rgba(255,255,255,0.3);
            @media screen and (max-width: 768px) {
                font-size: 1rem;
                margin: 30px;
                margin-bottom: 10px;
            }
            @media screen and (max-width: 1024px) {
                font-size: 1rem;
                margin: 30px;
                margin-bottom: 15px;
            }
            @media screen and (max-width: 1280px) {
                font-size: 1rem;
                margin: 70px;
                margin-bottom: 30px;
            }
            #image_icon_for_preview{
                display : inherit;
                width : 90%;
                height : 90%;
                objectFit : contain;
                vertical-align : middle;
                margin : 1rem;
                margin-top: 1.8rem;
                @media screen and (min-width: 1196px) {
                    width: 80%;
                    height:80%;
                    margin: 0.5rem 1rem 2rem 2rem;
                }
                @media screen and (max-width: 992px) {
                    width: 9rem;
                    height: 9rem;
                    margin: 3rem 0.5rem;
                }
            }
        }
    }
    .mr-0 {
        margin-right: 0 !important;
    }
    .CreateButton {
        color: rgba(69,230,189,1);
        overflow: visible;
        width: 190px;
        height: 30px;
        margin-left: auto;
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
            document.getElementById("preview_panel").style.background =  "transparent";
            document.getElementById("get_file_2").src = URL.createObjectURL(files[0]);            
            document.getElementById("get_file_2").style.display = "inherit";
            document.getElementById("get_file_2").style.width = "100%";
            document.getElementById("get_file_2").style.height = "100%";
            document.getElementById("get_file_2").style.objectFit = "contain";
            setFilesArr(filesArray);
            sessionStorage.setItem("filesArr", filesArray);
            setSeletedFile(files[0]);
            sessionStorage.setItem("selected_file", files[0]);
            //this.setState({ files: [...this.state.files, ...filesArr], selected_file: files[0] });
        }
        else{            
            if(selected_file === null) document.getElementById("preview_panel").style.background =  "rgba(255,255,255,0.3)";
        }
    }

    return (
        <>
            <GlobalStyles />
            <div className="home-container">
                <div className="home-background"></div>
                <section className='container'>
                    <div className="col-lg-12 mb-2 panel-header">                        
                        <h2>Upload file for minting</h2>
                        <div className=''>
                            <span>The minting process on CNFT GENIE is simple and the NFT (s) may be sold on the marketplace using smart contracts, making the money exchange for NFT(s) occur automatically and  simultaneously.</span>
                        </div>             
                    </div>
                    <Container className="form-container">                     
                        
                        <div className="row">
                 
                            <div className="col-lg-12" style={{paddingTop : '1rem'}}>
                                <div className="select_panel">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <div className="upload_panel" align="center">
                                                <div  className='browse' style={{ fontSize: "10rem", color: "white" }} align="center">
                                                    <img id='uploading_icon' src="./img/Upload_icon.PNG" alt=""></img>
                                                </div>
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
                                        <div className="col-md-6 col-sm-12">
                                            <div className="preview_panel" id="preview_panel" align="center" >
                                                    <div style={{ fontSize: "10rem", color: "white" }}>
                                                        <img id="image_icon_for_preview" src="./img/Image_icon.png" alt=""></img>                                                        
                                                    </div>
                                                    <img id="get_file_2"  alt="image preview" style={{display: "none" }}></img>
                                            </div>
                                            <div className="text-white" style={{fontSize: '20px', padding: '5px',  margin: '0px auto'}} align="center" >Preview</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12" align='center'>                                            
                               {!isUploading && <button className="btn-main mr-0 mt-3" style={{width: '11rem', background: 'rgba(69,230,189,1)'}} onClick={() => onNextButton()}>Next</button>}
                               {isUploading && <button className="btn-main mr-0 mt-3" style={{ width: '11rem', background: 'rgba(69,230,189,1)'}} >Processing...</button>}
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
        </>
    );
};

export default Mint1;
