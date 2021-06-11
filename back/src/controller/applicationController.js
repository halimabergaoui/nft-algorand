'use strict';

//const router = require('express').Router();
const _publics = {};
var config = require('../../config');
var getRawBody = require('raw-body');
const algosdk = require('algosdk');
var con = config.con;
global.atob = require("atob");
var url = `http://localhost:3002`;
//var url = `/`;
var pool = config.pool;
//const router = require('../router/router');
let token = {
    'X-API-Key': "your key"
}
const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
const indexerServer = "https://testnet-algorand.api.purestake.io/idx2";
const port = "";
const indexer = new algosdk.Indexer(token, indexerServer, port);
const client = new algosdk.Algodv2(token, algodServer, port);
const pass = "your pass"

_publics.getRawBody = (req) => {
    return new Promise((resolve, reject) => {
        getRawBody(req, {
            length: req.headers['content-length'],
            limit: '1mb',
        }, function (err, string) {
            if (err) return next(err)
            req.text = string;
            return resolve(req.text);
        })
    });
};


_publics.getGlobalStatus = async () => {

    let accountInfo = (await indexer.searchForApplications().index(16037988).do());
    let globalState = accountInfo.applications[0].params["global-state"]
    let finalGlobalState = []
    globalState.forEach(element => {
        let state = { key: atob(element.key), value: atob(element.value.bytes) }
        finalGlobalState.push(state)
    });
    console.log(JSON.stringify(JSON.stringify(accountInfo)))
    return finalGlobalState


}

_publics.updateSSC = async (sender) => {
    console.log(sender)
    let params = await client.getTransactionParams().do();
    let approvalProgram = new Uint8Array(Buffer.from("AiADAAQBJgMEbmFtZQZoYWxpbWEEc2FmYSIxGRJAAAgjMRkSQAAGACgpZyRDKCpnJEM=", "base64"));
    //16012502
    //16037025
    let index = 16039214
    let appArgs = [];
    appArgs.push(new Uint8Array(Buffer.from("sana")));
    let clearProgram = new Uint8Array(Buffer.from("AiABASJD", "base64"));
    let txn = algosdk.makeApplicationUpdateTxn(sender, params, index, approvalProgram, clearProgram, appArgs);
    console.log(JSON.stringify(params))
    let myAccount = algosdk.mnemonicToSecretKey("your pass")
    let signedTxn = txn.signTxn(myAccount.sk);
    let txId = txn.txID().toString();
    console.log("Signed transaction with txID: %s", txId);
    await client.sendRawTransaction(signedTxn).do();
    return txn
}
_publics.sendTransaction = async (tnx) => {
    let signedTxn = new Uint8Array(Buffer.from(tnx.blob));
    console.log(JSON.stringify(signedTxn))
    await client.sendRawTransaction(signedTxn).do();
    return "ok"
}

_publics.applicationCall = async (input) => {
    console.log(JSON.stringify(input))
    let params = await client.getTransactionParams().do();
    //16012502
    //16037025
    let index = input.index
    let appArgs = [];
    input.args.forEach(el => appArgs.push(new Uint8Array(Buffer.from(el))))
    //appArgs.push(new Uint8Array(Buffer.from("create")));
    //appArgs.push(new Uint8Array(Buffer.from("123456")));
    /*appArgs.push(new Uint8Array(Buffer.from("1000")));
    appArgs.push(new Uint8Array(Buffer.from("05/07/2017")));
    appArgs.push(new Uint8Array(Buffer.from("0")));*/
    let txn = algosdk.makeApplicationNoOpTxn(input.sender, params, index, appArgs);
    console.log(JSON.stringify(params))
    let myAccount = algosdk.mnemonicToSecretKey(pass)
    let signedTxn = txn.signTxn(myAccount.sk);
    let txId = txn.txID().toString();
    console.log("Signed transaction with txID: %s", txId);
    await client.sendRawTransaction(signedTxn).do().catch(err => console.log(JSON.stringify(err)));

    return txn
}
_publics.applicationOptIn = async (input) => {
    let params = await client.getTransactionParams().do();
    let txn = algosdk.makeApplicationOptInTxn(input.sender, params, input.index);
    let myAccount = algosdk.mnemonicToSecretKey(pass)
    let signedTxn = txn.signTxn(myAccount.sk);
    let txId = txn.txID().toString();
    await client.sendRawTransaction(signedTxn).do().catch(err => console.log(JSON.stringify(err)));
    console.log("optin ok : "+input.sender)
    return txn
}


_publics.applicationCheckCall = async (input) => {
    console.log(JSON.stringify(input))
    let params = await client.getTransactionParams().do();
    let index = input.index
    let appArgs = [];
    let myAccount = algosdk.mnemonicToSecretKey(pass)
    input.args.forEach(el => appArgs.push(new Uint8Array(Buffer.from(el))))
    console.log(myAccount.addr)
    let note = new Uint8Array(Buffer.from("note"))
    let txn2 = algosdk.makeAssetTransferTxnWithSuggestedParams(myAccount.addr, "ROY4QWRX44K2EBJ7P7FB63TKTMXLBEPPL2BKPBHAVUBJCC4XH5H5DENFIE"
        ,undefined,"DFCEOWY3J2BHFU2XQV5UQZFQTIUSBJHZJQ7YXUK4EGIPQIHHHRO2GBDMXE", 1, note, 16059445, params);
    let txn3 = algosdk.makePaymentTxnWithSuggestedParams(myAccount.addr, "DFCEOWY3J2BHFU2XQV5UQZFQTIUSBJHZJQ7YXUK4EGIPQIHHHRO2GBDMXE"
    ,200000, note, params);

    console.log(note)
    let txn1 = algosdk.makeApplicationNoOpTxn(input.sender, params, index, appArgs);
    let txns = [txn1, txn2, txn3]
    let txgroup = algosdk.assignGroupID(txns);
    console.log(JSON.stringify(params)) 
    let signedTx1 = txn1.signTxn(myAccount.sk);
    console.log("tx1"+JSON.stringify(signedTx1))
    let signedTx2 = txn2.signTxn(myAccount.sk);
    let signedTx3 = algosdk.signLogicSigTransaction(txn, input.lsig);
    let signed = []
    signed.push(signedTx1)
    signed.push(signedTx2)
    signed.push(signedTx3.blob)

    console.log("Signed transaction with txID: %s", JSON.stringify(signed));
    await client.sendRawTransaction(signed).do().catch(err => console.log(JSON.stringify(err)));

    return txns
}

_publics.getAlgorandBalance = (publickey) => {
    return new Promise(async (resolve, reject) => {
      let accountInfo = (await client.accountInformation(publickey).do());
      console.log(JSON.stringify(accountInfo))
      return resolve(accountInfo)
    });
  }


  _publics.delegateSignature = (publickey) => {
    return new Promise(async (resolve, reject) => {
 
    let recoveredAccount = algosdk.mnemonicToSecretKey(pass)

    // Get the relevant params from algod 
    // for suggested parameters
    let params = await algodclient.getTransactionParams().do();
    let endRound = params.lastRound + parseInt(1000);
    
    // These are the base64 dump of the
    // compile simple.teal program
    // Used command line $ cat simple.teal.tok | base64
    let program = new Uint8Array(Buffer.from("ASYBCjExMjMxMjMxMzIxBSgS", "base64"));
    // makeLogicSig method takes the program and parameters
    // in this example we have no parameters
    let lsig = algosdk.makeLogicSig(program);
    // sign the logic with your accounts secret
    // key. This is essentially giving your
    // key authority to anyone with the lsig
    // and if the logic returns true
    // exercise extreme care
    // If this were a contract account usage
    // you would not do this sign operation
    lsig.sign(recoveredAccount.sk);
    // At this point you can save the lsig off and share
    // as your delegated signature.
    // The LogicSig class supports serialization and
    // provides the lsig.toByte and fromByte methods
    // to easily convert for file saving and 
    // reconstituting and LogicSig object
    // Create a transaction
    let txn = {
        "from": recoveredAccount.addr,
        "to": "ES5VWJMEWHHBKPDEBLCOSOPJUI72WSMDTO2MILAHUVCFGJAE6TPYWJWRJQ",
        "amount": 9,
        "note": new Uint8Array(Buffer.from("11231231321111","ascii")),
        "firstRound": params.lastRound,
        "lastRound": endRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesishashb64,
        ...params
    };
    // Create logic signed transaction.
    // Had this been a contract account the lsig would not contain the
    // signature but would be submitted the same way
    let rawSignedTxn = algosdk.signLogicSigTransaction(txn, lsig);
    // Save the signed transaction file for debugging purposes
    // Use with goal clerk dryrun -t simple.stxn to 
    // see how the logic is processed
    // Comment out if you do not plan on using dryrun
    fs.writeFileSync("simple.stxn", rawSignedTxn.blob);
    // Submit the lsig signed transaction
    let tx = (await algodclient.sendRawTransaction(rawSignedTxn.blob)).do();
    console.log("Transaction : " + JSON.stringify(tx));
})
}
module.exports = _publics;