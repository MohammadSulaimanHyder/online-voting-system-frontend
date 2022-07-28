import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PoliticalParty } from 'src/app/models/PoliticalParty';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl : string = "http://localhost:8080/app/voting/";

  constructor(private http: HttpClient,
              private dataService: DataService) { }

  public getAllPartyDetials() : Observable<PoliticalParty[]> {

    let jwtToken = this.dataService.getAuthenticatedUsersJwtToken();

    let headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.get<PoliticalParty[]>(`${this.baseUrl}getallpartydetails`, { headers: headers });
  }

  public checkIfAlreadyVoted(voterId: String) : Observable<Boolean> {

    let jwtToken = this.dataService.getAuthenticatedUsersJwtToken();
    let headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.get<Boolean>(`${this.baseUrl}hasvotedbefore/${voterId}`, { headers: headers });
  }
}
