

//Crea la estructura de datos y funciones para calcular el consumo y la categoría:

const clientes = [];

class Cliente {
  constructor(numeroMedidor, lecturaAnterior, lecturaActual) {
    this.numeroMedidor = numeroMedidor;
    this.lecturaAnterior = lecturaAnterior;
    this.lecturaActual = lecturaActual;
  }

  calcularConsumo() {
    return this.lecturaActual - this.lecturaAnterior;
  }

  calcularPrecio() {
    const consumo = this.calcularConsumo();
    const valorM3 = 10;
    if (consumo > 40) {
      return consumo * valorM3 * 1.2;
    } else if (consumo > 30) {
      return consumo * valorM3;
    } else {
      return consumo * valorM3 * 0.8;
    }
  }
// calculo de consumo 
  obtenerCategoria() {
    const consumo = this.calcularConsumo();
    if (consumo > 40) {
      return "Cambio su tipo de cliente";
    } else if (consumo > 30) {
      return "Cuide su consumo";
    } else {
      return "Categoria A";
    }
  }
}
function agregarCliente(numeroMedidor, lecturaAnterior, lecturaActual) {
  const cliente = new Cliente(numeroMedidor, lecturaAnterior, lecturaActual);
  clientes.push(cliente);
}


// crea y muestra la tabla 
function mostrarTabla() {
  const tabla = document.createElement("table");
  const encabezados = ["Número de Medidor", "Lectura Anterior", "Lectura Actual", "Consumo (m³)", "Precio", "Categoría"];
  const headerRow = document.createElement("tr");

  encabezados.forEach((encabezado) => {
    const th = document.createElement("th");
    th.textContent = encabezado;
    headerRow.appendChild(th);
  });

  tabla.appendChild(headerRow);

  clientes.forEach((cliente) => {
    const consumo = cliente.calcularConsumo();
    const precio = cliente.calcularPrecio();
    const categoria = cliente.obtenerCategoria();

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${cliente.numeroMedidor}</td>
      <td>${cliente.lecturaAnterior}</td>
      <td>${cliente.lecturaActual}</td>
      <td>${consumo}</td>
      <td>${precio}</td>
      <td>${categoria}</td>
    `;

    tabla.appendChild(row);
  });

  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "";
  resultadosDiv.appendChild(tabla);
}

// filtros
function filtrarClientes(termino) {
  const terminoLower = termino.toLowerCase();
  const resultadosFiltrados = clientes.filter((cliente) => {
    const numeroMedidorLower = cliente.numeroMedidor.toLowerCase();
    return numeroMedidorLower.includes(terminoLower);
  });

  const tablaFiltrada = document.createElement("table");
  const encabezados = ["Número de Medidor", "Lectura Anterior", "Lectura Actual", "Consumo (m³)", "Precio", "Categoría"];
  const headerRow = document.createElement("tr");

  encabezados.forEach((encabezado) => {
    const th = document.createElement("th");
    th.textContent = encabezado;
    headerRow.appendChild(th);
  });

  tablaFiltrada.appendChild(headerRow);

  resultadosFiltrados.forEach((cliente) => {
    const consumo = cliente.calcularConsumo();
    const precio = cliente.calcularPrecio();
    const categoria = cliente.obtenerCategoria();

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${cliente.numeroMedidor}</td>
      <td>${cliente.lecturaAnterior}</td>
      <td>${cliente.lecturaActual}</td>
      <td>${consumo}</td>
      <td>${precio}</td>
      <td>${categoria}</td>
    `;

    tablaFiltrada.appendChild(row);
  });

  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = "";
  resultadosDiv.appendChild(tablaFiltrada);
}agregarCliente("001", 100, 130);
agregarCliente("002", 80, 110);
agregarCliente("003", 200, 230);
agregarCliente("004", 150, 180);
agregarCliente("005", 120, 150);
agregarCliente("006", 1200, 1500);
agregarCliente("007", 1100, 1500);



mostrarTabla();

const filtroInput = document.getElementById("filtro");
filtroInput.addEventListener("input", () => {
  const terminoBusqueda = filtroInput.value;
  filtrarClientes(terminoBusqueda);
});

