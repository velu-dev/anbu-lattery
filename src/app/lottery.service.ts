import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LotteryService{
constructor(private http: HttpClient){

}
getPdf(data: any):Observable<any>{
    return this.http.post('https://astro-pdf.herokuapp.com/lottery-pdf', data)
}
}