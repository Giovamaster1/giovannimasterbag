import React, { useState } from 'react';

export default function MedidasyFichaLanding() {
  const [tab, setTab] = useState('ficha');
  const isActive = (key) =>
    tab === key ? 'border-b-2 border-white text-white' : 'text-[#999]';

  return (
    <section className="bg-[#0f0f0f] text-white px-4 md:px-12 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-[#5e533b] mb-8">
          <button
            onClick={() => setTab('ficha')}
            className={`pb-2 font-bold text-sm tracking-wide uppercase ${isActive('ficha')}`}
          >
            Ficha Técnica
          </button>
          <button
            onClick={() => setTab('medidas')}
            className={`pb-2 font-bold text-sm tracking-wide uppercase ${isActive('medidas')}`}
          >
            Geometría & Medidas
          </button>
        </div>

        {/* Contenido dinámico */}
        {tab === 'ficha' && (
          <div className="grid md:grid-cols-2 gap-8">
            <img src="/images/alforjas-medidas-azul.webp" alt="Alforjas Masterbag" className="max-w-full" />
            <ul className="text-sm space-y-3">
              <li className="flex justify-between border-b border-[#444] pb-2"><span className="font-semibold">Material</span><span>Lona Importada Impermeable</span></li>
              <li className="flex justify-between border-b border-[#444] pb-2"><span className="font-semibold">Material Interno</span><span>Polyester Impermeable</span></li>
              <li className="flex justify-between border-b border-[#444] pb-2"><span className="font-semibold">Capacidad de Carga</span><span>32 Lts</span></li>
              <li className="flex justify-between border-b border-[#444] pb-2"><span className="font-semibold">Cremalleras</span><span>EKA</span></li>
              <li className="flex justify-between border-b border-[#444] pb-2"><span className="font-semibold">Puntos de Anclaje</span><span>6</span></li>
              <li className="flex justify-between border-b border-[#444] pb-2"><span className="font-semibold">Sistema de Sujeción</span><span>Trabillas Metálicas</span></li>
              <li className="flex justify-between border-b border-[#444] pb-2"><span className="font-semibold">Reflectivos</span><span>Cintas Posteriores</span></li>
              <li className="flex justify-between border-b border-[#444] pb-2"><span className="font-semibold">Rain Cover Externo</span><span>Impermeable con Drenaje</span></li>
              <li className="flex justify-between"><span className="font-semibold">Expandible</span><span>SÍ</span></li>
            </ul>
          </div>
        )}

        {tab === 'medidas' && (
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <img src="/images/alforjas-medidas-azul.webp" alt="Dimensiones alforja" className="max-w-full" />
            <table className="text-sm w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-[#666]">
                  <th className="pb-2">Letra</th>
                  <th className="pb-2">Especificación</th>
                  <th className="pb-2">Medida</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#444]"><td className="py-2">A</td><td>Altura</td><td>25 cm</td></tr>
                <tr className="border-b border-[#444]"><td className="py-2">B</td><td>Largo</td><td>45 cm</td></tr>
                <tr className="border-b border-[#444]"><td className="py-2">C</td><td>Profundidad Comprimida</td><td>12 cm</td></tr>
                <tr className="border-b border-[#444]"><td className="py-2">D</td><td>Profundidad Expandida</td><td>20 cm</td></tr>
                <tr className="border-b border-[#444]"><td className="py-2">E</td><td>Capacidad de carga</td><td>32 Lts</td></tr>
                <tr className="border-b border-[#444]"><td className="py-2">F</td><td>Puntos de anclaje</td><td>6</td></tr>
                <tr><td className="py-2">G</td><td>Sistema Antirrobo</td><td>SÍ</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
