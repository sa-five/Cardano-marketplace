import React from 'react';
import { Link } from '@reach/router';
import styled from "styled-components";

const ImageContainer = styled.div`
  .introduction-balloon-right {
    position: absolute;
    z-index: -1;
    top: 67%;
    right: -2%;
  }
  .introduction-balloon-left {
    position: absolute;
    z-index: -1;
    top: 62%;
    left: 0%;
  }
`;

const Outer = styled.div`
    margin-top: 100px;
    background-color: #14205a;
    border: 2px solid #5cd1a9;
    border-radius: 50px;
    padding-left: 15%;
    padding-top: 100px;
    padding-bottom: 100px;
    padding-right: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
    h1 {
        text-align: left;
        font-size: 60px;
        font-weight: bold;
        @media screen and (max-width: 1399px) {
            font-size: 50px;
        }
        @media screen and (max-width: 1199px) {
            font-size: 40px;
        }
        @media screen and (max-width: 991px) {
            text-align: center;
            font-size: 30px;
        }
    }
    span {
        float: left;
        @media screen and (max-width: 991px) {
            float: none;
            margin-bottom: 30px;
        }
    }
    img {
        width: 100%;
    }
`;

const ColumnFooter = () => (
    <>
        <ImageContainer>
            <img
                className="introduction-balloon-left"
                src='img/balloon-left-1.png'
                alt="balloon"
            ></img>
            <img
                className="introduction-balloon-right"
                src="img/balloon-right-1.png"
                alt=""
            ></img>
        </ImageContainer>
        <Outer>
            <div className='row'>
                <div className='col-lg-6 col-md-12 col-sm-12'>
                    <h1 className="text-white">CREATE, BUY, OR SELL NFTS ON CNFT GENIE</h1>
                    <div>
                        <span onClick={() => window.open("/#", "_self")} className="btn-main lead">Discover More</span>
                        <span onClick={() => window.open("/#", "_self")} className="btn-main lead">Collect NFT</span>
                    </div>
                </div>
                <div className='col-lg-6 col-md-12 col-sm-12'>
                    <img src="img/ada.png" alt="ada"></img>
                </div>
            </div>
        </Outer>
    </>

);
export default ColumnFooter;