const express = require('express');
const db = require('../../db/index.js');

const countTasks = (req, res) => {
    let userID = req.query.username;
    let tru = "True";

    let taskStr =
    `Select t.User_ID,
    CASE WHEN t.Completion = "False" THEN "False"
         WHEN t.Completion = "True" THEN "True"
         ELSE NULL END AS Completion,
    count(*) as count
    FROM Tasks t
    WHERE t.User_ID = ${userID}
    GROUP BY 1, 2
    ORDER BY 2
    `;

    db.query(taskStr, (err, result) => {
      if (err) throw err;
      res.send(result)
    })
}

module.exports = countTasks;
