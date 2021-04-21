import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-area',
  templateUrl: './input-area.component.html',
  styleUrls: ['./input-area.component.css']
})
export class InputAreaComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  productForm: any = FormGroup;

  ngOnInit() {

    /* Initiate the form structure */
    this.productForm = this.fb.group({
      selling_points: this.fb.array([this.fb.group({ point: '' })])
    })
  }

  get sellingPoints() {
    return this.productForm.get('selling_points') as FormArray;
  }

  /////// This is new /////////////////

  addSellingPoint() {
    this.sellingPoints.push(this.fb.group({ point: '' }));
  }

  deleteSellingPoint(index: any) {
    this.sellingPoints.removeAt(index);
  }
}
