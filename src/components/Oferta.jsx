import React, { useState, useEffect } from 'react';
import Card from './Card';
import { datita } from '../scripts/datita';

const Oferta = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCarreras, setFilteredCarreras] = useState(datita);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filtered = datita.filter(carrera =>
      carrera.nombre.toLowerCase().includes(searchTerm)
    );
    setFilteredCarreras(filtered);
  };

  // Para asegurarnos de que el filtro se aplique al cambiar el input
  useEffect(() => {
    const filtered = datita.filter(carrera =>
      carrera.nombre.toLowerCase().includes(searchTerm)
    );
    setFilteredCarreras(filtered);
  }, [searchTerm]);

  return (
    <div>
      <form className="max-w-md mx-auto my-10" onSubmit={handleSubmit}>
        <div className="relative mb-5 grid grid-cols-4 w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar carrera..."
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            className="col-span-3 w-full px-10 py-2 text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm"
          />
          <button
            type="submit"
            className="text-white end-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mx-auto px-5 py-2"
          >
            Buscar
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-3 2xl:grid-cols-4 gap-4">
        {filteredCarreras.map(carrera => {
          const { codcar, nombre, codare, modo, duracion } = carrera;

          // Convertir modo a una cadena de texto si es un array
          const modoStr = Array.isArray(modo) ? modo.join(', ') : modo?.toString() || '';

          return (
            <Card
              key={codcar?.toString()}
              codcar={codcar?.toString()}
              nombre={nombre || ''}
              codare={codare?.toString()}
              modo={modoStr}
              duracion={duracion || ''}
              nom={nombre || ''}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Oferta;
