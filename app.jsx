import { useState, useEffect } from "react";
import ProductoCard from "./src/ProductoCard.jsx";
import "./styles.css";

export default function App() {
  // Estados para la lista y el buscador
  const [productos, setProductos] = useState([]);
  const [input, setInput] = useState("");       
  const [busqueda, setBusqueda] = useState(""); 
  const [orden, setOrden] = useState("ninguno"); 

  // Estados para las cajas del formulario (Crear Producto)
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  // LEER LOCALSTORAGE: Carga los datos al abrir la aplicación
  useEffect(() => {
    const memoria = localStorage.getItem("mis_productos");
    if (memoria) {
      setProductos(JSON.parse(memoria));
    } else {
      // Datos de prueba iniciales si está vacío
      const productosPrueba = [
        { id: 1, title: "Mochila Escolar", price: 25000, category: "Accesorios", image: "https://via.placeholder.com/120" },
        { id: 2, title: "Polera Negra", price: 12000, category: "Ropa", image: "https://via.placeholder.com/120" }
      ];
      setProductos(productosPrueba);
      localStorage.setItem("mis_productos", JSON.stringify(productosPrueba));
    }
  }, []);

  // DEBOUNCE: El retraso de la barra de búsqueda
  useEffect(() => {
    const timer = setTimeout(() => setBusqueda(input), 300);
    return () => clearTimeout(timer); 
  }, [input]);

  // FUNCIÓN: GUARDAR NUEVO PRODUCTO (CREATE)
  const handleGuardar = (e) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoPrecio || !nuevaCategoria) return alert("Llena todos los campos");

    const nuevoProducto = {
      id: Date.now(),
      title: nuevoNombre,
      price: Number(nuevoPrecio),
      category: nuevaCategoria,
      image: "https://via.placeholder.com/120"
    };

    const listaActualizada = [...productos, nuevoProducto];
    setProductos(listaActualizada);
    localStorage.setItem("mis_productos", JSON.stringify(listaActualizada));

    setNuevoNombre("");
    setNuevoPrecio("");
    setNuevaCategoria("");
  };

  // FUNCIÓN: ELIMINAR PRODUCTO (DELETE)
  const handleEliminar = (id) => {
    const listaActualizada = productos.filter(p => p.id !== id);
    setProductos(listaActualizada);
    localStorage.setItem("mis_productos", JSON.stringify(listaActualizada));
  };

  // FILTRADO Y ORDEN
  let resultados = productos.filter((p) =>
    p.title.toLowerCase().includes(busqueda.toLowerCase())
  );
  if (orden === "precio-asc") resultados = [...resultados].sort((a, b) => a.price - b.price);
  if (orden === "precio-desc") resultados = [...resultados].sort((a, b) => b.price - a.price);

  return (
    <div className="app">
      <h1>🛍️ CRUD Productos - LocalStorage</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleGuardar} className="formulario-add">
        <h3>Agregar Producto</h3>
        <div className="form-group">
          <input type="text" placeholder="Nombre" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} />
          <input type="number" placeholder="Precio" value={nuevoPrecio} onChange={e => setNuevoPrecio(e.target.value)} />
          <input type="text" placeholder="Categoría" value={nuevaCategoria} onChange={e => setNuevaCategoria(e.target.value)} />
          <button type="submit">Guardar</button>
        </div>
      </form>

      {/* FILTROS */}
      <div className="controles">
        <input type="text" placeholder="🔍 Buscar..." value={input} onChange={e => setInput(e.target.value)} />
        <select value={orden} onChange={e => setOrden(e.target.value)}>
          <option value="ninguno">Ordenar...</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
        </select>
      </div>

      {/* GRILLA */}
      <div className="grid">
        {resultados.map((p) => (
          <ProductoCard key={p.id} producto={p} onEliminar={handleEliminar} />
        ))}
      </div>
    </div>
  );
}