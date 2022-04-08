import "./App.css";
import { Match, Home, Historico, EnviarMensagem } from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify";
import amplify_config from "./amplify-config";
import SignUpForm from "./Components/SignUpForm";
import SignInForm from "./Components/SignInForm";
import PrivateRoute from "./Components/PrivateRoute";

Amplify.configure(amplify_config);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastrar" element={<SignUpForm />} />
        <Route path="/login" element={<SignInForm />} />
        <Route
          path="/historico"
          element={
            <PrivateRoute>
              <Historico />
            </PrivateRoute>
          }
        />
        <Route
          path="/mensagem"
          element={
            <PrivateRoute>
              <EnviarMensagem />
            </PrivateRoute>
          }
        />
        <Route
          path="/match"
          element={
            <PrivateRoute>
              <Match />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <div>
              <h2>
                ERRO: 404 <br /> PAGINA NÃO ENCONTRADA
              </h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
