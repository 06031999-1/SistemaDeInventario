// ============================================
//  Actividad 5.1 - Sistema de Inventario
// ============================================

// Simulación de una base de datos en memoria
let inventario = [];

// Mostrar mensaje de estado
function mostrarMensaje(texto, tipo = "error") {
  const mensaje = document.getElementById("mensaje");
  mensaje.style.color = tipo === "error" ? "red" : "green";
  mensaje.textContent = texto;
}

// Mostrar inventario en la tabla
function actualizarTabla() {
  const tabla = document.getElementById("tablaInventario");
  tabla.innerHTML = "";
  inventario.forEach(prod => {
    const fila = `
      <tr>
        <td>${prod.id}</td>
        <td>${prod.nombre}</td>
        <td>${prod.cantidad}</td>
        <td>$${prod.precio.toFixed(2)}</td>
      </tr>`;
    tabla.innerHTML += fila;
  });
}

// Insertar producto nuevo
function insertarProducto() {
  try {
    const id = document.getElementById("idProducto").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("precio").value);

    if (!id || !nombre || isNaN(cantidad) || isNaN(precio)) {
      throw new Error("⚠️ Todos los campos son obligatorios.");
    }

    const existe = inventario.some(p => p.id === id);
    if (existe) throw new Error("❌ ID duplicado. Ya existe ese producto.");

    inventario.push({ id, nombre, cantidad, precio });
    mostrarMensaje("✅ Producto agregado correctamente.", "ok");
    actualizarTabla();

    // Simulación de guardado en archivo .txt (localStorage)
    localStorage.setItem("inventario", JSON.stringify(inventario));

  } catch (error) {
    mostrarMensaje(error.message);
  }
}

// Actualizar producto existente
function actualizarProducto() {
  try {
    const id = document.getElementById("idProducto").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const precio = parseFloat(document.getElementById("precio").value);

    const index = inventario.findIndex(p => p.id === id);
    if (index === -1) throw new Error("❌ No se encontró el producto para actualizar.");

    inventario[index] = { id, nombre, cantidad, precio };
    mostrarMensaje("🔄 Producto actualizado correctamente.", "ok");
    actualizarTabla();
    localStorage.setItem("inventario", JSON.stringify(inventario));
  } catch (error) {
    mostrarMensaje(error.message);
  }
}

// Buscar producto por ID
function buscarProducto() {
  try {
    const id = document.getElementById("idProducto").value.trim();
    if (!id) throw new Error("⚠️ Ingresa un ID para buscar.");

    const producto = inventario.find(p => p.id === id);
    if (!producto) throw new Error("❌ Producto no encontrado.");

    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("cantidad").value = producto.cantidad;
    document.getElementById("precio").value = producto.precio;

    mostrarMensaje("🔍 Producto encontrado.", "ok");
  } catch (error) {
    mostrarMensaje(error.message);
  }
}

// Cargar datos simulados desde el almacenamiento
window.onload = () => {
  const datosGuardados = localStorage.getItem("inventario");
  if (datosGuardados) inventario = JSON.parse(datosGuardados);
  actualizarTabla();
};
