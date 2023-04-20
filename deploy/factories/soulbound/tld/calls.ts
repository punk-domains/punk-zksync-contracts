// npx hardhat run deploy/factories/soulbound/tld/calls.ts

import * as zksync from "zksync-web3";
import * as ethers from "ethers";
require('dotenv').config();

const factoryAddress = "0xd97c219096FFf79B902ba96E697D59cDF68F2ae1"; // @todo: replace with your address
const forbiddenAddress = "0xbE6B3B0668d40FA042E2209462ED660AAf5874c7"; // @todo: replace with your address
const resolverAddress = "0x57e53D8d2e0f5779efe6d0817DFfCF3dbd47E58f"; // @todo: replace with your address
const tldAddress = "0xe36507aD67Ac0aE6D27D22b407A9338b136315df"; // @todo: replace with your address
const minterAddress = ""; // @todo: replace with your address

// New TLD params
const name = ".zksoul"; // @todo: replace with your TLD name
const symbol = ".ZKSOUL"; // @todo: replace with your TLD symbol
const tldOwner = "0xb29050965A5AC70ab487aa47546cdCBc97dAE45D"; // @todo: replace with your address
const domainPrice = 0; // 0 ETH
const buyingEnabled = false;

async function main() {
  const zkSyncProvider = new zksync.Provider("https://mainnet.era.zksync.io");

  const ethProvider = ethers.getDefaultProvider("mainnet");

  const signer = new zksync.Wallet(String(process.env.DEPLOYER_PRIVATE_KEY), zkSyncProvider, ethProvider);

  console.log("Calling methods with the account:", signer.address);
  console.log("Account balance:", (await signer.getBalance()).toString());

  // factory
  const factoryInterface = new ethers.utils.Interface([
    "function transferOwnership(address newOwner) external",
    "function ownerCreateTld(string memory _name, string memory _symbol, address _tldOwner, uint256 _domainPrice, bool _buyingEnabled) external returns(address)"
  ]);

  const factoryContract = new ethers.Contract(factoryAddress, factoryInterface, signer);

  // ForbiddenTlds
  const forbiddenInterface = new ethers.utils.Interface([
    "function addFactoryAddress(address) external",
    "function transferOwnership(address) external"
  ]);

  const forbiddenContract = new ethers.Contract(forbiddenAddress, forbiddenInterface, signer);

  // Resolver
  const resolverInterface = new ethers.utils.Interface([
    "function addFactoryAddress(address) external",
    "function getTldAddress(string memory _tldName) public view returns(address)",
    "function transferOwnership(address) external"
  ]);

  const resolverContract = new ethers.Contract(resolverAddress, resolverInterface, signer);

  // TLD
  const tldInterface = new ethers.utils.Interface([
    "function minter() external view returns(address)",
    "function changeMinter(address _minter) external",
    "function transferOwnership(address newOwner) external"
  ]);

  //const tldContract = new ethers.Contract(tldAddress, tldInterface, signer);

  // ADD FACTORY ADDRESS TO FORBIDDEN TLD CONTRACT
  //await forbiddenContract.addFactoryAddress(factoryAddress);

  // ADD FACTORY ADDRESS TO RESOLVER CONTRACT
  //await resolverContract.addFactoryAddress(factoryAddress);

  // FACTORY CONTRACT: OWNER CREATE TLD
  //const newTldAddressTx = await factoryContract.ownerCreateTld(name, symbol, tldOwner, domainPrice, buyingEnabled);
  //const newTldAddress = await newTldAddressTx.wait();
  //console.log("New TLD address: ", newTldAddress);

  // RESOLVER: GET TLD ADDRESS
  //const tldAddr = await resolverContract.getTldAddress(name);
  //console.log("TLD address from Resolver: ", tldAddr);

  // CHANGE MINTER ADDRESS IN TLD CONTRACT

  //const minterBefore = await tldContract.minter();
  //console.log("Minter before: " + minterBefore);

  //await tldContract.changeMinter(minterAddress);

  //const minterAfter = await tldContract.minter();
  //console.log("Minter after: " + minterAfter);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });