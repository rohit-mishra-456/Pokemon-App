import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import Filtered from "./Filtered";

const Card = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemonData, setFilteredPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPokemonData, setNextPokemonData] = useState();
  const [previousPokemonData, setPreviousPokemonData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);

  const fetchPokemonData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setNextPokemonData(data.next);
      setPreviousPokemonData(data.previous);
      setPages(data.count);
      await getPokemonDetails(data.results);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getPokemonDetails = async (results) => {
    const newData = [];
    for (const item of results) {
      const existingPokemon = pokemonData.find(
        (pokemon) => pokemon.id === item.id
      );
      if (existingPokemon) {
        newData.push(existingPokemon);
      } else {
        const result = await fetch(item.url);
        const resultData = await result.json();
        newData.push(resultData);
      }
    }
    setPokemonData(newData.sort((a, b) => a.id - b.id));
    setLoading(false);
  };

  const navigate = useNavigate();
  const handleClick = (id) => {
    const selectedPokemon = pokemonData.find((pokemon) => pokemon.id === id);
    if (selectedPokemon) {
      navigate(`/pokemon/${id}`, {
        state: { ...selectedPokemon, pokemonData },
      });
    }
  };

  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const page = parseInt(urlParams.get("page")) || 1;
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    const offset = currentPage === 1 ? 0 : (currentPage - 1) * 20;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}`;
    fetchPokemonData(url);
    navigate(`?page=${currentPage}`);
  }, [currentPage]);

  useEffect(() => {
    setFilteredPokemonData(pokemonData);
  }, [pokemonData]);

  const PAGE_SIZE = 20;

  const TotalPages = Math.ceil(pages / PAGE_SIZE);

  const handleFilter = (type) => {
    if (type) {
      const filtered = pokemonData.filter((pokemon) =>
        pokemon.types.some((t) => t.type.name === type)
      );
      setFilteredPokemonData(filtered);
    } else {
      setFilteredPokemonData(pokemonData);
    }
  };

  return (
    <>
      {currentPage > TotalPages && !loading ? (
        <div className="text-2xl flex items-center justify-center h-lvh">
          Page not found
        </div>
      ) : loading ? (
        <div
          role="status"
          className="flex justify-center items-center h-lvh bg-black"
        >
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="bg-black">
          <div>
            <h1 className="text-3xl font-extrabold text-center p-10 text-yellow-400">
              Pokemon App
            </h1>
            <div className="">
              <Filtered pokemonData={pokemonData} onFilter={handleFilter} />
            </div>
            <div className="grid lg:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 gap-3 p-6">
              {filteredPokemonData?.length > 0 ? (
                filteredPokemonData.map((pokemon) => (
                  <div key={pokemon.id}>
                    <div
                      className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #FF0000, #FFFF00, #00FF00, #FF00FF, #0000FF)",
                      }}
                      onClick={() => handleClick(pokemon.id)}
                    >
                      <h1 className="text-xl px-6 py-4">Id: {pokemon.id}</h1>
                      <img
                        className="w-3/6"
                        src={pokemon.sprites.front_default}
                        alt="Pokemon"
                      />
                      <div className="px-2 py-2">
                        <div className="font-bold text-xl mb-2 uppercase text-center">
                          {pokemon.name}
                        </div>
                        <p className="text-black text-xl text-right">
                          O/N. {pokemon.order}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-center text-2xl">No data found</h1>
              )}
            </div>
          </div>
          <div className="flex gap-20 mt-7 justify-center">
            <button
              className={`bg-black hover:bg-white hover:text-black text-white  font-bold py-2 px-4 rounded ${
                !previousPokemonData
                  ? "disabled:opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {
                if (previousPokemonData) {
                  setLoading(true);
                  setPokemonData([]);
                  setCurrentPage((prev) => prev - 1);
                }
              }}
              disabled={!previousPokemonData}
            >
              Prev
            </button>
            <button
              className="bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                if (nextPokemonData) {
                  setLoading(true);
                  setPokemonData([]);
                  setCurrentPage((prev) => prev + 1);
                }
              }}
              disabled={!nextPokemonData}
            >
              Next
            </button>
          </div>
          <div className="p-8">
            <ResponsivePagination
              current={currentPage}
              total={TotalPages}
              pageRangeDisplayed={5}
              onPageChange={(page) => {
                setLoading(true);
                setCurrentPage(page);
              }}
              maxWidth={100}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
