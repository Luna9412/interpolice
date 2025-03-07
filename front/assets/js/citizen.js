let api = "http://localhost:4100/api/citizen/";
let apiEspecie = "http://localhost:4100/api/especies/"
let apiRol = "http://localhost:4100/api/roles/"
let contenido = document.querySelector("#contenido");
let frmCitizen = document.querySelector("#frmCitizen");
let btnNuevo = document.querySelector("#btnNuevo");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let apodo = document.querySelector("#apodo");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let fecha = document.querySelector("#fecha");
let especie = document.querySelector("#especie");
let rol = document.querySelector("#rol");
let foto = document.querySelector("#foto");
let frmAction = "";
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};
const frmCrearCitizen = new bootstrap.Modal(
  document.getElementById("frmCrearCitizen")
);
btnNuevo.addEventListener("click", () => {
  cleanInput()
  frmAction = "crear";
  frmCrearCitizen.show();
});
function cleanInput(){
  let idform = "";
  nombre.value = "";
  apellido.value = "";
  email.value = "";
  apodo.value = "";
  fecha.value = "";
};
function showEspecies(){
  especie.innerHTML = `<option selected hidden value="0">Seleccione la especie</option>`
  fetch(apiEspecie + "listarespecies")
    .then((res) => res.json())
    .then((res) => {
      res.especies.forEach((especies) => {
        especie.innerHTML += `<option value="${especies.idespecie}" >${especies.nombre_especie}</option> `;
      });
    });
}
function showRoles(){
  rol.innerHTML = `<option selected hidden value="0">Seleccione el Rol</option>`
  fetch(apiRol + "listaroles")
    .then((res) => res.json())
    .then((res) => {
      res.roles.forEach((roles) => {
        rol.innerHTML += `<option value="${roles.idrol}" >${roles.nombre_rol}</option> `;
      });
    });
}
function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      res.citizen.forEach((citizen) => {
        let fila = `<tr>
        <td>${citizen.idciudadano}</td>
        <td>${citizen.nombre_ciudadano}</td>
        <td>${citizen.apellido_ciudadano}</td>
        <td>${citizen.email_ciudadano}</td>
        <td>${citizen.apodo_ciudadano}</td>
        <td>${citizen.fechaorigen}</td>
        <td>${citizen.nombre_especie}</td>
        <td>${citizen.nombre_rol}</td>
        <td><button class="btnBorrar btn btn-danger" id="${citizen.idciudadano}"><i class="bi bi-trash"></i></button></td>
        <td><button class="btnEditar btn btn-primary" id="${citizen.idciudadano}"><i class="bi bi-pencil-square"></i></button></td>
        </tr><br>`;
        contenido.innerHTML += fila;
      });
    });
}
document.addEventListener("DOMContentLoaded", () => {
  listartodos();
  showEspecies();
  showRoles()
});
frmCitizen.addEventListener("submit", (e) => {
  e.preventDefault();
  if (frmAction === "crear") {
    fetch(api + "crear", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
        body: JSON.stringify({
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        apodo: apodo.value,
        fecha: fecha.value,
        password: password.value,
        especie: especie.value,
        rol: rol.value,
        foto: "img",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("exito");
        frmCrearCitizen.hide();
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
        apellido: apellido.value,
        email: email.value,
        apodo: apodo.value,
        fecha: fecha.value,
        password: password.value,
        especie: especie.value,
        rol: rol.value,
        foto: "img",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.status, res.respuesta);
        alert("exito");
        frmCrearCitizen.hide();
        location.reload();
      });
  }
  frmCrearCitizen.hide();
});
on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode.parentNode;
  let idform = fila.firstElementChild.innerText;
  let respuesta = window.confirm(
    `seguro que desea eliminar el registro con id: ${idform}`
  );
  console.log(idform);

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
      citizen = res.citizen[0]
      nombre.value = citizen.nombre_ciudadano;
      apellido.value = citizen.apellido_ciudadano;
      email.value = citizen.email_ciudadano;
      apodo.value = citizen.apodo_ciudadano;
      password.value = citizen.password_ciudadano;
      fecha.value = citizen.fechaorigen;
      especie.innerHTML += `<option selected hidden value="${citizen.especies_idespecie}" >${citizen.nombre_especie}</option> `;
      rol.innerHTML += `<option selected hidden value="${citizen.roles_idrol}" >${citizen.nombre_rol}</option> `;
      frmAction = "editar";
      frmCrearCitizen.show();
    })
});