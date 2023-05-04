import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  errorMessage: string = ''

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
  }

  login(){

    if(this.email.valid && this.password.valid){
      this.authService.login(this.email.value as string, this.password.value as string).then(cred=>{
        this.router.navigateByUrl('/home')
      }).catch(error=>{
        if(error == 'FirebaseError: Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).'){
          this.errorMessage = "Incorrect email or password"
        }
        if(error == 'FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).'){
          this.errorMessage = "Incorrect email or password"
        }
      })
    }else{
      this.errorMessage = "Please check all fields"
    }
  }

}
