import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import pokemonImage from "../Images/pokeball.jpg";

const CardNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const datas = location.state;

  if (!datas || !datas.moves || datas.moves.length === 0) {
    return <div>Details not found</div>;
  }

  const moveData = datas.moves[0].move;
  const pokemonType = datas.types[0].type; 

  const handleChange = () => {
    navigate(-1)
  };

  return (
    <>
      <div
        className="min-w-screen min-h-screen flex items-center p-5 lg:p-10 overflow-hidden relative"
        style={{ backgroundImage: `url(${pokemonImage})` }}
      >
        <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-4 mx-auto text-gray-800 relative md:text-left">
          <div className="md:flex items-center -mr-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <h1
                className="text-xl cursor-pointer inline text-blue-600"
                onClick={handleChange}
              >
                Back
              </h1>
              <div className="relative w-4/5">
                <img
                  src={datas.sprites.front_default}
                  className="w-full relative z-10"
                  alt={datas.sprites.front_default}
                ></img>
                <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-10">
              <div className="mb-5">
                <h1 className="font-bold uppercase text-3xl mb-5 text-pink-600">
                  {datas.name}{" "}
                </h1>
                <p className="sm:text-2xl xs:text-xl font-bold">
                  Pokemon Height: {datas.height}
                </p>
              </div>

              <div className="inline-block align-bottom mb-5">
                <p className="font-bold sm:text-2xl xs:text-xl leading-none align-baseline">
                  Pokemon Id: {datas.id}
                </p>
              </div>
              <p className="font-bold sm:text-2xl xs:text-xl leading-none align-baseline">
                Pokemon Move: {moveData.name}
              </p>
              <p className="font-bold sm:text-2xl xs:text-xl leading-none align-baseline pt-5">
                Pokemon Weight: {datas.weight}
              </p>
              <p className="font-bold sm:text-2xl xs:text-xl leading-none align-baseline pt-5">
                Pokemon Type: {pokemonType.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardNavigate;
