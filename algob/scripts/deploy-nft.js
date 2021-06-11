/**
 * Description:
 * This file deploys the stateful smart contract to create and transfer NFT
*/
const { types } = require('@algo-builder/runtime');
const {printGlobalNFT, printLocalNFT , executeTransaction } = require('./transfer/common');
const  runTransfer  = require('./transfer/create-transfer-nft')
const { stringToBytes } = require('@algo-builder/algob');
async function run (runtimeEnv, deployer) {

  
  const masterAccount = deployer.accountsByName.get('master-account');
  const john = deployer.accountsByName.get('john');

  /*const algoTxnParams = {
    type: types.TransactionType.TransferAlgo,
    sign: types.SignType.SecretKey,
    fromAccount: masterAccount,
    toAccountAddr: john.addr,
    amountMicroAlgos: 401000000, // 401 algos
    payFlags: { note: 'funding account' }
  };

  await executeTransaction(deployer, algoTxnParams); // fund john*/
  const escrowAccount = await deployer.loadLogic('escrow.teal', {});
  console.log('Escrow Account Address:', escrowAccount.address());

  /*console.log("here")
  await deployer.deploySSC('nft_approval.teal', 'nft_clear_state.teal', {
    sender: masterAccount,
    localInts: 5,
    globalInts: 2,
    globalBytes: 10,
    localBytes: 10,

  }, {});


  const sscInfo = await deployer.getSSC('nft_approval.teal', 'nft_clear_state.teal');
  const appId = sscInfo.appID;
  console.log(sscInfo);*/

 /* try {
    await deployer.optInAccountToSSC(masterAccount, appId, {}, {}); // opt-in to asc by master
    await deployer.optInAccountToSSC(john, appId, {}, {}); // opt-in to asc by john
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }*/

/*  await printGlobalNFT(deployer, masterAccount.addr, appId); // Global Count before creation

  const nftRef = 'https://new-nft.com';

  // arguments: "create", nft_data_ref, data_hash
  let appArgs = ['create', nftRef, '1234'].map(stringToBytes);

  let txnParam = {
    type: types.TransactionType.CallNoOpSSC,
    sign: types.SignType.SecretKey,
    fromAccount: masterAccount,
    appId: appId,
    payFlags: {},
    appArgs
  };
  await executeTransaction(deployer, txnParam); // creates new nft (with id = 1)

  // print Global Count after creation
  await printGlobalNFT(deployer, masterAccount.addr, appId);

  // *** Transfer NFT from master to john ***

  await printLocalNFT(deployer, masterAccount.addr, appId);
  await printLocalNFT(deployer, john.addr, appId);*/

 /* const nftID = new Uint8Array(8).fill(1, 7); // [0, 0, 0, 0, 0, 0, 0, 1] = uint64(1)
  appArgs = [
    'str:transfer', // appArgs similar to goal are also supported
    nftID
  ];

  // transfer nft from master to john
  // account_A = master, account_B = john
  txnParam = {
    type: types.TransactionType.CallNoOpSSC,
    sign: types.SignType.SecretKey,
    fromAccount: masterAccount,
    appId: appId,
    payFlags: {},
    accounts: [masterAccount.addr, john.addr],
    appArgs
  };
  await executeTransaction(deployer, txnParam);

  await printLocalNFT(deployer, masterAccount.addr, appId);
  await printLocalNFT(deployer, john.addr, appId);*/
}

module.exports = { default: run };
