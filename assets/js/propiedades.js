



function cargarAPIpropiedades() {

    fetch('https://si0sgs.github.io/EstateAgency/datos/propiedades.json', {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud.');
            }
            return response.json();
        })
        .then(data => {
            const propiedades = data.propiedades; // Obtener el arreglo de propiedades
            console.log(propiedades); // Mostrar las propiedades en la consola
            const contenedor = document.getElementById('datosPropiedades');

            // Supongamos que tienes una array llamada propiedades con objetos que tienen los campos que necesitas

            for (let i = 0; i < propiedades.length; i++) {
                // Creas un elemento div
                const div = document.createElement('div');
                div.className = 'col-md-4';

                // Crea una cadena de texto con el HTML que quieres agregar
                const html = `
      <div class="card-box-a card-shadow">
        <div class="img-box-a">
          <img src="${propiedades[i].imagen}" alt="" class="img-a img-fluid">
        </div>
        <div class="card-overlay">
          <div class="card-overlay-a-content">
            <div class="card-header-a">
              <h2 class="card-title-a">
                <a href="#">${propiedades[i].clasificacion}</a>
              </h2>
              <p class="link-a">${propiedades[i].descripcion}</p>
            </div>
            <div class="card-body-a">
              <div class="price-box d-flex">
                <span class="price-a">${propiedades[i].tipo} | $ ${propiedades[i].precio}</span>
              </div>
            </div>
            <div class="card-footer-a">
              <ul class="card-info d-flex justify-content-around">
                <li>
                  <h4 class="card-info-title">Area</h4>
                  <span>${propiedades[i].detalle.area}m<sup>2</sup></span>
                </li>
                <li>
                  <h4 class="card-info-title">Rooms</h4>
                  <span>${propiedades[i].detalle.rooms}</span>
                </li>
                <li>
                  <h4 class="card-info-title">Floors</h4>
                  <span>${propiedades[i].detalle.floors}</span>
                </li>
                <li>
                  <h4 class="card-info-title">Garages</h4>
                  <span>${propiedades[i].detalle.garages}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

                // Agrega la cadena de texto al div creado
                div.innerHTML = html;

                // Agrega el div al elemento contenedor
                document.getElementById('datosPropiedades').appendChild(div);
            }

        })
        .catch(error => {
            console.error(error);
        });

        
}


window.onload = cargarAPIpropiedades;