import { useEffect } from "react";
import { useState } from "react";
import { Match } from "./Match";

export function Recebida(props) {
  const [style, setStyle] = useState("block");
  const [click, setClick] = useState(0);
  const [data, setData] = useState({});

  useEffect(() => {
    if (props.count > click) {
      setClick(props.count);
      setStyle("block");
    }
  }, [props.count, data]);

  return (
    <div>
      <div className={"bg-[#9E9E9ECC] fixed top-0 w-full" + " " + style}>
        <div className="h-screen flex justify-center items-center px-8">
          <div className="bg-white rounded-md">
            <div className="flex justify-end px-2 pt-2">
              <button onClick={() => setStyle("hidden")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="px-8">
              <div className="h-2"></div>
              <h1 className="text-2xl">Mensagem recebida:</h1>
              <div className="h-4"></div>
              <p className="text-sm leading-6">{props.data.message}</p>
              <div className="h-4"></div>

              <div className="flex justify-end">
                <button
                  className="flex items-center gap-2"
                  onClick={() => {
                    setData(props.data);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                  <p className="text-base">Responder</p>
                </button>
              </div>
              <div className="h-20"></div>
            </div>
          </div>
        </div>
      </div>

      {data.message ? <Match data={data} /> : null}
    </div>
  );
}
