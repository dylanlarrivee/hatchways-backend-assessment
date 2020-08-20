"use strict";
const express = require("express");
const router = express.Router();
const axios = require('axios');

const {mergeArrays, sortArray} = require('../helpers/arrayFunctions.js');

router.get("/posts", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const { tags, sortBy, direction } = req.query;
  const validSortValues = ["id", "likes", "popularity", "reads", undefined];
  const validDirections = ["asc", "desc", undefined];

  console.log("tags", tags)

  // Return error if sortBy or direction parameter is invalid. Instructions said to have same error message for both.
  if (
    validSortValues.indexOf(sortBy) === -1 ||
    validDirections.indexOf(direction) === -1
  ) {
    res.status(400).send({
      error: "sortBy parameter is invalid",
    });
  }  
  // Return error if tags parameter is not present.
  else if (!tags || tags == undefined) {
    res.status(400).send({
      error: "Tags parameter is required",
    });
  } else {
  // Run different logic depending on if there is just 1 tag vs more than 1 tag
  if (tags.indexOf(",") !== -1) {
    // More than 1 tag logic
    let tagsArray = tags.split(",");
    let useHatchwaysPostsApi = tagsArray.map((tag, i) => {
      return axios.get(
        "https://hatchways.io/api/assessment/solution/posts?tags=" + tag
      );
    });
    // Use axios.all to send requests concurrently
    axios.all([...useHatchwaysPostsApi]).then((responseArr) => {
      let uniqueArray = [];
      // console.log("responseArr[0]:", responseArr[0].data.posts)
      for (let i = 0; i < responseArr.length; i++) {
        uniqueArray = mergeArrays(uniqueArray, responseArr[i].data.posts);
      }
      uniqueArray = sortArray(uniqueArray, sortBy, direction);
      res.status(200).send({ posts: uniqueArray });
    })
    .catch((error) => {
        res.status(400).send({
            error: error,
          });
      });
  } else {
    axios
      .get("https://hatchways.io/api/assessment/solution/posts?tags=" + tags)
      .then((response) => {
        res
          .status(200)
          .send({ posts: sortArray(response.data.posts, sortBy, direction) });
      }).catch((error) => {
        res.status(400).send({
            error: error,
          });
      });
  }
  }
});


module.exports = router;
