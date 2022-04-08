import { useEffect } from "react";
import { useState } from "react";
import { HeaderComponent } from "../Components/HeaderComponent";
import { sendEmail } from "../services/sendEmail";
export function Match(props) {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  async function sendForm(e) {
    e.preventDefault();
    setResponse(
      await sendEmail(props.data.emailFrom, props.data.subject, text)
    );
    setText("");
  }

  return (
    <div className="bg-red-200 h-screen fixed top-0 w-full">
      <HeaderComponent />
      <div className="flex flex-col justify-center px-10">
        <div className="h-8"></div>
        <h1 className="text-xl text-center">É um match!</h1>
        <div className="h-6"></div>
        <div className="bg-white p-8 rounded-xl">
          <form onSubmit={sendForm} method="post">
            <label htmlFor="">Sua resposta</label>
            <textarea
              name=""
              id=""
              value={text}
              className="bg-gray-200 px-3 mt-2 h-32 block outline-none border w-full rounded-xl"
              onChange={(element) => setText(element.target.value)}
            ></textarea>
            <div className="h-6"></div>
            <div className="flex justify-center">
              <button className="bg-[#DE310B] py-1 px-6 rounded-lg text-white">
                Enviar
              </button>
            </div>
          </form>
          {response === "sucessed" ? (
            <p>Email enviado com sucesso!</p>
          ) : response === "failed" ? (
            <p>Ocorreu um erro ao tentar enviar o email!</p>
          ) : null}
        </div>
      </div>
      <div className="fixed bottom-0 bg-[#DE310B] h-16 w-full"></div>
    </div>
  );
}
