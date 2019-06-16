import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import io from 'socket.io-client';

import api from '../services/api';
import camera from '../assets/camera.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

export default class Feed extends Component {
  state = {
    posts: []
  }

  async componentDidMount(){
    this.registerToSocket();

    const response = await api.get('posts');

    console.log(response.data);
    this.setState({posts: response.data});

  }

  registerToSocket = () => {
    const socket = io('http://10.0.3.2:3333');

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

  static navigationOptions = ({navigation}) => ({
    headerRight: (
      <TouchableOpacity style={{marginRight: 20}} onPress={() => navigation.navigate('New')}>
        <Image source={camera}/>
      </TouchableOpacity>
    )
  })

  render() {
    return (
      <View style={styles.container}>
        <FlatList
        data={this.state.posts}
        keyExtractor={post => post._id}
        renderItem={({item : post}) => (
          <View style={styles.post}>

            <View style={styles.postHeader}>
              <View style={styles.postHeaderInfo}>
                <Text style={styles.postHeaderName}>{post.author}</Text>
                <Text style={styles.postHeaderPlace}>{post.place}</Text>
              </View>

              <Image source={more}/>
            </View>

            <Image style={styles.postImage} source={{uri: `http://10.0.3.2:3333/files/${post.image}`}}/>

            <View style={styles.postFooter}>
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.postAction} onPress={() => { this.handleLike(post._id)}}>
                  <Image style={styles.postActionLike} source={like}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                  <Image style={styles.postActionComment} source={comment}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.postAction}>
                  <Image style={styles.postActionSend} source={send}/>
                </TouchableOpacity>
              </View>

              <Text style={styles.postLikes}>{post.likes} likes</Text>
              <Text style={styles.postDescription}>{post.description}</Text>
              <Text style={styles.postHashtags}>{post.hashtags}</Text>

            </View>

          </View>
        )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  post: {
    marginTop: 20,
  },

  postHeader: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  postHeaderName: {
    fontSize: 14,
    color: '#000',
  },

  postHeaderPlace: {
    fontSize: 12,
    color: '#666',
    marginTop: 2
  },

  postImage: {
    width: '100%',
    height: 400,
    marginVertical: 15
  },

  postFooter: {
    paddingHorizontal: 15,
  },

  postActions: {
    flexDirection: 'row',
  },

  postAction: {
    marginRight: 8
  },

  postLikes: {
    marginTop: 10,
    fontWeight: '600',
    color: '#000'
  },

  postDescription: {
    lineHeight: 18,
    color: '#000'
  },

  postHashtags: {
    color: '#7159c1'
  }

});
