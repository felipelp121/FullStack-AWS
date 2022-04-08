import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
export function HeaderComponent() {
  function logout() {
    Auth.signOut();
  }

  return (
    <div className="bg-[#DE310B] px-4 h-16 text-white">
      <div className="flex justify-between items-center h-full">
        <Link to="/">Cupido Online</Link>
        <div className="flex gap-3 text-sm items-center">
          <Link to="/mensagem">Mensagem</Link>
          <Link to="/historico">Histórico</Link>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
