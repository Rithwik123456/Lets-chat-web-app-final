const firebaseConfig = {
    apiKey: "AIzaSyD8D9-Tk1IxVEsDz7s3iwhTXxQJHZKWseM",
    authDomain: "let-s-chat-web-app-a7a57.firebaseapp.com",
    databaseURL: "https://let-s-chat-web-app-a7a57-default-rtdb.firebaseio.com",
    projectId: "let-s-chat-web-app-a7a57",
    storageBucket: "let-s-chat-web-app-a7a57.appspot.com",
    messagingSenderId: "120186280130",
    appId: "1:120186280130:web:a2e504c7940b0b47d7835b"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE
user_name=localStorage.getItem("username");
document.getElementById("username").innerHTML="Welcome "+user_name+"!!!";

function addRoom(){
    room_name=document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
          purpose:"adding room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location="kwitter_page.html"
}
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    //Start code
    console.log("Room Name - " +Room_names)
    row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+Room_names+"</div><hr>";
    document.getElementById("output").innerHTML += row;
    //End code
    });});}
getData();

function redirectToRoomName(name){
    console.log(name)
    localStorage.setItem("room_name", name);
    window.location="kwitter_page.html"
}

function logOut(){
    localStorage.removeItem("room_name");
    localStorage.removeItem("username");
    window.location="index.html";
}