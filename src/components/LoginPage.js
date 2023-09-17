import React from "react";
import { login, getData } from "../getToken.js"

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }

    render() {
        return (
            <div className="login-page">
                <form>
                    <input 
                        type="text"
                        placeholder="name or email" 
                        value={this.state.username} 
                        onChange={(e) => this.setState({ username: e.target.value })} />
                    <input
                        type="password"
                        placeholder="password" 
                        value={this.state.password} 
                        onChange={(e) => this.setState({ password: e.target.value })} />
                    <button id="login-btn" type='button' onClick={this.handleLogin}>Login</button>
                </form>
            </div>
        );
    }
    handleLogin = () => {
        const { username, password } = this.state;
        login(username, password)
          .then((data) => {
            if (data !== false) {
              return getData(data);
            } else {
              alert('Wrong username or password, try again');
              return null; 
            }
          })
          .then((userData) => {
            if (userData) {
              this.props.onLogin(userData);
            }
          })
      };
}