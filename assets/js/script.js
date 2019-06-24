//Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDkT6iYLR_Cc2fikV5fG61IcGXS0wJXvpM",
    authDomain: "cheesecake-62e0c.firebaseapp.com",
    databaseURL: "https://cheesecake-62e0c.firebaseio.com",
    projectId: "cheesecake-62e0c",
    storageBucket: "cheesecake-62e0c.appspot.com",
    messagingSenderId: "92121664067",
    appId: "1:92121664067:web:c9ef5f86f4fb4b01"
};


firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//Add train button
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();

    // **** VERIFY MOMENT.JS FORMAT ****
    var firstTrain = moment($("#first-train-input").val().trim(), "hh:mm").format("hh:mm");
    var frequency = $("#frequency-input").val().trim();

    // Variable to hold temporary data for Train information
    var newTrain = {
        trainname: trainName,
        destination: destination,
        firsttrain: firstTrain,
        frequency: frequency
    };

    // Uploads train info to database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainname);
    console.log(newTrain.destination);
    console.log(newTrain.firsttrain);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().trainname;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firsttrain;
    var frequency = childSnapshot.val().frequency;

    // Train Schedule Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    //CONTINUE************************************************ 
    //  * Code this app to calculate when the next train will arrive; this should be relative to the current time.

    var diffTime = moment().diff(moment(firstTrain, "hh:mm"));
    var tRemainder = diffTime % frequency;
    var minutesAway = moment(frequency - tRemainder, "minutes").format("m");
    var arrivalTime = moment().add(minutesAway, "minutes").format("hh:mm");
    console.log("minutesAway: ", minutesAway);
    console.log("tRemainder: ", tRemainder);
    console.log("freq: ", frequency);
    console.log("diffTime: ", diffTime);


    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(arrivalTime),
        $("<td>").text(minutesAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});