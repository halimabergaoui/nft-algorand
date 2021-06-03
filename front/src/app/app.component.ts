import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StringifyOptions } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  accounts: any;
  connected: boolean;
  ledger: string;
  connectedAccount: string
  signedTx: any;
  lastmessage: string;
  txId: any;
  txn: any;
  globalStatus:any
  txnString: string;
  message:string


  constructor(private appService: AppService) {

  }

  connectAlgo = (ledger: string) => {
    // @ts-ignore
    AlgoSigner.connect()
      .then((d) => {
        // @ts-ignore
        AlgoSigner.accounts({
          ledger: ledger
        })
          .then((d) => {
            console.log(JSON.stringify(d))
            this.accounts = d;
            this.connected = true;
            this.ledger = ledger;
          })

      })
      .catch((e) => {
        console.log(JSON.stringify(e, null, 2));
      });

  }

  getGlobalStatus() {
    this.appService.getGlobalState().subscribe(
      res => {
        console.log(JSON.stringify(res))
        this.globalStatus=JSON.stringify(res)
      },
      err => {

      }
    )
  }
  updateGlobalStatus() {
    this.appService.updateGlobalState(this.connectedAccount).subscribe(
      res => {
        console.log(JSON.stringify(res))
        this.txn = res
        this.txnString=JSON.stringify(res)
      },
      err => {

      }
    )
  }
  signupdateTransaction() {
    // @ts-ignore 
    AlgoSigner.sign(this.txn)
      .then((signedTx) => {
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
          .catch(
            err => {
              console.log(JSON.stringify(err))
              this.message= JSON.stringify(err)
            })
      })
      .catch(err => {
        console.log(JSON.stringify(err))
        this.message= JSON.stringify(err)
      })

  }
  applicationTxn = () => {
    const nftRef = 'https://new-nft.com';
    //let appArgs = ['create', nftRef, '1234'].map(stringToBytes);
    // @ts-ignore
    AlgoSigner.algod({
      ledger: this.ledger,
      path: '/v2/transactions/params'
    })
      .then((d) => {
        let txParams = d;
        console.log(this.connectedAccount)
        // @ts-ignore 
        AlgoSigner.sign({
          type: 'appl',
          from: this.connectedAccount,
          appArgs: ['create', nftRef, '1234'],
          fee: txParams['min-fee'],
          firstRound: txParams['last-round'],
          lastRound: txParams['last-round'] + 1000,
          genesisID: txParams['genesis-id'],
          genesisHash: txParams['genesis-hash'],
          appIndex: 16012502,
          note: 'note',
          //appOnComplete: 4
        })
          .then((signedTx) => {
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
              .catch(
                err => {
                  console.log(JSON.stringify(err))
                  this.message= JSON.stringify(err)
                })

          })
          .catch(
            err => {
              console.log(JSON.stringify(err))
              this.message= JSON.stringify(err)
            })
      })
      .catch(
        err => {
          console.log(JSON.stringify(err))
          this.message= JSON.stringify(err)
        })
  }
}
