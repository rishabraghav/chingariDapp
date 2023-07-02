require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "sepolia",
  networks: {
    hardhat:{},
    sepolia: {
      url: `https://sepolia.infura.io/v3/952c7c012fb2403a886390401335f343`,
      chainId: 11155111,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
  },
};
