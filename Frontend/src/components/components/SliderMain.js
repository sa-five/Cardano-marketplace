import React from 'react';
import Reveal from 'react-awesome-reveal';
import styled from 'styled-components';
import { keyframes } from "@emotion/react";

const ImageContainer = styled.div`
  .introduction-balloon-left {
    position: absolute;
    z-index: -1;
    top: 72%;
    left: 0%;
  }
  .introduction-price-pane-stripe-up {
    position: absolute;
    z-index: -1;
    top: 10%;
    right: 35%;
  }
  .introduction-price-pane-stripe-down {
    position: absolute;
    z-index: -1;
    top: 68%;
    right: 28%;
  }
  .introduction-balloon-right {
    position: absolute;
    z-index: -1;
    top: 20%;
    right: -2%;
  }
`;

const HeaderText = styled.h1`
  font-size: 5rem;
  @media only screen and (max-width: 1199px) {
    font-size: 2.5rem;
  }
`;

const HeaderPanel = styled.div`
  position: absolute;
  top: 17%;
  left: 38%;
  color: white;
  .panel-title {
    margin-bottom: 15px;
    h3 {
      margin-bottom: 0px;
    }
    span {
      background: rgba(0,0,0,0.2);
      border-radius: 30px;
      padding: 6px 10px;
    }
    @media screen and (max-width: 1399px) {
      margin-bottom: 0px;
    }
    @media screen and (max-width: 1199px) {
    }
    @media screen and (max-width: 991px) {
      margin-bottom: 0px;
      span {
        display: none;
      }
    }
    @media screen and (max-width: 768px) {
      margin-bottom: 0px;
    }
  }
  h3 {
    font-size: 30px;
    &.price-text{
      margin-bottom: 25px;
    }
    &.change-text{
      margin-bottom: 58px;
    }
    @media screen and (max-width: 1399px) {
      font-size: 28px;
      &.price-text{
        margin-bottom: 15px;
      } 
      &.change-text{
        margin-bottom: 40px;
      }
    }
    @media screen and (max-width: 1199px) {
      font-size: 23px;
      &.price-text{
        margin-bottom: 4px;
      }
      &.change-text{
        margin-bottom: 18px;
      }
    }
    @media screen and (max-width: 991px) {
      font-size: 15px;
    }
    @media screen and (max-width: 768px) {
      font-size: 30px;
      &.price-text{
        margin-bottom: 67px;
      }
      &.change-text{
        margin-bottom: 70px;
      }
    }
    @media screen and (max-width: 576px) {
      font-size: 18px;
      &.price-text{
        margin-bottom: 26px;
      }
      &.change-text{
        margin-bottom: 40px;
      }
    }
  }
  span {
    font-size: 18;
    @media screen and (max-width: 1399px) {
      font-size: 17px;
    }
    @media screen and (max-width: 1199px) {
      font-size: 15px;
    }
    @media screen and (max-width: 991px) {
      font-size: 12px;
    }
    @media screen and (max-width: 768px) {
      font-size: 17px;
    }
    @media screen and (max-width: 576px) {
      font-size: 13px;
    }
  }
  
`;

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slidermain= () => (
 <div className="container">
   <ImageContainer>
      <img
        className="introduction-balloon-left"
        src='img/balloon-left-1.png'
        alt="balloon"
      ></img>
      <img
        className="introduction-price-pane-stripe-up xs-hide"
        src="img/price_pane_stripe.png"
        alt=""
      ></img>
      <img
        className="introduction-balloon-right"
        src="img/balloon-right-1.png"
        alt=""
      ></img>
      <img
        className="introduction-price-pane-stripe-down xs-hide"
        src="img/price_pane_stripe.png"
        alt=""
      ></img>
   </ImageContainer>
    <div className="row align-items-center">
          <div className="col-md-8 col-sm-12">
              <div className="spacer-single"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
              <h6 className=""><span className="text-uppercase text-white" style={{backgroundColor: '#2c5f80', padding:'3px 10px'}}>CNFT GENIE</span></h6>
              </Reveal>
              <div className="spacer-10"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={600} triggerOnce>
              <HeaderText className="header-text text-white">NFT<br/>MARKETPLACE</HeaderText>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
              <p className=" lead">
              The Cardano Non-Fungible Token exchange with Smart Contract and Minting
              </p>
              </Reveal>
              <div className="spacer-10"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={800} duration={900} triggerOnce>
                <div>
                  <span onClick={()=> window.open("/#", "_self")} className="btn-main lead">Browse</span>
                  <span onClick={()=> window.open("/#", "_self")} className="btn-main lead">Create</span>
                </div>
              <div className="mb-sm-30"></div>
              </Reveal>
          </div>
          <div className="col-md-4 col-sm-12" style={{position: 'relative'}}>
            <Reveal className='onStep' keyframes={fadeIn} delay={900} duration={1500} triggerOnce>
              <img src="./img/price_pane_background-01.png" className="lazy img-fluid" alt=""/>
              <HeaderPanel>
                <div className="row panel-title">
                  <div className='col-md-6'>
                    <h3 className="text-white">CARDANO</h3>
                  </div>
                  <div className='col-md-6 xs-hide' align="right" style={{lineHeight: '36px'}}>
                    <span className='xs-hide'>ADA</span>
                  </div>
                </div>
                <span>Price</span>
                <h3 className='text-white price-text'>$1.54</h3>
                <span>24 HR % CHANGE</span>
                <h3 className='text-white change-text'>-1.21%</h3>
                <span>MARKET CAPITAL</span>
                <h3 className='text-white'>$49.47B</h3>
              </HeaderPanel>
            </Reveal>
          </div>
      </div>
    </div>
);
export default slidermain;