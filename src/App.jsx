import React, { useState, useEffect } from "react";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { FaTrashAlt } from "react-icons/fa";

export default function App() {
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("tareas");
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [nueva, setNueva] = useState("");

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const mostrarNotificacion = async (mensaje) => {
    if ("serviceWorker" in navigator && Notification.permission === "granted") {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.showNotification("Nueva tarea agregada 📝", {
          body: mensaje,
          icon: "/vite.svg",
          vibrate: [100, 50, 100],
          badge: "/vite.svg",
        });
      }
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 via-indigo-200 to-emerald-100 text-gray-800 p-6">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md border border-sky-100">
        <div className="flex items-center justify-center mb-6 gap-2">
          <PiBookOpenTextDuotone className="text-sky-500 text-5xl" />
          <h1 className="text-4xl font-extrabold text-sky-600 drop-shadow-sm">
            Mis Tareas
          </h1>
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            placeholder="✏️ Escribe una nueva tarea..."
            className="px-4 py-2 rounded-xl w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400 border border-sky-200"
          />
          <button
            onClick={agregarTarea}
            className="bg-sky-500 hover:bg-sky-600 transition-all px-5 py-2 rounded-xl text-white font-semibold shadow-md"
          >
            Agregar
          </button>
        </div>

        <ul className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-300 scrollbar-track-sky-100">
          {tareas.length === 0 && (
            <p className="text-gray-500 text-center italic">
              🌤️ No hay tareas aún. ¡Agrega una para empezar!
            </p>
          )}
          {tareas.map((tarea, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gradient-to-r from-sky-100 to-indigo-100 hover:from-sky-200 hover:to-indigo-200 transition-all px-4 py-3 rounded-xl shadow-sm border border-sky-200"
            >
              <span className="truncate font-medium">{tarea}</span>
              <button
                onClick={() => eliminarTarea(i)}
                className="text-rose-500 hover:text-rose-700 transition-colors"
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-500 text-center mt-6">
          💡 Consejo: organiza tus tareas diarias para mantenerte al día ✨
        </p>
      </div>
    </main>
  );
}
