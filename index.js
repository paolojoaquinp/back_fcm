const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

const app = express();
app.use(express.json());



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'flutter-crud-firebase-e5049'
    /* admin.credential.cert(serviceAccount) */
});


app.post('/sendNotification', async (req, res) => {
    const receivedToken = req.body.fcmToken;
    const message = {
        notification: {
            title: "Notif",
            body: 'This is a Test Notification'
        },
        // Set Android priority to "high"
        android: {
            priority: "high",
        },
        data: {Key1: 'ValueSomething', AgainKey: 'NewHelp', OwnKey: '12345'},
        token: receivedToken,
        };

    admin.messaging().send(message)
        .then((response) => {
                res.status(200).json({
                message: "Successfully sent message",
                token: receivedToken,
            });
            console.log("Successfully sent message:", response);
        })
        .catch(
            (error) => {
                res.status(400);
                res.send(error);
                console.log("Error sending message:", error);
            }
        )

});

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
})