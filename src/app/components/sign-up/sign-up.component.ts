import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from './sign-up.service';
import { NgForm, ReactiveFormsModule} from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private signUpService: SignUpService, private router: Router) { }

  ngOnInit(): void {

  }

  public register(formVarble : NgForm) : void {

    let signUpRequest = "{\"firstName\":\""+ formVarble.value.firstName + "\","
      + "\"lastName\":\"" + formVarble.value.lastName + "\","
      + " \"email\":\"" + formVarble.value.email + "\" ,"
      + "\"password\":\"" + formVarble.value.password + "\" ,"
      + " \"phoneNumber\":\"" + formVarble.value.phoneNumber + "\", "
      + "\"voterId\":\"" + formVarble.value.voterId + "\"}";

      console.log(signUpRequest);

      this.signUpService.signUp(signUpRequest).subscribe(
        
        (response: String) => {
          
          if(response.match("User Registration Succesful")) {
            alert("User Registration Succesfull!.\nPlease go to your registered email and click"
            + " on the link to verify your account.");
           
            this.router.navigate(['login'], { replaceUrl: true });
          } else {
            alert(response);
          }

        },
        (error : HttpErrorResponse) => {
          console.log(error.message);
          alert("Something went wrong. Please re-try registering.");
        }

      );
  }

}
