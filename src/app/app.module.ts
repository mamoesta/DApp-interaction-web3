import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { ContractsService } from './contracts.service';
import {MatButtonModule, MatCardModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatCardModule
  ],
  providers: [
    ContractsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
