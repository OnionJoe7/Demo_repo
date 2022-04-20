let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscList = [];
let mainGainNode = null;
let keyboard = document.querySelector(".keyboard");                    //container element for keys
let wavePicker = document.querySelector("select[name='waveform']");    //HTMLElement("select") used to choose waveform of the notes
let volumeControl = document.querySelector("input[name='volume']");    //HTMLElement("input") used to control the main audio volume

let noteFreq = null;                                                   //An array of arrays. Each one has a separate entry for each note in that octave. The frequency of the note's tone in Hertz is represented by the value for each. 
let customWaveform = null;                                             //domxref("PeriodicWave") - describes the waveform to use when the user selects "Custom" from the waveform picker
let sineTerms = null;                                                  //sineTerms / cosineTerms will be used to store the data for generating the waveform. Each contains an array that is generated when the user chooses "Custom"
let cosineTerms = null;




// const loginForm = document.getElementById("login-form");
// const loginButton = document.getElementById("login-form-submit");
// const loginErrorMsg = document.getElementById("login-error-msg");

// loginButton.addEventListener("click", (e) => {
//   e.preventDefault();
//   const username = loginForm.username.value;
//   const password = loginForm.password.value;

//   if (username === "user" && password === '"C", "D", "E" ') {
//       alert("You have successfully logged in.");
//       location.reload();
//   } else {
//       loginErrorMsg.style.opacity = 1;
//   }
// })

// Create an array named "noteFreq" that contains an array of objects, each representing an octave. Each of these has one named property for each note in that octave.
// The property's name is the note's name (for instance "C#" will represent C-sharp), and the value is the frequency of the note, in Hertz.
function createNoteTable() {
    let noteFreq = [];
    for (let i=0; i< 9; i++) {
      noteFreq[i] = [];
    }
  
    // noteFreq[0]["A"] = 27.500000000000000;
    // noteFreq[0]["A#"] = 29.135235094880619;
    // noteFreq[0]["B"] = 30.867706328507756;
  
    // noteFreq[1]["C"] = 32.703195662574829;
    // noteFreq[1]["C#"] = 34.647828872109012;
    // noteFreq[1]["D"] = 36.708095989675945;
    // noteFreq[1]["D#"] = 38.890872965260113;
    // noteFreq[1]["E"] = 41.203444614108741;
    // noteFreq[1]["F"] = 43.653528929125485;
    // noteFreq[1]["F#"] = 46.249302838954299;
    // noteFreq[1]["G"] = 48.999429497718661;
    // noteFreq[1]["G#"] = 51.913087197493142;
    // noteFreq[1]["A"] = 55.000000000000000;
    // noteFreq[1]["A#"] = 58.270470189761239;
    // noteFreq[1]["B"] = 61.735412657015513;
    // noteFreq[2]["C"] = 65.406391325149658;
    // noteFreq[2]["C#"] = 69.295657744218024;
    // noteFreq[2]["D"] = 73.416191979351890;
    // noteFreq[2]["D#"] = 77.781745930520227;
    // noteFreq[2]["E"] = 82.406889228217482;
    // noteFreq[2]["F"] = 87.307057858250971;
    // noteFreq[2]["F#"] = 92.498605677908599;
    // noteFreq[2]["G"] = 97.998858995437323;
    // noteFreq[2]["G#"] = 103.826174394986284;
    // noteFreq[2]["A"] = 110.000000000000000;
    // noteFreq[2]["A#"] = 116.540940379522479;
    // noteFreq[2]["B"] = 123.470825314031027;
  
    // noteFreq[3]["C"] = 130.812782650299317;
    // noteFreq[3]["C#"] = 138.591315488436048;
    // noteFreq[3]["D"] = 146.832383958703780;
    // noteFreq[3]["D#"] = 155.563491861040455;
    // noteFreq[3]["E"] = 164.813778456434964;
    // noteFreq[3]["F"] = 174.614115716501942;
    // noteFreq[3]["F#"] = 184.997211355817199;
    // noteFreq[3]["G"] = 195.997717990874647;
    // noteFreq[3]["G#"] = 207.652348789972569;
    // noteFreq[3]["A"] = 220.000000000000000;
    // noteFreq[3]["A#"] = 233.081880759044958;
    // noteFreq[3]["B"] = 246.941650628062055;
  
    // noteFreq[4]["C"] = 261.625565300598634;
    // noteFreq[4]["C#"] = 277.182630976872096;
    // noteFreq[4]["D"] = 293.664767917407560;
    // noteFreq[4]["D#"] = 311.126983722080910;
    // noteFreq[4]["E"] = 329.627556912869929;
    // noteFreq[4]["F"] = 349.228231433003884;
    // noteFreq[4]["F#"] = 369.994422711634398;
    // noteFreq[4]["G"] = 391.995435981749294;
    // noteFreq[4]["G#"] = 415.304697579945138;
    // noteFreq[4]["A"] = 440.000000000000000;
    // noteFreq[4]["A#"] = 466.163761518089916;
    // noteFreq[4]["B"] = 493.883301256124111;
  
    // noteFreq[5]["C"] = 523.251130601197269;
    // noteFreq[5]["C#"] = 554.365261953744192;
    // noteFreq[5]["D"] = 587.329535834815120;
    // noteFreq[5]["D#"] = 622.253967444161821;
    // noteFreq[5]["E"] = 659.255113825739859;
    // noteFreq[5]["F"] = 698.456462866007768;
    // noteFreq[5]["F#"] = 739.988845423268797;
    // noteFreq[5]["G"] = 783.990871963498588;
    // noteFreq[5]["G#"] = 830.609395159890277;
    // ---------------------------------------------
    noteFreq[5]["A"] = 880.000000000000000;    // FROM HERE
    noteFreq[5]["A#"] = 932.327523036179832;
    noteFreq[5]["B"] = 987.766602512248223;
  
    noteFreq[6]["C"] = 1046.502261202394538;
    noteFreq[6]["C#"] = 1108.730523907488384;
    noteFreq[6]["D"] = 1174.659071669630241;
    noteFreq[6]["D#"] = 1244.507934888323642;
    noteFreq[6]["E"] = 1318.510227651479718;
    noteFreq[6]["F"] = 1396.912925732015537;
    noteFreq[6]["F#"] = 1479.977690846537595;
    noteFreq[6]["G"] = 1567.981743926997176;
    noteFreq[6]["G#"] = 1661.218790319780554;   // TO HERE
    // ---------------------------------------------
    // noteFreq[6]["A"] = 1760.000000000000000;
    // noteFreq[6]["A#"] = 1864.655046072359665;
    // noteFreq[6]["B"] = 1975.533205024496447;
    // noteFreq[7]["C"] = 2093.004522404789077;
    // noteFreq[7]["C#"] = 2217.461047814976769;
    // noteFreq[7]["D"] = 2349.318143339260482;
    // noteFreq[7]["D#"] = 2489.015869776647285;
    // noteFreq[7]["E"] = 2637.020455302959437;
    // noteFreq[7]["F"] = 2793.825851464031075;
    // noteFreq[7]["F#"] = 2959.955381693075191;
    // noteFreq[7]["G"] = 3135.963487853994352;
    // noteFreq[7]["G#"] = 3322.437580639561108;
    // noteFreq[7]["A"] = 3520.000000000000000;
    // noteFreq[7]["A#"] = 3729.310092144719331;
    // noteFreq[7]["B"] = 3951.066410048992894;
  
    // noteFreq[8]["C"] = 4186.009044809578154;
    return noteFreq;
  }


  if (!Object.entries) {
    Object.entries = function entries(O) {
        return reduce(keys(O), (e, k) => concat(e, typeof k === 'string' && isEnumerable(O, k) ? [[k, O[k]]] : []), []);
    };
}

// Create the keyboard
  function setup() {
    noteFreq = createNoteTable();     // Create table which maps names and octaves to their frequencies
  
    volumeControl.addEventListener("change", changeVolume, false);      //Event handle. 
  
    mainGainNode = audioContext.createGain();
    mainGainNode.connect(audioContext.destination);
    mainGainNode.gain.value = volumeControl.value;
  
    // Create the keys; skip any that are sharp or flat; they are not needed. Each octave is inserted into a <div> of class "octave".
  
    noteFreq.forEach(function(keys, idx) {
      let keyList = Object.entries(keys);
      let octaveElem = document.createElement("div");
      octaveElem.className = "octave";
  
      keyList.forEach(function(key) {
        if (key[0].length == 1) {
          octaveElem.appendChild(createKey(key[0], idx, key[1]));
        }
      });
  
      keyboard.appendChild(octaveElem);
    });
  
    document.querySelector("div[data-note='B'][data-octave='5']").scrollIntoView(false);
  
    sineTerms = new Float32Array([0, 0, 1, 0, 1]);
    cosineTerms = new Float32Array(sineTerms.length);
    customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);
  
    for (i=0; i<9; i++) {
        oscList[i] = {};
    }
  }
  
  setup();




  function createKey(note, octave, freq) {
    let keyElement = document.createElement("div");
    let labelElement = document.createElement("div");
  
    keyElement.className = "key";
    keyElement.dataset["octave"] = octave;
    keyElement.dataset["note"] = note;
    keyElement.dataset["frequency"] = freq;
  
    labelElement.innerHTML = note + "<sub>" + octave + "</sub>";
    keyElement.appendChild(labelElement);
  
    keyElement.addEventListener("mousedown", notePressed, false);
    keyElement.addEventListener("mouseup", noteReleased, false);
    keyElement.addEventListener("mouseover", notePressed, false);
    keyElement.addEventListener("mouseleave", noteReleased, false);
  
    return keyElement;
  }


  function playTone(freq) {
  let osc = audioContext.createOscillator();
  osc.connect(mainGainNode);

  let type = wavePicker.options[wavePicker.selectedIndex].value;

  if (type == "custom") {
    osc.setPeriodicWave(customWaveform);
  } else {
    osc.type = type;
  }

  osc.frequency.value = freq;
  osc.start();

  return osc;
}


function playTone(freq) {
    let osc = audioContext.createOscillator();
    osc.connect(mainGainNode);
  
    let type = wavePicker.options[wavePicker.selectedIndex].value;
  
    if (type == "custom") {
      osc.setPeriodicWave(customWaveform);
    } else {
      osc.type = type;
    }
  
    osc.frequency.value = freq;
    osc.start();
  
    return osc;
  }

function notePressed(event) {
  if (event.buttons & 1) {
    let dataset = event.target.dataset;
    //sequence.push(event.target.dataset);
    //w
    if (!dataset["pressed"]) {
      let octave = +dataset["octave"];
      oscList[octave][dataset["note"]] = playTone(dataset["frequency"]);
      dataset["pressed"] = "yes";
    }
  }
}
var sequence = [];
  function noteReleased(event) {
    let dataset = event.target.dataset;
    
    if (dataset && dataset["pressed"]) {
      let octave = +dataset["octave"];
      oscList[octave][dataset["note"]].stop();
      sequence.push(dataset["note"]);
      delete oscList[octave][dataset["note"]];
      delete dataset["pressed"];
      console.log(sequence);
    }
  }



  function changeVolume(event) {
    mainGainNode.gain.value = volumeControl.value
  }


//var sequence = [];
//console.log(sequence);




    // noteFreq[5]["A"] = 880.000000000000000;    // FROM HERE
    // noteFreq[5]["A#"] = 932.327523036179832;
    // noteFreq[5]["B"] = 987.766602512248223;
  
    // noteFreq[6]["C"] = 1046.502261202394538;
    // noteFreq[6]["C#"] = 1108.730523907488384;
    // noteFreq[6]["D"] = 1174.659071669630241;
    // noteFreq[6]["D#"] = 1244.507934888323642;
    // noteFreq[6]["E"] = 1318.510227651479718;
    // noteFreq[6]["F"] = 1396.912925732015537;
    // noteFreq[6]["F#"] = 1479.977690846537595;
    // noteFreq[6]["G"] = 1567.981743926997176;
    // noteFreq[6]["G#"] = 1661.218790319780554;   // TO HERE