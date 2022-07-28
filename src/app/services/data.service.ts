import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticatedUser } from '../models/dto/authUser';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private authUser !:AuthenticatedUser;
  private authBehaviorObj = new BehaviorSubject<AuthenticatedUser>(this.authUser);

  constructor() { }

  setAuthenticatedUser(user: AuthenticatedUser) : void {
    this.authBehaviorObj.next(user);
  }

  getAuthenticatedUsersJwtToken() : String {
    
    let jwtToken : String = "";
    this.authBehaviorObj.subscribe(user => {
      jwtToken = user.jwtToken;
    });

    return jwtToken;
  }

  getAuthenticatedUsersVoterId() : String {
    
    let voterId : String = "";
    this.authBehaviorObj.subscribe(user => {
      voterId = user.voterId;
    });

    return voterId;
  }
}
