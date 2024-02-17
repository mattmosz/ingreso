function init() {
    $("#form_sucursal").on("submit", (e) => {
      GuardarEditar(e);
    });
  }
  
  $().ready(() => {
    CargaLista();
  });
  
  var CargaLista = () => {
    var html = "";
    $.get(
      "../../controllers/sucursal.controllers.php?op=todos",
      (ListaSucursales) => {
        ListaSucursales = JSON.parse(ListaSucursales);
        $.each(ListaSucursales, (index, sucursal) => {
          html += `<tr>
              <td>${index + 1}</td>
              <td>${sucursal.Nombres}</td>
              <td>${sucursal.Direccion}</td>
              <td>${sucursal.Telefono}</td>
              <td>${sucursal.Correo}</td>
  <td>
  <button class='btn btn-primary' click='uno(${
            sucursal.idUsuarios
          })'>Editar</button>
  <button class='btn btn-warning' click='eliminar(${
            sucursal.idUsuarios
          })'>Editar</button>
              `;
        });
        $("#ListaSucursal").html(html);
      }
    );
  };
  
  var GuardarEditar = (e) => {
    e.preventDefault();
    var DatosFormularioSucursal = new FormData($("#form_sucursal")[0]);
    var accion = "../../controllers/sucursal.controllers.php?op=insertar";
  
    for (var pair of DatosFormularioSucursal.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  
    /**
     * if(SucursalId >0){editar   accion='ruta para editar'}
     * else
     * { accion = ruta para insertar}
     */
    $.ajax({
      url: accion,
      type: "post",
      data: DatosFormularioUsuario,
      processData: false,
      contentType: false,
      cache: false,
      success: (respuesta) => {
        console.log(respuesta);
        respuesta = JSON.parse(respuesta);
        if (respuesta == "ok") {
          alert("Se guardo con éxito");
          CargaLista();
          LimpiarCajas();
        } else {
          alert("no tu pendejada");
        }
      },
    });
  };
  
  var uno = () => {};
  
  var sucursales = () => {
    return new Promise((resolve, reject) => {
      var html = `<option value="0">Seleccione una opción</option>`;
      $.post(
        "../../controllers/sucursal.controllers.php?op=todos",
        async (ListaSucursales) => {
          ListaSucursales = JSON.parse(ListaSucursales);
          $.each(ListaSucursales, (index, sucursal) => {
            html += `<option value="${sucursal.SucursalId}">${sucursal.Nombre}</option>`;
          });
          await $("#SucursalId").html(html);
          resolve();
        }
      ).fail((error) => {
        reject(error);
      });
    });
  };
  
  var roles = () => {
    return new Promise((resolve, reject) => {
      var html = `<option value="0">Seleccione una opción</option>`;
      $.post(
        "../../controllers/rol.controllers.php?op=todos",
        async (ListaRoles) => {
          ListaRoles = JSON.parse(ListaRoles);
          $.each(ListaRoles, (index, rol) => {
            html += `<option value="${rol.idRoles}">${rol.Rol}</option>`;
          });
          await $("#RolId").html(html);
          resolve();
        }
      ).fail((error) => {
        reject(error);
      });
    });
  };
  
  var eliminar = () => {};
  
  var LimpiarCajas = () => {
    (document.getElementById("Nombres").value = ""),
      (document.getElementById("Apellidos").value = ""),
      (document.getElementById("Correo").value = ""),
      (document.getElementById("contrasenia").value = ""),
      $("#ModalUsuarios").modal("hide");
  };
  init();