
// Initializing Firebase
var config = {
  apiKey: "AIzaSyCgTNdlsUfHLK-RaN3s1wBeEIWRcFa-gNo",
  authDomain: "train-homework-assignment.firebaseapp.com",
  databaseURL: "https://train-homework-assignment.firebaseio.com",
  projectId: "train-homework-assignment",
  storageBucket: "train-homework-assignment.appspot.com",
  messagingSenderId: "124652471532"
};
firebase.initializeApp(config);

  var database = firebase.database();

  // Input Button
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    // console.log("Whatupper")

     // Grabs user input
  var tName = $("#train-name-input").val().trim();
  var tDestination = $("#destination-input").val().trim();
  var tTime = $("#time-input").val().trim();
  var tFrequency = $("#frequency-input").val().trim();

//   temporary object?
var temp = {
    name: tName,
    destination: tDestination,
    time: tTime,
    frequency: tFrequency
  };

  database.ref().push(temp);
})

database.ref().on("child_added", function(snap){
  console.log(snap.val().name);

  var tFrequency = parseInt(snap.val().frequency);

    // Time is 3:30 AM
    var firstTime = snap.val().time;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment(); 
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var realTime = moment(nextTrain).format("hh:mm");

  $("#table-body").append("<tr><td>" + snap.val().name + "</td><td>" + snap.val().destination + "</td><td>" + snap.val().time + "</td><td>" + snap.val().frequency + "</td><td>" + tMinutesTillTrain + "</td><td>" + realTime + "</td></tr>")
})