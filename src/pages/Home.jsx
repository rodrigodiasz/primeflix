import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "",
          language: "pt-BR",
          page: 1,
        },
      });

      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }
    loadFilmes();
  }, []);

  if(loading){
    return(
      <div className="flex items-center justify-center mt-2">
        <h2>Carregando Filmes...</h2>
      </div>
    )
  }

  return (
    <div className="">
      <div className="max-w-3xl my-3.5 mx-auto">
        {filmes.map((filme) => {
          return (
            <article className="w-full bg-white p-3.5 rounded" key={filme.id}>
              <strong className="mb-3.5 text-center text-xl block">
                {filme.title}
              </strong>
              <img
                className="w-[900px] object-cover max-w-full max-h-80 block"
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
              />
              <Link
                className="flex items-center justify-center py-2.5 px-0 bg-blue-600 text-white"
                to={`/filme/${filme.id}`}
              >
                Acessar
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
