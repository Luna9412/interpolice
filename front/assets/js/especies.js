let api = "http://localhost:4100/api/especies/";
let contenido = document.querySelector("#contenido");
let btnNuevaEspecie = document.querySelector("#btnNuevaEspecie");
let frmEspecies = document.querySelector("#frmEspecies")
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
  fetch(api + "listarespecies")
    .then((res) => res.json())
    .then((res) => {
      res.especies.forEach((especies) => {
        let fila = `<tr>
          <td>${especies.idespecie}</td>
          <td>${especies.nombre_especie}</td>
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
const frmCrearEspecie = new bootstrap.Modal(
  document.getElementById("frmCrearEspecie")
);
btnNuevaEspecie.addEventListener("click", () => {
  nombre.value = "";
  frmAction = "crear";
  frmCrearEspecie.show();
});
frmEspecies.addEventListener("submit", (e) => {
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
        frmCrearEspecie.hide();
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
        frmCrearEspecie.hide();
        location.reload();
      });
  }
  frmCrearEspecie.hide();
});

on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode.parentNode;
  let idform = fila.firstElementChild.innerText;
  let respuesta = window.confirm(
    `seguro que desea eliminar el registro con id: ${idform}`
  );
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
    especies = res.especies[0]
    nombre.value = especies.nombre_especie;
    frmAction = "editar";
    frmCrearEspecie.show();
  })
})