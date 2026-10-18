/* GOAT Segovia · comportamiento de la web (sin librerías externas) */
(function () {
  "use strict";

  var datos = window.GOAT || {};
  var raiz = document.documentElement;
  var menosMovimiento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Utilidades ---------- */
  function el(tag, clase, texto) {
    var nodo = document.createElement(tag);
    if (clase) nodo.className = clase;
    if (texto) nodo.textContent = texto; // textContent: nunca se interpreta como código
    return nodo;
  }
  function euros(n) {
    return n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  }

  /* ---------- Cabecera: se vuelve sólida al bajar ---------- */
  var cabecera = document.getElementById("cabecera");
  function estadoCabecera() {
    if (cabecera) cabecera.classList.toggle("solida", window.scrollY > 24);
  }
  estadoCabecera();
  window.addEventListener("scroll", estadoCabecera, { passive: true });

  /* ---------- Menú del móvil (pantalla completa) ---------- */
  var boton = document.getElementById("menu-boton");
  var nav = document.getElementById("navegacion");
  var cm = window.matchMedia("(min-width: 980px)");

  if (boton && nav) {
    var enlacesNav = function () {
      return Array.prototype.filter.call(nav.querySelectorAll("a, button"), function (n) {
        return n.offsetParent !== null || n === document.activeElement;
      });
    };
    var abrir = function () {
      nav.classList.add("abierta");
      boton.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-abierto");
      var primero = nav.querySelector("a");
      if (primero) setTimeout(function () { primero.focus({ preventScroll: true }); }, 250);
    };
    var cerrar = function (devolverFoco) {
      nav.classList.remove("abierta");
      boton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-abierto");
      if (devolverFoco) boton.focus();
    };
    boton.addEventListener("click", function () {
      if (nav.classList.contains("abierta")) cerrar(false); else abrir();
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && !cm.matches) cerrar(false);
    });
    document.addEventListener("keydown", function (e) {
      if (!nav.classList.contains("abierta") || cm.matches) return;
      if (e.key === "Escape") { cerrar(true); return; }
      if (e.key === "Tab") { // el foco no se escapa del menú abierto
        var lista = [boton].concat(enlacesNav());
        var primero = lista[0], ultimo = lista[lista.length - 1];
        if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
      }
    });
    var alCambiarTamano = function () { if (cm.matches) cerrar(false); };
    if (cm.addEventListener) cm.addEventListener("change", alCambiarTamano); else cm.addListener(alCambiarTamano);
  }

  /* ---------- Cinta de texto ----------
     Siempre en marcha: ni «reducir movimiento» ni el ratón la paran. Dura lo que tarda en recorrer una copia del texto
     a velocidad constante (70 px/s; 45 px/s con movimiento reducido) y empieza con «Burgers creativas» bien a la vista (a la izquierda se ve el final de la vuelta anterior). */
  (function () {
    var pista = document.querySelector(".cinta__pista");
    var grupo = pista && pista.querySelector(".cinta__grupo");
    if (!grupo) return;
    var velocidad = menosMovimiento ? 45 : 70;
    var colocado = false;
    var ajustar = function () {
      var ancho = grupo.getBoundingClientRect().width;
      if (!(ancho > 0)) return;
      var dur = ancho / velocidad;
      pista.style.setProperty("--cinta-dur", dur.toFixed(1) + "s");
      if (!colocado) {
        colocado = true;
        var avance = ancho - Math.min(window.innerWidth * 0.4, 420); // «Burgers creativas» arranca a ese tramo del borde izquierdo
        pista.style.setProperty("--cinta-delay", "-" + (avance / ancho * dur).toFixed(2) + "s");
      }
    };
    var iniciar = function () { ajustar(); window.addEventListener("resize", ajustar); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(iniciar); else iniciar();
  })();

  /* ---------- Carta integrada: pestañas + tarjetas (todo sale de js/config.js) ---------- */
  var SVGNS = "http://www.w3.org/2000/svg";
  var ILUS = {
    "burger": ["carne"], "burger-pollo": ["pollo"], "burger-veg": ["veg"],
    "patatas": "ilu-patatas", "alitas": "ilu-alitas", "dedos": "ilu-dedos", "tequenos": "ilu-tequenos",
    "tarta-pistacho": "ilu-tarta-pistacho", "tarta-caramelo": "ilu-tarta-caramelo", "tarta": "ilu-tarta",
    "brownie": "ilu-brownie", "helado": "ilu-helado", "coulant": "ilu-coulant"
  };
  function svgEl(nombre, atributos) {
    var n = document.createElementNS(SVGNS, nombre);
    Object.keys(atributos || {}).forEach(function (k) { n.setAttribute(k, atributos[k]); });
    return n;
  }
  function usar(id) { return svgEl("use", { href: "#" + id }); }
  function ilustracion(tipo) {
    var def = ILUS[tipo] || ILUS.patatas;
    var esBurger = Array.isArray(def);
    var svg = svgEl("svg", { viewBox: esBurger ? "0 0 640 580" : "0 0 220 170", "aria-hidden": "true", focusable: "false" });
    if (esBurger) {
      ["b-A", "b-p1-" + def[0], "b-B", "b-p2-" + def[0], "b-C"].forEach(function (id) { svg.appendChild(usar(id)); });
    } else {
      svg.appendChild(usar(def));
    }
    return svg;
  }
  function precioNodo(p) {
    if (typeof p.precio === "number" && p.precio > 0) return el("span", "plato-card__precio", euros(p.precio));
    return el("span", "plato-card__precio plato-card__precio--pendiente", "Precio por confirmar");
  }

  var categorias = (datos.carta && datos.carta.categorias) || [];
  var cajaPestanas = document.getElementById("pestanas");
  var panel = document.getElementById("carta-panel");

  function crearTarjeta(p, i) {
    var art = el("article", "plato-card");
    var media = el("div", "plato-card__media");
    if (p.foto) {
      var img = document.createElement("img");
      img.className = "plato-card__foto";
      img.src = p.foto;
      img.alt = p.nombre;
      img.loading = "lazy";
      img.decoding = "async";
      media.appendChild(img);
    } else {
      var ilu = el("div", "plato-card__ilu");
      ilu.appendChild(ilustracion(p.tipo));
      media.appendChild(ilu);
      media.appendChild(el("span", "plato-card__etiqueta", "Imagen provisional"));
    }
    art.appendChild(media);
    var cuerpo = el("div", "plato-card__cuerpo");
    cuerpo.appendChild(el("h4", "plato-card__nombre", p.nombre));
    if (p.descripcion) cuerpo.appendChild(el("p", "plato-card__desc", p.descripcion));
    else if (p.pendiente) cuerpo.appendChild(el("p", "plato-card__pendiente", p.pendiente));
    if (p.descripcion && p.pendiente) cuerpo.appendChild(el("p", "plato-card__pendiente", p.pendiente));
    var pie = el("div", "plato-card__pie");
    if (p.etiqueta) pie.appendChild(el("span", "plato-card__tag", p.etiqueta));
    pie.appendChild(precioNodo(p));
    cuerpo.appendChild(pie);
    art.appendChild(cuerpo);
    return art;
  }

  function mostrarCategoria(cat) {
    panel.replaceChildren();
    panel.className = "carta__panel";
    panel.setAttribute("aria-labelledby", "tab-" + cat.id);
    if (cat.aviso) {
      var aviso = el("p", "panel__aviso");
      var ico = svgEl("svg", { "class": "icono", "aria-hidden": "true" });
      ico.appendChild(usar("i-info"));
      aviso.appendChild(ico);
      aviso.appendChild(el("span", "", cat.aviso));
      panel.appendChild(aviso);
    }
    cat.grupos.forEach(function (g) {
      var seccion = el("section", "grupo");
      var titulo = el("h3", "grupo__titulo");
      titulo.appendChild(el("span", "grupo__nombre", g.nombre));
      titulo.appendChild(el("span", "grupo__n", g.productos.length + (g.productos.length === 1 ? " producto" : " productos")));
      seccion.appendChild(titulo);
      var rejilla = el("div", "grupo__rejilla" + (g.productos.length === 1 ? " grupo__rejilla--solo" : ""));
      g.productos.forEach(function (p, i) { rejilla.appendChild(crearTarjeta(p, i)); });
      seccion.appendChild(rejilla);
      panel.appendChild(seccion);
    });
  }

  if (cajaPestanas && panel) {
    if (!categorias.length) {
      panel.appendChild(el("p", "carta__vacio", "La carta se está actualizando. Vuelve en unos minutos."));
    } else {
      var marca = el("span", "pestanas__marca");
      marca.setAttribute("aria-hidden", "true");
      cajaPestanas.appendChild(marca);
      var botones = [];
      var actual = 0;
      var colocarMarca = function () {
        var b = botones[actual];
        if (!b) return;
        marca.style.width = b.offsetWidth + "px";
        marca.style.transform = "translateX(" + b.offsetLeft + "px)";
      };
      var activar = function (i, enfocar) {
        actual = i;
        botones.forEach(function (b, k) {
          b.setAttribute("aria-selected", k === i ? "true" : "false");
          b.tabIndex = k === i ? 0 : -1;
        });
        colocarMarca();
        var caja = cajaPestanas;
        var b = botones[i];
        var destino = b.offsetLeft - (caja.clientWidth - b.offsetWidth) / 2;
        if (caja.scrollWidth > caja.clientWidth) caja.scrollTo({ left: destino, behavior: menosMovimiento ? "auto" : "smooth" });
        if (enfocar) b.focus();
        mostrarCategoria(categorias[i]);
      };
      categorias.forEach(function (cat, i) {
        var total = 0;
        cat.grupos.forEach(function (g) { total += g.productos.length; });
        var b = el("button", "pestana");
        b.type = "button";
        b.id = "tab-" + cat.id;
        b.setAttribute("role", "tab");
        b.setAttribute("aria-controls", "carta-panel");
        b.appendChild(document.createTextNode(cat.nombre));
        b.appendChild(el("span", "pestana__n", String(total)));
        b.addEventListener("click", function () { if (i !== actual) activar(i, false); });
        cajaPestanas.insertBefore(b, marca);
        botones.push(b);
      });
      cajaPestanas.addEventListener("keydown", function (e) {
        var n = botones.length, i = actual;
        if (e.key === "ArrowRight") i = (actual + 1) % n;
        else if (e.key === "ArrowLeft") i = (actual - 1 + n) % n;
        else if (e.key === "Home") i = 0;
        else if (e.key === "End") i = n - 1;
        else return;
        e.preventDefault();
        activar(i, true);
      });
      window.addEventListener("resize", colocarMarca);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(colocarMarca);
      activar(0, false);
      marca.style.transition = "none";
      colocarMarca();
      void marca.offsetWidth;
      marca.style.transition = "";
    }
  }

  /* ---------- Galería: solo aparece si hay fotos ---------- */
  var galeria = document.getElementById("galeria");
  if (galeria && datos.galeria && datos.galeria.length) {
    var rejilla = galeria.querySelector(".galeria__rejilla");
    datos.galeria.forEach(function (f) {
      var fig = el("figure", "rev");
      var img = document.createElement("img");
      img.src = f.src;
      img.alt = f.alt || "";
      img.loading = "lazy";
      img.decoding = "async";
      fig.appendChild(img);
      rejilla.appendChild(fig);
    });
    galeria.hidden = false;
    document.querySelectorAll("[data-enlace-galeria]").forEach(function (a) { a.hidden = false; });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  var objetosVisibles = document.querySelectorAll(".rev, .rev-hijos, .etiqueta, [data-entra], .reloj");
  function mostrarTodo() { Array.prototype.forEach.call(objetosVisibles, function (n) { n.classList.add("visto"); }); }
  // Cuando termina la animación de entrada se quitan las clases de aparición, para que el efecto «al pasar el ratón» de cada bloque funcione sin retrasos
  function liberar(n) {
    var d = parseFloat(getComputedStyle(n).getPropertyValue("--d")) || 0;
    setTimeout(function () { n.classList.remove("rev", "rev--izq", "rev--der", "rev--zoom", "rev-hijos"); }, 1500 + d * 90);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("visto");
        liberar(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -6% 0px" });
    Array.prototype.forEach.call(objetosVisibles, function (n) { io.observe(n); });
  } else {
    mostrarTodo();
  }

  /* ---------- Cifras que cuentan hasta su valor ---------- */
  var cifras = document.querySelectorAll("[data-cuenta]");
  function contar(nodo) {
    var meta = parseInt(nodo.getAttribute("data-cuenta"), 10);
    var sufijo = nodo.querySelector("small");
    var destino = nodo.firstChild; // nodo de texto con el número
    var inicio = null, duracion = 1400;
    function paso(t) {
      if (inicio === null) inicio = t;
      var p = Math.min((t - inicio) / duracion, 1);
      var v = Math.round(meta * (1 - Math.pow(1 - p, 3)));
      destino.nodeValue = String(v);
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
    return sufijo;
  }
  if ("IntersectionObserver" in window && !menosMovimiento) {
    var ioCifras = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        contar(e.target);
        ioCifras.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(cifras, function (n) { n.firstChild.nodeValue = "0"; ioCifras.observe(n); });
  }

  /* ---------- Portada: parallax suave con el ratón y el scroll ---------- */
  var escenario = document.getElementById("escenario");
  var puntero = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (escenario && !menosMovimiento) {
    var esperando = false;
    var portada = document.getElementById("inicio");
    var actualizarScroll = function () {
      esperando = false;
      var y = Math.min(window.scrollY, (portada ? portada.offsetHeight : 900));
      escenario.style.setProperty("--sy", y.toFixed(1));
    };
    window.addEventListener("scroll", function () {
      if (!esperando) { esperando = true; requestAnimationFrame(actualizarScroll); }
    }, { passive: true });
    if (puntero && portada) {
      portada.addEventListener("pointermove", function (e) {
        var r = portada.getBoundingClientRect();
        escenario.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        escenario.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
      portada.addEventListener("pointerleave", function () {
        escenario.style.setProperty("--mx", "0");
        escenario.style.setProperty("--my", "0");
      });
    }
  }

  /* ---------- Menú: marca la sección en la que estás ---------- */
  var secciones = ["somos", "carta", "horarios", "pronto", "galeria", "visitanos"];
  var enlaces = {};
  secciones.forEach(function (id) {
    enlaces[id] = Array.prototype.slice.call(document.querySelectorAll('.navegacion__lista a[href="#' + id + '"]'));
  });
  if ("IntersectionObserver" in window) {
    var visibles = {};
    var ioNav = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { visibles[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      var mejor = null, max = 0;
      secciones.forEach(function (id) { if ((visibles[id] || 0) > max) { max = visibles[id]; mejor = id; } });
      secciones.forEach(function (id) {
        enlaces[id].forEach(function (a) { if (id === mejor) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
      });
    }, { threshold: [0.05, 0.2, 0.4, 0.6, 0.8], rootMargin: "-20% 0px -35% 0px" });
    secciones.forEach(function (id) { var s = document.getElementById(id); if (s) ioNav.observe(s); });
  }

  /* ---------- Mapa: no se conecta a ningún tercero hasta que la persona pulsa el botón ---------- */
  var botonMapa = document.getElementById("cargar-mapa");
  var contenedorMapa = document.getElementById("mapa");
  if (botonMapa && contenedorMapa) {
    botonMapa.addEventListener("click", function () {
      var url = contenedorMapa.getAttribute("data-mapa");
      var marco = document.createElement("iframe");
      marco.src = url;
      marco.title = "Mapa con la ubicación de GOAT en la calle de la Cabritería, 6, Segovia";
      marco.loading = "lazy";
      marco.referrerPolicy = "no-referrer";
      contenedorMapa.replaceChildren(marco);
    });
  }

  /* ---------- Pausa de animaciones (cinta y neón) ---------- */
  var botonPausa = document.getElementById("pausa-anim");
  if (botonPausa) {
    botonPausa.addEventListener("click", function () {
      var pausada = document.documentElement.classList.toggle("anim-pausada");
      botonPausa.setAttribute("aria-pressed", pausada ? "true" : "false");
    });
  }

  /* ---------- Año del pie ---------- */
  document.querySelectorAll("[data-anio]").forEach(function (n) { n.textContent = new Date().getFullYear(); });

  window.__goatOk = true; // el script ha llegado hasta el final sin errores
})();
