import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Producto 1',
    price: 19.99,
    image: '/placeholder.jpg',
    description: 'Descripción del producto 1. Este es un producto de ejemplo.',
  },
  {
    id: 2,
    name: 'Producto 2',
    price: 29.99,
    image: '/placeholder.jpg',
    description: 'Descripción del producto 2. Otro producto inventado.',
  },
  {
    id: 3,
    name: 'Producto 3',
    price: 39.99,
    image: '/placeholder.jpg',
    description: 'Descripción del producto 3. Más productos aquí.',
  },
  {
    id: 4,
    name: 'Producto 4',
    price: 49.99,
    image: '/placeholder.jpg',
    description: 'Descripción del producto 4. Continuando con los ejemplos.',
  },
  {
    id: 5,
    name: 'Producto 5',
    price: 59.99,
    image: '/placeholder.jpg',
    description: 'Descripción del producto 5. Último producto de ejemplo.',
  },
  {
    id: 6,
    name: 'Producto 6',
    price: 69.99,
    image: '/placeholder.jpg',
    description: 'Descripción del producto 6. Más variedad.',
  },
];

const ProductsGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">${product.price}</span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
