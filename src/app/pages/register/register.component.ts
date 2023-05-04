import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { Artist } from 'src/app/shared/models/Artist';
import { ArtistService } from 'src/app/shared/services/artist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  name = new FormControl('',[Validators.required]);
  phoneNumber = new FormControl('',[Validators.required]);
  email = new FormControl('', [Validators.email]);
  password = new FormControl('', [Validators.required]);
  role = new FormControl('', [Validators.required])
  errorMessage: string = ''

  constructor(private router: Router ,private authService:AuthService, private userService: UserService, private artistService: ArtistService){}

  register(){
    if(this.email.valid && this.name.valid && this.phoneNumber.valid && this.password.valid && this.role.valid){
      this.authService.signup(this.email.value as string, this.password.value as string).then(cred =>{
        if(this.role.value === 'guest'){
          const user: User = {
            userId: cred.user?.uid as string,
            email: this.email.value as string,
            name: this.name.value as string,
            phoneNumber: this.phoneNumber.value as string,
            tattoos_booked: [],
            role: this.role.value as string
          }
          this.userService.create(user).then(_ =>{
            console.log("user added")
            this.router.navigateByUrl('/home')
          }).catch(error =>{
            console.log(error)
          })
        }else if(this.role.value === 'artist'){
          const aritst: Artist = {
            artistId: cred.user?.uid as string,
            email: this.email.value as string,
            name: this.name.value as string,
            phoneNumber: this.phoneNumber.value as string,
            role: this.role.value as string,
            bio: '',
            imageUrl: '',
            profilePicutre: '',
            Reference0: '',
            Reference1: '',
            Reference2: ''
          }

          this.artistService.create(aritst).then(_ =>{
            console.log("artist added")
            this.router.navigateByUrl('/home')
          }).catch(error =>{
            console.log(error)
          })
        }  
      }).catch(error =>{
        if(error == 'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).'){
          this.errorMessage = "Password should be atleast 6 characters!"
        }
        if(error == 'FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use).'){
          this.errorMessage = "There is already an account with this email!"
        }
        
          
      });
    }else{
      if(!this.email.valid){
        this.errorMessage = "Please enter a real email"
      }else{
        this.errorMessage = "Please check all fields if they are correct"
      }
     
    }
    
  }
}
