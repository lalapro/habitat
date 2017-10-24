const express = require('express');
const db = require('../../db/index.js');

const handleProfileTasks = (req, res) => {

    let userID = req.query.username;
    let taskStr =
    `Select t.*,
    m.Marker_Title
    FROM Tasks t
    LEFT JOIN Marker m
    ON t.Marker_ID = m.Marker_ID
    WHERE t.User_ID = ${userID}
    `;

    db.query(taskStr, (err, result) => {
      res.send(result)
    })
}

module.exports = handleProfileTasks;
