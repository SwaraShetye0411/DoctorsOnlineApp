import * as firebase from 'firebase'
import 'firebase/firestore'

class Fire {
    // constructor() {
    //     if (!firebase.apps.length) {
           
    //         firebase.initializeApp(firebaseConfig);
    //     }
    // }

    uploadPhotoAsync = async uri => {
        const path = `photos/${Date.now()}.jpg`
        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()
            let upload = firebase.storage().ref(path).put(file)
            upload.on('state_changed', snapshot => {
                console.log('1')
            }, err => {
                console.log('2')
                rej(err)

            }, async () => {
                const url = await upload.snapshot.ref.getDownloadURL()
                console.log('3')
                res(url)
            })
        })

    }
    addPhoto = async (localUri) => {
        const remoteUri = await this.uploadPhotoAsync(localUri)
        return new Promise((res,rej)=>{
            // firebase.database().ref('/photos').push({
            //     timestamp:this.timestamp,
            //     image:remoteUri
            // })
            this.firestore.collection('chatrooms')
            .doc(docid)
            .collection('messages').add({
                //timestamp:this.timestamp,
                imageUrl:remoteUri
            })
            .then(ref=>{
                console.log('4')
                res(ref)
            })
            .catch(err=>{
                console.log('5')
                rej(err)
            })
        })
    }

    get firestore() {
        return firebase.firestore()
    }

    get timestamp() {
        return Date.now()
    }
}

Fire.shared = new Fire()
export default Fire;