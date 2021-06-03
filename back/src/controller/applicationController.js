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
let token =  {
    'X-API-Key': "fuLRmUuPD18kUJP2eHAfI9svgCltcHH897Kut6HR"
}
const algodServer = "https://testnet-algorand.api.purestake.io/ps2";
const indexerServer = "https://testnet-algorand.api.purestake.io/idx2";
const port = "";
const indexer = new algosdk.Indexer(token, indexerServer, port);
const client = new algosdk.Algodv2(token, algodServer, port);

_publics.getRawBody = (req) => {
    return new Promise((resolve, reject) => {
        getRawBody(req, {
            length: req.headers['content-length'],
            limit: '1mb',
        }, function(err, string) {
            if (err) return next(err)
            req.text = string;
            return resolve(req.text);
        })
    });
};


_publics.getGlobalStatus = async () => {

    let accountInfo = (await indexer.searchForApplications().index(16011410).do());
    let globalState = accountInfo.applications[0].params["global-state"]
    let finalGlobalState=[]
    globalState.forEach(element => {
        let state={key:atob(element.key),value:atob(element.value.bytes)}
        finalGlobalState.push(state)
    });
    console.log(JSON.stringify(finalGlobalState))
    return finalGlobalState
    

}

_publics.updateSSC = async (sender) =>{
    console.log(sender)
    let params = await client.getTransactionParams().do();
    let approvalProgram=new Uint8Array(Buffer.from("AiADAAQBJgMEbmFtZQZoYWxpbWEEc2FmYSIxGRJAAAgjMRkSQAAGACgpZyRDKCpnJEM=", "base64"));
    let index=16012502
    let clearProgram= new Uint8Array(Buffer.from("AiABASJD", "base64"));
    let txn = algosdk.makeApplicationUpdateTxn(sender, params, index, approvalProgram, clearProgram);
    console.log(JSON.stringify(txn))
    return txn
}
module.exports = _publics;