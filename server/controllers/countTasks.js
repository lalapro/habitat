const express = require('express');
const db = require('../../db/index.js');

const countTasks = (req, res) => {
    console.log(req.query)
    let userID = req.query.username;
    let tru = "True";

    let taskStr =
    `Select t.User_ID,
    t.Completion,
    count(*) as count
    FROM Tasks t
    WHERE t.User_ID = ${userID}
    GROUP BY 1, 2
    ORDER BY 2
    `;

    db.query(taskStr, (err, result) => {
      if (err) throw err;
      console.log('PROFILE TASK HANDLER', result)
      res.send(result)
    })
}

module.exports = countTasks;
