import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { OrderModule } from 'ngx-order-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OutputAreaComponent } from './output-area/output-area.component';
import { OrderPipe } from './order-pipes.pipe';
import {HttpClientModule} from '@angular/common/http'
import { LotteryService } from './lottery.service';
import { InputAreaComponent } from './input-area/input-area.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ListComponent } from './list/list.component';
@NgModule({
  declarations: [
    AppComponent,
    OutputAreaComponent,
    OrderPipe,
    InputAreaComponent,
    ListComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
    // OrderModule
  ],
  providers: [LotteryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
