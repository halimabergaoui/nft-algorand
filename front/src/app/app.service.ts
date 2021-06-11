
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AppService {


constructor(private http: HttpClient){}

getGlobalState(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3002/application/getGlobalStatus');
}
getBalance(publickey): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:3002/application/getBalance?publickey='+publickey);
}
updateGlobalState(sender): Observable<any> {
    return this.http.get<any>('http://localhost:3002/application/updateSSC?sender='+sender);
}
sendTransaction(txn): Observable<any> {
    return this.http.post<any>('http://localhost:3002/application/sendTransaction',txn);
}
applicationCall(input): Observable<any> {
    return this.http.post<any>('http://localhost:3002/application/applicationCall',input);
}
applicationOptIn(input): Observable<any> {
  return this.http.post<any>('http://localhost:3002/application/applicationOptIn',input);
}
applicationCheckCall(input): Observable<any> {
  return this.http.post<any>('http://localhost:3002/application/applicationCheckCall',input);
}
}
