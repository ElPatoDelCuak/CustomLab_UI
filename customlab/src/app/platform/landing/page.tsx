export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-3xl font-bold text-gray-900">CustomLab</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Bienvenido a CustomLab
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Plataforma de laboratorio personalizado para tus proyectos
                    </p>
                    
                    <div className="flex gap-4 justify-center">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition">
                            Comenzar
                        </button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 px-6 rounded-lg transition">
                            Más Información
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white shadow-sm mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
                    <p>&copy; 2024 CustomLab. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}