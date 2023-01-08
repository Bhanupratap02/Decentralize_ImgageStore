require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "ganache",
  networks:{
    // hardhat:{
    //   chainId:1337
    // },
    ganache:{
      url: "HTTP://127.0.0.1:7545",
      // accounts: ['55ea68049cd22f96895ec4f644a770bbbb354af6dd50076e8c13bc6a35a5ade1']
    }
  },
  paths:{
    artifacts:"./client/src/artifacts"
  }

};
