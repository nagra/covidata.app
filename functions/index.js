// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require("firebase-admin");
const serviceAccount = require("./covidata-dev-firebase-adminsdk-e18x4-bbf40d1058.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://covidata-dev.firebaseio.com",
});

const db = admin.firestore();
exports.getVisits = functions.https.onRequest(async (req, res) => {
  var visitsQuery = db.collection("visits");
  var userQuery = db.collection("users");

  const venueID = req.query.venueID;
  const userID = req.query.userID;

  if (venueID && userID) {
    visitsQuery = visitsQuery.where("venue", "==", venueID);
  } else {
    return res.send("No ID provided");
  }

  const result = await admin.auth().listUsers();
  const users = result.users.map(user => user.uid);

  if(!users.includes(userID)) {
    return res.send("Invalid user");
  }

  visitsQuery
    .get()
    .then(result => {
      if (result.size == 0) {
        return res.send("No documents found");
      }
      const venues = result.docs.map(doc => doc.data());
      return res.send(venues);
    })
    .catch(err => {
      console.log("Error getting document", err);
    });
});
