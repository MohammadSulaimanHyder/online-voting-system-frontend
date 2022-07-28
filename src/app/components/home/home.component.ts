import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, Legend, Tooltip, Title, ArcElement, DoughnutController } from 'chart.js';
import { PoliticalParty } from 'src/app/models/PoliticalParty';
import { DataService } from 'src/app/services/data.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public partyDetails : PoliticalParty[] = [];
  public chart !: any;

  public hasVoted : Boolean = false;
  public voteh2Text = "Vote Now!";
  public votePText = "The vote is precious. It is the most powerful non-violent tool"
      + " we have in a democratic society, and we must use it.\n\nCaste your by click on the below button.";


  constructor(private dataService: DataService,
              private homeService: HomeService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllPartyDetials();
    //this.checkIfAlreadyVoted();
  }

  private checkIfAlreadyVoted() : void {

    let voterId = this.dataService.getAuthenticatedUsersVoterId();

    this.homeService.checkIfAlreadyVoted(voterId).subscribe((response :Boolean) => {
      let hasVotedBefore = response;
      if(hasVotedBefore) {
        this.hasVoted = true;
        this.voteh2Text = "You have already voted!";
        this.votePText = "Each person will only get one chance to cast a vote.";
      }
      console.log('has voted:' + hasVotedBefore);
    },
    (response : HttpErrorResponse) => {
      console.log(response);
    });

  }

  private getPieChart() : void {
    Chart.register(DoughnutController, ArcElement, Title, Legend, Tooltip);
    let labelsArray: String[] = [];
    let dataArray: number[] = [];
    let backgroundColorArray: string[] = [];

    let colorArray = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 
    'rgb(255,165,0)', 'rgb(0,128,0)', 'rgb(238,130,238)'];

    for(let index in this.partyDetails) {
      labelsArray.push(this.partyDetails[index].partyName);
      dataArray.push(this.partyDetails[index].currentVoteCount);
      backgroundColorArray.push(colorArray[index]);
    }
 
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: labelsArray,
        datasets: [{
          data: dataArray,
          backgroundColor: backgroundColorArray,
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
            title: {
              display: true,
              text: 'Current Voting Stats'
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  private getAllPartyDetials() : void {

    this.homeService.getAllPartyDetials().subscribe(
      (response : PoliticalParty[]) => {
        this.partyDetails = response;
        this.getPieChart();
      },
      (response : HttpErrorResponse) => {
        console.log(response);
      });
  }

  public routeToVotePage() :void {
    this.router.navigate(['vote'], { replaceUrl: true });
  }

}
