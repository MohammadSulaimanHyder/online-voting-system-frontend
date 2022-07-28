import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { casteVote } from 'src/app/models/dto/casteVote';
import { ElectorlaCandidate } from 'src/app/models/ElectoralCandidate';
import { DataService } from 'src/app/services/data.service';
import { VoteService } from './vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  public electoralCandidates : ElectorlaCandidate[] = [];

  constructor(private dataService: DataService,
    private voteService: VoteService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllElectorlaCandidates();
  }
  
  private getAllElectorlaCandidates() :void {

    this.voteService.getAllElectorlaCandidates().subscribe(
      (response :ElectorlaCandidate[]) => {
        this.electoralCandidates = response;
      },
      (response :HttpErrorResponse) => {
        console.log(response);
      });
  }

  public casteVote(candidateId :String) :void {

    let casteVoteObj :casteVote = {
      voterId : this.dataService.getAuthenticatedUsersVoterId(),
      votedForCandidateId : candidateId
    };
    
    this.voteService.casteVote(casteVoteObj).subscribe(
      (response :JSON) => {
        if(JSON.parse(JSON.stringify(response)).status.match("Success")) {
          alert("You have successfully casted your vote!.");
          this.router.navigate(['home'], { replaceUrl :true });
        }
      },
      (response :HttpErrorResponse) => {
        console.log(response);
      }
    );
  }

}
