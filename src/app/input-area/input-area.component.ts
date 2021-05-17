import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { LotteryService } from '../lottery.service';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.css']
})
export class InputAreaComponent implements OnInit {
  isEdit: any = false;
  id: any = null;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private lotteryService: LotteryService, private firebase: FirebaseService) {
    this.inputForm = this.fb.group({
      id: null,
      name: ["", Validators.required],
      inputValue: this.fb.array([])
    })
    this.route.params.subscribe((res: any) => {
      if (res.id) {
        this.isEdit = true;
        this.id = res.id;
        this.firebase.getInput(this.id).subscribe((res: any) => {
          console.log(res)
          this.inputForm.patchValue({ name: res.name });
          res.data.map((item: any, i: any) => {
            this.addSellingPoint();
            this.inputData.controls[i].patchValue(item);
          })
        })
      }
    })
  }

  ngOnInit(): void {
  }
  home() {
    this.router.navigate(['/'])
  }
  inputForm: any = FormGroup;
  get inputData() {
    return this.inputForm.get('inputValue') as FormArray;
  }
  addSellingPoint() {
    this.inputData.push(this.fb.group({ input: '' }));
  }
  deleteSellingPoint(index: any) {
    this.inputData.removeAt(index);
  }
  getResult() {
    if (!this.inputForm.valid) {
      alert("Please enter name");
      return
    }
    let data = {
      id: this.id,
      name: this.inputForm.get('name').value,
      data: this.inputForm.get("inputValue").value,
      created_date: new Date().toDateString()
    }
    if (this.isEdit) {
      this.firebase.updateInput(data).then((res: any) => {
        alert("Updated");
        this.router.navigate(["/output", this.id])
      }).catch((error: any) => {
        console.log("Try Again", error)
      })
    } else {
      this.firebase.addInput(data).then((res: any) => {
        this.router.navigate(["/output", res.id])
      }).catch((error: any) => {
        console.log(error, "error")
      })
    }
  }
}
