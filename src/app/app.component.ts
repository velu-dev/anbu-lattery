import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userValue: any;
  rawValue = ""
  totalSplit: any;
  twoSplitValue: any = [];
  threeSplitValue: any = [];
  resultValue: any = [];
  constructor() {
  }
  getResult() {
    this.analyseData(this.userValue)
  }
  analyseData(data: any) {
    console.log(data)
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
                console.log(this.twoSplitValue, filterValue1)
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
  }
}