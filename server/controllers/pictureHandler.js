const express = require('express');
const db = require('../../db/firebase.js');

// const pictureHandler = (req, res) => {
//     var picture = req.body.picture;
//     var username = req.body.username;
//     var userRef = db.ref(`users/${username}`);
//     userRef.on('value', function(snapshot) {
//       console.log(snapshot.val())
//         if (snapshot.val().length === 0) {
//                 db.ref(`users/${username}`).set({
//                     username: username,
//                     picture: picture
//                 }).then(res => res.send(res))
//         } else {
//             ref.child(`users/${username}`).putString(picture, 'base64').then(snapshot => {
//                 console.log(snapshot);
//                 res.send(snapshot);
//             })
//         }
//     })
// }


// const pictureHandler = (req, res) => {
//     var picture = req.body.picture;
//     var username = req.body.username;
//     var userRef = db.ref('/users');
//     userRef.push(username).set({ picture: picture })
//     userRef.on('value', snapshot => {
//         res.send(snapshot.val())
//     })
// }

const pictureHandler = (req, res) => {
    var callback = function(val) {
        res.send(val)
    }
    var picture = req.body.picture;
    var username = req.body.username;
    var usersRef = db.ref(`/users`);
    var userRef = db.ref(`/users/${username}`);
    userRef.set({ picture: picture })
    usersRef.child(username).once('value', snapshot => {
        var exists = snapshot.val()
        // console.log(exists, 'EXIST')
        callback(snapshot.val())
    })
}




module.exports = pictureHandler;
