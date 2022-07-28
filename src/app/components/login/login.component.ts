import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedUser } from 'src/app/models/dto/authUser';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private AuthenticatedUser!: AuthenticatedUser;

  constructor(private loginService : LoginService, 
              private router: Router, 
              private dataService: DataService) { }

  ngOnInit(): void {
  }

  public login(voterId: string, password: string) : void {
  
    let loginRequest = "{\"voterId\":\"" + voterId + "\", \"password\":\"" + password+"\"}";
    this.loginService.performLogin(loginRequest).subscribe(
      (response : AuthenticatedUser) => {
        this.AuthenticatedUser = response;
        //console.log(this.AuthenticatedUser);
        //need to call angular router here and route to home page.
        if(this.AuthenticatedUser.jwtToken != null && this.AuthenticatedUser.jwtToken != "" &&
           this.AuthenticatedUser.voterId != null && this.AuthenticatedUser.voterId != "") {
            
            this.dataService.setAuthenticatedUser(this.AuthenticatedUser);
            this.router.navigate(['home'], { replaceUrl: true });

        } else {
          alert("Wrong password entered. Please re-enter correct password or reset your password");
        }
      },
      (error : HttpErrorResponse) => {
        console.log(error.message);
        alert("Wrong password entered. Please re-enter correct password or reset your password");
      }
    );
  }

}
