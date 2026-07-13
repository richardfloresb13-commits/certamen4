import React from 'react';

export default function Item({ elemento, onEliminar, onEditar, onAlternar }) {
  return (
    <li className={`item-lista ${elemento.completado ? 'completado-bg' : ''}`}>
      <span 
        className={`texto-item ${elemento.completado ? 'texto-tachado' : ''}`}
        onClick={() => onAlternar(elemento.id)}
      >
        {elemento.texto}
      </span>
      <div className="item-botones">
        <button className="btn-editar" onClick={() => onEditar(elemento)}>
          Editar
        </button>
        <button className="btn-eliminar" onClick={() => onEliminar(elemento.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}