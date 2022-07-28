import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private baseUrl : string = "http://localhost:8080/app/auth/";

  constructor(private http: HttpClient) { }

  public signUp(signUpRequest: string) : Observable<String> {
    
    let reponse = this.http.post(`${this.baseUrl}signup`,
                         signUpRequest, 
                         {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
                         responseType: "text"});
    return reponse;
  }
}
