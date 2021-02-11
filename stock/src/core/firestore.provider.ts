/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { FieldValue } from '@google-cloud/firestore';

@Injectable()
export class FirestoreProvider {
    public db: firebase.firestore.Firestore

    constructor() {
        this.db = 
            firebase.initializeApp({
                credential: firebase.credential.cert(require('../../certificates/microservises-medicine-firebase-adminsdk.json'))
            }).firestore()
    }

    public incrementFieldValue(value: number): FieldValue {
        return firebase.firestore.FieldValue.increment(value)
    }
}