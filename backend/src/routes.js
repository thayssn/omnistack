const express = require('express');
const upload = require('multer')(require('./config/upload'));
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = express.Router();

routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;
