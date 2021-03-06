const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  },

  async store(req, res) {
    const {
      author, place, description, hashtags,
    } = req.body;
    const post = await Post.create({
      author, place, description, hashtags,
    });

    const { _id: id } = post;

    const image = `${id}.jpg`;

    await sharp(req.file.path)
      .resize(200)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', image),
      );

    fs.unlinkSync(req.file.path);

    post.image = image;
    await post.save();

    req.io.emit('post', post);

    return res.json(post);
  },
};
