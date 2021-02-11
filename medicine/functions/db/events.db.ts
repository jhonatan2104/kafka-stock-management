import * as admin from 'firebase-admin'

// import firebaseConfig from '../../cerificates/firebase.json'
import firebaseAccountCredentials from '../../cerificates/microservises-medicine-firebase-adminsdk.json'
import { Status, Event } from '../model/event.model'

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const firestore = admin.firestore()
const eventsDatabaseRef = firestore.collection('events')

export async function editStatusEvent (id: string, status: Status): Promise<FirebaseFirestore.WriteResult> {
  try {
    return eventsDatabaseRef.doc(id).update({
      status
    })
  } catch (e) {
    throw new Error('Erro Layer Database')
  }
}

export async function getEvent (id: string): Promise<Event | undefined> {
  try {
    const eventResult = await eventsDatabaseRef.doc(id).get()

    const event = eventResult.data()

    if (event) {
      return {
        status: event.status,
        medicine: event.medicine
      }
    }

    return undefined
  } catch (e) {
    console.log(e)
    throw new Error('Erro Layer Database')
  }
}
