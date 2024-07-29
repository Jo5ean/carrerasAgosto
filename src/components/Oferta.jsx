import React, { useState, useEffect } from "react";
import Card from "./Card";
import { datita } from "../scripts/datita";

// Función para eliminar diacríticos
const sinDiacriticos = (function () {
  let de = "ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç",
    a = "AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc",
    re = new RegExp("[" + de + "]", "ug");

  return (texto) => texto.replace(re, (match) => a.charAt(de.indexOf(match)));
})();

const facultyCodes = {
  Ingenieria: 14,
  Comunicacion: 11,
  Economia: 12,
  Derecho: 13,
};

const Oferta = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCarreras, setFilteredCarreras] = useState(datita);
  const [filters, setFilters] = useState({
    facultades: [],
    modalidad: [],
    tipo: [],
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const normalizedSearchTerm = sinDiacriticos(
      searchTerm.toLowerCase().trim()
    );

    const filtered = datita.filter((carrera) => {
      const matchesSearchTerm = sinDiacriticos(carrera.nombre.toLowerCase()).includes(
        normalizedSearchTerm
      );

      const matchesFacultades = filters.facultades.length
        ? filters.facultades.includes(facultyCodes[carrera.codare])
        : true;
      const matchesModalidad = filters.modalidad.length
        ? filters.modalidad.includes(carrera.modalidad)
        : true;
      const matchesTipo = filters.tipo.length
        ? filters.tipo.includes(carrera.tipo)
        : true;

      return matchesSearchTerm && matchesFacultades && matchesModalidad && matchesTipo;
    });

    console.log("Filtered Careers:", filtered); // Agrega este log para depurar
    setFilteredCarreras(filtered);
  }, [searchTerm, filters]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe y recargue la página
  };

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedFilterValues = checked
        ? [...prevFilters[name], value]
        : prevFilters[name].filter((filterValue) => filterValue !== value);

      return { ...prevFilters, [name]: updatedFilterValues };
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <form className="max-w-md mx-auto mt-5 relative" onSubmit={handleSubmit}>
        <div className="relative grid grid-cols-6 w-full justify-center">
          <div className="relative w-full col-span-5">
            <div className="absolute flex items-center pl-3 p-2 align-middle justify-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar carrera..."
              value={searchTerm}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm"
            />
          </div>
          <button type="button" onClick={toggleSidebar} className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
            <span className="sr-only">Filters</span>
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Sidebar */}
        <div className={`absolute top-full mt-2 left-0 right-0 z-40 flex ${isSidebarOpen ? "" : "hidden"} flex-col w-full bg-white shadow-xl`}>
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button type="button" className="p-2 text-gray-400 hover:text-gray-500" onClick={toggleSidebar}>
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            {/* Filters */}
            <form>
              <h3 className="text-sm font-medium text-gray-900">Facultades</h3>
              <ul className="mt-2 mb-4 space-y-2">
                {["Ingenieria", "Comunicacion", "Economia", "Derecho"].map((facultad) => (
                  <li key={facultad}>
                    <input
                      id={`filter-facultad-${facultad}`}
                      name="facultades"
                      value={facultyCodes[facultad]}
                      type="checkbox"
                      onChange={handleFilterChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`filter-facultad-${facultad}`} className="ml-2 text-gray-700">
                      {facultad}
                    </label>
                  </li>
                ))}
              </ul>
              <h3 className="text-sm font-medium text-gray-900">Modalidad</h3>
              <ul className="mt-2 mb-4 space-y-2">
                {["Presencial", "Distancia"].map((modalidad) => (
                  <li key={modalidad}>
                    <input
                      id={`filter-modalidad-${modalidad}`}
                      name="modalidad"
                      value={modalidad}
                      type="checkbox"
                      onChange={handleFilterChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`filter-modalidad-${modalidad}`} className="ml-2 text-gray-700">
                      {modalidad}
                    </label>
                  </li>
                ))}
              </ul>
              <h3 className="text-sm font-medium text-gray-900">Tipo</h3>
              <ul className="mt-2 mb-4 space-y-2">
                {["Grado", "Pregrado"].map((tipo) => (
                  <li key={tipo}>
                    <input
                      id={`filter-tipo-${tipo}`}
                      name="tipo"
                      value={tipo}
                      type="checkbox"
                      onChange={handleFilterChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`filter-tipo-${tipo}`} className="ml-2 text-gray-700">
                      {tipo}
                    </label>
                  </li>
                ))}
              </ul>
            </form>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4 gap-4 mt-10">
        {filteredCarreras.map((carrera) => {
          const { codcar, nombre, codare, modo, duracion } = carrera;

          const modoStr = Array.isArray(modo)
            ? modo.join(", ")
            : modo?.toString() || "";

          return (
            <Card
              key={codcar?.toString()}
              codcar={codcar?.toString()}
              nombre={nombre || ""}
              codare={codare?.toString()}
              modo={modoStr}
              duracion={duracion || ""}
              nom={nombre || ""}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Oferta;