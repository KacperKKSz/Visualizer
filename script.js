let song = ['Minecraft', 'Zamki_na_piasku', 'Mala', 'Raz-dwa', 'Pyl', 'Raissa', 'Zwiedzam Swiat', 'Zyje w kraju', 'Laki lan', 'Lipstick on the glass', 'Kate Moss', 'Jestem bogiem', 'Spadochron', 'Mississippi w ogniu', 'Pozegnanie Malego Wojownika', 'Biegnij dalej sam', 'Jah jest prezydentem', 'Gotta Be Right', 'Bombaj', 'Jezu, jak sie ciesze', 'Serce', 'Ja pas', 'Miec czy byc', 'Pila tango'];
let canvas, ctx, center_x, center_y, radius, bars, track_id,
x_end, y_end, bar_height, bar_width, x_end_2, y_end_2, x_2, y_2,
frequency_array, text, frq;
bar_width = 12;
radius = 250;
let id = 1;
let jumper = 8;
let pp = 0;
//let time_bar = document.getElementById('range');
//Buttons
let play = document.getElementById('play');
let pause = document.getElementById('pause');
let forward = document.getElementById('forward');
let backward = document.getElementById('backward');
let timer = 0;
play.addEventListener('click', playq);
pause.addEventListener('click', pauseq);
forward.addEventListener('click', forwardq);
backward.addEventListener('click', backwardq);
document.addEventListener('keydown', eventListener);
//Button Listener
function eventListener(e) {
    if (e.code == 'ArrowRight'){
        forwardq();
    }
    if (e.code == 'ArrowLeft'){
        backwardq();
    }
    if (e.code == 'ArrowUp'){
        audio.volume += 0.05;
        audio.volume = (Math.round(audio.volume*100)/100)
        console.log(audio.volume);
    }
    if (e.code == 'ArrowDown'){
        audio.volume -= 0.05;
        audio.volume = (Math.round(audio.volume*100)/100)
        console.log(audio.volume);
    }
    if (e.code == 'Space') {
        if(play.style.display == "block") {
            playq();
        } 
        else {
            pauseq();
        }
    } 
    if(e.code == 'Numpad0' || e.code == 'Digit0') {
        styleChanger(0);
    }
    if(e.code == 'Numpad1' || e.code == 'Digit1') {
        styleChanger(1);
    }
    if(e.code == 'Numpad2' || e.code == 'Digit2') {
        styleChanger(2);
    }
    if(e.code == 'Numpad3' || e.code == 'Digit3') {
        styleChanger(3);
    }

}

//Butons action
function playq() {
    play.style.display = "none";
    pause.style.display = "block";
    chooser(id);
    Player(timer);
}
function pauseq() {
    timer = audio.currentTime;
    audio.pause();
    pause.style.display = "none";
    play.style.display = "block";
}
function forwardq() {
    document.getElementById('z_1').style.display = "none";
    audio.pause();
    id++;
    chooser(id);
    timer = 0;
    Player(timer);
}
function backwardq() {
    document.getElementById('z_1').style.display = "none";
    audio.pause();
    id--;
    chooser(id);
    timer = 0;
    Player(timer);
}

//Chooser of song from playlist
function chooser(ID){
    if(ID >= song.length) {
        ID = 1;
        id = 1;
    }
    if(ID <= 0) {
        ID = song.length - 1;
        id = song.length - 1;
    }
    audio = new Audio();
    audio.src = "playlist/"+song[ID]+".mp3";
}

//Player (time in seconds)
function Player(timer){
    audio.currentTime = timer;
    audio.play();
    Visualizer();
    audio.onended=function(){audio.pause(); id++; chooser(id); timer = 0; Player(timer);};
    document.getElementById('z_0').style.display = "block";
    document.getElementById('z_1').style.display = "block";
    audio.controls = true;
    forward.style.display = "block";
    backward.style.display = "block";
}

//Visualizer start
function Visualizer(){
    context = new (window.AudioContext || window.webkitAudioContext)();
    analyser = context.createAnalyser();
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    frequency_array = new Uint8Array(analyser.frequencyBinCount);
    bars = frequency_array.length/(jumper*2);
    animationLooper(); 
}

//Function of animation
function animationLooper(){
    canvas = document.getElementById("renderer");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    center_x = canvas.width / 2;
    center_y = canvas.height / 2;
    ctx.beginPath();
    ctx.arc(center_x,center_y,radius,0,2*Math.PI);
    ctx.stroke();
    analyser.getByteFrequencyData(frequency_array);
//Loop for coordinats
    let j = 0;

    for(let i = 0; i < bars; i++){
        rads = Math.PI / (bars);
        frq = 0;
        let set = (Math.PI/(2*bars));
        for(let a = 0; a < jumper; a++) {
            frq += frequency_array[j+a];
        }
        bar_height = ((frq/jumper)-Math.sqrt(frq+2))
        x = center_x - Math.cos(rads * i - Math.PI/2 + set) * (radius);
        y = center_y + Math.sin(rads * i - Math.PI/2 + set) * (radius);
        x_2 = center_x - Math.cos(rads * i + Math.PI/2 + set)  * (radius);
        y_2 = center_y - Math.sin(rads * i + Math.PI/2 + set) * (radius);
        x_end = center_x - Math.cos(rads * i - Math.PI/2 + set) * (radius + bar_height);
        y_end = center_y + Math.sin(rads * i - Math.PI/2 + set) * (radius + bar_height);
        x_end_2 = center_x - Math.cos(rads * i + Math.PI/2 + set) * (radius + bar_height);
        y_end_2 = center_y - Math.sin(rads * i + Math.PI/2 + set) * (radius + bar_height); 
        time_x = center_x - Math.cos(rads * audio.currentTime/audio.duration * i) * (radius-1);
        time_y = center_y - Math.sin(rads * audio.currentTime/audio.duration * i) * (radius-1);
        time_x_2 = center_x + Math.cos(rads * (1-audio.currentTime/audio.duration) * i) * (radius-1);
        time_y_2 = center_y - Math.sin(rads * (1-audio.currentTime/audio.duration) * i) * (radius-1);
        j = j + jumper;
        //Function call
        drawBar(x, y, x_end, y_end, bar_width, 125+((frq*86)/(jumper*256)), 191*(i/bars),160 - (128*(i/bars)), 0.9);
        drawBar(x_2, y_2, x_end_2, y_end_2, bar_width, 125+((frq*86)/(jumper*256)), 191*(i/bars),160 - (128*(i/bars)),  0.9);
        drawBar(center_x, center_y, time_x_2, time_y_2, 20, 32, 32, 32, 1);
        }
        //Loop
        window.requestAnimationFrame(animationLooper);

}

//Animation drow of Visualizer and Time
function drawBar(x1, y1, x2, y2, width, r, g, b, a){
    let lineColor = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

function status(){
    time = audio.currentTime;
    console.log("nr piosęnki "+id+". Czas trwania "+time+"s");
}

function settings(first_set, secend_set) {
    bar_width = first_set;
    jumper = secend_set;
    return(bar_width, jumper);
}

function styleChanger(style_number) {
    let background = document.getElementById('body');
    let style = ['linear-gradient(-45deg, #141e30, #243b55, #000000, #434343)',
    'linear-gradient(-45deg, #40E0D0, #FF8C00, #FF0080, #434343)',
    'linear-gradient(-45deg, #59C173, #a17fe0, #5D26C1, #434343)',];
    background.style.background = style[style_number];
    background.style.backgroundSize = '400% 400%';
    background.style.backgroundAnimation = 'gradientBG 15s ease infinite';
}