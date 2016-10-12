import React, { Component } from 'react';
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import logo from './logo.svg';
import './App.css';

const data = [
    {
        "id": 1388534400000,
        "author": "Pete Hunt",
        "text": "Hey there!"
    },
    {
        "id": 1420070400000,
        "author": "Paul O’Shannessy",
        "text": "React is *great*!"
    },
    {
        "id": 1464988635157,
        "author": "ben",
        "text": "*abc*"
    },
    {
        "id": 1464988636500,
        "author": "ben",
        "text": "*abc*"
    },
    {
        "id": 1464988717637,
        "author": "evil",
        "text": "<a href=\"javascript:alert(1)\">alert(1)</a>"
    }
]

export default class App extends Component{
  constructor(){
    super()
    this.state = {
      data: [],
      counter: 0,
      other: 1
    }
  }

  handleCommentSubmit(comment) {
    this.setState({
      data: [...this.state.data, comment]
    })
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({
        data: data
      })
    }, 3000)
  }

  onClick(){
    //以下代码只会改版 this.state.counter 而不会影响 this.state.other 和 this.state.data
    this.setState({counter: this.state.counter + 1});
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <span>other {this.state.other}</span>
        <span onClick={
          //bind 是 bind 函数在 ECMA-262 第五版才被加入（即ES5） 语法中函数的新方法用于绑定函数作用域的
          this.onClick.bind(this)
        }>counter = {this.state.counter}</span>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>
    );
  }
}

