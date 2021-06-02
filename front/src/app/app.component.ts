import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StringifyOptions } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bacem';
  algosigned = "--";
  algoConnected = "--";
  connected = false;
  accounts = [];
  selectedAccount = "";
  paymentForm: FormGroup;
  createAssetForm: FormGroup;

  signedTx: any;
  ledger: string;
  lastmessage: string;
  txId: string;

  constructor(private formBuilder: FormBuilder) {
    this.paymentForm = this.formBuilder.group({
      from: new FormControl(""),
      to: new FormControl(""),
      amount: new FormControl(""),
    });

    this.createAssetForm = this.formBuilder.group({
      from: new FormControl(""),
      name: new FormControl(""),
      count: new FormControl(""),
    });

  }

  pay = () => {
    // @ts-ignore
    AlgoSigner.algod({
      ledger: this.ledger,
      path: '/v2/transactions/params'
    })
      .then((d) => {
        let txParams = d;
        // @ts-ignore
        AlgoSigner.sign({
          from: this.paymentForm.value.from,
          to: this.paymentForm.value.to,
          amount: +this.paymentForm.value.amount,
          note: "",
          type: 'pay',
          fee: txParams['min-fee'],
          firstRound: txParams['last-round'],
          lastRound: txParams['last-round'] + 1000,
          genesisID: txParams['genesis-id'],
          genesisHash: txParams['genesis-hash'],
          flatFee: true
        })
          .then((signedTx) => {
            this.lastmessage = "Transaction signed .. sending transaction";
            // @ts-ignore
            AlgoSigner.send({
              ledger: this.ledger,
              tx: signedTx.blob
            })
              .then((d) => {
                this.signedTx = d;
                this.lastmessage = " Transaction sent : " + JSON.stringify(d);
                this.txId = d.txId;
              })
              .catch((e) => {

                this.lastmessage = " Transaction Failed : " + JSON.stringify(e);
              });
          })
          .catch((e) => {
            this.lastmessage = " Transaction Failed : " + JSON.stringify(e);

          });
      })
      .catch((e) => {
        this.lastmessage = " Transaction Failed : " + JSON.stringify(e);

      });


  }

  createAsset = () => {
    // @ts-ignore
    AlgoSigner.algod({
      ledger: this.ledger,
      path: '/v2/transactions/params'
    })
      .then((d) => {
        let txParams = d;
        // @ts-ignore
        AlgoSigner.sign({

          from: this.createAssetForm.value.from,
          assetName: this.createAssetForm.value.name,
          assetUnitName: this.createAssetForm.value.name,
          assetTotal: +this.createAssetForm.value.count,
          assetDecimals: +0,
          note: "",
          type: 'acfg',
          fee: txParams['min-fee'],
          firstRound: txParams['last-round'],
          lastRound: txParams['last-round'] + 1000,
          genesisID: txParams['genesis-id'],
          genesisHash: txParams['genesis-hash'],
          flatFee: true
        })
          .then((signedTx) => {
            this.lastmessage = "Transaction signed .. sending transaction";
            // @ts-ignore
            AlgoSigner.send({
              ledger: this.ledger,
              tx: signedTx.blob
            })
              .then((d) => {
                this.signedTx = d;
                this.lastmessage = " Transaction sent : " + JSON.stringify(d);
                this.txId = d.txId;
              })
              .catch((e) => {

                this.lastmessage = " Transaction Failed : " + JSON.stringify(e);
              });
          })
          .catch((e) => {
            this.lastmessage = " Transaction Failed : " + JSON.stringify(e);

          });
      })
      .catch((e) => {
        this.lastmessage = " Transaction Failed : " + JSON.stringify(e);

      });


  }

  checkAlgo = () => {
    // @ts-ignore
    if (typeof AlgoSigner !== 'undefined') {
      this.algosigned = 'AlgoSigner is installed.';
    } else {
      this.algosigned = 'AlgoSigner is NOT installed.';
    }

  }

  selectAccount = (a) => {
    this.selectedAccount = a;
  }

  connectAlgo = (ledger: string) => {
    // @ts-ignore
    AlgoSigner.connect()
      .then((d) => {
        this.algoConnected = JSON.stringify(d, null, 2);
        // @ts-ignore
        AlgoSigner.accounts({
          ledger: ledger
        })
          .then((d) => {
            this.accounts = d;
            this.connected = true;
            this.ledger = ledger;
          })

      })
      .catch((e) => {
        this.algoConnected = JSON.stringify(e, null, 2);
      });

  }

  createNft =()=>
  {
    const nftRef = 'https://new-nft.com';
    //let appArgs = ['create', nftRef, '1234'].map(stringToBytes);
     // @ts-ignore
    AlgoSigner.algod({
      ledger: this.ledger,
      path: '/v2/transactions/params'
    })
      .then((d) => {
        let txParams = d;
       // txParams['min-fee']=1
       // @ts-ignore 
    AlgoSigner.sign({
    type: 'appl',
    from: this.paymentForm.value.from,
    appArgs: ['create', nftRef, '1234'],
    fee: txParams['min-fee'],
    firstRound: txParams['last-round'],
    lastRound: txParams['last-round'] + 1000,
    genesisID: txParams['genesis-id'],
    genesisHash: txParams['genesis-hash'],
    appIndex: 16007396,
    note:'note',
    flatFee: true,
   // accounts: [masterAccount.addr, john.addr],
    })
      .then((signedTx) => {
        console.log(JSON.stringify(signedTx))
      })
       .catch(
          err=>{
            console.log(JSON.stringify(err))
          })})
        .catch(
          err=>{
            console.log(JSON.stringify(err))
          })
  }

  transferNft =()=>
  {
    const nftRef = 'https://new-nft.com';
    //let appArgs = ['create', nftRef, '1234'].map(stringToBytes);
     // @ts-ignore
    AlgoSigner.algod({
      ledger: this.ledger,
      path: '/v2/transactions/params'
    })
      .then((d) => {
        let txParams = d;
       // txParams['min-fee']=1
       // @ts-ignore 
    AlgoSigner.sign({
    type: 'appl',
    from: "ROY4QWRX44K2EBJ7P7FB63TKTMXLBEPPL2BKPBHAVUBJCC4XH5H5DENFIE",
    appArgs: [ 'str:transfer', 1],
    fee: txParams['min-fee'],
    firstRound: txParams['last-round'],
    lastRound: txParams['last-round'] + 1000,
    genesisID: txParams['genesis-id'],
    genesisHash: txParams['genesis-hash'],
    appIndex: 16007396,
    note:'note',
    flatFee: true,
    accounts: ["ROY4QWRX44K2EBJ7P7FB63TKTMXLBEPPL2BKPBHAVUBJCC4XH5H5DENFIE", "5CYSZCZ63YKAOOWIEMC2JUUNPZZDTGFOOXH4BD6HRKKNOLXDCILOZHW3MI" ]
    })
      .then((signedTx) => {
        console.log(JSON.stringify(signedTx))
      })
       .catch(
          err=>{
            console.log(JSON.stringify(err))
          })})
        .catch(
          err=>{
            console.log(JSON.stringify(err))
          })
  }

  /*enableAsset(to: any, amount:number) {
    return new Promise((resolve, reject)=>{
    let lastmessage=''
    // @ts-ignore
    AlgoSigner.algod({
      ledger: this.ledger,
      path: '/v2/transactions/params'
    })
      .then((d) => {
        let txParams = d;
        // @ts-ignore
        AlgoSigner.sign({
          from: this.paymentForm.value.from,
          to: this.paymentForm.value.from,
          assetIndex: 1,
          note: 'send asset',
          amount: 0,
          type: 'axfer',
          fee: txParams['min-fee'],
          firstRound: txParams['last-round'],
          lastRound: txParams['last-round'] + 1000,
          genesisID: txParams['genesis-id'],
          genesisHash: txParams['genesis-hash'],
          flatFee: true
        })
          .then((signedTx) => {
            lastmessage = "Transaction signed .. sending transaction";
            // @ts-ignore
            AlgoSigner.send({
              ledger: this.ledger,
              tx: signedTx.blob
            })
              .then((d) => {
                //this.signedTx = d;
                lastmessage = " Transaction sent : " + JSON.stringify(d);
                return resolve(lastmessage)
                //this.txId = d.txId;
              })
              .catch((e) => {

                lastmessage = " Transaction Failed : " + JSON.stringify(e);
                return reject(lastmessage)
              });
          })
          .catch((e) => {
            lastmessage = " Transaction Failed : " + JSON.stringify(e);
            return reject(lastmessage)

          });
      })
      .catch((e) => {
        lastmessage = " Transaction Failed : " + JSON.stringify(e);
        return reject(lastmessage)

      }); 
    });
  }*/
}
