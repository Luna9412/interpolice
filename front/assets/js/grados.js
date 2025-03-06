let api = "http://localhost:4100/api/grados/";
let contenido = document.querySelector("#contenido");
let btnNuevo = document.querySelector("#btnNuevo");
let frmGrados = document.querySelector("#frmGrados");
let grado = document.querySelector("#grado");
let descripcion = document.querySelector("#descripcion");
let frmAction = "";
const on = (element, event, selector, handler) => {
    element.addEventListener(event, (e) => {
      if (e.target.closest(selector)) {
        handler(e);
      }
    });
  };
const frmCrearGrado = new bootstrap.Modal(
    document.getElementById("frmCrearGrado")
  );
btnNuevo.addEventListener("click", () => {
    frmAction = "crear";
    frmCrearGrado.show();
  });
function listartodos() {
    fetch(api + "listartodos")
      .then((res) => res.json())
      .then((res) => {
        res.grados.forEach((grados) => {
          let fila = `<tr>
            <td>${grados.idgrado_delito}</td>
            <td>${grados.grado}</td>
            <td>${grados.descripcion}</td>
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
  frmGrados.addEventListener("submit", (e) => {
    e.preventDefault();
    if (frmAction === "crear") {
      fetch(api + "crear", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          grado: grado.value,
          descripcion: descripcion.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          alert("exito");
          frmCrearGrado.hide();
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
            grado: grado.value,
            descripcion: descripcion.value,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.status, res.respuesta);
          alert("exito");
          frmCrearGrado.hide();
          location.reload();
        });
    }
    frmCrearGrado.hide();
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
    let idgrado = fila.children[0].innerText;
    idform = idgrado;
    fetch(api + "listarid/" + idform) 
      .then((res) => res.json())
      .then((res) => {
        grados = res.grados[0]
        console.log(grados);
        grado.value = grados.grado;
        descripcion.value = grados.descripcion;
        frmAction = "editar";
        frmCrearGrado.show();
  })
})