const timer = document.getElementById("timer")
const stopwatch = document.getElementById("stopwatch")
let timerInterval
let blink
var tempo

timer.addEventListener("mousedown", function(){
    //liga o primeiro estágio do timer
    timer.style.backgroundImage = "url(WCA/TimerStage1.png)"

    //Liga o segundo estágio
    timerInterval = setInterval(function(){
        timer.style.backgroundImage = "url(WCA/TimerStage2.png"        
    },500)
})



var ligado = 0
var Amil = 0
var Bmil = 0
var Asec = 0
var Bsec = 0
var Amin = 0
var Bmin = 0
var Ahora = 0
var Bhora = 0



function comecar(){
    requestAnimationFrame(comecar)
    Amil += 1


    
    if(Amil > 9){
        Bmil += 1
        Amil = 0
    }
    if(Bmil > 9){
        Bmil = 0
        Asec += 1
    }
    if(Asec>9){
        Asec = 0
        Bsec += 1
    }
    if(Bsec > 5){
        Bsec = 0
        Amin += 1
    }
    if(Amin > 9){
        Amin = 0
        Bmin += 1
    }
    if(Bmin >5){
        Bmin = 0
        Ahora += 1
    }
    if(Ahora > 9){
        Ahora = 0
        Bhora += 1
    }

    

    if(Ahora >= 1 || Bhora >= 1){
        stopwatch.innerHTML = `${Bhora}${Ahora}:${Bmin}${Amin}:${Bsec}${Asec}:${Bmil}${Amil}`
    }else if(Amin >= 1 || Bmin >= 1){
        stopwatch.innerHTML = `${Bmin}${Amin}:${Bsec}${Asec}:${Bmil}${Amil}`
    }else{
        stopwatch.innerHTML = `${Bsec}${Asec}:${Bmil}${Amil}`
    }
}


//encerra os estágios
timer.addEventListener("mouseup", function(){
    timer.style.backgroundImage = "url(WCA/TimerOff.png)"
    clearInterval(timerInterval)
    comecar()
    
    
})
