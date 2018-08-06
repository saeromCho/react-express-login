// InputPwd.js
import React, { Component } from 'react';
import Axios from 'axios';


class InputPwd extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      requestPW: '',
      correctPwd: false,
      userId: ''
    };
    this.requestPWChange = this.requestPWChange.bind(this);
    this.postData = this.postData.bind(this);
    console.log(this.props);
  }

  postData() {
    Axios.post('/post/pwd', {
      userID: this.props.userId,
      userPW: this.state.requestPW,
    }).then((responseData) => {
      // TODO : 디비에서 조회한 비밀번호가 맞으면 환영합니다 페이지
      if (responseData.data.result === 'correctPwd') {
        this.props.history.push({
            pathname: '/userInfo',
            state: { userId: this.props.requestID },
        });
      } else {
        this.setState({
          requestPW: '',
          correctPwd: false,
        });
      }
    });
  }

  requestPWChange(event) {
    this.setState({ requestPW: event.target.value });
  }

  render() {
    return (
      <div className="inputPwdWindow">
        <h1 className="title">PWD Template</h1>
            비밀번호 : <input type="password" name="requestPW" placeholder="Password" value={this.state.requestPW} onChange={this.requestPWChange} /><br /><br />
        <button className="loginwindowbutton" onClick={this.postData}>로그인</button>
      </div>
    );
  }
}

export default InputPwd;
