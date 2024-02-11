function horario(){
    
    var momento = document.getElementById("horario")
    var date = new Date()
    var horas = date.getHours()
    var minutos = date.getMinutes()
    var segundos = date.getSeconds()

    horas = horas < 10 ? "0" + horas: horas;

    minutos = minutos < 10 ? "0" + minutos: minutos;

    segundos = segundos < 10 ? "0" + segundos: segundos;

    var horario = horas + ":" + minutos + ":" + segundos

    momento.innerHTML = (horario)

}

setInterval(horario, 1000)
