/* ==========================================================================
   GOAT Segovia · CARTA Y FOTOS
   Aquí está TODA la carta. Para actualizarla no hace falta tocar nada más de la web.

   CÓMO ACTUALIZAR UN PRODUCTO (cada producto es una línea entre llaves { }):
   - precio:       pon el número, por ejemplo  precio: 12.5   (se muestra «12,50 €»).
                   Mientras sea  null  la web muestra «Precio por confirmar».
   - foto:         pon la ruta de la foto oficial, por ejemplo  foto: "images/carta/smash-cheddar.jpg".
                   Mientras sea  null  se muestra una ilustración orientativa.
                   Guarda las fotos en la carpeta images/carta/.
   - descripcion:  texto confirmado de los ingredientes. Si es null, se muestra el aviso de «pendiente».
   - pendiente:    texto discreto que se ve cuando falta confirmar algo (puede borrarse al confirmarlo).
   - etiqueta:     pequeña etiqueta opcional (por ejemplo «Sin gluten (por confirmar)»).
   - tipo:         qué ilustración orientativa usar (burger, burger-pollo, burger-veg, patatas, alitas,
                   dedos, tequenos, tarta-pistacho, tarta-caramelo, tarta, brownie, helado, coulant).

   PENDIENTE DE ACLARAR CON GOAT: si los precios llevan los impuestos incluidos (IVA) o no. No es una
   categoría de la carta; solo hay que saberlo para mostrar bien los precios.
   ========================================================================== */
window.GOAT = {

  carta: {
    categorias: [

      /* ---------------------------------------------------------------- HAMBURGUESAS */
      {
        id: "hamburguesas",
        nombre: "Hamburguesas",
        grupos: [
          {
            nombre: "Hamburguesas smash",
            productos: [
              { nombre: "Smash Cheddar", tipo: "burger", precio: null, foto: null,
                descripcion: "Doble medallón de 60 g de vaca Angus, doble queso cheddar, bacon y salsa cheddar para mojar aparte." },
              { nombre: "Smash Bacon", tipo: "burger", precio: null, foto: null,
                descripcion: "Doble medallón de 60 g de vaca Angus, doble queso cheddar, bacon y salsa de bacon ahumado." },
              { nombre: "Smash Trufada", tipo: "burger", precio: null, foto: null,
                descripcion: "Doble medallón de 60 g de vaca Angus, doble queso cheddar, champiñón a la brasa, cebolla caramelizada y salsa trufada casera." },
              { nombre: "Smash Patrón", tipo: "burger", precio: null, foto: null,
                descripcion: "Doble medallón de 60 g de vaca Angus, doble queso cheddar, bacon crispy, pepinillo encurtido, cebolla y salsa Patrón casera." }
            ]
          },
          {
            nombre: "Hamburguesas de 200 g",
            productos: [
              { nombre: "Trufada 200 g", tipo: "burger", precio: null, foto: null,
                descripcion: "200 g de ternera avileña, queso cheddar, champiñón a la brasa, cebolla caramelizada y salsa trufada casera." },
              { nombre: "Patrón 200 g", tipo: "burger", precio: null, foto: null,
                descripcion: "200 g de ternera avileña, queso cheddar, bacon ahumado, pepinillo encurtido, cebolla y salsa Patrón casera." }
            ]
          },
          {
            nombre: "Hamburguesas de pollo",
            productos: [
              { nombre: "Pollo Miel y Mostaza", tipo: "burger-pollo", precio: null, foto: null,
                descripcion: "Pollo crujiente, cheddar, lechuga, cebolla morada y salsa de mostaza y miel." },
              { nombre: "Pollo BBQ", tipo: "burger-pollo", precio: null, foto: null,
                descripcion: "Pollo crujiente, cheddar, bacon, cebolla caramelizada y salsa BBQ." }
            ]
          },
          {
            nombre: "Otras hamburguesas",
            productos: [
              { nombre: "Pulled Pork", tipo: "burger", precio: null, foto: null,
                descripcion: "180 g de carne de cerdo deshilachada bañada en salsa BBQ, cheddar y cebolla morada." }
            ]
          }
        ]
      },

      /* ---------------------------------------------------------------- PARA COMPARTIR */
      {
        id: "compartir",
        nombre: "Para compartir",
        destacada: true,
        grupos: [
          {
            nombre: "Para compartir",
            productos: [
              { nombre: "Bacon Cheese-Fries", tipo: "patatas", precio: null, foto: null },
              { nombre: "Kebab Fries", tipo: "patatas", precio: null, foto: null },
              { nombre: "Pulled Pork Fries", tipo: "patatas", precio: null, foto: null },
              { nombre: "Alitas crujientes", tipo: "alitas", precio: null, foto: null },
              { nombre: "Chicken Fingers", tipo: "dedos", precio: null, foto: null },
              { nombre: "Patatas Dipper", tipo: "patatas", precio: null, foto: null },
              { nombre: "Tequeños", tipo: "tequenos", precio: null, foto: null }
            ]
          }
        ]
      },

      /* ---------------------------------------------------------------- VEGETARIANAS */
      {
        id: "vegetarianas",
        nombre: "Vegetarianas",
        aviso: "Las descripciones de las hamburguesas vegetarianas están pendientes de confirmar con el negocio.",
        grupos: [
          {
            nombre: "Hamburguesas vegetarianas",
            productos: [
              { nombre: "Patrón Vegetariana", tipo: "burger-veg", precio: null, foto: null, descripcion: null, pendiente: "Descripción por confirmar" },
              { nombre: "Trufada Vegetariana", tipo: "burger-veg", precio: null, foto: null, descripcion: null, pendiente: "Descripción por confirmar" },
              { nombre: "Miel Mostaza Vegetariana", tipo: "burger-veg", precio: null, foto: null, descripcion: null, pendiente: "Descripción por confirmar" }
            ]
          }
        ]
      },

      /* ---------------------------------------------------------------- SIN GLUTEN */
      {
        id: "singluten",
        nombre: "Sin gluten",
        aviso: "Composición y preparación sin gluten pendientes de confirmar con el negocio (ingredientes, posibles contaminaciones cruzadas y elaboración). Hasta entonces no se garantiza que estos platos sean aptos para personas celíacas.",
        grupos: [
          {
            nombre: "Para compartir sin gluten",
            productos: [
              { nombre: "Bacon Cheese-Fries", tipo: "patatas", precio: null, foto: null, pendiente: "Preparación sin gluten por confirmar" },
              { nombre: "Kebab Fries", tipo: "patatas", precio: null, foto: null, pendiente: "Preparación sin gluten por confirmar" },
              { nombre: "Pulled Pork Fries", tipo: "patatas", precio: null, foto: null, pendiente: "Preparación sin gluten por confirmar" }
            ]
          },
          {
            nombre: "Hamburguesas sin gluten",
            productos: [
              { nombre: "Smash Patrón", tipo: "burger", precio: null, foto: null, pendiente: "Composición y preparación por confirmar" },
              { nombre: "Smash Bacon", tipo: "burger", precio: null, foto: null, pendiente: "Composición y preparación por confirmar" },
              { nombre: "Damas Cheddar", tipo: "burger", precio: null, foto: null, pendiente: "Composición y preparación por confirmar" },
              { nombre: "Patrón", tipo: "burger", precio: null, foto: null, pendiente: "Composición y preparación por confirmar" },
              { nombre: "Pulled Pork", tipo: "burger", precio: null, foto: null, pendiente: "Composición y preparación por confirmar" }
            ]
          }
        ]
      },

      /* ---------------------------------------------------------------- MENÚ INFANTIL */
      {
        id: "infantil",
        nombre: "Menú infantil",
        grupos: [
          {
            nombre: "Menú infantil",
            productos: [
              { nombre: "Menú Kids Chicken Fries", tipo: "dedos", precio: null, foto: null },
              { nombre: "Mini Smash Burger", tipo: "burger", precio: null, foto: null },
              { nombre: "Mini Burger de Pollo", tipo: "burger-pollo", precio: null, foto: null }
            ]
          }
        ]
      },

      /* ---------------------------------------------------------------- POSTRES */
      {
        id: "postres",
        nombre: "Postres",
        grupos: [
          {
            nombre: "Postres",
            productos: [
              { nombre: "Tarta de queso y pistacho", tipo: "tarta-pistacho", precio: null, foto: null },
              { nombre: "Tarta de queso y caramelo salado", tipo: "tarta-caramelo", precio: null, foto: null },
              { nombre: "Coulant de chocolate", tipo: "coulant", precio: null, foto: null, etiqueta: "Sin gluten (por confirmar)" },
              { nombre: "Tarrina de helado", tipo: "helado", precio: null, foto: null },
              { nombre: "Ben & Jerry's", tipo: "helado", precio: null, foto: null },
              { nombre: "Brownie", tipo: "brownie", precio: null, foto: null },
              { nombre: "Tarrina Ben & Jerry's", tipo: "helado", precio: null, foto: null },
              { nombre: "Cheesecake", tipo: "tarta", precio: null, foto: null }
            ]
          }
        ]
      }
    ]
  },

  /* Galería de fotos del local y los platos. Si se rellena, aparece la sección «Galería».
     Ejemplo:  { src: "images/galeria/foto-1.jpg", alt: "Descripción de la foto" }  */
  galeria: []
};
