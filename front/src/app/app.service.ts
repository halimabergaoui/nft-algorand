
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
updateGlobalState(sender): Observable<any> {
    return this.http.get<any>('http://localhost:3002/application/updateSSC?sender='+sender);
  }
}
