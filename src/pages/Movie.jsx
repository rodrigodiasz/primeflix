import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("FIlme nao encontrado");
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();

    return () => {
      console.log("Componente foi desmontado");
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      toast.warn("Esse filme ja esta na sua lista!");
      return;
    }
    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme Salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="">
        <h1>Carregando Detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="mt-3.5 flex flex-col max-w-3xl p-5 my-0 mx-auto">
      <h1 className="my-3.5 mx-0 text-3xl">{filme.title}</h1>
      <img
        className="w-[900px] max-w-full max-h-80 object-cover"
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />

      <h3 className="mt-2.5">Sinopse</h3>
      <p className="my-3.5 mx-0">{filme.overview}</p>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div>
        <button
          onClick={salvarFilme}
          className="mr-2.5 mt-3.5 ml-0 p-2.5 bg-red-900 hover:bg-red-950 cursor-pointer text-white"
        >
          Salvar
        </button>
        <button className="mr-2.5 mt-3.5 ml-0 p-2.5 bg-red-900 hover:bg-red-950 cursor-pointer text-white">
          <a
            href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}
            target="blank"
            rel="external"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
