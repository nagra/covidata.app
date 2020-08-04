import * as firebase from "@firebase/testing";

firebase.initializeTestApp({
  projectId: "my-test-project",
  auth: { uid: "alice", email: "alice@example.com" }
});

Promise.all(firebase.apps().map(app => app.delete()))