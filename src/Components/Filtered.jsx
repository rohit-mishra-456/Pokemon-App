import React, { useState } from "react";

const Filtered = ({ pokemonData, onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setIsOpen(false);
    onFilter(type);
    onFilter(type === "None" ? null : type);
  };

  // Create a set to store unique type names
  const uniqueTypes = new Set(["None"]);

  // Populate the set with unique type names
  pokemonData.forEach((pokemon) => {
    pokemon.types.forEach((type) => {
      uniqueTypes.add(type.type.name);
    });
  });

  return (
    <div className="relative flex justify-end mr-8">
      <div>
        <button
          id="dropdownDefaultButton"
          onClick={toggleDropdown}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Filteration{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdown"
          className={`absolute right-0 mt-2 z-10 ${
            isOpen ? "" : "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {/* Map over the unique types and display each name */}
            {[...uniqueTypes].map((typeName) => (
              <li key={typeName}>
                <button
                  
                  className={`block px-4 w-full text-start py-2 ${
                    selectedType === typeName
                      ? "bg-gray-100 dark:bg-gray-600 dark:text-white"
                      : "hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  }`}
                  onClick={() => handleTypeClick(typeName)}
                >
                  {typeName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filtered;
