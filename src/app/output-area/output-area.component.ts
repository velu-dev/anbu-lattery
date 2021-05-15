import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { LotteryService } from '../lottery.service';

@Component({
  selector: 'app-output-area',
  templateUrl: './output-area.component.html',
  styleUrls: ['./output-area.component.css']
})
export class OutputAreaComponent implements OnInit {
  order: string = 'count';
  order1: string = 'total_count';
  rawValue = ""
  totalSplit: any;
  twoSplitValue: any = [];
  threeSplitValue: any = [];
  resultValue: any = [];
  inputData: any = [];
  id: any = null;
  input: any;
  constructor(private router: Router, private fb: FormBuilder, private lotteryService: LotteryService, private firebase: FirebaseService, private route: ActivatedRoute) {
    this.route.params.subscribe((res: any) => {
      if (res.id)
        this.id = res.id
      this.firebase.getInput(res.id).subscribe((input: any) => {
        this.input = input;
        this.inputData = input.data;
        this.getResult();
        this.getFinalResult();
      })
    })
  }

  ngOnInit() {

  }
  edit() {
    this.router.navigate(['/input', this.id])
  }
  home() {
    this.router.navigate(['/'])
  }
  finalResult: any = []
  finalAllResult: any = []

  getResult() {
    this.finalResult = [];
    let i: any = 0;
    this.inputData.map((res: any) => {
      this.finalResult.push({ two_digit: [], three_digit: [], top_five: [] });
      let result = this.analyseData(res.input);
      this.finalResult[i]['consolidate'] = result.firstThird
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
  count_duplicate(a: any) {
    let counts: any = {}
    for (let i = 0; i < a.length; i++) {
      if (counts[a[i]]) {
        counts[a[i]] += 1
      } else {
        counts[a[i]] = 1
      }
    }
    let data: any = []
    for (let prop in counts) {
      // if (counts[prop] > 1) {
      data.push({ number: prop, count: counts[prop] })
      // }
    }
    return data;
  }
  lastResult: any = { two_digit: [], three_digit: [], onethreeDigit: [] }
  OneThreeArray: any = [];
  addedArray: any = [];
  dummyArray: any = { wz: [], xz: [], yz: [], wx: [], wy: [], xy: [] }
  dummyArrayTitle: any = ["wx", "wy", "wz", "xy", "xz", "yz"]
  analysisArray = [{ name: "wx", data: [0, 1] }, { name: "wy", data: [0, 2] }, { name: "wz", data: [0, 3] }, { name: "xy", data: [1, 2] }, { name: "xz", data: [1, 3] }, { name: "yz", data: [2, 3] }]
  getVal() {
    this.isGotFinalResult = true;
    this.isClicked = false;
    let filterKey: any = [];
    let arraySet: any = 0
    this.inputData.map((res: any) => {
      res.input.split(" ").map((input: any) => {
        this.analysisArray.map((ii: any) => {
          let val: any = "";
          val = input.split("")[ii.data[0]] + input.split("")[ii.data[1]];
          // if (this.dummyArray[ii.name].includes(val)) {
          //   let i = 0;
          //   this.OneThreeArray.map((arr: any) => {
          //     if (arr.name == ii.name) {
          //       if (arr.data == val) {
          //         this.OneThreeArray[i].count = this.OneThreeArray[i].count + 1;
          //       }
          //     }
          //     i = i + 1;
          //   })

          // } else {
          this.OneThreeArray.push({ type: ii.name, data: val, count: 1 });
          this.dummyArray[ii.name].push(val);
          // }
        })

      })
    })
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
    this.lastResult.onethreeDigit = this.OneThreeArray;
    let count2Array: any = [];
    let count3Array: any = [];
    this.finalAllResult.two_digit.map((final: any) => {
      if (count2Array.includes(final.total_count)) {
        this.lastResult.two_digit.map((secondMap: any) => {
          if (secondMap.count == final.total_count) {
            let data: any = final.filterKey;
            secondMap.data.push(data);
            secondMap.data.sort(function (a: any, b: any) {
              return a - b;
            });
          }
        })
      } else {
        count2Array.push(final.total_count);
        count2Array.sort(function (a: any, b: any) {
          return a - b;
        });
        let data = [];
        data.push(final.filterKey)
        data.sort(function (a, b) {
          return a - b;
        });
        this.lastResult.two_digit.push({ count: final.total_count, data: data })
      }
    })
    this.finalAllResult.three_digit.map((final: any) => {
      if (count3Array.includes(final.total_count)) {
        this.lastResult.three_digit.map((secondMap: any) => {
          if (secondMap.count == final.total_count) {
            let data: any = final.filterKey;
            secondMap.data.push(data);
            secondMap.data.sort(function (a: any, b: any) {
              return a - b;
            });
          }
        })
      } else {
        count3Array.push(final.total_count);
        count3Array.sort(function (a: any, b: any) {
          return a - b;
        });
        let data = [];
        data.push(final.filterKey)
        data.sort(function (a, b) {
          return a - b;
        });
        this.lastResult.three_digit.push({ count: final.total_count, data: data })
      }
    })
    this.lastResult['consolidate'] = { wx: [], wy: [], wz: [], xy: [], xz: [], yz: [] }
    let dummy: any = { wx: [], wy: [], wz: [], xy: [], xz: [], yz: [] }
    let consolidated = this.finalResult.map((res: any) => res.consolidate);
    this.dummyArrayTitle.map((title: any) => {
      consolidated.map((cons: any) => {
        cons.map((res: any) => {
          if (title.toUpperCase() == res.name) {
            // console.log(res)
            res.data.map((num: any) => {
              if (dummy[title].includes(num.number)) {
                let i = 0;
                this.lastResult['consolidate'][title].map((change: any) => {
                  if(change.number == num.number){
                    this.lastResult['consolidate'][title][i].count = 1 + this.lastResult['consolidate'][title][i].count;
                  }
                  i = i + 1
                })
              } else {
                dummy[title].push(num.number)
                this.lastResult['consolidate'][title].push({ number: num.number, count: 1 })
              }
            })
          }
        })
      })
    })
    // this.finalResult.map((res: any) => {
    //   res.consolidate.map((cons: any) => {
    //     console.log(cons)
    //     if (cons.name.toLowerCase() == "wx") {
    //       if (dummy.wx.includes(cons.number)) {
    //         let ind = 0;
    //         this.lastResult['consolidate']["wx"].map((int: any) =>{
    //           if(int.number == cons.number){
    //             this.lastResult['consolidate']["wx"][ind].count = this.lastResult['consolidate']["wx"][ind].count + 1
    //           }
    //           ind = ind+1
    //         })
    //       } else {
    //         this.lastResult['consolidate']["wx"].push({number: cons.number, count: 1})
    //         dummy.wx.push(cons.number);
    //       }
    //     }
    //     if (cons.name.toLowerCase() == "wy") {

    //     }
    //     if (cons.name.toLowerCase() == "wz") {

    //     }
    //     if (cons.name.toLowerCase() == "xy") {

    //     }
    //     if (cons.name.toLowerCase() == "xz") {

    //     }
    //     if (cons.name.toLowerCase() == "yz") {

    //     }
    //   })
    // })
    // console.log(this.lastResult['consolidate']["wx"])
  }
  simpleDummy: any = { wz: [], xz: [], yz: [], wx: [], wy: [], xy: [] };
  analyseData(data: any) {
    this.simpleDummy = { wz: [], xz: [], yz: [], wx: [], wy: [], xy: [] };
    this.rawValue = data;
    this.totalSplit = this.rawValue.split(" ");
    this.totalSplit.map((input: any) => {
      this.analysisArray.map((ii: any) => {
        let val: any = "";
        val = input.split("")[ii.data[0]] + input.split("")[ii.data[1]];
        // if (this.simpleDummy[ii.name].includes(val)) {
        //   console.log(val)
        //   let i = 0;
        //   this.resultValue['firstThird'].map((inp: any) => {
        //     console.log(inp)
        //     if (inp.name == ii.name) {
        //       console.log(inp)
        //       if (inp.number == val) {
        //         console.log(inp)
        //         this.resultValue['firstThird'][i].count = inp.count + 1
        //       }
        //     }
        //     i = i +1;
        //   })
        // } else {
        this.resultValue['firstThird'] = this.resultValue['firstThird'] ? this.resultValue['firstThird'] : [];
        this.simpleDummy[ii.name].push(val);
        // let data = [{ number: val, count: 1 }]
        // this.resultValue['firstThird'].push({ name: ii.name, data: data })
        // }
      })
    })
    Object.keys(this.simpleDummy).map((res: any) => {
      let data = this.count_duplicate(this.simpleDummy[res]);
      this.resultValue['firstThird'].push({ name: res.toUpperCase(), data: data })
    })
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
  exportAsPDF(divId: any) {
    let FirstLast: any = [];
    this.dummyArrayTitle.map((res: any) => {
      let result: any;
      result = this.count_duplicate(this.dummyArray[res]);
      console.log(res, result)
      FirstLast.push({ name: res.toUpperCase(), data: result })
    })
    let data = [];
    data.push(this.finalResult)
    data.push(this.lastResult)
    data.push(FirstLast)
    console.log(data)
    this.lotteryService.getPdf(data).subscribe(res => {
      this.showPdf(res.pdf)
    })
  }
  showPdf(base64: any) {
    const linkSource = 'data:application/pdf;base64,' + base64;
    const downloadLink = document.createElement("a");
    let filename = "result" + new Date().toDateString();
    const fileName = filename + ".pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
