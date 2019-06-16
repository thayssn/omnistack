import React, { Component } from 'react';
import './New.scss';
import api from '../services/api';

class New extends Component {
  state = {
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    const {
      image, author, place, description, hashtags,
    } = this.state;

    const { history } = this.props;

    data.append('image', image);
    data.append('author', author);
    data.append('place', place);
    data.append('description', description);
    data.append('hashtags', hashtags);

    await api.post('posts', data);

    history.push('/');
  }

  handleFileChange = (e) => {
    this.setState({ image: e.target.files[0] });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      author, place, description, hashtags,
    } = this.state;
    return (
      <section className="new_post">
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            type="file"
            onChange={this.handleFileChange}
          />

          <input
            type="text"
            name="author"
            placeholder="Author"
            onChange={this.handleChange}
            value={author}
          />

          <input
            type="text"
            name="place"
            placeholder="Place"
            onChange={this.handleChange}
            value={place}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
            value={description}
          />

          <input
            type="text"
            name="hashtags"
            placeholder="Hashtags"
            onChange={this.handleChange}
            value={hashtags}
          />

          <button type="submit">Enviar</button>
        </form>
      </section>
    );
  }
}


export default New;
