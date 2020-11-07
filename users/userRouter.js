const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');
const { default: contentSecurityPolicy } = require('helmet/dist/middlewares/content-security-policy');
const router = express.Router();


//add new user and will validate the user info was entered correctly
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


//add new msg by user. validate the msg and that the msg is to the correct user id
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const postInfo = {...req.body, user_id: req.params.id};
  Posts(postInfo)
  .insert(req.params.id)
  .then(post =>{
    res.status(200).json(post);
  })
  .catch(error =>{
    console.log(error);
    res.status(500).json({
      message: 'error getting posts from the db'
    })
  })
});

//get list of users
router.get('/', (req, res) => {
  // do your magic!
  Users
  .get(req.query)
  .then(users =>{
    res.status(200).json(users);
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({
      message:'error retrieving users'
    })
  })
});

//get user by id
router.get('/:id', (req, res) => {
  // do your magic!
  Users
  .getById(req.params.id)
  .then(user=>{
    if(user){
      res.status(200).json(user);
    }else{
      res.status(404).json({
        message: ' user not found'
      })
    }
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({
      message: 'error with db'
    })
  })
});

router.get('/:id/posts',  validateUserId,(req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const {id} = req.params;
  Users
  .getById(id)
  .then(user=>{
    if(user){
      req.user = user;
      next();
    }else{
      res.status(404).json({
        message: 'no user id found'
      })
    }
  })
  .catch(error=>{
    console.log(error);
    res.status(500).json({
      message:'error retrieving user id from db'
    })
  })
}

function validateUser(req, res, next) {
  // do your magic!

  //will validate if a name was entered in and will error if left blank
  const body = req.body;
  !body.name || body.name === {} ?
    res.status(400).json({message: 'Please include your name'})
    : next();
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
