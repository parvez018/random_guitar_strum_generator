// For Audio

//Create Audio Context
var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = null;
var g = null;

//Sound Storage 
//If you add your own sounds here, please consider 
//submitting a pull request with your additional sounds
var soundObj = {
	bump:["triangle",100,0.8,333,0.2,100,0.4,80,0.7],
	buzzer:["sawtooth",40,0.8, 100,0.3 ,110, 0.5],
	zip:["sawtooth",75,0.8,85,0.2,95,0.4,110,0.6,120,0.7,100,0.8],
	powerdown:["sine", 300, 1.2, 150, 0.5,1,0.9],
	powerup:["sine", 30, 1, 150, 0.4,350,0.9],
	bounce:["square", 75, 0.5, 150, 0.4],
	siren:["sawtooth",900,2.5, 400,0.5 ,900, 1, 400,1.4, 900, 2, 400, 2.5],
	loop:["sine", 340, 2.5, 550, 0.8, 440, 1.4],
	falling:["sine", 750, 5.2, 700, 1, 600, 2, 500, 3, 400, 4, 300, 4.5, 200, 5]
}

//Tone Storage
var tone = {
	'C0': 16.35,
	'C#0': 17.32,
	'D0': 18.35,
	'D#0': 19.45,
	'E0': 20.60,
	'F0': 21.83,
	'F#0': 23.12,
	'Gb0': 23.12,
	'G0': 24.50,
	'G#0': 25.96,
	'A0': 27.50,
	'A#0': 29.14,
	'B0': 30.87,
	'C1': 32.70,
	'C#1': 34.65,
	'D1': 36.71,
	'D#1': 38.89,
	'E1': 41.20,
	'F1': 43.65,
	'F#1': 46.25,
	'G1': 49.00,
	'G#1': 51.91,
	'A1': 55.00,
	'A#1': 58.27,
	'B1': 61.74,
	'C2': 65.41,
	'C#2': 69.30,
	'D2': 73.42,
	'D#2': 77.78,
	'E2': 82.41,
	'F2': 87.31,
	'F#2': 92.50,
	'G2': 98.00,
	'G#2': 103.83,
	'A2': 110.00,
	'A#2': 116.54,
	'B2': 123.47,
	'C3': 130.81,
	'C#3': 138.59,
	'D3': 146.83,
	'D#3': 155.56,
	'E3': 164.81,
	'F3': 174.61,
	'F#3': 185.00,
	'G3': 196.00,
	'G#3': 207.65,
	'A3': 220.00,
	'A#3': 233.08,
	'B3': 246.94,
	'C4': 261.63,
	'C#4': 277.18,
	'D4': 293.66,
	'D#4': 311.13,
	'E4': 329.63,
	'F4': 349.23,
	'F#4': 369.99,
	'G4': 392.00,
	'G#4': 415.30,
	'A4': 440.00,
	'A#4': 466.16,
	'B4': 493.88,
	'C5': 523.25,
	'C#5': 554.37,
	'D5': 587.33,
	'D#5': 622.25,
	'E5': 659.26,
	'F5': 698.46,
	'F#5': 739.99,
	'G5': 783.99,
	'G#5': 830.61,
	'A5': 880.00,
	'A#5': 932.33,
	'B5': 987.77,
	'C6': 1046.50,
	'C#6': 1108.73,
	'D6': 1174.66,
	'D#6': 1244.51,
	'E6': 1318.51,
	'F6': 1396.91,
	'F#6': 1479.98,
	'G6': 1567.98,
	'G#6': 1661.22,
	'A6': 1760.00,
	'A#6': 1864.66,
	'B6': 1975.53,
	'C7': 2093.00,
	'C#7': 2217.46,
	'D7': 2349.32,
	'D#7': 2489.02,
	'E7': 2637.02,
	'F7': 2793.83,
	'F#7': 2959.96,
	'G7': 3135.96,
	'G#7': 3322.44,
	'A7': 3520.00,
	'A#7': 3729.31,
	'B7': 3951.07,
	'C8': 4186.01,
	'C#8': 4435,
	'D8': 4699,
	'D#8': 4978,
	'E8': 5274,
	'F8': 5588,
	'F#8': 5920,
	'G8': 6272,
	'G#8': 6645,
	'A8': 7040,
	'A#8': 7459,
	'B8': 7902
}

// Chord Storage
var chord = {
	'C': [261.6, 329.6, 392.0],
	'Cm': [261.6, 311.1, 392.0],
	'C#': [277.2, 349.2, 415.3],
	'D': [293.7, 370.0, 440.0],
	'Dm': [293.7, 349.2, 440.0],
	'D#': [311.1, 392.0, 466.2],
	'E': [329.6, 415.3, 493.9],
	'Em': [329.6, 392.0, 493.9],
	'F': [349.2, 440.0, 523.251],
	'Fm': [349.2, 415.3, 523.251],
	'F#': [370.0, 554.365, 466.2],
	'G': [392.0, 493.9, 587.330],
	'Gm': [392.0, 466.2, 587.330],
	'G#': [466.2, 523.251, 622.254],
	'A': [440.0, 554.365, 659.255],
	'Am': [440.0, 523.251, 659.255],
	'A#': [466.2, 587.330, 698.456],
	'B': [493.9, 622.254, 739.989],
	'Bm': [493.9, 587.330, 739.989]
}

/**
 * This function checks if given tone is flat
 * @param { String } tone given tone
 * @returns { Boolean } whether it is or isn't flat
 */
var isFlatTone = tone => /\wb\d/.test(tone);

/**
 * This functions corresponds a flat tone notation, to a sharp musical acident
 * @param { String } tone flat tone
 * @returns { String } corresponding sharp tone
 */
function downFlatTone (tone) {
	var flatMap = {
		'Ab': 'G#',
		'Bb': 'A#',
		'Cb': 'B',
		'D': 'C#',
		'E': 'D#',
		'F': 'E',
		'G': 'F#'
	};
	toneKey = tone.replace(/\d/, '');
	toneOctave = tone.replace(/\D/g, '');
	return flatMap[toneKey] + (toneKey === 'Cb' ? Number(toneOctave) - 1 : toneOctave)
}

const VOLUME_CURVE = [1.0, 0.61, 0.37, 0.22, 0.14, 0.08, 0.05, 0.0];

//Primary function
function playTone(frequency, type, duration) {
	if (type === undefined) {
		type = "sine";
	}
	if (duration === undefined) {
		duration = 1.3;
	}
	if (frequency === undefined) {
		frequency = 440;
	}
	o = context.createOscillator();
	g = context.createGain();
	o.connect(g);
	o.type = type;
	if (typeof frequency === "string") {
		if (chord[frequency]) {
			o.frequency.value = chord[frequency][0];
			completeChord(chord[frequency][1], type, duration);
			completeChord(chord[frequency][2], type, duration);
		} else if (isFlatTone(frequency)) {
			 o.frequency.value = tone[downFlatTone(frequency)];
		} else if (tone[frequency]) {
			o.frequency.value = tone[frequency];
		}
	} else if (typeof frequency === "object") {
		o.frequency.value = frequency[0];
		completeChord(frequency[1], type, duration);
		completeChord(frequency[2], type, duration);
	} else {
		o.frequency.value = frequency;
	}
	g.connect(context.destination);
	o.start(0);
	//g.gain.exponentialRampToValueAtTime(0.0001,context.currentTime + duration);
	g.gain.setValueCurveAtTime(VOLUME_CURVE, context.currentTime, duration);
}

// export playTone;
//This function helps complete chords and should not be used by itself
completeChord = (frequency, type, duration) => {
	osc = context.createOscillator();
	gn = context.createGain();
	osc.connect(gn);
	osc.type = type;
	osc.frequency.value = frequency;
	gn.connect(context.destination);
	osc.start(0);
	gn.gain.setValueCurveAtTime(VOLUME_CURVE, context.currentTime, duration);
}


//This function plays sounds
function playSound(waveType,startFreq,endTime) {
	if (soundObj[arguments[0]] && arguments.length === 1) {
		var soundName = arguments[0];
		playSound(...soundObj[soundName]);
	}  else {
	var oscillatorNode = context.createOscillator();
	var gainNode = context.createGain();
	
	oscillatorNode.type = waveType;
	oscillatorNode.frequency.setValueAtTime(startFreq, context.currentTime);
	
for (var i = 3; i < arguments.length; i += 2) {
	oscillatorNode.frequency.exponentialRampToValueAtTime(arguments[i], context.currentTime + arguments[i+1]);
}
	gainNode.gain.setValueAtTime(0.3, context.currentTime);
	gainNode.gain.setValueCurveAtTime(VOLUME_CURVE, context.currentTime, 2.0);
  
	oscillatorNode.connect(gainNode);
	gainNode.connect(context.destination);
  
	oscillatorNode.start();
	oscillatorNode.stop(context.currentTime + endTime);
  }
}







/////////////////////////////////////////////////////////////////////



const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight/2;

const maxLength = 10;

const ctx = canvas.getContext('2d');
const bgColor = 'rgb(100, 100, 100)';

var refreshing = false;
var autoBars = null;
var autoCirc = null;
var curAngle = 225;

function setBground(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);  


    ctx.fillStyle = 'white';
    ctx.font = '32px georgia';
    ctx.textAlign = "center";
    ctx.fillText('Random Strumming', width/2, 50);
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
};



function getRandomPattern(){
    total = 8;
    pattern = [];
    for (let i=0;i<total;i++){
        yes = Math.floor(0.7+Math.random());
        pattern.push(yes);
    }
    return pattern;
}


function prettyPattern(pattern){
	strPat = "";
	for(let i=0;i<pattern.length;i++){
		if (pattern[i] == 0){
		strPat += '\xa0';
		}
		else if(i%2==0){
			strPat += "D";
		}
		else{
			strPat += "U";
		}
	}
	return strPat;	
}


function addPattern2List(pattern){
    var node = document.createElement("LI");                 // Create a <li> node
    var textnode = document.createTextNode(prettyPattern(pattern));         // Create a text node
    node.appendChild(textnode);                              // Append the text to <li>
    plist = document.getElementById("patternList")
    // plist.appendChild(node);  
    
    plist.insertBefore(node, plist.firstChild);
    
    
    
    var listItems = plist.getElementsByTagName("li");
    if(listItems.length>maxLength){
        var last = listItems[listItems.length - 1];
        last.parentNode.removeChild(last);        
    }
    
}

function clearPatterns(){
    plist = document.getElementById("patternList");
    plist.innerHTML = '';
}


function drawBars(){
    setBground();
    
    var barWidth = width/30;
    var barHeight = height/5;
    var barGap = barWidth*1.5;
    
    var startX = (width/2) - 4*(barGap);
    var startY = 50;
    
    // ctx.font = '40px georgia';
    // ctx.fillText(startX,100,500);

    var barColors = ["rgb(102, 255, 102)","rgb(255, 102, 255)"];
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineWidth = 5;
    var barPattern = getRandomPattern();
    
    // ctx.fillText(barPattern.toString(), 500, 50);
    var barLabels = ["1⬇","and⬆","2⬇","and⬆","3⬇","and⬆","4⬇","and⬆"]

    
    ctx.font = '24px georgia';
    ctx.textAlign = "left";
    
    for (let i = 0; i < 8; i++) {
        startY = 50-startY;
        
        // ctx.clearRect(startX+i*barGap,150+ startY, barWidth, barHeight);
        if(barPattern[i]==1){
            ctx.fillStyle = barColors[i%2];
        }
        else{
            ctx.fillStyle = bgColor;
        }
        ctx.fillRect(startX+i*barGap,150+ startY, barWidth, barHeight);

        ctx.strokeRect(startX+i*barGap,150+ startY, barWidth, barHeight);


        ctx.fillStyle = 'orange';
        ctx.fillText(barLabels[i],startX+i*barGap,150-10);
        ctx.fillText(barLabels[i],startX+i*barGap,170+50+10+barHeight );
        
    } 
    
    if(refreshing)
    {
        drawLoading();
    }
    
    addPattern2List(pattern);
    
    
}

function drawLoading(){   
    playTone(Math.floor(200*Math.random()+100));
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    const cx = width*0.8;
    const cy = height*0.5;
    
    curAngle = (curAngle+45)%360;
    
    ctx.arc(cx,cy, 50, degToRad(curAngle), degToRad(curAngle + 45), true);
    ctx.lineTo(cx,cy);
    ctx.fill();
}


function autoRefresh(){
    var b = document.getElementById("autopattern");
    refreshing = !refreshing;
    
    label = "Auto Refresh (a)";
    if(refreshing){
        label = 'Stop Auto Refresh (a)';
        drawBars();
        autoBars = setInterval(drawBars,1000);
        // autoCirc = setInterval(drawLoading,1000);        
    }
    else{
        clearInterval(autoBars);
        curAngle = 225;
        drawBars();
    }
    b.textContent = label;
}

// function sleep(milliseconds) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//       currentDate = Date.now();
//     } while (currentDate - date < milliseconds);
  
// }


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  


async function playPattern(){
    plist = document.getElementById("patternList");
    var allPatterns = plist.getElementsByTagName("li");
    
    firstPattern = allPatterns[0].textContent;
    console.log(firstPattern);
    
    for(let i=0;i<firstPattern.length;i++)
    {
        if(firstPattern[i]==1){
            if(i%2==0){
                playTone("G3");
            }  
            else{
                playTone("A4");
            }
        }

        // setTimeout(() => {console.log("this is the first message")}, 2000);
        await sleep(200);
    }
}



document.addEventListener("keypress", function onPress(event) {
    // if (event.key === "n" && event.ctrlKey) {
    //     // Do something awesome
    // }
    if (event.key == "n"){
        drawBars();
        // playTone("G3");
    }
    else if(event.key=="a"){
        autoRefresh();
    }
    else if(event.key=="c"){
        clearPatterns();
    }
    else if(event.key=="p"){
        playPattern();
    }
});




setBground();
drawBars();
// drawLoading();
// drawBars();
