import React from 'react';
import Item from './Item';

export default function List({ elementos, onEliminar, onEditar, onAlternar }) {
  return (
    <ul className="lista">
      {elementos.map((el) => (
        <Item 
          key={el.id} 
          elemento={el} 
          onEliminar={onEliminar} 
          onEditar={onEditar}
          onAlternar={onAlternar}
        />
      ))}
    </ul>
  );
}