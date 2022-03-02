import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Clock from "./Clock";
import { carouselNew } from './constants';
import * as selectors from '../../store/selectors';
import { fetchNftsBreakdown } from "../../store/actions/thunks";
import api from "../../core/api";

const Outer = styled.div`
  position: absolute;
  width: 100%; /* The size you want */
  top: 0;
  &:after {
    content: "";
    display: block;
    padding-bottom: 100%; /* The padding depends on the width, not on the height, so with a padding-bottom of 100% you will get a square */
  }
  img {
    position: absolute; /* Take your picture out of the flow */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; /* Make the picture taking the size of it's parent */
    width: 100%; /* This if for the object-fit */
    height: 100%; /* This if for the object-fit */
    object-fit: cover; /* Equivalent of the background-size: cover; of a background-image */
    object-position: center;
  }
`;

const CarouselNewRedux = () => {

    const dispatch = useDispatch();
    const nftsState = useSelector(selectors.nftBreakdownState);
    const nfts = nftsState.data ? nftsState.data : [];

    const [height, setHeight] = useState(0);

    const onImgLoad = ({target:img}) => {
        let currentHeight = height;
        console.log(img.offsetHeight);
        if(currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }
    
    useEffect(() => {
        dispatch(fetchNftsBreakdown());
    }, [dispatch]);

    return (
        <div className='nft'>
          <Slider {...carouselNew}>
          {nfts && nfts.map( (nft, index) => (
            <div className='itm' index={index + 1} key={index}>
              <div className="d-item">
                <div className="nft__item">
                    { false && nft.deadline &&
                        <div className="de_countdown">
                            <Clock deadline={nft.deadline} />
                        </div>
                    }
                    <div className="nft__item_wrap" style={{height: `${height}px`}}>
                      <Outer>
                        <span>
                            {/* <img src={api.baseUrl + nft.preview_image.url} className="lazy nft__item_preview" onLoad={onImgLoad} alt=""/> */}
                            <img src='./img/carousel/crs-1.jpg' className="lazy nft__item_preview" onLoad={onImgLoad} alt=""/>

                        </span>
                      </Outer>
                    </div>
                    <div className="nft__item_info">
                      <div className="row">
                        <div className="col-md-7">
                          <span onClick={()=> window.open("/#", "_self")}>
                              <h4 className="text-white">{nft.title}</h4>
                          </span>
                        </div>
                        <div className="col-md-5" style={{paddingLeft: 0}}>
                          <div className="nft__item_price">
                              {nft.price} <span className="token_name">ADA</span>
                          </div>
                        </div>
                      </div>
                        <div className="nft__item_action">
                            <div className="nft__bid_heart" style={{backgroundImage:"url('/img/heart.png')"}}>{nft.bid}+</div>
                            <span onClick={()=> window.open(nft.bid_link, "_self")}>People Placed Bid</span>
                        </div>
                        <div className="nft__item_like">
                            <span onClick={()=> window.open(nft.bid_link, "_self")}></span>
                        </div>
                    </div> 
                </div>
              </div>
            </div>
          ))}
          </Slider>
        </div>
    );
}

export default memo(CarouselNewRedux);
