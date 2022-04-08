import { HeaderComponent2 } from "../Components/HeaderComponent2";
import { Link } from "react-router-dom";
export function Home() {
  return (
    <div className="bg-red-200 h-screen">
      <HeaderComponent2 />
      <div className="bg-cover bg-[url('https://ichi.pro/assets/images/max/724/0*08iHaB3cwOzLdglY')]">
        <div className="flex items-center h-60 px-4">
          <h1 className="text-white text-2xl leading-7 w-56">
            Envie mensagens anonimamente para aquela pessoa especial
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-8"></div>
        <h1 className="text-2xl">Cadastre-se agora mesmo</h1>
        <div className="h-6"></div>
        <Link to="/cadastrar">
          <button className="bg-[#DE310B] py-1 px-6 rounded-lg text-white">
            Cadastrar
          </button>
        </Link>
        <div className="h-6"></div>
        <h1 className="text-2xl text-center w-72">
          Não perca mais tempo e conquiste logo o seu grande amor
        </h1>
      </div>
      <div className="fixed bottom-0 bg-[#DE310B] h-16 w-full"></div>
    </div>
  );
}
