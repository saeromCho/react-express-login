// UserInfo.js
import React from 'react';
import {
  Link,
  Redirect,
} from 'react-router-dom';


class UserInfo extends React.Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      logout: false,
      userId: this.props.location.state.userId,
      isAuthenticated: true,
    };
    this.goBack = this.goBack.bind(this);
    this.goMain = this.goMain.bind(this);
  }

  goBack() {
    this.setState({
      logout: true,
    });
  }

  goMain() {
    this.setState({
      logout: false,
    });
  }

  render() {
    if (this.state.logout) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <div className="userinfo">
        <h1 className="title">로그인 성공</h1>
        <button type="button" className="userinfologoutbutton" value="logout" onClick={this.goBack}>
            로그아웃
        </button>
        <Link to="/welcome">
          <button type="button" className="goMain" onClick={this.goMain}>
            메인화면 가기
          </button>
        </Link>
      </div>
    );
  }
}


export default UserInfo;
