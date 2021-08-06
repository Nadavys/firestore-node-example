const admin = require('firebase-admin');
const fakeruser = require('./fakeuser')
const collectionName = 'users';

//get IAM service account key https://console.cloud.google.com/iam-admin/serviceaccounts
const serviceAccount = {
    /* service account credentials here */
}


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const addusers = async (num) => {
    const col = db.collection(collectionName)
   
    for(let i=0;i<num;i++){
        const docRef = col.doc();
        await docRef.set(fakeruser());
    }
}

const fetchAll = async ()=>{
    const snapshot = await db.collection(collectionName).get();
    return snapshot.docs.reduce((acc, item)=>{ console.log(item); acc[item.id] = item.data(); return acc}, {})
}



addusers(10)
.then(
    ()=>fetchAll()
)
.then( console.log )
