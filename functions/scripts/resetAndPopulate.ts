import * as admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

const db = admin.firestore();

async function deleteCollection(collectionPath: string) {
  const collectionRef = db.collection(collectionPath);
  const snapshot = await collectionRef.get();

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`Deleted all documents in ${collectionPath}`);
}

const dummyUsers = [
  {
    uid: 'user1',
    email: 'client1@example.com',
    displayName: 'Client One',
    role: 'user',
    subscription: { plan: 'Weekly', requests: 1, active: true, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
  },
  {
    uid: 'user2',
    email: 'client2@example.com',
    displayName: 'Client Two',
    role: 'user',
    subscription: { plan: 'Weekly+', requests: 2, active: true, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
  },
  {
    uid: 'user3',
    email: 'client3@example.com',
    displayName: 'Client Three',
    role: 'user',
    subscription: { plan: 'Weekly++', requests: 3, active: true, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
  },
  {
    uid: 'admin1',
    email: 'admin@example.com',
    displayName: 'Admin User',
    role: 'admin',
    subscription: null,
  },
];

const dummyRequests = [
  {
    clientId: 'user1',
    brief: 'Design a logo for my startup',
    status: 'pending',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    clientId: 'user1',
    brief: 'Create a banner for my website',
    status: 'in_progress',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  },
  {
    clientId: 'user2',
    brief: 'Redesign my business cards',
    status: 'pending',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    clientId: 'user2',
    brief: 'Make a flyer for an event',
    status: 'in_progress',
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now() - 172800000,
  },
  {
    clientId: 'user3',
    brief: 'Design a full website mockup',
    status: 'pending',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    clientId: 'user3',
    brief: 'Create social media graphics',
    status: 'completed',
    createdAt: Date.now() - 259200000,
    updatedAt: Date.now() - 259200000,
  },
];

async function resetAndPopulate() {
  try {
    await deleteCollection('users');
    await deleteCollection('requests');

    for (const user of dummyUsers) {
      await db.collection('users').doc(user.uid).set({
        email: user.email,
        displayName: user.displayName,
        role: user.role,
        subscription: user.subscription,
      }, { merge: true });
      console.log(`Added user: ${user.displayName} (${user.role})`);
    }

    for (const request of dummyRequests) {
      const docRef = await db.collection('requests').add(request);
      console.log(`Added request: ${request.brief} for ${request.clientId} with ID: ${docRef.id}`);
    }

    console.log('Firestore reset and populated successfully.');
  } catch (error) {
    console.error('Error resetting and populating Firestore:', error);
  }
}

resetAndPopulate().then(() => process.exit(0));