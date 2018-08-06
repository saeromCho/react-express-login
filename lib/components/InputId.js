import React, { Component } from 'react';
import Axios from 'axios';
import InputPwd from './InputPwd';
import SignUp from './SignUp';


class InputId extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      requestID: '',
      duplicateFlag: false,
      signUpFlag: false,
    };
    this.postData = this.postData.bind(this);
    this.requestIDChange = this.requestIDChange.bind(this);
  }

  postData() {
    Axios.post('/post/id', {
      'userID': this.state.requestID,
    }).then((responseData) => {
      if (responseData.data.result === 'goInputPwd') {
        this.setState({ // true이면 pwd입력 페이지로 넘어가게 구현
          duplicateFlag: true,
          signUpFlag: false,
          requestID: responseData.data.userID,
          redirectToReferrer: true,
        });
      } else { // 아이디가 존재하지 않을 때만 Database에 넣어주면서 지워줌, 회원가입 페이지로 넘어감
        this.setState({
          duplicateFlag: false,
          signUpFlag: true,
          requestID: responseData.data.userID,
        });
	  }
    });
  }

  requestIDChange(event) {
    this.setState({
      requestID: event.target.value,
    });
  }

  render() {
    if (this.state.duplicateFlag && !this.state.signUpFlag && this.state.redirectToReferrer) {
      return (
        <div>
        <InputPwd userId = {this.state.requestID} {...this.props} />
        </div>
      );
    } if (!this.state.duplicateFlag && this.state.signUpFlag) {
      return <SignUp userId={this.state.requestID} {...this.props} />;
    }
    return (
      <div className="inputIdPanel">
        <div className="inputIdWindow">
          <h1 className="title">Login Template</h1>
            아이디 : <input type="text" name="requestID" placeholder="Admin Id" value={this.state.requestID} onChange={this.requestIDChange} /><br />
          <button className="inputIdwindowbutton" onClick={this.postData}>아이디 확인</button>
        </div>
      </div>
    );
  }
}

export default InputId;
