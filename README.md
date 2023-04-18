# Punk Domains smart contracts for zkSync Era

The main repo for smart contract development is this one: https://github.com/punk-domains/punk-contracts 

The zksync repo is only for deployments on zkSync Era which requires special libraries.

Create a `.env` file and enter `DEPLOYER_PRIVATE_KEY` in it.

### Compile

You need to compile contracts before deployment:

```bash
npx hardhat compile
```

### Deploy

Make sure to specify both the script path and the network:

```bash
npx hardhat deploy-zksync --script deploy/deploy.ts --network zkSyncTestnet

npx hardhat deploy-zksync --script deploy/deploySomeScript.ts --network zkSyncTestnet
```

### Verify

Follow the instructions at the end of the deployment script.