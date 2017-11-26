
//Trying to comment and log as much possible
//Happy Coding

//Http request to import notes
var notes = (function() {
      var json = null;
      $.ajax({
        async: false,//Request should be sync instead of async because json(null) will be returned before http request is completed.
        url: 'rootNotes.json',
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
})();

//program log
(notes)?console.log("Succesfully import Root Notes"):console.log("Root notes not Imported");
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
