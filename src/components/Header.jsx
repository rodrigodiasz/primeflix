import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex items-center justify-between w-full h-16 bg-black text-white p-5">
      <Link className="logo text-3xl font-bold" to="/">Prime Flix</Link>
      <Link className="Favoritos" to="Favoritos">Meus Favoritos</Link>
    </header>
  );
}

export default Header;
