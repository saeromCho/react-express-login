import React, { Component } from 'react';
import Axios from 'axios';


class SignUp extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      userId: '',
      requestPW: '',
      confirmRequestPW: '',
      pwIsTwinFlag: false,
      completeSignUp: false,
    };
    this.requestIDChange = this.requestIDChange.bind(this);
    this.requestPWChange = this.requestPWChange.bind(this);
    this.confirmRequestPWChange = this.confirmRequestPWChange.bind(this);
    this.postData = this.postData.bind(this);
  }

  componentWillMount() {
    document.addEventListener('requestPWChange', this.requestPWChange.bind(this));
    document.addEventListener('confirmRequestPWChange', this.confirmRequestPWChange.bind(this));
  }

  componentWillUnmount() {
    document.addEventListener('requestPWChange', this.requestPWChange.bind(this));
    document.addEventListener('confirmRequestPWChange', this.confirmRequestPWChange.bind(this));
  }

  postData() {
    if (this.state.pwIsTwinFlag === true) {
      Axios.post('/post/signUp', {
        userID: this.props.userId, // this.props.userId,
        requestPW: this.state.requestPW,
      }).then((responseData) => {
        if (responseData.data.result === 'signUpComplete') {
          this.setState({
            completeSignUp: true,
            userId: '',
            requestPW: '', // 일단 그냥 하나만 초기화 해놓기
            confirmRequestPW: '',
            pwIsTwinFlag: false,
          });
          // 축하합니다 환영 창 띄우기. 페이지 구현 안해도 됨. 확인만 가능하게끔 구현하면 됨.
        }
      });
    } else {
      // 알러트 창 띄우기? 일단 콘솔 띄우자
      console.log('비밀번호가 같지 않아요. 그래서 입력하신 데이터가 서버로 못가요.');
    }
  }


  requestIDChange(event) {
    this.setState({ userId: event.target.value });
  }

  requestPWChange(event) {
    this.setState({ requestPW: event.target.value });
    this.checkSamePassword(event.target.value);
  }

  confirmRequestPWChange(event) {
    this.setState({ confirmRequestPW: event.target.value });
    this.checkSamePassword(event.target.value);
  }

  checkSamePassword(value) {
    if (value === this.state.requestPW || value === this.state.confirmRequestPW) {
      this.setState({
        pwIsTwinFlag: true,
      });
    } else {
      this.setState({
        pwIsTwinFlag: false,
      });
    }
  }


  render() {
    return (
      <div className="signUpWindow">
        <h1 className="title">Login Template</h1>
          아이디 : <input type="text" name="requestID" placeholder="Admin Id" value={this.props.userId} onChange={this.requestIDChange} /><br />
          비밀번호 : <input type="text" name="requestPW" placeholder="password" value={this.state.requestPW} onChange={this.requestPWChange} /><br />
          비밀번호 확인 : <input type="text" name="confrimRequestPW" placeholder="confirm password" value={this.state.confirmRequestPW} onChange={this.confirmRequestPWChange} /><br />
        <button className="signUpwindowbutton" onClick={this.postData}>확인</button>
      </div>
    );
  }
}

export default SignUp;
