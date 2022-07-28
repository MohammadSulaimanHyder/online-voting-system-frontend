import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AuthenticatedUser } from 'src/app/models/dto/authUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl : string = "http://localhost:8080/app/auth/";

  constructor(private http: HttpClient) { }

  public performLogin(loginRequest : String) : Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(`${this.baseUrl}voterlogin`, 
                  loginRequest, 
                  {headers: new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}
