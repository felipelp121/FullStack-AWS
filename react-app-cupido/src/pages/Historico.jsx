import { HeaderComponent } from "../Components/HeaderComponent";
// import { DataHistory } from "../Components/DataHistory";
import { Auth } from "aws-amplify";
import { useEffect } from "react";
import { useState } from "react";
import { Enviada } from "./Enviada";
import { Recebida } from "./Recebida";
export function Historico() {
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [optionRecebidas, setOptionRecebidas] = useState(true);
  const [optionEnviadas, setOptionEnviadas] = useState(false);
  const [styleRecebida, setStyleRecebida] = useState(
    "border-b-2 border-b-red-500 pb-2"
  );
  const [styleEnviada, setStyleEnviada] = useState(
    "border-b border-b-gray-500 pb-2 text-gray-600"
  );
  const [modalEnviadas, setModalEnviadas] = useState({});
  const [modalRecebidas, setModalRecebidas] = useState({});
  const [clickEnviadas, setClickEnviadas] = useState(0);
  const [clickRecebidas, setClickRecebidas] = useState(0);

  useEffect(() => {
    data();
  }, []);

  async function data() {
    const user = await Auth.currentUserInfo();
    const userEmail = user.attributes.email;
    if (!userEmail) return false;

    const recebidas = await fetch(
      `https://qqqlarfevc.execute-api.us-east-1.amazonaws.com/dev/history/${userEmail}`,
      {
        method: "GET",
      }
    );
    const resRecebidas = await recebidas.json();

    const enviadas = await fetch(
      `https://z7x57qrr32.execute-api.us-east-1.amazonaws.com/dev/history/${userEmail}`,
      {
        method: "GET",
      }
    );
    const resEnviadas = await enviadas.json();

    setSent(await resEnviadas);
    setReceived(await resRecebidas);
  }

  return (
    <div className="bg-red-200 h-screen">
      <HeaderComponent />
      <div className="h-8"></div>
      <h1 className="text-xl text-center">Histórico</h1>
      <div className="h-6"></div>
      <div className="flex justify-center gap-6">
        <h1
          className={styleRecebida}
          onClick={() => {
            setOptionEnviadas(false);
            setOptionRecebidas(true);
            setStyleEnviada("border-b border-b-gray-500 pb-2 text-gray-600");
            setStyleRecebida("border-b-2 border-b-red-500 pb-2");
          }}
        >
          Recebidas
        </h1>
        <h1
          className={styleEnviada}
          onClick={() => {
            setOptionRecebidas(false);
            setOptionEnviadas(true);
            setStyleEnviada("border-b-2 border-b-red-500 pb-2");
            setStyleRecebida("border-b border-b-gray-500 pb-2 text-gray-600");
          }}
        >
          Enviadas
        </h1>
      </div>

      {sent.length > 0 && optionEnviadas === true ? (
        sent.map((element, index) => (
          <div
            key={index}
            onClick={() => {
              setClickEnviadas(clickEnviadas + 1);
              setModalEnviadas(element);
            }}
            className="bg-red-200"
          >
            <div className="h-6"></div>
            <div className="flex justify-center gap-2 px-8">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <p className="w-10 text-center">{index + 1}</p>
              </div>
              <div className="bg-white w-full truncate rounded-xl p-2">
                <p className="text-sm">{element.message}</p>
              </div>
            </div>
          </div>
        ))
      ) : optionEnviadas === true ? (
        <div className="h-screen px-3 py-3">
          <p>Você não possui ainda nenhuma mensagem enviada</p>
        </div>
      ) : null}

      {received.length > 0 && optionRecebidas === true ? (
        received.map((element, index) => (
          <div
            key={index}
            onClick={() => {
              setClickRecebidas(clickRecebidas + 1);
              setModalRecebidas(element);
            }}
          >
            <div className="h-6"></div>
            <div className="flex justify-center gap-2 px-8">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <p className="w-10 text-center">{index + 1}</p>
              </div>
              <div className="bg-white w-full truncate rounded-xl p-2">
                <p className="text-sm">{element.message}</p>
              </div>
            </div>
          </div>
        ))
      ) : optionRecebidas === true ? (
        <div className="h-screen px-3 py-3">
          <p>Você não possui ainda nenhuma mensagem recebida</p>
        </div>
      ) : null}

      {modalEnviadas.message ? (
        <Enviada data={modalEnviadas} count={clickEnviadas} />
      ) : null}

      {modalRecebidas.message ? (
        <Recebida data={modalRecebidas} count={clickRecebidas} />
      ) : null}

      <div className="h-6 bg-red-200"></div>
      <div className="h-16 bg-red-200"></div>
      <div className="fixed bottom-0 bg-[#DE310B] h-16 w-full"></div>
    </div>
  );
}
