import React, { Component } from "react";
import styled from "styled-components";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

const ImageContainer = styled.div`
  .introduction-balloon-right {
    position: absolute;
    z-index: -1;
    top: 23%;
    right: -2%;
  }
  .token_gallery_background {
    position: absolute;
    z-index: -1;
    top: 35%;
    left: 0%;
    opacity: 0.4;
  }
`;

export default class Responsive extends Component {
    dummyData = [{
        title: 'CREATOR',
        img: './img/royalty/card1.png'
    },
    {
        title: 'YOU GET PAID',
        img: './img/royalty/card2.png'
    },
    {
        title: 'BUY SELLS',
        img: './img/royalty/card3.png'
    },
    {
        title: 'YOU GET PAID',
        img: './img/royalty/card4.png'
    },
    {
        title: 'NEW BUYER SELLS',
        img: './img/royalty/card5.png'
    },
    {
        title: 'YOU GET PAID',
        img: './img/royalty/card6.png'
    },
    {
        title: 'NEW BUYER SELLS',
        img: './img/royalty/card7.png'
    },
    {
        title: 'YOU GET PAID',
        img: './img/royalty/card8.png'
    }]

    constructor(props) {
        super(props);
        this.state = {
            cards: this.dummyData.slice(0, 8),
            height: 0
        };
        this.onImgLoad = this.onImgLoad.bind(this);
    }

    loadMore = () => {
        let nftState = this.state.cards
        let start = nftState.length
        let end = nftState.length + 4
        this.setState({
            cards: [...nftState, ...(this.dummyData.slice(start, end))]
        });
    }

    onImgLoad({ target: img }) {
        let currentHeight = this.state.height;
        if (currentHeight < img.offsetHeight) {
            this.setState({
                height: img.offsetHeight
            })
        }
    }

    render() {
        return (
            <>
                <ImageContainer>
                    <img
                        className="introduction-balloon-right"
                        src="img/balloon-right-1.png"
                        alt=""
                    ></img>
                    <img
                        className="token_gallery_background"
                        src="img/token_gallery_background.png"
                        alt=""
                    ></img>
                </ImageContainer>
                <div className='row'>
                    {this.state.cards.map((card, index) => (
                        <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
                            <div className="card__item m-0">
                                <div className="card__item_wrap" style={{ height: `${this.state.height}px` }}>
                                    <Outer>
                                        <span>
                                            <img onLoad={this.onImgLoad} src={card.img} className="lazy nft__item_preview" alt="" />
                                        </span>
                                    </Outer>
                                </div>
                                <div className="card__item_info">
                                    <h4 className="text-white">{card.title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }
}