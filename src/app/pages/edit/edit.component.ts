import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Appointment } from 'src/app/shared/models/Appointment';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import {AngularFirestore} from '@angular/fire/compat/firestore' 
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import firebase from 'firebase/compat/app';
import { User } from 'src/app/shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { ArtistService } from 'src/app/shared/services/artist.service';
import { Artist } from 'src/app/shared/models/Artist';
import { EditAppointment } from 'src/app/shared/models/EditAppointment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  date = new FormControl('')
  time = new FormControl('')
  userName = new FormControl('')
  phoneNumber = new FormControl('')
  bio = new FormControl('')
  userId: string = ''
  loggedInUser?: firebase.User | null
  minDate = new Date().toISOString().slice(0, 10);
  Guest: User | undefined;
  appointments: Array<EditAppointment> = []
  Artist: Artist | undefined;
  role: string = ''
  Artists: Array<Artist> = []
  showEditForm: boolean = false

  constructor(private appointmentService: AppointmentService, private afs: AngularFirestore, private actRoute: ActivatedRoute, private authService: AuthService, private userService: UserService, private artistService: ArtistService) {}

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.userId = String(params.get('userId'));
    });


    this.authService.isUserLoggedIn().subscribe(user =>{
      this.loggedInUser = user})

    this.userService.getGuestById(this.userId as string).subscribe(result =>{
      if(result.length > 0){
        this.Guest = result[0]
        this.role = 'guest'
        this.appointmentService.getAppointemtsfromGuestById(this.userId).subscribe(result =>{
          if(result != null){
            this.appointments = result as EditAppointment[]
            for(let i = 0; i<this.appointments.length; i++){
              this.appointments[i].date =  this.appointments[i].date.toDate()
              this.artistService.getArtistById(this.appointments[i].artistId).subscribe(aritst =>{
                this.appointments[i].name = aritst?.name
                this.appointments[i].phoneNumber = aritst?.phoneNumber
                this.appointments[i].email = aritst?.email
              })
             }
          }
        })
      }
    })

    this.artistService.getArtistById(this.userId as string).subscribe(result=>{
      if(result?.name != null){
        this.Artist = result
        this.role = 'artist'
        this.appointmentService.getAllAppointemtsfromArtisById(this.userId).subscribe(result =>{
          if(result != null){
            this.appointments = result as Appointment[]
            for(let i = 0; i<this.appointments.length; i++){
              this.appointments[i].date =  this.appointments[i].date.toDate()
              if(this.appointments[i].userID != ''){
                this.userService.getGuestById(this.appointments[i].userID as string).subscribe(guest =>{
                  this.appointments[i].name = guest[0].name
                  this.appointments[i].phoneNumber = guest[0].phoneNumber
                  this.appointments[i].email = guest[0].email
                })
              }else{
                this.appointments[i].name = "Még nem foglalta le senki"
              }
             }
          }
        })
      }})
  }

  addDate(){
    const dateObj = new Date(`${this.date.value}T${this.time.value}`);
    const timestamp = firebase.firestore.Timestamp.fromDate(dateObj);

    if(this.loggedInUser?.uid == this.userId){
      const appointment: Appointment = {
        Id: this.afs.createId(),
        artistId: this.userId,
        date: timestamp,
        userID: '',
        descripton: ''
      }
  
      this.appointmentService.create(appointment).then(_=>{
        console.log("appointment added")
      }).catch(error =>{
        console.log(error)
      })
    }else{
      console.log("Ez nem a te fiókod!")
    }
  }

  delete(appointment: EditAppointment){
if(this.role === 'guest'){
    this.appointmentService.deleteGuestAppointment(appointment.Id).then(_=>{
      console.log("sikeres törlés")
    }).catch(error =>{
      console.log(error)
    })
}

if(this.role === 'artist'){
    this.appointmentService.deleteArtistAppointMent(appointment.Id).then(_=>{
      console.log("sikeres törlés")
    }).catch(error =>{
      console.log(error)
    })
}


}

editDetails(){
  let userName = this.userName.value
  let phoneNumber = this.phoneNumber.value

  if(this.role === 'artist'){
    let bio = this.bio.value
    if(this.userName.value === ''){
      userName = this.Artist?.name as string
    }
  
    if(this.phoneNumber.value === ''){
    phoneNumber = this.Artist?.phoneNumber as string
    }

    if(this.bio.value === ''){
      bio = this.Artist?.bio as string
    }

    this.artistService.editArtistDetails(this.userId, userName as string, phoneNumber as string, bio as string).then(_=>{
      console.log("sikeres update")
      this.showEditForm = false
    }).catch(error =>{
      console.log(error)
    })
  }

  
  if(this.role === 'guest'){

    if(this.userName.value === ''){
      userName = this.Guest?.name as string
    }
  
    if(this.phoneNumber.value === ''){
    phoneNumber = this.Guest?.phoneNumber as string
    }


    this.userService.editGuesttDetails(this.userId, userName as string, phoneNumber as string).then(_=>{
      console.log("sikeres update")
      this.showEditForm = false

    }).catch(error =>{
      console.log(error)
    })
  }
}
}
