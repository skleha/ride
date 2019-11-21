import React from "react";

class loginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  handleDemo(e) {
    let user = "DemoUser1@demo.com";
    let pass = "password";

    this.setState({ email: "", password: "" }, () =>
      this.demoLogin(user, pass)
    );
  }

  demoLogin(user, pass) {
    user = user.split("");
    pass = pass.split("");
    const _demoUser = user => {
      if (user.length > 0) {
        let char = user.shift();
        this.setState({ email: this.state.email + char }, () =>
          setTimeout(() => {
            _demoUser(user);
          }, 50)
        );
      } else {
        _demoPass(pass);
      }
    };
    const _demoPass = pass => {
      if (pass.length > 0) {
        let char = pass.shift();
        this.setState({ password: this.state.password + char }, () =>
          setTimeout(() => {
            _demoPass(pass);
          }, 50)
        );
      } else {
        const demo_user = Object.assign({}, this.state);
        this.props.processForm(demo_user);
      }
    };
    _demoUser(user);
  }

  componentDidMount() {
  }
  componentWillUnmount() {
  }

  render() {
    return (
      <div className="login-form-container signup-form-container">
        <div className="DemoUserLogin" onClick={this.handleDemo}>
          <button>Demo User Login</button>
        </div>
        
        <form onSubmit={this.handleSubmit} className="login-form-box">
          {this.renderErrors()}

          <div className="login-form">
            <label className="loginInputContainer ">
              <input
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                className="login-input"
                placeholder="Email"
              />
            </label>

            <label className="loginInputContainer ">
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                className="login-input"
                placeholder="Password"
              />
            </label>

            <input className="session-submit" type="submit" value="Log In" />
          </div>
        </form>
      </div>
    );
  }
}

export default loginForm;
