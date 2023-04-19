// npx hardhat run deploy/partners/zksoul/calls.ts

import * as zksync from "zksync-web3";
import * as ethers from "ethers";
require('dotenv').config();

const tldAddress = "0xD15316d5D6Ce29Db5d1bE3191398F7F2C5e31CAA"; // @todo: replace with your TLD address
const minterAddress = "0xd013787d60fc5966b512EdEAb91085aEA5e287f0"; // @todo: replace with your minter address
const metadataAddress = "0x51548b4CC8864Bd020D5Dd3E374410Df4e7fDcfE"; // @todo: replace with your metadata address

async function main() {
  const zkSyncProvider = new zksync.Provider("https://testnet.era.zksync.dev");

  const ethProvider = ethers.getDefaultProvider("goerli");

  const signer = new zksync.Wallet(String(process.env.DEPLOYER_PRIVATE_KEY), zkSyncProvider, ethProvider);

  console.log("Calling methods with the account:", signer.address);
  console.log("Account balance:", (await signer.getBalance()).toString());

  const tldInterface = new ethers.utils.Interface([
    "function minter() external view returns(address)",
    "function changeMinter(address _minter) external",
    "function changeMetadataAddress(address _metadataAddress) external",
    "function transferOwnership(address newOwner) external"
  ]);

  const tldContract = new ethers.Contract(tldAddress, tldInterface, signer);

  // CHANGE MINTER

  /*
  const minterBefore = await tldContract.minter();
  console.log("Minter before: " + minterBefore);

  await tldContract.changeMinter(minterAddress);

  const minterAfter = await tldContract.minter();
  console.log("Minter after: " + minterAfter);
  */

  // CHANGE METADATA ADDRESS
  //await tldContract.changeMetadataAddress(metadataAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });