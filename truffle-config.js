require('chai/register-should');
require('dotenv').config();
const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = process.env.MAINNET_MNEMONIC;

module.exports = {

  plugins: ["truffle-security"],

  api_keys: {
    etherscan: process.env.ETHERSCAN_KEY
  },

  networks: {
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/' + process.env.INFURA_KEY),
      network_id: '3',
      gas: 4465030,
      gasPrice: 5000000000, // 5 gwei
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, 'https://kovan.infura.io/v3/' + process.env.INFURA_KEY),
      // provider: () => new LedgerWalletProvider({...ledgerOptions, networkId: 42}, 'https://kovan.infura.io/v3/' + process.env.INFURA_KEY),
      network_id: '42',
      gas: 3500000,
      gasPrice: 5000000000, // 5 gwei
      skipDryRun: true
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/" + process.env.INFURA_KEY),
      network_id: 4,
      gas: 3000000,
      gasPrice: 5000000000 // 5 gwei
    },
    // main ethereum network(mainnet)
    live: {
      provider: () => new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/" + process.env.INFURA_KEY),
      // provider: () => new LedgerWalletProvider({...ledgerOptions, networkId: 1}, 'https://mainnet.infura.io/v3/' + process.env.INFURA_KEY),
      network_id: 1,
      gas: 250000,
      gasPrice: 100 * 1e9, // 90 gwei
      skipDryRun: true
    },
    proxy: {
      provider: () => new HDWalletProvider(mnemonic, 'http://127.0.0.1:9545'),
      host: "127.0.0.1",
      port: 9545,
      network_id: "*",
      gasPrice: 0,
      skipDryRun: true
    },
    local: {
      // provider: () => new HDWalletProvider(mnemonic, 'http://127.0.0.1:8545'),
      // provider: () => new LedgerWalletProvider({...ledgerOptions, networkId: 1}, 'http://127.0.0.1:8545'),
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      skipDryRun: true,
      // gas: 300000,
      gasPrice: 0x01
    },
    test: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      gasPrice: 1000000000,
      gasPrice: 0x01      // <-- Use this low gas price
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8555,         // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01      // <-- Use this low gas price
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    useColors: true,
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1
        }
      }
    }
  }
}
