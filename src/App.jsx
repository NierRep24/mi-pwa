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

  const agregarTarea = () => {
    if (nueva.trim() === "") return;
    setTareas([...tareas, nueva]);
    setNueva("");
  };

  const eliminarTarea = (i) => {
    setTareas(tareas.filter((_, idx) => idx !== i));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Lista de Tareas 📝</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          placeholder="Escribe una tarea..."
          className="px-3 py-2 rounded text-black w-64"
        />
        <button
          onClick={agregarTarea}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      <ul className="w-72 space-y-2">
        {tareas.length === 0 && (
          <p className="text-gray-400 text-center">No hay tareas aún</p>
        )}
        {tareas.map((tarea, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-slate-800 px-3 py-2 rounded"
          >
            <span>{tarea}</span>
            <button
              onClick={() => eliminarTarea(i)}
              className="text-red-400 hover:text-red-600"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
