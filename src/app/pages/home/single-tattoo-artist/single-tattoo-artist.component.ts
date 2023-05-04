import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Appointment } from 'src/app/shared/models/Appointment';
import { Artist } from 'src/app/shared/models/Artist';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { ArtistService } from 'src/app/shared/services/artist.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-single-tattoo-artist',
  templateUrl: './single-tattoo-artist.component.html',
  styleUrls: ['./single-tattoo-artist.component.scss']
})
export class SingleTattooArtistComponent implements OnInit {


  artistId: string = '0';
  artist: Artist | undefined;
  showBookingForm:boolean = false
  appointments: any
  selected: any
  loggedInUser?: firebase.default.User | null
  loadImage? : string

  constructor(private actRoute: ActivatedRoute, private artistService: ArtistService, private appointmentService: AppointmentService, private authService: AuthService, private userService: UserService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.artistId = String(params.get('artistId'));
      this.artistService.getArtistById(this.artistId).subscribe(result =>{
        this.artist = result
        if(this.artist?.imageUrl != ''){
          this.imageService.loadImage(this.artist?.imageUrl as string).getDownloadURL().subscribe(url =>{
            this.loadImage = url
          })
        }
      })

      this.authService.isUserLoggedIn().subscribe(user =>{
        this.loggedInUser = user
      })

    });

    this.appointmentService.getAppointemtsfromArtisById(this.artistId).subscribe(result =>{
      this.appointments = result
      for(let i = 0; i<this.appointments.length; i++){
       this.appointments[i].date =  this.appointments[i].date.toDate()
      }

    })
    
    
    
  }

  addDate(){

    if(this.artistId!= null && this.loggedInUser?.uid != null){
      this.appointmentService.createAppointmentForGuest(this.selected.Id, this.loggedInUser.uid).then(_ =>{
        console.log("succes")
        this.userService.updateBookedTattos(this.loggedInUser?.uid as string, this.selected.Id).then(_=>{
          console.log("user succes too")
        }).catch(error =>{
          console.log(error)
        })
        this.showBookingForm = false
      }).catch(error =>{
        console.log(error)
      })
    } 
    
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageService.uploadImage(`images/${this.artistId}/${file.name}`, file).then(_=>{
        this.artistService.editArtistPicture(this.artist?.artistId as string,`images/${this.artistId}/${file.name}`).then(_=>{
          console.log("sikeres image change a userben")
        })
      })
    }
  }

  onFirstSlotFileSelected(event: any): void{
    const file = event.target.files[0];

    if (file){
      this.imageService.uploadImage(`images/${this.artist?.artistId as string}/References/${file.name}`, file).then(data=>{
        data.ref.getDownloadURL().then(url=>{
          this.artistService.editArtistReferencePicture(this.artist?.artistId as string, url, "Reference0").then(_=>{
            console.log("sikeres")
          })
        })
      })
    }
  }

  onSecondSlotFileSelected(event: any): void{
    const file = event.target.files[0];
    if (file){
      this.imageService.uploadImage(`images/${this.artist?.artistId as string}/References/${file.name}`, file).then(data=>{
        data.ref.getDownloadURL().then(url=>{
          this.artistService.editArtistReferencePicture(this.artist?.artistId as string, url, "Reference1").then(_=>{
            console.log("sikeres")
          })
        })
      })
    }
  }

  onThirdSlotFileSelected(event: any): void{
    const file = event.target.files[0];

    if (file){
      this.imageService.uploadImage(`images/${this.artist?.artistId as string}/References/${file.name}`, file).then(data=>{
        data.ref.getDownloadURL().then(url=>{
          this.artistService.editArtistReferencePicture(this.artist?.artistId as string, url, "Reference2").then(_=>{
            console.log("sikeres")
          })
        })
      })
    }
  }

}