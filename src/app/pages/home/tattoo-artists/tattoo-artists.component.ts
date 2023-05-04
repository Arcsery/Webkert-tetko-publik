import { Component, OnInit } from '@angular/core';
import { ArtistService } from 'src/app/shared/services/artist.service';
import { Artist } from 'src/app/shared/models/Artist';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-tattoo-artists',
  templateUrl: './tattoo-artists.component.html',
  styleUrls: ['./tattoo-artists.component.scss']
})
export class TattooArtistsComponent implements OnInit {
  
  artists: Artist[] | null = null;
  loggedInUser?: firebase.default.User | null

  constructor(private artistService: ArtistService, private authService: AuthService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.artistService.getAll().subscribe(result => {
      this.artists = result;
    });

    this.authService.isUserLoggedIn().subscribe(user =>{
      this.loggedInUser = user
    })
  }


  onFileSelected(artist: Artist, event: any): void {
    const file = event.target.files[0];
    

    if (file) {
      this.imageService.uploadImage(`images/${artist.artistId}/profilePicture/${file.name}`, file).then(data=>{data.ref.getDownloadURL().then(url=>{
          this.artistService.editArtistProfilePicture(artist.artistId, url).then(_=>{
            console.log("sikeres profilepicture")
          })
        })
      })
    }
  }
}


