import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

import './Feed.scss';

class Feed extends Component {
  state = {
    posts: []
  }

  async componentDidMount(){
    this.registerToSocket();

    const response = await api.get('posts');
    this.setState({posts: response.data});
  }

  registerToSocket = () => {
    const socket = io('http://localhost:3333');

    socket.on('post', newPost => {
      this.setState({posts: [newPost, ...this.state.posts]})
    });

    socket.on('like', likedPost => {
      this.setState({
        posts: this.state.posts.map( post => post._id === likedPost._id ? likedPost : post)
      })
    });
  }

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  }

  render() {
    return (
      <section className="feed">
        { this.state.posts.map( post => (
          <article className="post" key={post._id}>
          <header className="post__header">
            <div className="post__header__info">
              <span className="post__header__name">{post.author}</span>
              <span className="post__header__place">{post.place}</span>
            </div>
            <img src={more} alt="Mais" className="post__header__more"/>
          </header>
          <img src={`http://localhost:3333/files/${post.image}`} alt="" className="post__image"/>
          <footer className="post__footer">
            <div className="post__footer__actions">
              <img src={like} alt="Like" className="post__footer__action post__footer__action--like"
               onClick={() => {this.handleLike(post._id)}}/>
              <img src={comment} alt="Comment" className="post__footer__action post__footer__action--comment"/>
              <img src={send} alt="Send" className=" post__footer__action--send"/>
            </div>
            <span className="post__footer__likes">{post.likes} likes</span>
            <p className="post__footer__description">
              {post.description}
              <span className="post__footer__hashtags">{post.hashtags}</span>
            </p>
          </footer>
        </article>
        ))}
      </section>
    );
  }
}

export default Feed;
