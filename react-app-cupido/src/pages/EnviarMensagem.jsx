import { useState } from "react";
import { sendEmail } from "../services/sendEmail";
import { HeaderComponent } from "../Components/HeaderComponent";

export function EnviarMensagem() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  async function sendForm(event) {
    event.preventDefault();
    setResponse(await sendEmail(email, subject, text));
    setSubject("");
    setEmail("");
    setText("");
  }

  return (
    <div className="bg-red-200 h-screen">
      <HeaderComponent />
      <div className="flex flex-col justify-center px-10">
        <div className="h-8"></div>
        <h1 className="text-xl text-center">Envie mensagens anonimamente</h1>
        <div className="h-6"></div>

        <form
          className="bg-white p-8 rounded-xl"
          onSubmit={sendForm}
          method="post"
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="bg-gray-200 px-3 my-2 h-8 block outline-none border w-full rounded-xl"
            name="email"
            value={email}
            onChange={(element) => setEmail(element.target.value)}
          />

          <label htmlFor="subject">Titulo</label>
          <input
            type="text"
            className="bg-gray-200 px-3 my-2 h-8 block outline-none border w-full rounded-xl"
            name="name"
            value={subject}
            onChange={(element) => setSubject(element.target.value)}
          />

          <label htmlFor="text">Texto</label>
          <textarea
            className="bg-gray-200 px-3 mt-2 h-32 block outline-none border w-full rounded-xl"
            name="text"
            value={text}
            onChange={(element) => setText(element.target.value)}
          ></textarea>

          <div className="h-6"></div>
          <div className="flex justify-center">
            <button
              className="bg-[#DE310B] py-1 px-6 rounded-lg text-white"
              type="submit"
            >
              Enviar
            </button>

            {response === "sucessed" ? (
              <p>Email enviado com sucesso!</p>
            ) : response === "failed" ? (
              <p>Ocorreu um erro ao tentar enviar o email!</p>
            ) : null}
          </div>
        </form>
      </div>
      <div className="fixed bottom-0 bg-[#DE310B] h-16 w-full"></div>
    </div>
  );
}
