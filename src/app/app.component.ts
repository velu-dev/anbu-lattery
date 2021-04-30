import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  header = [['ID', 'Name', 'Email', 'Profile']]

tableData = [
    [1, 'John', 'john@yahoo.com', 'HR'],
    [2, 'Angel', 'angel@yahoo.com', 'Marketing'],
    [3, 'Harry', 'harry@yahoo.com', 'Finance'],
    [4, 'Anne', 'anne@yahoo.com', 'Sales'],
    [5, 'Hardy', 'hardy@yahoo.com', 'IT'],
    [6, 'Nikole', 'nikole@yahoo.com', 'Admin'],
    [7, 'Sandra', 'Sandra@yahoo.com', 'Sales'],
    [8, 'Lil', 'lil@yahoo.com', 'Sales']
]
  order: string = 'count';
  order1: string = 'total_count';
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
  finalResult: any = []
  finalAllResult: any = []

  getResult() {
    this.finalResult = [];
    // console.log("dfasdasd", this.inputForm.value)
    let i: any = 0;
    this.inputForm.get("inputValue").value.map((res: any) => {
      this.finalResult.push({ two_digit: [], three_digit: [], top_five: [] });
      let result = this.analyseData(res.input);
      result.map((rr: any) => {
        if (rr.filterKey.length != 1) {
          if (rr.filterKey.length == 2) {
            this.finalResult[i]['two_digit'].push(rr)
          }
          if (rr.filterKey.length == 3) {
            this.finalResult[i]['three_digit'].push(rr)
          }
        }
      })
      // let data = result;
      // let j = 0;
      // data.map((dd :any) => {
      //   console.log(Math.max.apply(Math, result.map(function(o: any) { return o; })))
      //   this.finalResult[i]['top_five'].push(Math.max.apply(Math, data.map(function(o: any) { return o.count; })));
      //   data.splice(j, 1);
      //   j = j + 1;
      // })
      this.resultValue = [];
      this.threeSplitValue = [];
      this.twoSplitValue = [];
      this.totalSplit = [];
      this.rawValue = "";
      i = i + 1;
    })
  }
  isClicked = false;
  isGotFinalResult: any = false;
  getFinalResult() {
    this.isClicked = true;
    this.finalAllResult = { two_digit: [], three_digit: [], top_five: [] };
    let combained: any = "";
    // this.inputForm.get("inputValue").value.map((res: any) => {
    //   combained = combained + " " + res.input
    // })
    setTimeout(() => {                     //<<<---using ()=> syntax
      this.getVal();
    }, 500);
    // this.getResult();
  }
  getVal() {
    this.isGotFinalResult = true;
    this.isClicked = false;
    let filterKey: any = [];
    let arraySet: any = 0
    this.finalResult.map((res: any) => {
      res.two_digit.map((two: any) => {
        if (filterKey.includes(two.filterKey)) {
          let twoIndex: any = 0
          this.finalAllResult['two_digit'].map((twores: any) => {
            if (two.filterKey == twores.filterKey) {
              this.finalAllResult['two_digit'][twoIndex]['total_count'] = Number(this.finalAllResult['two_digit'][twoIndex]['total_count']) + 1;
            }
            twoIndex = twoIndex + 1;
          })
        } else {
          filterKey.push(two.filterKey);
          two['total_count'] = 1
          this.finalAllResult['two_digit'].push(two)
        }
      })
      res.three_digit.map((three: any) => {
        if (filterKey.includes(three.filterKey)) {
          let threeIndex: any = 0
          this.finalAllResult['three_digit'].map((threeres: any) => {
            if (three.filterKey == threeres.filterKey) {
              this.finalAllResult['three_digit'][threeIndex]['total_count'] = Number(this.finalAllResult['three_digit'][threeIndex]['total_count']) + 1;
            }
            threeIndex = threeIndex + 1;
          })
        } else {
          filterKey.push(three.filterKey);
          three['total_count'] = 1;
          this.finalAllResult['three_digit'].push(three)
        }
      })
      arraySet = arraySet + 1;
    })
    // this.finalAllResult.two_digit = this.finalAllResult['two_digit'].sort((a: any, b: any) => a.total_count - b.total_count);
    // this.finalAllResult.three_digit = this.finalAllResult['three_digit'].sort((a: any, b: any) => a.total_count - b.total_count);

  }
  analyseData(data: any) {
    console.log("i am called")
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
  exportAsPDF(divId: any)
  {
      let data: any = document.getElementById('divId');  
      html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png') 
      let pdf: any = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('Filename.pdf');   
    }); 
  }
//   generatePdf() {
//     var pdf = new jsPDF();

//     pdf.setFontSize(2P);
//     pdf.text('Angular PDF Table', 11, 8);
//     pdf.setFontSize(12);
//     pdf.setTextColor(99);


//     (pdf as any).autoTable({
//     head: this.header,
//     body: this.tableData,
//     theme: 'plain',
//     didDrawCell: (data: any) => {
//         console.log(data.column.index)
//     }
//     })

//     // Open PDF document in browser's new tab
//     pdf.output('dataurlnewwindow')

//     // Download PDF doc  
//     pdf.save('table.pdf');
// }  

}