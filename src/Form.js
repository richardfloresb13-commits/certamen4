import React, { useState, useEffect } from 'react';

export default function Form({ onAgregar, elementando, onActualizar, onCancelar }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (elementando) {
      setInput(elementando.texto);
    } else {
      setInput('');
    }
  }, [elementando]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación: No permitir vacíos ni solo espacios
    if (!input.trim()) {
      alert('¡Error! No puedes agregar o actualizar un elemento vacío.');
      return;
    }

    if (elementando) {
      onActualizar(input.trim());
    } else {
      onAgregar(input.trim());
    }
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <input 
        type="text" 
        className="input-texto"
        placeholder={elementando ? "Editar elemento..." : "Agregar nuevo elemento..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="form-botones">
        <button type="submit" className="btn-guardar">
          {elementando ? 'Actualizar' : 'Guardar'}
        </button>
        {elementando && (
          <button type="button" className="btn-cancelar" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}