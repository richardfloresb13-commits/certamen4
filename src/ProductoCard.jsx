export default function ProductoCard({ item, onEliminar, onAlternar, onEditar }) {
  return (
    <div className={`card ${item.completado ? "completado-bg" : ""}`}>
      
      {/* Al hacer clic en el texto, se marca como completado/tachado */}
      <span 
        onClick={() => onAlternar(item.id)} 
        className={`item-texto ${item.completado ? "texto-tachado" : ""}`}
        style={{ cursor: "pointer", display: "block", marginBottom: "15px", fontSize: "16px" }}
      >
        {item.texto}
      </span>
      
      <div className="botones-accion" style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
        {/* Editar en Verde, Eliminar en Rojo (Exigencia Commit 1) */}
        <button className="btn-editar" onClick={() => onEditar(item)}>
          Editar
        </button>
        <button className="btn-eliminar" onClick={() => onEliminar(item.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}