const express = require('express');
const db = require('../../db/index.js');

const handlenNewTask = (req, res) => {
  let Title = req.body.title;
  let Description = req.body.description;
  let Date = req.body.date;
  let Start = req.body.startTime;
  let End = req.body.endTime;
  let Frequency = req.body.frequency;
  let Days = req.body.days;
  let Category_ID = req.body.category;
  let Marker_ID = req.body.markerID;
  let User_ID = req.body.userID;

  let insert = `INSERT INTO Tasks (Task_ID, Task_Title, Task_Description, Completion, Start, End, Frequency, Days, User_ID, Category_ID, Marker_ID) VALUES (null, '${Title}', '${Description}', null, '${Start}', '${End}', '${Frequency}', '${Days}', '${User_ID}', '${Category_ID}', '${Marker_ID}')`
  db.query(insert, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error creating the task ${err}`);
    } else {
      res.status(201).send(results);
    }
  })

}


module.exports = handlenNewTask;
