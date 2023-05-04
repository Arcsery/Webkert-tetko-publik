import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore' 
import { Artist } from '../models/Artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  collectionName = 'Artists'

  constructor(private afs: AngularFirestore) { }

  create(artist: Artist){
    return this.afs.collection<Artist>(this.collectionName).doc(artist.artistId).set(artist)
  }

  getAll(){
    return this.afs.collection<Artist>(this.collectionName).valueChanges()
  }

  getArtistById(id: string){
    return this.afs.collection<Artist>(this.collectionName).doc(id).valueChanges();
  }

  getArtistByEmail(email: string){
    return this.afs.collection<Artist>(this.collectionName, ref => ref.where('email', '==', email)).valueChanges();
  }

  editArtistDetails(id: string, userName: string, phoneNumber: string, bio : string = ''){
    return this.afs.collection<Artist>(this.collectionName).doc(id).update({
      bio: bio,
      name: userName,
      phoneNumber: phoneNumber
    })
  }

  editArtistPicture(id: string, imageUrl: string){
    return this.afs.collection<Artist>(this.collectionName).doc(id).update({
      imageUrl: imageUrl
    })
  }

  editArtistProfilePicture(id: string, imageUrl: string){
    return this.afs.collection<Artist>(this.collectionName).doc(id).update({
      profilePicutre: imageUrl
    })
  }

  editArtistReferencePicture(id: string, imageUrl: string, index: string){
    const updateObj = {
      [index]: imageUrl
    };
    return this.afs.collection<Artist>(this.collectionName).doc(id).update(updateObj)
  }
}
