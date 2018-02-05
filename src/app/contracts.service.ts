import { Injectable } from '@angular/core';

import * as Web3 from 'web3';

declare let require: any;
declare let window: any;


const tokenAbi = require('./tokenContract.json');



@Injectable()
export class ContractsService {
  private _account: string = null;
  public _web3: any;
  private gas: string;
  public interactionEvent;

  private _tokenContract: any;
  private _tokenContractAddress = '0xc57ea13932a1744ae86d8020ae4fc64bb6ac91ea';
  private contractInfo = tokenAbi;

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      // Use mist/metamask provider
      this._web3 = new Web3(window.web3.currentProvider);

      /*
      if (this._web3.version.network !== "4") {
        alert('Please connect to Rinkeby');
        console.log(this._web3);
      }
      */
    } else {
      console.warn(
        'Please use a dapp browser like mist or metamask plugin for chrome'
      );
    }
    this._tokenContract = this._web3.eth.contract(this.contractInfo).at(this._tokenContractAddress);
  }

  private async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts!');
            return;
          }

          if (accs.length === 0) {
            alert('Couldnt get accounts, sorry!');
            return;
          }
          resolve(accs[0]);
        });
      }) as string;

      this._web3.eth.defaultAccount = this._account;
    }

    return Promise.resolve(this._account);
  }
/*
  public async interact(): Promise<number> {
    const account = await this.getAccount();

    return new Promise((resolve, reject) => {
      const _web3 = this._web3;
      const test = 'yomamam';
      this._tokenContract.interact.call(test, function (err, result) {
        if (err != null) {
          reject(err);
        }
        resolve(result);
      });
    }) as Promise<number>;
  }
*/
  private createContractInstance() {
    const web3 = this._web3;
    const myContract = web3.eth.contract(this.contractInfo);
    return myContract.at(this._tokenContractAddress);
  }

  public async createInteractObject(strVal) {
    const account = await this.getAccount();
    const web3 = this._web3;
    const myContractInstance = this.createContractInstance();
    return new Promise((resolve, reject) => {
      myContractInstance.interact.sendTransaction(strVal, function(error, result) {
        if (error != null) {
          reject(error);
        }
        resolve(result);
      });
    }) as Promise<string>;

  }
  public async listenToYourHeart() {
    this.stopListeningToYourHeart();
    const myContractInstance = this.createContractInstance();
    this.interactionEvent = myContractInstance.Interaction();
    console.log('Listening on contract...');
    return new Promise((resolve, reject) => {
      this.interactionEvent.watch(function(error, result) {
        if (error != null) {
          reject(error);
        }
        resolve(result);
      });
    }) as Promise<object>;
  }

  public stopListeningToYourHeart() {
    if (this.interactionEvent) {
      this.interactionEvent.stopWatching();
      console.log('Stopped listening to contract event');
    }
  }
  public async getName() {
    const account = await this.getAccount();
    const web3 = this._web3;
    const myContractInstance = this.createContractInstance();
    return new Promise((resolve, reject) => {
      myContractInstance.currentName.call(function(error, result) {
        if (error != null) {
          reject(error);
        }
        resolve(web3.toAscii(result));
      });
    }) as Promise<string>;
  }


}
