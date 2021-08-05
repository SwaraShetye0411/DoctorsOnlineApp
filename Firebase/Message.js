import firebase from '../firebase';

export const SendMessage = async(currentUid, guestUid, message) => {
    try{
        return await firebase.firestore().collection('Messages').doc(currentUid).collection('message').doc(guestUid).add({
            message: {
                sender: currentUid,
                receiver: guestUid,
                msg: message
            },
            
        });
    } catch(error){
        console.log('sendMessage error', error)
    }
}

export const ReceiveMessage = async(currentUid, guestUid, message) => {
    try{
        return await firebase.firestore().collection('Messages').doc(guestUid).collection('message').doc(currentUid).add({
            message: {
                sender: currentUid,
                receiver: guestUid,
                msg: message
            },
        });
    } catch(error){
        console.log('receiveMessage error', error)
    }
}