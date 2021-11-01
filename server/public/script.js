let chatInput = document.querySelector('.text-input input');
let chatWindow = document.querySelector('.chat-window');
let myName = document.querySelector('.profile-name');
let onlineList = document.querySelector('.online-list');

let userName = prompt("Enter your Name: ");
myName.textContent = userName;

chatInput.addEventListener("keypress", function(event){
    if(event.key == "Enter"&& chatInput.value){
        let chatDiv = document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add("right");
        chatDiv.textContent = userName + ": " + chatInput.value;
        let chat = chatInput.value;
        chatWindow.append(chatDiv);
        chatWindow.scrollTo = chatWindow.scrollTop;
        
        socket.emit("chat", {name: userName, chat: chat});
        // empty the div 
        chatInput.value=""; 

    }
})