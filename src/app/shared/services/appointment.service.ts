import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore' 
import { Appointment } from '../models/Appointment';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  collectionName = 'Appointments'

  constructor(private afs: AngularFirestore) { }

  create(appointment: Appointment){
    return this.afs.collection<Appointment>(this.collectionName).doc(appointment.Id).set(appointment)
  }

  getAppointemtsfromArtisById(id: string){
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = firebase.firestore.Timestamp.fromDate(today)
    return this.afs.collection(this.collectionName, ref => ref.where('artistId', '==', id).where('userID', '==', '').where('date', '>=', todayTimestamp).orderBy('date', 'asc'))
    .valueChanges()
  }

  getAllAppointemtsfromArtisById(id: string){
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = firebase.firestore.Timestamp.fromDate(today)
    return this.afs.collection(this.collectionName, ref => ref.where('artistId', '==', id).where('date', '>=', todayTimestamp).orderBy('date', 'asc'))
    .valueChanges()
  }

  getAppointemtsfromGuestById(id: string){
    const today = new Date()
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = firebase.firestore.Timestamp.fromDate(today)
    return this.afs.collection(this.collectionName, ref => ref.where('userID', '==', id).where('date', '>=', todayTimestamp).orderBy('date', 'asc'))
    .valueChanges()
  }

  createAppointmentForGuest(appointmentId: string, guestId: string, description : string = ''){
    return this.afs.collection<Appointment>(this.collectionName).doc(appointmentId).update({
      descripton: description,
      userID: guestId
    })
  }

  deleteGuestAppointment(id: string){
    return this.afs.collection<Appointment>(this.collectionName,).doc(id).update({
      userID: '',
      descripton: ''
    })
  }

  deleteArtistAppointMent(id: string){
    return this.afs.collection<Appointment>(this.collectionName).doc(id).delete()
  }
}
