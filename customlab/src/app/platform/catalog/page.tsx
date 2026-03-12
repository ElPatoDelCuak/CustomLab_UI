import React from 'react';
import ProductsGrid from './components/productsGrid';

const CatalogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Catálogo de Productos</h1>
              <p className="text-gray-600 mt-2">Descubre nuestra selección de productos de calidad</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Filtros
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Ordenar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2A1 1 0 0 0 1 10h2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8h2a1 1 0 0 0 .707-1.707Z"/>
                </svg>
                Inicio
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Catálogo</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Products Grid */}
        <ProductsGrid />

        {/* Footer Section */}
        <footer className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sobre Nosotros</h3>
              <p className="text-gray-600">
                Somos una tienda dedicada a ofrecer productos de alta calidad con el mejor servicio al cliente.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Inicio</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Productos</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contacto</h3>
              <p className="text-gray-600">
                Email: info@customlab.com<br />
                Teléfono: +1 (555) 123-4567
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CatalogPage;
