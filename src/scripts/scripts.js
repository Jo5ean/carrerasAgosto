
    // funcion asincrona anonima autoejecutable c:
    (async () => {
        const resp1 = await fetch(
          `./arrayCarreras.json`
        );
        const data1 = await resp1.json();
        const resp2 = await fetch(
          `./carreras.json`
        );
        const data2 = await resp2.json();
  
        //guardo el listado en un almacenamiento local
        window.localStorage.setItem(
          "CarrerasModGeneral",
          JSON.stringify(data1)
        );
        window.localStorage.setItem(
          "DatosCartas",
          JSON.stringify(data2)
        );
      })();

  var input = document.querySelector("#phone");
  var iti = window.intlTelInput(input);
  iti.setCountry("ar");
  input.addEventListener("countrychange", function() {
    var countryData = iti.getSelectedCountryData();
    document.getElementById("phone").value = countryData.dialCode;
    document.getElementById("codigo_pais").innerHTML = countryData.dialCode;
  });

  var countryData = iti.getSelectedCountryData();
  document.getElementById("phone").value = countryData.dialCode;
  document.getElementById("codigo_pais").innerHTML = countryData.dialCode;


  /**********************/
  $(document).ready(function() {

    $('.modalidades-mobile').slick({
      slidesToShow: 1,
      // adaptiveHeight: '30vh',
      centerPadding: '10px',
      autoplay: true,
      arrows: false,
    })

    $('.carouselcenter').slick({
      autoplay: true,
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      responsive: [{
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '10px',
            adaptiveHeight: true,
            slidesToShow: 1
          }
        }
      ]
    });

    //Banner principal
    let count = 0;
    let messages = [
      "🔒 Nuestras inscripciones se encuentran cerradas",
          "📞 Te contactaremos próximamente"
    ];
    //Cuando cargue el zocalo tenga el ultico (con el que comienza)
    //Despues sigue con los del array
    let cantidad = messages.length;
    document.getElementById("messages").innerText = messages[messages.length - 1]
    let messageText = "";
    setInterval(function() {
      if (count == cantidad) {
        count = 0;
        messageText = messages[count];
      } else {
        messageText = messages[count];
        count++;
      }
      document.getElementById("messages").classList.add("hide-text");
      document.getElementById("messages").innerText = messageText;
      document.getElementById("messages").classList.remove("hide-text");
    }, 3000);


    $('.slick-rectores').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      touchMove: false,
      prevArrow: $('.prev'),
      nextArrow: $('.next'),
    });

    //carousel
    $('.carusel_1').carousel({
      interval: 1000,
    });

    $('.carusel_2').carousel({
      interval: 1000,
    })
    $('.carusel_3').carousel({
      interval: 1000,
    })
    $('.carusel_4').carousel({
      interval: 1000,
    })
    $('.carusel_5').carousel({
      interval: 1000,
    })
    $('.carusel_7').carousel({
      interval: 1000,
    })
    $('.carusel_8').carousel({
      interval: 1000,
    })
    $('.carusel_9').carousel({
      interval: 1000,
    })
    $('.carusel_10').carousel({
      interval: 1000,
    })
  });


  function cambiar_modo() {
    var modo = $("#modo").val()

    $("#cbx_provincia").empty();
    $("#cbx_sede").empty();
    $("#cbx_carrera").empty();

    $("#cbx_provincia").append(
      '<option value="" selected>Seleccione Provincia</option>'
    );

    $("#cbx_sede").append(
      '<option value="" selected>Seleccione Sede</option>'
    );

    $("#cbx_carrera").append(
      '<option value="" selected>Seleccione Carrera</option>'
    );

    var carrerasArray = JSON.parse(
      window.localStorage.getItem("CarrerasModGeneral")
    );

    /* console.log("Modo", modo); */

    const carrerasMod = carrerasArray.filter(carreras => carreras.modo == modo);

    console.log(carrerasMod);

    if (carrerasMod) {
      //listado de id provincias para poner solo una en el combo
      var list_prov_id = [];
      var listaProvincia = [];
      //ciclo por todas las carreras
      $.each(carrerasMod, function(i, valorCarrera) {
        var provincias = valorCarrera.provincias;
        // Saco las provincias sin duplicados. 
        $.each(provincias, function(j, valor) {
          if (!list_prov_id.includes(valor.id_provincia)) {
            list_prov_id.push(valor.id_provincia); //agrego al listado para no tomar repetidos
            listaProvincia.push(valor); //guardo el objeto provincias para ordenarlo
          }
        })
      })

      //Ordeno alfabeticamente las provincias
      listaProvincia.sort(
        (a, b) => a.nombre_provincia.localeCompare(b.nombre_provincia));

      $.each(listaProvincia, function(j, valor) {
        $("#cbx_provincia").append(
          `<option value="${valor.id_provincia}">${valor.nombre_provincia}</option>`
        );
      })

      if (listaProvincia.length == 1) {
        $("#cbx_provincia").val($("#cbx_provincia option:eq(1)").val());
        cambiar_provincia();
      }
    }
  }

  function cambiar_provincia() {
    var provincia = $("#cbx_provincia").val();
    var modo = $("#modo").val();
    $("#cbx_sede").empty();
    $("#cbx_carrera").empty();

    $("#cbx_sede").append(
      '<option value="" selected>Seleccione Sede</option>'
    );

    $("#cbx_carrera").append(
      '<option value="" selected>Seleccione Carrera</option>'
    );

    var carrerasArray = JSON.parse(
      window.localStorage.getItem("CarrerasModGeneral")
    );

    const carrerasMod = carrerasArray.filter(carreras => carreras.modo == modo);

    if (carrerasMod) {
      //listado de id provincias para poner solo una en el combo
      var list_sedes_id = [];
      var listaProvincia = [];
      //ciclo por todas las carreras
      $.each(carrerasMod, function(i, valorCarrera) {
        var provincias = valorCarrera.provincias;
        // Saco las provincias sin duplicados. 
        $.each(provincias, function(j, valor) {
          if (!list_sedes_id.includes(valor.id_sede) && valor.id_provincia == provincia) {
            list_sedes_id.push(valor.id_sede); //agrego al listado para no tomar repetidos
            listaProvincia.push(valor); //guardo el objeto provincias para ordenarlo
          }
        })
      })

      //Ordeno alfabeticamente las sedes
      listaProvincia.sort(
        (a, b) => a.nombre_sede.localeCompare(b.nombre_sede));


      $.each(listaProvincia, function(i, valor) {
        $("#cbx_sede").append(
          `<option value="${valor.id_sede}">${valor.nombre_sede}</option>`
        );
      })

      if (listaProvincia.length == 1) {
        $("#cbx_sede").val($("#cbx_sede option:eq(1)").val());
        cambiar_sede();
      }
    }
  }

  function cambiar_sede() {
    var provincia = $("#cbx_provincia").val();
    var modo = $("#modo").val();
    var sede = $("#cbx_sede").val();

    $("#cbx_carrera").empty();

    $("#cbx_carrera").append(
      '<option value="" selected>Seleccione Carrera</option>'
    );

    var carrerasArray = JSON.parse(
      window.localStorage.getItem("CarrerasModGeneral")
    );

    const carrerasMod = carrerasArray.filter(carreras => carreras.modo == modo);

    if (carrerasMod) {
      const carrerasSedes = carrerasMod.filter(
        carreras => carreras.provincias.filter(provincia => provincia.id_sede == sede).length > 0
      )

      $.each(carrerasSedes, function(j, valor) {
        $("#cbx_carrera").append(
          `<option value="${valor.codcar}">${valor.nombre_carrera}</option>`
        );
      })

      if (carrerasSedes.length == 1) {
        $("#cbx_carrera").val($("#cbx_carrera option:eq(1)").val());
      }
    }
  }

  function check() {
    if (
      document.getElementsByName("tel")[0].value.length +
      document.getElementsByName("cod_area")[0].value.length >
      1 &&
      document.getElementsByName("tel")[0].value.length +
      document.getElementsByName("cod_area")[0].value.length <
      10
    ) {
      document
        .getElementsByName("tel")[0]
        .setCustomValidity("Escribe Telefono y Codigo de Area");
    } else {
      document.getElementsByName("tel")[0].setCustomValidity("");
    }
  }


/* <!-- Scritps del contador --> */

  addEventListener('DOMContentLoaded', () => {
    const contadores = document.querySelectorAll('.contador_cantidad');
    const velocidad = 100000;
    const animarContadores = () => {
      for (const contador of contadores) {
        const actualizarContador = () => {
          let cantidadMaxima = +contador.dataset.cantidadTotal,
            valorActual = +contador.innerText,
            inbcremento = cantidadMaxima / velocidad;

          if (valorActual < cantidadMaxima) {
            contador.innerText = Math.ceil(valorActual + inbcremento);
            setTimeout(actualizarContador, 5);
          } else {
            contador.innerText = cantidadMaxima;
          }

        }
        actualizarContador();
      }
    }

    //IntersectionObserver
    const mostrarContadores = elementos => {
      elementos.forEach(elemento => {
        if (elemento.isIntersecting) {
          elemento.target.classList.add('animar');
          elemento.target.classList.remove('ocultar');
          setTimeout(animarContadores, 340);

        }
      })
    }

    const observer = new IntersectionObserver(mostrarContadores, {
      threshold: 1 // 0 - 1
    })

    const elementosHTML = document.querySelectorAll('.contador');
    elementosHTML.forEach(elementoHTML => {
      observer.observe(elementoHTML);
    })

  })


/* <!-- Scritps del mapa de la seccion sedes (creo) --> */

  /*************/
  var map;
  var markers = [];
  var infoWindow;


  function initMap() {
    // Argentina
    var arg = {
      lat: -38.4160762,
      lng: -63.6867124
    };
    // Centro el Mapa en Argentina
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: arg
    });
    infoWindow = new google.maps.InfoWindow({
      maxWidth: 200
    });
    // Create an array of alphabetical characters used to label the markers.

    var select = document.getElementById('buscador');

    $.getJSON('/htm/consultas/sedes-mapa.php', function(data) {
      $.each(data, function(key, val) {

        var punto = new google.maps.LatLng(
          parseFloat(val.latitud),
          parseFloat(val.longitud));

        var infowincontent = document.createElement('div');
        var strong = document.createElement('strong');
        strong.textContent = val.nombre;
        infowincontent.appendChild(strong);
        infowincontent.appendChild(document.createElement('br'));

        var text = document.createElement('text');
        var ucasalIcon = "http://ucasal.edu.ar/mapa_sedes/assets/img/escudo_16px.png"; //GLIFO DE UCASAL PARA MARCADOR
        text.textContent = val.direccion;
        infowincontent.appendChild(text);
        infowincontent.appendChild(document.createElement('br'));

        if (val.tel_principal != null) {
          if (val.tel_principal.length > 1) {
            var telp = document.createElement('text');
            telp.textContent = val.tel_principal + " / ";
            infowincontent.appendChild(telp);

          }
        }

        if (val.tel_secundario != null) {
          if (val.tel_secundario.length > 1) {
            var tels = document.createElement('text');
            tels.textContent = val.tel_secundario + " / ";
            infowincontent.appendChild(tels);

          }
        }

        if (val.tel_interno != null) {
          if (val.tel_interno.length > 1) {
            var teli = document.createElement('text');
            teli.textContent = val.tel_interno;
            infowincontent.appendChild(teli);

          }
        }


        infowincontent.appendChild(document.createElement('br'));

        if (val.email != null) {
          if (val.email.length > 1) {
            var correo = document.createElement('text');
            correo.textContent = val.email;
            infowincontent.appendChild(correo);
            infowincontent.appendChild(document.createElement('br'));
          }
        }

        if (val.horario_lu_vi != null) {
          if (val.horario_lu_vi.length > 1) {
            var luvi = document.createElement('text');
            luvi.textContent = "Horarios Lunes a Viernes: " + val.horario_lu_vi;
            infowincontent.appendChild(luvi);
            infowincontent.appendChild(document.createElement('br'));
          }
        }


        if (val.horario_sa != null) {
          if (val.horario_sa.length > 1) {
            var sa = document.createElement('text');
            sa.textContent = "Horarios Sabado: " + val.horario_sa;
            infowincontent.appendChild(sa);
            infowincontent.appendChild(document.createElement('br'));
          }
        }

        if (val.horario_ex != null) {
          if (val.horario_ex.length > 1) {
            var ex = document.createElement('text');
            ex.textContent = "Horarios Extraordinarios: " + val.horario_ex;
            infowincontent.appendChild(ex);
            infowincontent.appendChild(document.createElement('br'));
          }
        }


        if (val.street_view != null) {
          if (val.street_view.length > 1) {
            var sv = document.createElement('iframe');
            sv.src = val.street_view;
            sv.height = "300";
            sv.width = "400";
            infowincontent.appendChild(sv);
            infowincontent.appendChild(document.createElement('br'));
          }
        }


        var marker = new google.maps.Marker({
          map: map,
          position: punto,
          icon: ucasalIcon
        });

        marker.addListener('click', function() {
          infoWindow.close();
          infoWindow.setContent(infowincontent);
          infoWindow.open(map, marker);
        });

        markers.push(marker);

        $(select).append('<option value="' + (markers.length - 1) + '" >' + val.nombre + '</option>');
      });
      //var markerCluster = new MarkerClusterer(map, markers,{imagePath: '/js/mapsgoogle/m'});
    });

}