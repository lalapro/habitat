const express = require('express');
const db = require('../../db/index.js');
var Promise = require("bluebird");

const convertDate = require('./convertDate')


const getMapMarkers = (req, res) => {
  let userID = req.query.userID;;
  let currentDay = req.query.currentDay;

  let query = `SELECT * FROM Marker WHERE User_ID = ${userID}`;
  let innerQuery = `SELECT * FROM Tasks WHERE User_ID = ${userID}`;
  let categoryQuery = `SELECT * FROM CategoryDeets WHERE User_ID = ${userID}`
  db.query(query, null, (err, results) => {
    if (err) {
      res.status(404).send(`We encountered an error looking up the locations ${err}`);
    } else {
      let length = results.length;
      let count = 0;
      if (length === 0 ) {
        res.send();
      }
      for (let i = 0; i < results.length; i++) {
        let marker = results[i]
        db.query(innerQuery, null, (err, tasks) => {
          if (err) {
            res.status(404).send(`We encountered an error looking up the tasks ${err}`);
          } else {
            let sortedByTime = tasks.sort((a,b) => {
              return convertDate(a.Start).getTime() - convertDate(b.Start).getTime()
            });
            if (currentDay) {
              sortedByTime = sortedByTime.filter(task => {
                let taskDate = convertDate(task.Start);
                let today = new Date()
                return taskDate.getFullYear() === today.getFullYear() && taskDate.getMonth() === today.getMonth() && taskDate.getDate() === today.getDate()
              })
            }
            db.query(categoryQuery, null, (err, categories) => {
              if (err) {
                res.status(404).send(`We encountered an error looking up the categories ${err}`);
              } else {
                sortedByTime.forEach(task => {
                  categories.forEach(category => {
                    if (task.Category_ID === category.ID) {
                      task.Category = category.Category;
                      task.Color = category.Color;
                      // task.Completion = category.Completion_Points;
                      if (task.Marker_ID === marker.Marker_ID) {
                        marker.tasks = marker.tasks || [];
                        marker.tasks.push(task)
                      }
                    }
                  })
                })
              }
              count++;
              if (count === length) {
                res.send(results)
              }
            })

          }
        });
      }
    }
  })
}




module.exports = getMapMarkers;
