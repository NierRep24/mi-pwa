import React, { useState, useEffect } from "react";

export default function App() {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("tareas");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [nueva, setNueva] = useState("");

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  // Solicita permiso para mostrar notificaciones
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const mostrarNotificacion = (mensaje) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Nueva tarea agregada 📝", {
        body: mensaje,
        icon: "https://cdn-icons-png.flaticon.com/512/2983/2983809.png",
      });
    }
  };

  const agregarTarea = () => {
    if (nueva.trim() === "") return;
    setTareas([...tareas, nueva]);
    mostrarNotificacion(`${nueva} se ha agregado a tu lista.`);
    setNueva("");
  };


  const eliminarTarea = (i) => {
    setTareas(tareas.filter((_, idx) => idx !== i));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          Lista de Tareas 📝
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            placeholder="Escribe una tarea..."
            className="px-4 py-2 rounded-lg text-black w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={agregarTarea}
            className="bg-indigo-600 hover:bg-indigo-700 transition-all px-5 py-2 rounded-lg font-semibold"
          >
            ➕
          </button>
        </div>

        <ul className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-slate-800">
          {tareas.length === 0 && (
            <p className="text-gray-400 text-center">No hay tareas aún ✨</p>
          )}
          {tareas.map((tarea, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-slate-800/70 hover:bg-slate-700 transition-all px-4 py-3 rounded-lg shadow-md"
            >
              <span className="truncate">{tarea}</span>
              <button
                onClick={() => eliminarTarea(i)}
                className="text-red-400 hover:text-red-600 text-lg"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-400 text-center mt-6">
          💡 Consejo: Mantén tu lista actualizada todos los días
        </p>
      </div>
    </main>
  );
}