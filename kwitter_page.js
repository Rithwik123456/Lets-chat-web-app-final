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

function logOut(){
    localStorage.removeItem("room_name");
    localStorage.removeItem("username");
    window.location="index.html";
}

room_name=localStorage.getItem("room_name");
user_name=localStorage.getItem("username");

function send(){
msg=document.getElementById("message").value ;
firebase.database().ref(room_name).push({
    username:user_name,
    message:msg,
    like:0
});
document.getElementById("message").value="";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['username'];
message=message_data['message'];
like=message_data['like'];
name_with_tag="<h4> "+name+"<img class='user_tick'> </h4>";
message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)'>";
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span> </button><hr>";

row=name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML+=row;

//End code
    } });  }); }
getData();

function update_like(message_id){
    console.log("clicked_on_like_button:"+message_id);
    button_id=message_id;
    likes=document.getElementById(button_id).value ;
    updated_Likes=Number(likes)+1;
    console.log(updated_Likes);
    firebase.database().ref(room_name).child(message_id).update({
          like:updated_Likes
    });
}