import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';

const Header = () => {
  let buttons = ['Trade', 'Earn', 'Support', 'About'];

  const [activeButton, setActiveButton] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  function switchTab(id) {
    setActiveButton(id);
  }

  return (
    <>
      <header>
        <div className='logo'>
          <svg
            width='25'
            height='30'
            viewBox='0 0 25 30'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.6116 0L0 7.38636V15L7.8125 10.4545L17.7455 15.4545L25 10.4545V7.38636L12.6116 0Z'
              fill='url(#paint0_linear_13_174)'
            />
            <path
              d='M12.3884 30L25 22.6136V15L17.1875 19.5455L7.25447 14.5455L0 19.5455V22.6136L12.3884 30Z'
              fill='url(#paint1_linear_13_174)'
            />
            <defs>
              <linearGradient
                id='paint0_linear_13_174'
                x1='-24.1788'
                y1='-5.21591'
                x2='30.8438'
                y2='1.5871'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0.415734' stopColor='#3387D5' />
                <stop offset='1' stopColor='#7A06C9' />
              </linearGradient>
              <linearGradient
                id='paint1_linear_13_174'
                x1='49.1788'
                y1='35.2159'
                x2='-5.84382'
                y2='28.4129'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0.415734' stopColor='#3387D5' />
                <stop offset='1' stopColor='#7A06C9' />
              </linearGradient>
            </defs>
          </svg>
          <span>NeoFi</span>
        </div>
        <div className='tabs'>
          {buttons.map((button, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  switchTab(index);
                }}
                className={`${activeButton == index ? 'activeButton' : ''}`}
              >
                {button}
              </button>
            );
          })}
        </div>
        <button className='connectButton'>Connect Wallet</button>
        {isOpen ? (
          <ImCross
            size='20px'
            className='hamburger'
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        ) : (
          <GiHamburgerMenu
            size='24px'
            className='hamburger'
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        )}
      </header>
      <div className={`sidenav ${isOpen ? 'active' : ''}`}>
        <div className='tabs'>
          {buttons.map((button, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  switchTab(index);
                }}
                className={`${activeButton == index ? 'activeButton' : ''}`}
              >
                {button}
              </button>
            );
          })}
          <button className='connectButton'>Connect Wallet</button>
        </div>
      </div>
    </>
  );
};

export default Header;
