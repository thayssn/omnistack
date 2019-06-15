import React, { Component } from 'react';
import './New.scss';
import api from '../services/api';

class New extends Component {
  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: ''
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    console.log(data);

    await api.post('posts', data);

    this.props.history.push('/');

  }

  handleFileChange = e => {
    this.setState({ image: e.target.files[0]})
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <section className="new_post">
        <form className="form" onSubmit={this.handleSubmit}>
          <input type="file"
          onChange={this.handleFileChange}/>

          <input type="text"
          name="author"
          placeholder="Author"
          onChange={this.handleChange}
          value={this.state.author}/>

          <input type="text"
          name="place"
          placeholder="Place"
          onChange={this.handleChange}
          value={this.state.place}/>

          <input type="text"
          name="description"
          placeholder="Description"
          onChange={this.handleChange}
          value={this.state.description}/>

          <input type="text"
          name="hashtags"
          placeholder="Hashtags"
          onChange={this.handleChange}
          value={this.state.hashtags}/>

          <button type="submit">Enviar</button>
        </form>
      </section>
    );
  }
}


export default New;
