import { Component } from '@angular/core';
import { ContractsService } from './contracts.service';
import * as Web3 from 'web3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Martin\'s Dapp';
  public interactString: string;
  public txAddress: string;
  public interact: string;
  public currentName: string;
  public eventData: any;
  public isListening = false;
  public app_web3: any;
  public eventString: string;

  constructor(private cs: ContractsService) {
    this.app_web3 = this.cs._web3;
  }

  sendInteract(): void {
    const dataString = this.interactString;
    this.cs.createInteractObject(dataString).then((data) => {
     if (data == null) {
       console.log('you got an error');
     } else {
       this.txAddress = data;
       console.log(data);
     }},
     (error) => {
       console.log(error);
     }
    );
  }

  logInteractString(value: string) {
    console.log('The string to send to the contract is:  ', value);
  }

  listenToContract() {
    this.isListening = true;
    this.cs.listenToYourHeart().then((data) => {
      if ( data == null) {
        console.log('there was an error!');
      } else {
        this.eventData = data;
        this.eventString = this.app_web3.toAscii(this.eventData.args.name);
        console.log('New activity on contract!:  ', this.eventString);
      }
    });
  }

  stopListening() {
    this.isListening = false;
    this.cs.stopListeningToYourHeart();
  }

  getCurrentName () {
    this.cs.getName().then((data) => {
      if (data == null) {
        console.log('There is no current name!');
      } else {
        this.currentName = data;
        // console.log('The current name is: ', data);
      }
    });
  }
}
