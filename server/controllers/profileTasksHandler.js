const express = require('express');
const db = require('../../db/index.js');

const handleProfileTasks = (req, res) => {
    
    let userID = req.query.username;
    let taskStr = `Select * FROM Tasks WHERE User_ID = ${userID}`;

    db.query(taskStr, (err, result) => {
        res.send(result)
    })
}

module.exports = handleProfileTasks;