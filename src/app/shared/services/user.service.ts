import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore' 
import { User } from '../models/User';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users'

  constructor(private afs: AngularFirestore) { }

  create(user: User){
    return this.afs.collection<User>(this.collectionName).doc(user.userId).set(user)
  }

  getGuestById(id: string){
    return this.afs.collection<User>(this.collectionName, ref => ref.where('userId', '==', id)).valueChanges();
  }

  updateBookedTattos(userId: string, appointemntId: string){
    return this.afs.collection(this.collectionName).doc(userId).update({
      tattoos_booked: firebase.firestore.FieldValue.arrayUnion(appointemntId)
    })
  }


  editGuesttDetails(id: string, userName: string, phoneNumber: string){
    return this.afs.collection<User>(this.collectionName).doc(id).update({
      name: userName,
      phoneNumber: phoneNumber
    })
  }
  }
