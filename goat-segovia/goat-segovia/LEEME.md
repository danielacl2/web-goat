# Web de GOAT Segovia · propuesta de diseño (versión 11)

## Cómo abrirla
1. Descomprime el .zip (clic derecho > Extraer todo).
2. Haz doble clic en `index.html`. Se abre en tu navegador. No hace falta instalar nada ni tener internet (solo para el mapa y los enlaces externos).

## Qué hay en cada carpeta
- `index.html`: la web principal (portada, qué somos, carta, horarios, pronto, Instagram, visítanos).
- `aviso-legal.html`, `privacidad.html`, `cookies.html`: textos legales (con marcadores amarillos por completar).
- `css/styles.css`: colores y estilo. Los colores están al principio del archivo (bloque `:root`).
- `js/config.js`: **aquí está TODA la carta** (6 categorías, 38 productos). Para poner un precio o una foto solo hay que cambiar `precio: null` por `precio: 12.5` y `foto: null` por `foto: "images/carta/nombre.jpg"`. Las instrucciones están al principio del archivo. No hace falta tocar nada más.
- `js/main.js`: animaciones, menú del móvil y mapa.
- `fonts/`: tipografía Inter (licencia libre OFL, incluida). Va dentro de la web, no se descarga de ningún sitio.
- `images/logo-goat.svg`: el logotipo calcado en vectorial a partir del PNG que dio el negocio. `images/logo-cliente-original.png`: el PNG original.
- `images/galeria/` y `images/carta/` (créala si hace falta): para las fotos del negocio.

## Datos confirmados (los que dio el negocio y las fichas oficiales de Turismo)
- Nombre: GOAT · bar y hamburguesería · Calle de la Cabritería, 6, 40001 Segovia
- Teléfono 653 975 318 · email goat.segovia@gmail.com · Instagram @goat.segovia
- Horario: bar de 12:00 a 00:00 (los findes se puede alargar). Cocina: comidas 13:00–16:30, cenas 20:30–23:30
- Opciones: sin gluten, vegetariana, veggie, sin lactosa
- Pronto: para llevar y delivery, terrazas. En preparación: sala privada (cumpleaños, cenas de empresa, grupos grandes)
- Mascotas: no pueden entrar
- 66 plazas, admite tarjeta, transporte público cercano, registro de turismo R 40/000248 (confirmar)
- Carta online: https://app.foodtic.com/carta/goat

## Cómo se actualiza la carta (resumen)
1. Abre `js/config.js` con el Bloc de notas.
2. Busca el producto por su nombre. Cambia `precio: null` por el precio (con punto: `12.5` se muestra «12,50 €»).
3. Guarda la foto oficial en `images/carta/` y escribe su ruta en `foto:`. La tarjeta quita sola la etiqueta «Imagen provisional».
4. Si el negocio confirma la descripción de un producto vegetariano, escríbela en `descripcion:` y borra la línea `pendiente:`.
5. Guarda el archivo y recarga la web.

## Qué NO se pudo conseguir (hay que pedirlo al negocio)
- **Fotos reales** de la comida y el local, con permiso de uso. Ahora la web usa ilustraciones dibujadas para la propuesta, indicadas como tales; no se hacen pasar por fotos de GOAT.
- **Precios**: no hay ninguno confirmado. Todos los productos muestran «Precio por confirmar». La carta con los productos salió de la lista que facilitó el cliente.
- **Logotipo en alta resolución o vectorial**: el PNG recibido es pequeño (215×232 px). Se ha calcado en vectorial para que se vea nítido, pero conviene pedir el original.
- Qué días abre y cierra (el horario recibido no lo dice, por eso la web no dice «todos los días»).
- Datos del titular para los textos legales: nombre o razón social, NIF/CIF, domicilio.

## Para consultar con GOAT (carta)
- Posibles duplicados (se han mantenido todos): «Ben & Jerry's» y «Tarrina Ben & Jerry's»; «Tarta de queso y pistacho / caramelo salado» y «Cheesecake»; «Tarrina de helado».
- «Damas Cheddar» (en Hamburguesas sin gluten): se ha dejado tal cual; ¿es un error de escritura?
- Si los precios llevan impuestos incluidos (IVA). No es una categoría; solo hay que saberlo para mostrar bien los precios.
- Descripciones de las 3 hamburguesas vegetarianas.
- Sin gluten: ingredientes, contaminación cruzada y preparación de cada plato. Hasta que lo confirmen, la web NO dice que sean aptos para celíacos.
- Coulant de chocolate «sin gluten»: pendiente de confirmar (aparece como «por confirmar»).
- Descripciones de los platos para compartir, menú infantil y postres (ahora solo tienen el nombre).
- Fotos oficiales de cada producto (ahora hay ilustraciones marcadas como «Imagen provisional»).

## Animaciones y «reducir movimiento»
- Si el ordenador o el móvil tiene activado «reducir movimiento» (Windows: Accesibilidad > Efectos visuales > Efectos de animación; Mac: Accesibilidad > Pantalla > Reducir movimiento), la web no hace desplazamientos ni giros: los textos y tarjetas aparecen solo con un fundido suave. La cinta de la portada sigue en marcha, más lenta.
- Si el navegador no puede ejecutar el JavaScript, a los 4 segundos todo el texto se muestra igualmente.

## Para consultar con GOAT (delivery y dirección)
- Delivery: la tarjeta «Para llevar y delivery» dice «Muy pronto en casa, pero no será lo mismo que venir» y muestra Uber Eats y Glovo con la etiqueta «Próximamente». Solo se muestran los nombres en texto, sin logotipos ni enlaces. Cuando el servicio exista, habrá que añadir los enlaces reales y, si se quieren logotipos, usar los recursos oficiales de cada plataforma.
- «(Plaza Mayor)» se ha añadido solo en la dirección de la portada. En «Visítanos», el pie y los datos para Google la dirección sigue igual; confirmar si se quiere añadir también allí.

## Para confirmar con el negocio antes de publicar
- La frase «Combinaciones originales» y los textos de las tarjetas de carta (salen de la descripción oficial).
- El registro de turismo R 40/000248 y los datos legales.
- Si el enlace de la carta (Foodtic) es el definitivo.

## Antes de publicar
- Quitar la línea `noindex` de las 4 páginas (ahora mismo la web no sale en Google a propósito).
- Quitar la frase «Propuesta de diseño pendiente de aprobación» del pie.
- Rellenar los marcadores amarillos de las páginas legales.
- Añadir `canonical` con el dominio definitivo (hay un comentario en `index.html`) y una imagen para compartir en redes (og:image) cuando haya fotos.
- Comprobar en el navegador (F12 > Application > Cookies) que no aparecen cookies antes de pulsar «Cargar mapa».
- No está publicada ni hay dominio comprado: eso se decide juntos.

## Novedades de la versión 6
- Textos: los títulos y bloques aparecen completos (fundido + pequeño desplazamiento vertical). Ya no hay palabras que salten una a una.
- Logotipo de la portada: efecto de rótulo de neón (se enciende y se atenúa suavemente cada 12 s). Está en `css/styles.css`, bloque «Logotipo con efecto de rótulo de neón». Para quitarlo basta borrar las clases `neon__brillo`, `neon__nucleo` y `neon__ambiente` del `index.html`. Con «reducir movimiento» queda encendido y fijo.
- Terrazas: banda ancha con una ilustración decorativa (no es una foto real de la terraza). Cuando GOAT facilite fotos reales se puede sustituir.
- Sala privada: sin botón; los tres usos (cumpleaños, cenas de empresa, grupos grandes) salen de lo que ya decía el texto.
- Instagram: icono a la derecha enlazado a https://www.instagram.com/goat.segovia/
- Fondos: la carta, novedades e Instagram reutilizan el estilo de la portada (resplandores, aros, bordes en diagonal). La última sección (Visítanos) y el pie no se han tocado.

## Novedades de la versión 7
- Neón: ciclo de 12 s con apagado casi total, un ligero parpadeo al encender y un tramo largo encendido. Con «reducir movimiento» queda fijo y encendido.
- Tarjetas de la carta: sin animaciones de entrada ni movimiento. Solo, con ratón, un brillo en el borde y una luz detrás del producto. En móvil, luz tenue fija.
- Grupos con un solo producto (Otras hamburguesas) ocupan la fila entera en horizontal.
- Cuándo venir: barras con relieve, iconos y horas dentro (en ordenador); tarjetas con iconos.
- Visítanos: tarjeta/plazas/transporte y aviso de mascotas suben justo debajo de la dirección.
- Móvil: Sala privada, Delivery y Terrazas son más compactas.

## Novedades de la versión 8
- Horarios: nombres y horas de Bar y Cocina alineados a la misma altura (hora algo más pequeña para que respire).
- Qué somos: sin animaciones (contenido directo, cifras sin cuenta atrás), más compacta en móvil y con fondo nuevo (resplandores, aros y degradados sobre el crema).

## Novedades de la versión 9
- Fondos: Visítanos, el pie y la cinta tienen ahora resplandores, aros y degradados como el resto; horarios y carta con algo más de luz.
- Mascotas: el aviso («Las mascotas no pueden entrar.») pasa de Visítanos a Horarios, en un bloque bajo las horas.

## Versión 10: neón
- Ciclo de 9 s, apagado marcado y encendido con halo. Ahora también funciona si el sistema tiene las animaciones desactivadas.

## Versión 11
- Se ha quitado el chorreón de queso del borde derecho.
- Menú del móvil en horizontal: ya se puede llegar a todos los enlaces (antes «Qué somos» quedaba cortado).
- Botón de pausa (a la derecha de la cinta amarilla): detiene la cinta y deja el neón encendido fijo. Se maneja también con teclado.
- Móvil: botón del menú y enlaces del pie más grandes para el dedo.
