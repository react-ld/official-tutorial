# React 入门一

### 快速开始

因为 React 开发涉及 JSX 语法和ES6/7新语法还有开发环境和正式环境打包等等工作。建议新手可以使用 Facebook 官方推出的 [create-react-app](https://github.com/facebookincubator/create-react-app.git)快速开始学习基础知识和代码实践。等到实际项目开发时可以在深入的进行 webpack 定制化开发。

  ```shell
    //全局安装
    npm install -g create-react-app

    //创建项目
    create-react-app my-app
    cd my-app

    //运行
    npm start

    //测试
    npm test

    //打包
    npm run build
  ```
#### 局限性（不支持功能）
* Server rendering. 服务器端渲染
* Some experimental syntax extensions (e.g. decorators).一些实验性的语法（例如：修饰器）
* CSS Modules.
* LESS or Sass.
* Hot reloading of components.热更新

### 三种组件类型 

1. *React.createClass*
 
```js
import React, { Component } from 'react'

var TickTock = React.createClass({
  //初始化 state 值
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // Call a method on the mixin
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});
```

2. ES6 Classes  export class Name extends React.Component
```js
import React, { Component } from 'react'

export default class App extends Component{
  constructor(){
    super()
    //初始化 state 值
    this.state = {
      data: []
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

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>
    );
  }
}
```
3. 纯函数（pure funciton） stateless-functions 
```js
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}
或者 ES6 箭头函数
const Greeting = (props) => (
  <h1>Hello, {props.name}</h1>
);

ReactDOM.render(
  <Greeting name="Sebastian" />,
  document.getElementById('example')
);
```

参考链接：
https://facebook.github.io/react/docs/reusable-components.html
http://codecloud.net/12913.html

### 小知识点

1. className 和 style

    ```js
      render(){
        return (
          <div className="demo-class" style={{
            height: "100px",
            width: "100px",
            fontSize: "12px"
          }}>
          </div>
        )
      }
      render(){
        const styleObj = {
          height: "100px",
          width: "100px",
          fontSize: "12px"
        }
        return (
          <div className="demo-class" style={styleObj}>
          </div>
        )
      }
    ```

2. JXS 注释

    ```js
      render(){
        return (
          <div>
            {/* 这里面的内容都是注释 */}
          </div>
        )
      }
    ```

3. DOM 操作

    [ReactDOM.findDOMNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.finddomnode)
    
    ```js
      export default class image extends Component {
          constructor(props) {
            super(props)
          }
          componentDidMount(){
            //获取组件根 html DOM 元素对象
            let dom = findDOMNode(this)
          }
          render() {
            retrun <img/>
          }
      }
    ```
    [Refs to Comments](https://facebook.github.io/react/docs/more-about-refs.html)
    
    ```js
      export default class Demo extends Component {
          constructor(props) {
            super(props)
          }
          componentDidMount(){
            //这是该组件的根 DOM 对象
            console.info(this.refs.comRootDom);
            this._input.focus();
          }
          render() {
            retrun (
              <div ref="comRootDom">
                {/* ref 还支持函数形式，函数输入参数为 DOM 对象 */}
                <TextInput ref={(input) => this._input = input} />
              </div>
            )
          }
      }
    ```
4. 修改组件 state

    要想修改 this.state 必须通过 this.setState 函数进行设置
    ```js
      constructor(){
        super()
        this.state = {
          data: [],
          counter: 0,
          other: 1
        }
      }
      onClick(){
        //以下代码只会改版 this.state.counter 而不会影响 this.state.other 和 this.state.data
        this.setState({counter: this.state.counter + 1;
      }
      render(){
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
      }
    ```
    [MDN 对于 bind 的介绍](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

### 生命周期
对于生命周期的理解很重要，生命周期贯彻 react 组件的整个使用过程
![](./images/react_lifecycle.png)

1. Mounting: componentWillMount

    可以在这个函数中发情数据请求，此时进行 setState() render() 将只执行一次

2. Mounting: componentDidMount

    第一次 render() 执行后，此时可以读取对真实DOM进行相关操作

3. Updating: componentWillReceiveProps(nextProps)

    当组件 props 修改（即父组件传递参数变化），在第一次 render() 过程中不执行此函数

    | 变量 | 说明 |
    | -- | -- |
    | this.props | 老的 props |
    | nextProps | 新的 props |

4. Updating: shouldComponentUpdate(nextProps, nextState)
  
    如果配置该函数的话必须明确的返回 true 或者 false ，返回决定了本次变化是否引起组件重绘（及执行 render()）。
    在此函数中可以进行逻辑性的判断来减少组件重绘的次数

5. Updating: componentWillUpdate(nextProps, nextState)
  
    请不要在此函数中执行修改 state 的逻辑（即调用 setState 函数），如有需要请在 componentWillReceiveProps 中进行修改设置

6. Updating: componentDidUpdate(prevProps, prevState)
  
    完成组件更新（即完成本次更新重绘 render() 执行之后），此时可以进行 DOM 操作

7. Unmounting: componentWillUnmount
  
    组件被销毁时调用，已经进行各种销毁逻辑

8. render()
    
    必须返回唯一包裹组件

    ```js
      render(){
        retrun (
          <div>
          </div>
        )
      }
      // good
      render(){
        retrun (
          <div>
          </div>
          {/* */}
        )
      }
      // error
      render(){
        retrun (
          <div>
          </div>
          <div>
          </div>
        )
      }
      // error
    ```

参考链接：
https://facebook.github.io/react/docs/component-specs.html