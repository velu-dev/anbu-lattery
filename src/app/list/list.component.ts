import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listData: any = [];
  constructor(private router: Router, private firebase: FirebaseService) {
    this.firebase.getInputs().subscribe((res: any) => {
      this.listData = res;
    })
  }

  ngOnInit(): void {
  }
  open(data: any) {
    this.router.navigate(['/output', data.dd])
  }
  edit(data: any) {
    this.router.navigate(['/input', data.dd])
  }
  delete(data: any) {
    this.firebase.deleteInput(data.dd).then((res: any) =>{
      alert("deleted")
    }).catch((error: any)=>{
      alert("Try again")
    })
  }
  new() {
    this.router.navigate(['/input'])
  }
}
