const btnXHR = document.getElementById("cargar-xhr");
const btnFetch = document.getElementById("cargar-fetch");
const resultado = document.getElementById("resultado");

function renderizarUsuarios(usuarios) {
  resultado.innerHTML = "";

  const row = document.createElement("div");
  row.className = "row g-4";

  usuarios.forEach(usuario => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-3";

    col.innerHTML = `
      <div class="user-card">
        <div class="user-img">
          <img src="https://i.pravatar.cc/400?u=${usuario.id}" alt="Foto de ${usuario.name}">
        </div>
        <div class="user-info">
          <h5>${usuario.name}</h5>
          <p>@${usuario.username}</p>
          <p>${usuario.email}</p>
        </div>
      </div>
    `;

    row.appendChild(col);
  });

  resultado.appendChild(row);
}

function mostrarCargando(texto) {
  resultado.innerHTML = `
    <div class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-3">${texto}</p>
    </div>
  `;
}

btnXHR.addEventListener("click", () => {
  mostrarCargando("Cargando usuarios con XHR...");

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

  xhr.onload = function () {
    if (this.status === 200) {
      const usuarios = JSON.parse(this.responseText);
      renderizarUsuarios(usuarios);
    } else {
      resultado.innerHTML = `
        <div class="alert alert-danger text-center">
          Error al cargar usuarios con XHR.
        </div>
      `;
    }
  };

  xhr.onerror = function () {
    resultado.innerHTML = `
      <div class="alert alert-danger text-center">
        Error de red al usar XHR.
      </div>
    `;
  };

  xhr.send();
});

btnFetch.addEventListener("click", () => {
  mostrarCargando("Cargando usuarios con Fetch...");

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      return response.json();
    })
    .then(data => {
      renderizarUsuarios(data);
    })
    .catch(() => {
      resultado.innerHTML = `
        <div class="alert alert-danger text-center">
          Error al cargar usuarios con Fetch.
        </div>
      `;
    });
});
