let api = "http://localhost:4100/api/roles/";
let contenido = document.querySelector("#contenido");
let btnNuevoRol = document.querySelector("#btnNuevoRol");
let frmRoles = document.querySelector("#frmRoles")
let frmAction = "";
let nombre = document.querySelector("#nombre")
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};
function listartodos() {
  fetch(api + "listaroles")
    .then((res) => res.json())
    .then((res) => {
      res.roles.forEach((roles) => {
        let fila = `<tr>
          <td>${roles.idrol}</td>
          <td>${roles.nombre_rol}</td>
          <td><button class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></button></td>
          <td><button class="btnEditar btn btn-primary"><i class="bi bi-pencil-square"></i></button></td>
          </tr><br>`;
        contenido.innerHTML += fila;
      });
    });
}
window.addEventListener("DOMContentLoaded", (e) => {
  listartodos();
});
const frmCrearRol = new bootstrap.Modal(
  document.getElementById("frmCrearRol")
);
btnNuevoRol.addEventListener("click", () => {
  nombre.value = "";
  frmAction = "crear";
  frmCrearRol.show();
});
frmRoles.addEventListener("submit", (e) => {
  e.preventDefault();
  if (frmAction === "crear") {
    fetch(api + "crear", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("exito");
        frmCrearRol.hide();
        location.reload();
      });
  }
  if (frmAction === "editar") {
    fetch(api + "editar/" + idform, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        nombre: nombre.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("exito");
        frmCrearRol.hide();
        location.reload();
      });
  }
  frmCrearRol.hide();
});
on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode.parentNode;
  let idform = fila.firstElementChild.innerText;
  let respuesta = window.confirm(`seguro que desea eliminar el registro con id: ${idform}`);
  if (respuesta) {
    fetch(api + "borrar/" + idform, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        location.reload();
      });
  }
});
let idform = "";
on(document, "click", ".btnEditar", (e) => {
  let fila = e.target.parentNode.parentNode.parentNode;
  let idciudadano = fila.children[0].innerText;
  idform = idciudadano;
  fetch(api + "listarid/" + idform) 
  .then((res) => res.json())
  .then((res) => {
    roles = res.roles[0]
    nombre.value = roles.nombre_rol;
    frmAction = "editar";
    frmCrearRol.show();
  })
})