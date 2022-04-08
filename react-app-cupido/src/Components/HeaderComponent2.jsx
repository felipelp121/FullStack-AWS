import { Link } from "react-router-dom";
export function HeaderComponent2() {
  return (
    <div className="bg-[#DE310B] px-4 h-16 text-white">
      <div className="flex justify-between items-center h-full">
        <Link to="/">Cupido Online</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
