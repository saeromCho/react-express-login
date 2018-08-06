// UserInfo.js
import React from 'react';
import { Redirect } from 'react-router-dom';


class Welcome extends React.Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      logout: false,
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.setState({
      logout: true,
    });
  }

  render() {
    if (this.state.logout) {
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <div>
        <h1>웰컴</h1>
        <button type="button" className="userinfologoutbutton" value="logout" onClick={this.goBack}>
            로그아웃
        </button>
      </div>
    );
  }
}
export default Welcome;
