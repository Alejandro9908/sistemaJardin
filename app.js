var database = firebase.database();
var nodoSTR = database.ref('sensorTiempoReal/sensorTiempoReal');
var nodoLlave = database.ref('llave/llave');
var nodoConf = database.ref('configuracion/configuracion');
var nodoRango = database.ref('rango/rango');

function abrirLlave() {
    const newData = {
        estado: 1
    }
    nodoConf.update(newData);
}

function cerrarLlave() {
    const newData = {
        estado: 0
    }
    nodoConf.update(newData);
}


//CONSULTA AL ABRIR LA APP
function consulta_llave() {
        nodoConf.once("value").then(function (snapshot) {
            var estado = snapshot.child("estado").val();
            console.log(estado);

            if (estado == 0) {
                $('#llave').bootstrapToggle('off');
            } else {
            
                $('#llave').bootstrapToggle('on');
            }
        });
    
}

function consulta_sensores() {
    
        nodoSTR.once("value").then(function (snapshot) {
            var sensorHumedadSuelo = snapshot.child("sensorHumedadSuelo").val();
                $('#hSuelo').html(sensorHumedadSuelo+' %');   
        });

        nodoSTR.once("value").then(function (snapshot) {
            var sensorTemperaturaC = snapshot.child("sensorTemperaturaC").val();
            var sensorTemperaturaF = snapshot.child("sensorTemperaturaF").val();
            $('#tAmbiente').html(sensorTemperaturaC +'° C | '+sensorTemperaturaF+'° F');
        });

        nodoSTR.once("value").then(function (snapshot) {
            var sensacionTermicaC = snapshot.child("sensacionTermicaC").val();
            var sensacionTermicaF = snapshot.child("sensacionTermicaF").val();
            $('#sTermica').html(sensacionTermicaC +'° C | '+sensacionTermicaF+'° F');
        });

        nodoSTR.once("value").then(function (snapshot) {
            var sensorHumedad = snapshot.child("sensorHumedad").val();
            $('#hAmbiente').html(sensorHumedad +' %');
        });

        nodoLlave.once("value").then(function (snapshot) {
            var estadoLlave = snapshot.child("estado").val();
            if(estadoLlave == 0){
                $('#llavee').html('Cerrada');
            }if(estadoLlave == 1){
                $('#llavee').html('Abierta');
            }
            
        });
    
}

//EVENTOS DE LOS BOTONES TOGGLE
$('#llave').change(function () {
    if ($(this).prop('checked') == true) {
        abrirLlave();//encender sistema
    } else {
        cerrarLlave();//apagar sistema
    }
})


consulta_sensores();
consulta_llave();










//DETECTAMOS LOS ESTADOS DE LAS LUCES EN LA BASE DE DATOS
/*ref.on("value", snapshot => {
    for (let i = 1; i <= 4; i++) {
        var estado = snapshot.child(i).child("estado").val();
        console.log(estado);

        if (estado == 0) {
            $('#m_' + i).html('LED '+i+': Apagado')
            $('#led_' + i).bootstrapToggle('off');
        } else {
            $('#m_' + i).html('LED '+i+': Encendido')
            $('#led_' + i).bootstrapToggle('on');
        }
    }
});


/* INSERTAR LUCES
    for(let i = 1; i <= 4; i++){
        database.ref("/luces/"+i).set({
            nombre: "Led_1",
            descripcion: "Sala",
            estado: 0
        });
    }
    ELIMINAR:
    ref.child(id).remove();
*/