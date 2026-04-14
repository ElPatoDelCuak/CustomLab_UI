"use client"

import { Users, ShoppingBag, TrendingUp, AlertCircle } from "lucide-react"

export default function AdminPanelPage() {
  const stats = [
    { title: "Usuarios Activos", value: "1,234", icon: Users, change: "+12%" },
    { title: "Productos", value: "324", icon: ShoppingBag, change: "+3%" },
    { title: "Ventas Mes", value: "€45,231", icon: TrendingUp, change: "+24%" },
    { title: "Alertas", value: "5", icon: AlertCircle, change: "-2" },
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Panel de Control</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <stat.icon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
              <span className={`text-sm font-medium ${
                stat.change.startsWith("+") ? "text-green-600" : 
                stat.change.startsWith("-") ? "text-red-600" : "text-gray-600"
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Activity area - placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[300px] flex items-center justify-center">
          <p className="text-gray-500">Gráfico de Actividad (Próximamente)</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-[300px] flex items-center justify-center">
          <p className="text-gray-500">Últimos Pedidos (Próximamente)</p>
        </div>
      </div>
    </div>
  )
}
