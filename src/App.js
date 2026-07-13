import React, { useState, useEffect } from 'react';
import Form from './Form';
import List from './List';
import './App.css';

export default function App() {
  const [elementos, setElementos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [editandoElemento, setEditandoElemento] = useState(null);

  // Cargar datos de LocalStorage
  useEffect(() => {
    const memoria = localStorage.getItem('mis_elementos');
    if (memoria) {
      setElementos(JSON.parse(memoria));
    }
  }, []);

  // Guardar elementos en LocalStorage
  const guardarEnLocalStorage = (nuevaLista) => {
    setElementos(nuevaLista);
    localStorage.setItem('mis_elementos', JSON.stringify(nuevaLista));
  };

  const agregarElemento = (texto) => {
    const nuevo = {
      id: Date.now(),
      texto: texto,
      completado: false
    };
    guardarEnLocalStorage([...elementos, nuevo]);
  };

  const iniciarEdicion = (elemento) => {
    setEditandoElemento(elemento);
  };

  const actualizarElemento = (textoActualizado) => {
    const listaActualizada = elementos.map((el) =>
      el.id === editandoElemento.id ? { ...el, texto: textoActualizado } : el
    );
    guardarEnLocalStorage(listaActualizada);
    setEditandoElemento(null);
  };

  const eliminarElemento = (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar este elemento?');
    if (confirmar) {
      const listaActualizada = elementos.filter((el) => el.id !== id);
      guardarEnLocalStorage(listaActualizada);
    }
  };

  const alternarCompletado = (id) => {
    const listaActualizada = elementos.map((el) =>
      el.id === id ? { ...el, completado: !el.completado } : el
    );
    guardarEnLocalStorage(listaActualizada);
  };

  const borrarTodo = () => {
    const confirmar = window.confirm('¿Seguro que quieres borrar TODOS los elementos de una vez?');
    if (confirmar) {
      guardarEnLocalStorage([]);
    }
  };

  // Filtrar elementos según el buscador
  const elementosFiltrados = elementos.filter((el) =>
    el.texto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="tarjeta">
        <h1>📝 CRUD con React y LocalStorage</h1>

        <Form 
          onAgregar={agregarElemento} 
          elementando={editandoElemento}
          onActualizar={actualizarElemento}
          onCancelar={() => setEditandoElemento(null)}
        />

        <div className="buscador-container">
          <input 
            type="text" 
            className="input-buscar"
            placeholder="🔍 Buscar elemento..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="contador">
          <strong>Total: {elementos.length}</strong>
        </div>

        <List 
          elementos={elementosFiltrados} 
          onEliminar={eliminarElemento} 
          onEditar={iniciarEdicion}
          onAlternar={alternarCompletado}
        />

        {elementos.length > 0 && (
          <button className="btn-borrar-todo" onClick={borrarTodo}>
            ⚠️ Borrar Todo
          </button>
        )}
      </div>
    </div>
  );
}