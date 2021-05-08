import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { OrderModule } from 'ngx-order-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputAreaComponent } from './input-area/input-area.component';
import { OrderPipe } from './order-pipes.pipe';
import {HttpClientModule} from '@angular/common/http'
import { LotteryService } from './lottery.service';

@NgModule({
  declarations: [
    AppComponent,
    InputAreaComponent,
    OrderPipe    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    // OrderModule
  ],
  providers: [LotteryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
