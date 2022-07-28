import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { casteVote } from 'src/app/models/dto/casteVote';
import { ElectorlaCandidate } from 'src/app/models/ElectoralCandidate';
import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private baseUrl : string = "http://localhost:8080/app/voting/";

  constructor(private http: HttpClient,
    private dataService: DataService) { }

  public getAllElectorlaCandidates() :Observable<ElectorlaCandidate[]> {

    let jwtToken = this.dataService.getAuthenticatedUsersJwtToken();

    let headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    return this.http.get<ElectorlaCandidate[]>(`${this.baseUrl}getelectoralcandidate`, { headers: headers });
  }

  public casteVote(casteVoteObj :casteVote) :Observable<JSON> {

    let jwtToken = this.dataService.getAuthenticatedUsersJwtToken();

    let headers = new HttpHeaders().set('Authorization', `Bearer ${jwtToken}`);

    let response = this.http.post<JSON>(`${this.baseUrl}vote`, casteVoteObj, { headers: headers });

    console.log(response);
    return response;
  }
}
