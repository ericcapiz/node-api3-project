const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');
const router = express.Router();



router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users
  .insert(req.body)
  .then(user =>{
    res.status(200).json(user);
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({
      message: 'error adding the user'
    })
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
  //will validate if a name was entered in
  const body = req.body;
  !body.name || body.name === {} ?
    res.status(400).json({message: 'Please include your name'})
    : next();
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
