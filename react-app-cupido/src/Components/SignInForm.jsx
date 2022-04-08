import React, { Component } from "react";
import { Auth } from "aws-amplify";
import Cache from "aws-amplify";
import { HeaderComponent2 } from "../Components/HeaderComponent2";
import { Navigate, Link } from "react-router-dom";

class CognitoReactSignInForm extends Component {
  state = {
    username: "",
    password: "",
    signedIn: false,
    isSigningIn: false,
    isSigningOut: false,
    tokenId: "",
    refreshToken: "",
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { signedIn, username, password } = this.state;

    if (!signedIn) {
      this.setState({ isSigningIn: true });
      Auth.signIn({
        username,
        password,
      })
        .then((cognitoUser) => {
          Auth.currentSession()
            .then((userSession) => {
              this.setState({
                signedIn: true,
                isSigningIn: false,
                tokenId: userSession.idToken.jwtToken,
                refreshToken: userSession.refreshToken.token,
              });
            })
            .catch((err) => {
              this.setState({ isSigningIn: false });
            });
        })
        .catch((err) => {
          this.setState({ isSigningIn: false });
        });
    }
  }

  changeAuthStorageConfiguration(e) {
    const shouldRememberUser = e.target.checked;
    if (shouldRememberUser) {
      const localStorageCache = Cache.createInstance({
        keyPrefix: "localStorageAuthCache",
        storage: window.localStorage,
      });

      Auth.configure({
        storage: localStorageCache,
      });
    } else {
      const sessionStorageCache = Cache.createInstance({
        keyPrefix: "sessionAuthCache",
        storage: window.sessionStorage,
      });

      Auth.configure({
        storage: sessionStorageCache,
      });
    }
  }

  handleLogout() {
    if (this.state.signedIn) {
      this.setState({ isSigningOut: true });
      Auth.signOut()
        .then((data) => {
          this.setState({
            signedIn: false,
            isSigningOut: false,
            tokenId: "",
            refreshToken: "",
          });
        })
        .catch((err) => {
          this.setState({ isSigningOut: false });
        });
    }
  }

  componentDidMount() {
    this.setState({ isSigningIn: true });
    Auth.currentSession()
      .then((userSession) => {
        this.setState({
          signedIn: true,
          isSigningIn: false,
          tokenId: userSession.idToken.jwtToken,
          refreshToken: userSession.refreshToken.token,
        });
      })
      .catch((err) => {
        this.setState({ isSigningIn: false });
      });
  }

  render() {
    if (this.state.signedIn) {
      return <Navigate to="/mensagem" />;
    }

    return (
      <div className="bg-red-200 h-screen">
        <HeaderComponent2 />
        <div className="flex flex-col justify-center px-10">
          <div className="h-8"></div>
          <h1 className="text-2xl text-center">Login</h1>
          <div className="h-6"></div>
          <div className="bg-white p-8 rounded-xl">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="usernameSignInInput">Nome de Usuário</label>
              <input
                type="text"
                name="username"
                id="usernameSignInInput"
                className="bg-gray-200 px-3 my-1 h-8 block outline-none border w-full rounded-xl"
                onChange={this.handleChange}
              />

              <label htmlFor="passwordSignInInput">Senha</label>
              <input
                type="password"
                name="password"
                id="passwordSignInInput"
                className="bg-gray-200 px-3 my-1 h-8 block outline-none border w-full rounded-xl"
                onChange={this.handleChange}
              />
              <div className="form-group form-check">
                <input
                  defaultChecked
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMeSignInInput"
                  onChange={this.changeAuthStorageConfiguration}
                />
                <label
                  className="form-check-label"
                  htmlFor="rememberMeSignInInput"
                >
                  Lembrar-se de mim
                </label>
              </div>

              <div className="h-6"></div>
              <div className="flex justify-center">
                <button
                  className="bg-[#DE310B] py-1 px-6 rounded-lg text-white"
                  disabled={this.state.submittingSignUp}
                  type="submit"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
          <div className="h-4"></div>
          <p className="text-center text-base">
            Ainda não possue cadastro?{" "}
            <Link to="/cadastrar"> Cadastre-se </Link>
          </p>
        </div>
        <div className="fixed bottom-0 bg-[#DE310B] h-16 w-full"></div>
      </div>
    );
  }
}

export default CognitoReactSignInForm;
