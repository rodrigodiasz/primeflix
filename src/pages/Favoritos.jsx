import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeflix");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return item.id !== id;
    });

    setFilmes(filtroFilmes);
    localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes))
    toast.success("Filme removido com sucesso!")
  }

  return (
    <div className="mt-4 p-5 flex flex-col items-center">
      <h1 className="mb-2.5 text-3xl">Meus filmes</h1>

      {filmes.length === 0 && <span>Voce nao possui nenhum filme salvo :( </span>}

      <ul className="w-[720px]">
        {filmes.map((item) => {
          return (
            <li
              className="flex items-center justify-between mb-2.5"
              key={item.id}
            >
              <span className="text-xl">{item.title}</span>
              <div className="flex gap-5">
                <Link
                  className="mr-2.5 mt-3.5 ml-0 p-2.5 bg-red-900 hover:bg-red-950 cursor-pointer text-white"
                  to={`/Filme/${item.id}`}
                >
                  Ver Detalhes
                </Link>
                <button className="mr-2.5 mt-3.5 ml-0 p-2.5 bg-red-900 hover:bg-red-950 cursor-pointer text-white" onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favoritos;
