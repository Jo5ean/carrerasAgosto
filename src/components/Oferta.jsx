import React, { useState, useEffect } from "react";
import Card from "./Card";
import { datita } from "../scripts/datita";
import { facus } from "../scripts/facultades";

// Función para eliminar diacríticos
const sinDiacriticos = (function () {
  let de = "ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñç",
    a = "AAAAAEEEEIIIIOOOOUUUUNCaaaaaeeeeiiiioooouuuunc",
    re = new RegExp("[" + de + "]", "ug");

  return (texto) => texto.replace(re, (match) => a.charAt(de.indexOf(match)));
})();

// Creamos un objeto para mapear codare a nombres de facultades
const facultyNames = facus.reduce((acc, { codare, nombre }) => {
  acc[codare] = nombre;
  return acc;
}, {});

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
        ? filters.facultades.includes(carrera.codare.toString())
        : true;
      const matchesModalidad = filters.modalidad.length
        ? carrera.modo.some(m => filters.modalidad.includes(m.toString()))
        : true;
      const matchesTipo = filters.tipo.length
        ? filters.tipo.includes(carrera.tipcar)
        : true;

      return matchesSearchTerm && matchesFacultades && matchesModalidad && matchesTipo;
    });

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

  const handleRemoveFilter = (filterCategory, filterValue) => {
    setFilters((prevFilters) => {
      const updatedFilterValues = prevFilters[filterCategory].filter((value) => value !== filterValue);
      return { ...prevFilters, [filterCategory]: updatedFilterValues };
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const applyModalidadFilter = (modalidad) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      modalidad: [modalidad], // Aplica la modalidad seleccionada
    }));
  };

  return (
    <div>
      <div id="carreras"></div>
      <form className="max-w-md mx-auto mt-5 relative" onSubmit={handleSubmit}>
        <div className=" grid grid-cols-6 w-full justify-center">
          <div className=" w-full col-span-5">
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
          <button type="button" onClick={toggleSidebar} className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6">
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
              <ul className="mt-2 mb-4 space-y-1">
                {facus.map(({ codare, nombre }) => (
                  <li key={codare}>
                    <input
                      id={`filter-facultad-${nombre}`}
                      name="facultades"
                      value={codare}
                      type="checkbox"
                      checked={filters.facultades.includes(codare.toString())}
                      onChange={handleFilterChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`filter-facultad-${nombre}`} className="ml-2 text-gray-700 text-xs">
                      {nombre}
                    </label>
                  </li>
                ))}
              </ul>
              <h3 className="text-sm font-medium text-gray-900">Modalidad</h3>
              <ul className="mt-2 mb-4 space-y-2">
                {[1, 2, 7].map((modalidad) => (
                  <li key={modalidad}>
                    <input
                      id={`filter-modalidad-${modalidad}`}
                      name="modalidad"
                      value={modalidad}
                      type="checkbox"
                      checked={filters.modalidad.includes(modalidad.toString())}
                      onChange={handleFilterChange}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`filter-modalidad-${modalidad}`} className="ml-2 text-gray-700">
                      {modalidad === 1 ? "Presencial" : modalidad === 2 ? "Distancia" : "Mixto"}
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
                      checked={filters.tipo.includes(tipo)}
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

      <div className="mt-4">
        <div className="flex flex-wrap space-x-2 space-y-2">
          {filters.facultades.map((facultad) => (
            <div key={facultad} className="flex bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
              {facultyNames[facultad]}
              <button
                className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => handleRemoveFilter('facultades', facultad)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          {filters.modalidad.map((modalidad) => (
            <div key={modalidad} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {modalidad === "1" ? "Presencial" : modalidad === "2" ? "Distancia" : "Mixto"}
              <button
                className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => handleRemoveFilter('modalidad', modalidad)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          {filters.tipo.map((tipo) => (
            <div key={tipo} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {tipo}
              <button
                className="ml-1 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => handleRemoveFilter('tipo', tipo)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="">
        <div className="w-full h-screen overflow-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCarreras.map((carrera) => {
            const { codcar, nombre, codare, modo, duracion, nom_landing } = carrera;

            const modoStr = Array.isArray(modo)
              ? modo.join(", ")
              : modo?.toString() || "";

            return (
              <Card
                key={codcar?.toString()}
                codcar={codcar?.toString()}
                nombre={nombre || ""}
                codare={codare.toString() || ""}
                modo={modoStr}
                duracion={duracion || ""}
                nom={nom_landing || "general"}
              />
            );
          })}
        </div>
      </div>
      <div id="estudiaEn">
      <h2 className="bigTitle mt-5 shadow-black">
        <span style={{ color: 'rgb(97, 96, 96)' }}>Modalidades:</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1 */}
        <div className="rounded-lg overflow-hidden shadow">
          <div className="px-6">
            <div className="flex items-center">
              <img
                className="img-fluid w-20"
                src="/landing/ingreso-carreras-ucasal/iconoPresencial.svg"
                alt="Logo Presencial"
              />
              <h2 className="font-extrabold text-base md:text-lg relative text-[#CE3F43]">
                PRESENCIAL (P)
              </h2>
            </div>
            <div className="mt-3 md:mt-0 text-3xl md:text-xl">
              <ul
                className="list-disc list-inside md:text-lg text-sm"
                style={{ fontFamily: 'Museo Sans',fontWeight: 500 }}
              >
                <li>
                  La educación presencial tiene todos los beneficios del
                  aprendizaje tradicional: mejora la comprensión, permite el
                  desarrollo de habilidades socioemocionales y te asegura una
                  interacción constante en tiempo real con docentes y compañeros.
                </li>
                <li>
                  Implica un cursado en horario fijo en las instalaciones del
                  Campus Castañares, es decir, una organización clara que
                  facilitará tu desenvolvimiento en otros aspectos de tu vida
                  personal como la práctica de la danza, los deportes o el
                  idioma.
                </li>
                <li>Potenciamos tus habilidades con clases personalizadas.</li>
              </ul>
            </div>
            <div className="py-5">
              <a
                href="#carreras"
                onClick={() =>applyModalidadFilter('1')}
                className="inline-flex items-center px-3 py-2 text-sm font-bold text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Buscar carreras con esta modalidad (Presencial)
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg overflow-hidden shadow">
          <div className="px-6">
            <div className="flex items-center">
              <img
                className="img-fluid w-20"
                src="/landing/ingreso-carreras-ucasal/iconoVirtual.svg"
                alt="Logo Digital"
              />
              <h2 className="font-extrabold text-base md:text-lg relative text-[#003D7C]">
                DIGITAL (D)
              </h2>
            </div>
            <div className="mt-3 md:mt-0 text-3xl md:text-xl">
              <ul
                className="list-disc list-inside md:text-lg text-sm"
                style={{ fontFamily: 'Museo Sans',fontWeight: 500 }}
              >
                <li>
                  La educación digital es 100% online, adaptándose a tu realidad.
                </li>
                <li>
                  Tendrás acceso a recursos de diversos formatos en el
                  dispositivo que prefieras, entornos y sistemas de cátedras
                  virtuales para que tu experiencia sea personalizada.
                </li>
                <li>
                  Audios, video clases, cápsulas de conocimiento, guías de
                  aprendizaje, bibliotecas virtuales, webinarios y
                  videoconferencias son solo algunos de los recursos en formato
                  sincrónico y asincrónico que tendrás disponible 24/7.
                </li>
                <li>Disfrutá de espacios físicos en tu sede y aprendé en comunidad.</li>
              </ul>
            </div>
            <div className="py-5">
              <a
                href="#carreras"
                onClick={()=> applyModalidadFilter('2')}
                className="buttono inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buscar carreras con esta modalidad (Distancia)
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};
export default Oferta;