import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { HeaderComponent2 } from "../Components/HeaderComponent2";
import { Navigate, Link } from "react-router-dom";

class SignUpForm extends Component {
  state = {
    signedUp: false,
    confirmed: false,
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    confirmationCode: "",
    submittingSignUp: false,
    submittingConfirmation: false,
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
    this.handleSubmitConfirmationSignUp =
      this.handleSubmitConfirmationSignUp.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmitSignUp(e) {
    e.preventDefault(e);
    const { confirmed, signedUp, username, password, email } = this.state;

    if (!confirmed && !signedUp) {
      this.setState({ submittingSignUp: true });

      Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      })
        .then(() =>
          this.setState({
            signedUp: true,
            submittingSignUp: false,
            [e.target.name]: "",
          })
        )
        .catch((err) => {
          this.setState({ submittingSignUp: false });
          console.log(err);
        });
    }
  }

  handleSubmitConfirmationSignUp(e) {
    e.preventDefault(e);
    const { confirmed, signedUp, username, confirmationCode } = this.state;

    if (!confirmed && signedUp) {
      this.setState({ submittingConfirmation: true });

      Auth.confirmSignUp(username, confirmationCode)
        .then(() =>
          this.setState({ submittingConfirmation: false, confirmed: true })
        )
        .catch((err) => {
          console.log(err);
          this.setState({ submittingConfirmation: false });
        });
    }
  }

  render() {
    if (this.state.confirmed) {
      return <Navigate to="/mensagem" />;
    }

    if (this.state.signedUp) {
      return (
        <div className="bg-red-200 h-screen">
          <HeaderComponent2 />
          <div className="flex flex-col justify-center px-10">
            <div className="h-8"></div>
            <h1 className="text-2xl text-center">Cadastre-se agora mesmo</h1>
            <div className="h-6"></div>
            <div className="bg-white p-8 rounded-xl">
              <form onSubmit={this.handleSubmitConfirmationSignUp}>
                <label htmlFor="usernameConfirmationInput">
                  Nome de Usuário
                </label>
                <input
                  type="text"
                  name="username"
                  id="usernameConfirmationInput"
                  className="bg-gray-200 px-3 my-1 h-8 block outline-none border w-full rounded-xl"
                  onChange={this.handleChange}
                />
                <label htmlFor="codeConfirmationInput">
                  Código de confirmação
                </label>
                <input
                  type="text"
                  name="confirmationCode"
                  id="codeConfirmationInput"
                  className="bg-gray-200 px-3 my-1 h-8 block outline-none border w-full rounded-xl"
                  onChange={this.handleChange}
                />
                <div className="h-6"></div>
                <div className="flex justify-center">
                  <button
                    className="bg-[#DE310B] py-1 px-6 rounded-lg text-white"
                    disabled={this.state.submittingConfirmation}
                    type="submit"
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
            <div className="h-4"></div>
          </div>
          <div className="fixed bottom-0 bg-[#DE310B] h-16 w-full"></div>
        </div>
      );
    }

    return (
      <div className="bg-red-200 h-screen">
        <HeaderComponent2 />
        <div className="flex flex-col justify-center px-10">
          <div className="h-8"></div>
          <h1 className="text-2xl text-center">Cadastre-se agora mesmo</h1>
          <div className="h-6"></div>
          <div className="bg-white p-8 rounded-xl">
            <form onSubmit={this.handleSubmitSignUp}>
              <label htmlFor="usernameSignUpInput">Nome de Usuário</label>
              <input
                type="text"
                name="username"
                id="usernameSignUpInput"
                className="bg-gray-200 px-3 my-1 h-8 block outline-none border w-full rounded-xl"
                onChange={this.handleChange}
              />
              <label htmlFor="emailSignUpInput">Email</label>
              <input
                type="email"
                name="email"
                id="emailSignUpInput"
                className="bg-gray-200 px-3 my-1 h-8 block outline-none border w-full rounded-xl"
                onChange={this.handleChange}
              />
              <label htmlFor="passwordSignUpInput">Senha</label>
              <input
                type="password"
                name="password"
                id="passwordSignUpInput"
                className="bg-gray-200 px-3 my-1 h-8 block outline-none border w-full rounded-xl"
                onChange={this.handleChange}
              />
              <div className="h-6"></div>
              <div className="flex justify-center">
                <button
                  className="bg-[#DE310B] py-1 px-6 rounded-lg text-white"
                  disabled={this.state.submittingSignUp}
                  type="submit"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
          <div className="h-4"></div>
          <p className="text-center text-base">
            Já possue cadastro? <Link to="/login"> Faça Login</Link>
          </p>
        </div>
        <div className="fixed bottom-0 bg-[#DE310B] h-16 w-full"></div>
      </div>
    );
  }
}

export default SignUpForm;
