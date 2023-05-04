import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ArtistService } from './shared/services/artist.service';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tetko-app';
  page = '';
  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null
  guestName: String = ''
  aritstName: String = ''


  constructor(private router: Router, private authService: AuthService, private artistService: ArtistService, private userService: UserService) {
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });

    this.authService.isUserLoggedIn().subscribe(user =>{
      this.loggedInUser = user

      if(this.loggedInUser != null){
        this.artistService.getArtistById(this.loggedInUser.uid as string).subscribe(result=>{
          if(result?.name != null){
            this.aritstName = result.name as string
          }
        }, error=>{
          console.log(error)
        })
      }

      if(this.loggedInUser != null){
        this.userService.getGuestById(this.loggedInUser.uid as string).subscribe(result=>{
          if(result.length > 0){
          this.guestName = result[0].name
          }
        }, error=>{
          console.log(error)
        })
      }

     
      
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error=>{
      console.log(error)
      localStorage.setItem('user', JSON.stringify('null'))
    })
  }

  logout(){
    this.authService.logout().then(()=>{
      console.log("Logged out works")
      this.aritstName = ''
      this.guestName = ''
      window.location.reload()
      this.router.navigateByUrl('/login')
    }).catch(error =>{
      console.log(error)
    });
  }
  
}
