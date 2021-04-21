import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rawValue = ""
  totalSplit: any;
  twoSplitValue: any = [];
  threeSplitValue: any = [];
  resultValue: any = [];
  constructor(private fb: FormBuilder) {
    this.inputForm = this.fb.group({
      inputValue: this.fb.array([this.fb.group({ input: '' })])
    })
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
  finalResult:any = []
  getResult() {
    this.finalResult = [];
    // console.log("dfasdasd", this.inputForm.value)
    let i: any = 0;

    this.inputForm.get("inputValue").value.map((res: any) => {
      let result = this.analyseData(res.input);
      this.finalResult.push(result);
      this.resultValue = [];
      this.threeSplitValue = [];
      this.twoSplitValue = [];
      this.totalSplit = [];
      this.rawValue = "";
      i = i + 1;
    })
    console.log(this.finalResult)
  }
  analyseData(data: any) {
    this.rawValue = data;
    this.totalSplit = this.rawValue.split(" ");
    this.totalSplit.map((res: any) => {
      let i = 1;
      let singleSplit = res.split("");
      singleSplit.map((res1: any) => {
        let filterValue1: any
        if (singleSplit[i]) {
          filterValue1 = res1 + singleSplit[i];
        }
        let filterValue2: any;
        if (singleSplit[i + 1]) {
          filterValue2 = res1 + singleSplit[i] + singleSplit[i + 1];
        }
        if (filterValue2) {
          let threeeDigit: any = [];
          let count = 0;
          let countArray: any = []
          this.totalSplit.map((totalVal: any) => {
            if (totalVal.includes(filterValue2)) {
              count = count + 1;
              if (this.threeSplitValue.includes(filterValue2)) {
                let index: any = 0;
                this.resultValue.map((resVal: any) => {
                  if (resVal.filterKey == filterValue2) {
                    countArray.push(totalVal);
                    this.resultValue[index] = { filterKey: filterValue2, totalValue: countArray };
                    this.resultValue[index].count = countArray.length;
                  }
                  // }
                  index = index + 1
                })
              } else {
                if (!this.threeSplitValue.includes(filterValue2)) {
                  this.threeSplitValue.push(filterValue2);
                  countArray.push(totalVal);
                  this.resultValue.push({ filterKey: filterValue2, count: 1, totalValue: countArray });
                }
              }
            }
          })
        }
        if (filterValue1) {
          let twoDigit: any = [];
          let count = 0;
          let countArray: any = []
          this.totalSplit.map((totalVal: any) => {
            if (totalVal.includes(filterValue1)) {
              count = count + 1;
              if (this.twoSplitValue.includes(filterValue1)) {
                let index: any = 0;
                this.resultValue.map((resVal: any) => {
                  if (resVal.filterKey == filterValue1) {
                    countArray.push(totalVal);
                    this.resultValue[index] = { filterKey: filterValue1, totalValue: countArray };
                    this.resultValue[index].count = countArray.length;
                  }
                  index = index + 1
                })
              } else {
                if (!this.twoSplitValue.includes(filterValue1)) {
                  this.twoSplitValue.push(filterValue1);
                  countArray.push(totalVal);
                  this.resultValue.push({ filterKey: filterValue1, count: 1, totalValue: countArray });
                }
              }
            }
          })
        }
        i = i + 1;
      })
    })
    return this.resultValue;
  }
}