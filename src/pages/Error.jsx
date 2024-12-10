import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)]">
      <h1 className="text-3xl">404</h1>
      <h2 className="text-2xl">Página não Encontrada!</h2>
      <Link className="bg-blue-500 p-2.5 mt-3.5" to="/">Veja todos os Filmes!</Link>
    </div>
  );
}

export default Error;
