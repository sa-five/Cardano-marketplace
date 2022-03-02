import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { header } from 'react-bootstrap';
import { Link } from '@reach/router';
import useOnclickOutside from "react-cool-onclickoutside";
import {NotificationManager} from "react-notifications";
import Modal from 'react-modal';

import NamiWalletApi, { Cardano } from '../../nami-js/nami';
import blockfrostApiKey from '../../config'; 
let nami;

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

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link 
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);

const Header= function() {

  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

    const [openMenu, setOpenMenu] = React.useState(false);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const [openMenu2, setOpenMenu2] = React.useState(false);
    const [openMenu3, setOpenMenu3] = React.useState(false);
    const handleBtnClick = () => {
      setOpenMenu(!openMenu);
    };
    const handleBtnClick1 = () => {
      setOpenMenu1(!openMenu1);
    };
    const handleBtnClick2 = () => {
      setOpenMenu2(!openMenu2);
    };
    const handleBtnClick3 = () => {
      setOpenMenu3(!openMenu3);
    };
    const closeMenu = () => {
      setOpenMenu(false);
    };
    const closeMenu1 = () => {
      setOpenMenu1(false);
    };
    const closeMenu2 = () => {
      setOpenMenu2(false);
    };
    const closeMenu3 = () => {
      setOpenMenu3(false);
    };
    const ref = useOnclickOutside(() => {
      closeMenu();
    });
    const ref1 = useOnclickOutside(() => {
      closeMenu1();
    });
    const ref2 = useOnclickOutside(() => {
      closeMenu2();
    });
    const ref3 = useOnclickOutside(() => {
      closeMenu3();
    });

    const [showmenu, btn_icon] = useState(false);
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    const closeModal = (flag) =>
    {
      setIsOpen(false);
      if(flag === 1)
      {
        window.open("chrome-extension://kmhcihpebfmpgmihbkipmjlmmioameka/www/index.html#/app/mainnet/welcome");
      }
    }
  

    useEffect(() => {
        async function t() {

            const S = await Cardano();
            nami = new NamiWalletApi(
                S,
                window.cardano,
               blockfrostApiKey
            )

            if (await nami.isInstalled()) 
            {
                await nami.isEnabled().then(result => { 
                  setConnected(result);
                  sessionStorage.setItem("connected", true);
                  
               }).catch(err =>{                 
                sessionStorage.setItem("connected", false);
               })
            }else{
              sessionStorage.setItem("connected", false);      
              NotificationManager.warning("Please install the Nami wallet extension.");  
            }
        }

        t()
    }, [])
   
    const connect = async () => 
    {
      // Connects nami wallet to current website        
      if(connect === false)
      {
        await nami.enable()
        .then(result => {
          setConnected(result);
          sessionStorage.setItem("connected", true);
          console.log("Connecting succeed.");
          NotificationManager.success("Connecting succeed.");
        })
        .catch(e => {
          console.log("Connecting failed. "+e.message);      
          sessionStorage.setItem("connected", false);      
          NotificationManager.error("Connecting failed. ");
        })
      }
    }

    useEffect(() => {
      const header = document.getElementById("myHeader");
      const totop = document.getElementById("scroll-to-top");
      const sticky = header.offsetTop;
      const scrollCallBack = window.addEventListener("scroll", () => 
      {
        btn_icon(false);
        if (window.pageYOffset > sticky) 
        {
          header.classList.add("sticky");
          totop.classList.add("show");          
        } 
        else 
        {
          header.classList.remove("sticky");
          totop.classList.remove("show");
        } if (window.pageYOffset > sticky) {
          closeMenu();
        }
      });
      return () => {
        window.removeEventListener("scroll", scrollCallBack);
      };
    }, []);
    
    return (
    <header id="myHeader" className='navbar'>
     <div className='container'>
       <div className='row w-100-nav'>
          <div className='logo px-0'>
              <div className='navbar-title navbar-item'>
                <NavLink to="/">
                  <img
                    src="./img/logo.png"
                    className="img-fluid d-block"
                    alt="#"
                    width='80'
                  />
                  <h2 className="text-white">CNFT GENIE</h2>
                </NavLink>
              </div>
          </div>

          <div className='search'>
            <input id="quick_search" className="xs-hide" name="quick_search" placeholder="search item here..." type="text" />
          </div>
                    
              <BreakpointProvider>
                <Breakpoint l down>
                  {showmenu && 
                  <div className='menu'>
                    <div className='navbar-item'>
                      <NavLink to="/" onClick={() => btn_icon(!showmenu)}>
                        Home
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/" onClick={() => btn_icon(!showmenu)}>
                        Buy
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/" onClick={() => btn_icon(!showmenu)}>
                        Sell
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/" onClick={() => btn_icon(!showmenu)}>
                        Auction
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/mint1" onClick={() => btn_icon(!showmenu)}>
                        Mint
                      </NavLink>
                    </div>
                  </div>
                  }
                </Breakpoint>

                <Breakpoint xl>
                  <div className='menu'>
                    <div className='navbar-item'>
                      <NavLink to="/">
                      Home
                      <span className='lines'></span>
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/">
                      Buy
                      <span className='lines'></span>
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/">
                      Sell
                      <span className='lines'></span>
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/">
                      Auction
                      <span className='lines'></span>
                      </NavLink>
                    </div>
                    <div className='navbar-item'>
                      <NavLink to="/mint1">
                      Mint
                      <span className='lines'></span>
                      </NavLink>
                    </div>
                  </div>
                </Breakpoint>
              </BreakpointProvider>

              <div className='mainside'>
                <button className="btn-main" onClick={() => openModal()}>
                  {
                    connected ? 'Connected':'Connect Wallet'
                  }
                  </button>
              </div>
              <div>
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                  closeTimeoutMS={5000}
                >                  
                  <div
                    style={{
                      color: "#fff",
                      fontSize : "25px",
                      paddingBottom: "25px"
                    }}
                  >Please select a wallet.</div>
                  <form align="center">
                    <button className="modal_wallet_button" id="metamask_button" 
                      style={{
                        background: 'rgba(141,189,188,0.7)',
                        borderRadius: '20px',
                        width: '200px',
                        height: '200px',
                        color: "white",
                        fontSize:"20px"
                      }}
                      onClick={() => {connect(); closeModal(0)}}>
                        <img src="./img/nami.PNG" alt="" width="80%" height="80%"></img>
                        Nami
                    </button>
                    <button className="modal_wallet_button" id="ccvault_button" 
                      style={{
                        marginLeft:"20px",
                        background: 'rgba(141,189,188,0.7)',
                        borderRadius: '20px',
                        width: '200px',
                        height: '200px',
                        color:"white",
                        fontSize:"20px"
                      }}
                      onClick={() => closeModal(1) }>
                      <img src="./img/ccvault.PNG" alt="" width="80%" height="80%"></img>
                        CCVault.io
                    </button>
                  </form>
                </Modal>
              </div>
      </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>

      </div>     
    </header>
    );
}

export default Header;
