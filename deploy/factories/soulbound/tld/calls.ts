// npx hardhat run deploy/factories/soulbound/tld/calls.ts

import * as zksync from "zksync-web3";
import * as ethers from "ethers";
require('dotenv').config();

const factoryAddress = "0xc3496554F548656367009E3a6dCCB416539dc831"; // @todo: replace with your address
const forbiddenAddress = "0x80014cC4e645Bc0193dcE0EeCAe7Ef449c66D702"; // @todo: replace with your address
const resolverAddress = "0x1667d9d508FE4F73f3004f431A27F2C225215C3C"; // @todo: replace with your address
const tldAddress = "0xD15316d5D6Ce29Db5d1bE3191398F7F2C5e31CAA"; // @todo: replace with your address
const minterAddress = "0xd013787d60fc5966b512EdEAb91085aEA5e287f0"; // @todo: replace with your address

// New TLD params
const name = ".testzksoul"; // @todo: replace with your TLD name
const symbol = ".TESTZKSOUL"; // @todo: replace with your TLD symbol
const tldOwner = "0xb29050965A5AC70ab487aa47546cdCBc97dAE45D"; // @todo: replace with your address
const domainPrice = 0; // 0 ETH
const buyingEnabled = false;

async function main() {
  const zkSyncProvider = new zksync.Provider("https://testnet.era.zksync.dev");

  const ethProvider = ethers.getDefaultProvider("goerli");

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

  const tldContract = new ethers.Contract(tldAddress, tldInterface, signer);

  // ADD FACTORY ADDRESS TO FORBIDDEN TLD CONTRACT
  //await forbiddenContract.addFactoryAddress(factoryAddress);

  // ADD FACTORY ADDRESS TO RESOLVER CONTRACT
  //await resolverContract.addFactoryAddress(factoryAddress);

  // FACTORY CONTRACT: OWNER CREATE TLD
  //const newTldAddress = await factoryContract.ownerCreateTld(name, symbol, tldOwner, domainPrice, buyingEnabled);
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