//https://eth-ropsten.alchemyapi.io/v2/O29PiUya-hAIGUq7tFof4ifkpgfhUjJr

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks :{
    ropsten: {
       url:'https://eth-ropsten.alchemyapi.io/v2/O29PiUya-hAIGUq7tFof4ifkpgfhUjJr',
      accounts: ['81cb70594541139a7bd3ae8ade99bd3c603f88014f5f099b6ba7f8293e536111'],
    },
   
  },
};