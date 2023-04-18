// npx hardhat run deploy/partners/templates/minterWithBroker/calls.ts

import * as zksync from "zksync-web3";
import * as ethers from "ethers";
require('dotenv').config();

const tldAddress = ""; // @todo: replace with your TLD address
const minterAddress = ""; // @todo: replace with your minter address

async function main() {
  const zkSyncProvider = new zksync.Provider("https://testnet.era.zksync.dev");

  const ethProvider = ethers.getDefaultProvider("goerli");

  const signer = new zksync.Wallet(String(process.env.DEPLOYER_PRIVATE_KEY), zkSyncProvider, ethProvider);

  console.log("Calling methods with the account:", signer.address);
  console.log("Account balance:", (await signer.getBalance()).toString());

  const tldInterface = new ethers.utils.Interface([
    "function minter() external view returns(address)",
    "function changeMinter(address _minter) external",
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
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });