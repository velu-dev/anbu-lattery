import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputAreaComponent } from './input-area/input-area.component';
import { ListComponent } from './list/list.component';
import { OutputAreaComponent } from './output-area/output-area.component';

const routes: Routes = [
  { path: "input", component: InputAreaComponent },
  { path: "input/:id", component: InputAreaComponent },
  { path: "", component: ListComponent },
  { path: "list", component: ListComponent },
  { path: "output/:id", component: OutputAreaComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
