
//Trying to comment and log as much possible
//Happy Coding

//Checks whether the browser is chrome.
var isBrowserChrome = function () {
  var gabs = navigator.userAgent;
  return gabs.includes("Chrome");
}

//you are Fucked..LOL
var youAreFucked = function(){
  console.log("Browser is Chrome and offline\nCross Origin Reference from local storage is not supported\nUse a local webserver when you want to do that.");
  alert("Browser is Chrome and offline\nCross Origin Reference from local storage is not supported\nUse a local webserver when you want to do that.");
  return 0;
}

//Chrome does not support access to files directly from the browser, either we have to set up local webserver on the computer
//or access the file remotely from http url.
var jsonUrl = (isBrowserChrome())?(navigator.onLine)?"https://raw.githubusercontent.com/1BB3/notes-and-scales/master/rootNotes.json":youAreFucked():"rootNotes.json";
console.log(jsonUrl);
console.log(navigator.onLine);
//Http request to import notes
var getNotes = function() {
      var json = null;
      $.ajax({
        async: false,//Request should be sync instead of async because json(null) will be returned before http request can be completed.
        url: jsonUrl,
        dataType: 'json',
        success: function(data){
          console.log("Ajax http request : success");  //program log
          json = data;
        }
      })
      .fail(function() {
        console.log("Ajax http request : error");  //program log
      })
      .always(function() {
        console.log("Ajax http request : complete");  //program log
      });
      return json;
};

//OKay dont lose hope man if you are Fucked then be happy for you dick and check the following line of code
//and thank me (Gabs)
//Who the fuck needs ajax when you can just do this

var notes = (!jsonUrl)?
   {
     "notes" : ["A",
     "A#",
     "B",
     "C",
     "C#",
     "D",
     "D#",
     "E",
     "F",
     "F#",
     "G",
     "G#"]
   }
:getNotes();
//LOL.

(notes)?console.log("Succesfully import Root Notes"):console.log("Root notes not Imported\nUsing from Variable");//program log
if(!notes){notes = {
  "notes" : ["A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#"]
}
};//More LOL Now the program works either way.
//Lado jasto puti Long ass and ineffective program.
//Why didn't I do this from the begining?
//"Trying to be pro"
//....Haha noob. Fuck Fuck Fucking Shit.

//And NABIN Mind making some good UI for this??
//Not necessary though.But if you will do it then make a piano/keyboard keys layout also Okay. 

console.log(notes.notes);

var scaleSequence = [0,2,2,1,2,2,2,1]; //W W H W W W H : W = whole note , H = Half note.
var majorChordNotesSequence = [0,4,7]; //1st 3rd and 5th note of the scale
var minorChordNotesSequence = [0,3,7]; //1st 3rd flat and 5th note of the scale
//program logs
console.log("Scale Sequence : " + scaleSequence);
console.log("Major Chord Notes Sequence : " + majorChordNotesSequence);
console.log("Major Chord Notes Sequence : " + minorChordNotesSequence);

//ask for root note.
var rootNote = prompt("Enter the Root Note").toUpperCase();
console.log("User entered root note : " + rootNote);  //program log

//Find the key of the value and reloads the page if root note is not entered correctly.
function indexOf(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i]==value){return i;}
  }
  console.log("User Entered Root note not in list of Root Notes\nReloading Page...");
  alert("Enter the root note correctly");
  location.reload();
}
var index = indexOf(notes.notes, rootNote);
console.log("key : " + index);//program log

//generates the scale of the root note
function scaleSequenceGenerator(param_index) {
  var temp = {
    'scale' : [],
    'majorChordNotes':{
    },
    'minorChordNotes':{}
  };
  var temp1;
  //Lado jasto puti
  //Fuck Comments
for (var i = 0; i < scaleSequence.length; i++) {
    console.log("Generating Scale, Major & Minor Chord Notes....\r"); //program log
    param_index += scaleSequence[i];
    param_index = (param_index>11)?param_index-12:param_index;
    temp.scale[i] = notes.notes[param_index];
    temp.majorChordNotes[(notes.notes[param_index]) + ' Major Chord Notes'] = [];
    temp.minorChordNotes[(notes.notes[param_index]) + ' Minor Chord Notes'] = [];
    for (var j = 0; j < majorChordNotesSequence.length; j++) {
      var temp2 = ((majorChordNotesSequence[j] + param_index)>11)?majorChordNotesSequence[j] + param_index - 12:majorChordNotesSequence[j] + param_index;
      var temp3 = ((minorChordNotesSequence[j] + param_index)>11)?minorChordNotesSequence[j] + param_index - 12:minorChordNotesSequence[j] + param_index;
      temp.majorChordNotes[notes.notes[param_index] + " Major Chord Notes"][j] = notes.notes[temp2];
      temp.minorChordNotes[notes.notes[param_index] + " Minor Chord Notes"][j] = notes.notes[temp3];
    }
}

//Okay commenting continue (LOL).

console.log("Generated");//program log
return temp;
}
//program log
console.log(scaleSequenceGenerator(index));//program log
var final = scaleSequenceGenerator(index);

//Outout to DOM
document.write("Scale of "+rootNote+" : "+"<br>");
for (var i = 0; i < final.scale.length; i++) {
  document.write(final.scale[i]+", ");
}

document.write("<br>");
for (var key in final.majorChordNotes) {
  document.write("<br>" + key+" : "+final.majorChordNotes[key].toString());
}

document.write("<br>");
for (var key in final.minorChordNotes) {
  document.write("<br>" + key+" : "+final.minorChordNotes[key].toString());
}

//Whew Finally Finished
//Now to produce some good Music!!!!
