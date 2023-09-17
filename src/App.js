import React from "react";
import LoginPage from "./components/LoginPage";
import UserPage from "./components/UserPage";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
    };
  }

  handleLogin = (username) => {
    this.setState({ loggedInUser: username });
  };

  render() {
    return (
      <div className="App">
        <h1>GRAPHQL</h1>
        {this.state.loggedInUser ? (
          <UserPage data={this.state.loggedInUser} />
        ) : (
          <LoginPage onLogin={this.handleLogin} />
        )}
      </div>
    );
  }

}
