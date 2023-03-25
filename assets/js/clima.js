
//Api de google maps
//encontrar la ubicacion en especifico
function EncontrarUbicacion() {
    var output = document.getElementById("ubicacion");

    //Referencia a objeto Geolocalizacion
    if (navigator.geolocation) {
        output.innerHTML = "<p>Soporta la geolocalizacion</p>";
    } else {
        output.innerHTML = "<p>NO Soporta la geolocalizacion</p>";
        return;
    }

    function localizacion(posicion) {
        //Obtener las coordenadas de la posicion
        var latitud = posicion.coords.latitude;
        var longitud = posicion.coords.longitude;

        output.innerHTML =
            "<p>Latitud: " + latitud + "<br>Longitud: " + longitud + "</p>";
        initMap(latitud, longitud);

        clima(latitud, longitud);
    }


    function error() {
        output.innerHTML = "<p>No se pudo obtener tu ubicacion</p>";
    }
    //metodo para recuperar la posicion actual
    navigator.geolocation.getCurrentPosition(localizacion, error);
    //Dibuja el mapa con el marcador en la ubicacion que especificamos
    function initMap(latitud, longitud) {
        var miPosicion = { lat: latitud, lng: longitud };
        var map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: miPosicion,
        });
        var marker = new google.maps.Marker({
            position: miPosicion,
            map: map,
        });
    };
};
//Calcular distancias entre 2 puntos especificados
function calcularDistancia() {
    // Obtener las coordenadas de los dos puntos
    var punto1 = new google.maps.LatLng(40.748817, -73.985428); // Nueva York
    var punto2 = new google.maps.LatLng(37.774929, -122.419416); // San Francisco
    // Calcular la distancia entre los dos puntos en metros
    var distancia = google.maps.geometry.spherical.computeDistanceBetween(punto1, punto2);

    // Mostrar la distancia en la página
    var distanciaKM = (distancia / 1000).toFixed(2);
    var resultado = document.getElementById("resultado");
    resultado.innerHTML = "La distancia entre Nueva York y San Francisco es de " + distanciaKM + " km.";
}
//Posicionamiento continuo
function posicionamiento() {
    var map = new google.maps.Map(document.getElementById('mapa'), {
        zoom: 14,
        center: new google.maps.LatLng(40.748817, -73.985428) // Nueva York
    });

    // Crear un marcador en la posición inicial
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.748817, -73.985428),
        map: map
    });

    // Función para actualizar la posición del marcador
    function actualizarPosicion(posicion) {
        var latitud = posicion.coords.latitude;
        var longitud = posicion.coords.longitude;
        var nuevaPosicion = new google.maps.LatLng(latitud, longitud);
        marker.setPosition(nuevaPosicion);
        map.setCenter(nuevaPosicion);
    }

    // Obtener la posición del dispositivo cada 5 segundos  Error             presicion                   ms            ms
    navigator.geolocation.watchPosition(actualizarPosicion, null, { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 });


}

function clima(latitud, longitud) {
    const apiKey = "aafc5ea20ca08688d7fa14a217ea75c0";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const clima = data; // Obtener el arreglo de propiedades
            const lugar = document.getElementById("lug");
            lugar.textContent = clima.name;
            const temperatura = document.getElementById("tem");
            let centígrados = (parseFloat(clima.main.temp) - 32) * (5 / 9);
            temperatura.textContent = centígrados;
            const humedad = document.getElementById("hum");
            humedad.textContent = clima.main.humidity;
            const viento = document.getElementById("vie");
            viento.textContent = clima.wind.speed;
            const imagen = document.getElementById("tiempoIcon");
            imagen.src="assets/img/ico.png";

        })
        .catch(error => {
            console.log(error);
        });
}


window.onload = EncontrarUbicacion;