import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() loggedInUser?: firebase.default.User | null
  @Input() guestName: String = ''
  @Input() artistName: String = ''
  @Output() onLogout = new EventEmitter()

  constructor(private authService: AuthService){
  }

  

  logout(){
    this.onLogout.emit()
  }
}
