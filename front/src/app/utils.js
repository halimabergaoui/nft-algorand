const algosdk = require('algosdk');
module.exports = {
 token =  {
    'X-API-Key': "fuLRmUuPD18kUJP2eHAfI9svgCltcHH897Kut6HR"
},
 algodServer = "https://testnet-algorand.api.purestake.io/ps2",
 indexerServer = "https://testnet-algorand.api.purestake.io/idx2",
 port = "",
 indexer = new algosdk.Indexer(token, indexerServer, port),
 client = new algosdk.Algodv2(token, algodServer, port)
}
