import React from 'react';
import logo from '../../images/logo.png';

const Footer = () => {
  return (
      <div className="w-full md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
        <div className="w-full flex sm:flex-row justify-between items-center my-4">
          <div className="flex flex-[0.5] justify-center items-center">
            <img src={logo} alt="logo" />
          </div>
          <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
            <p className='text-white text-base text-center mx-2'>Market</p>
            <p className='text-white text-base text-center mx-2'>Exchanges</p>
            <p className='text-white text-base text-center mx-2'>Tutorial</p>
            <p className='text-white text-base text-center mx-2'>Wallets</p>

          </div>
        </div>
        <div className="flex justify-center items-center flex-col mt-5">
          <p className='text-white text-sm text-center'>Come join us</p>
          <p className='text-white text-sm text-center'>info@krypt.com</p>

        </div>

        <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 mx-10" />


        <div className="sm:w-[90%] w-full flex justify-between items-center mx-10 mt-3">
          <p className="text-white text-left text-xs">@kryptomastery2022</p>
          <p className="text-white text-right text-xs">All rights reserved</p>
        </div>
      </div>
  );
};

export default Footer;
