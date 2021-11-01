socket.emit("userConnect", userName);

socket.on("join", function(userObj){
    let joinDiv = document.createElement("div");
    joinDiv.classList.add("chat");
    joinDiv.classList.add("join");
    if(userObj.id == socket.id){
        joinDiv.textContent = `You joined the chat`;
    }else{
        joinDiv.textContent = `${userObj.name} joined the chat`;
    }
    chatWindow.append(joinDiv);
    chatWindow.scrollTo = chatWindow.scrollTop;
    // function-> that allows to update the online list
    if(userObj.id != socket.id){
        addUserToOnlineList(userObj);
    }
})

// chat is on left side of Chat window
socket.on("chatLeft", function(chatObj){
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add("left");
    console.log(chatObj.name ,chatObj.chat);
    chatDiv.textContent= chatObj.name + ": "+ chatObj.chat;
    // add to chat window
    chatWindow.append(chatDiv);
})

socket.on('online-list', function(userList){
    
    for(let i=0; i< userList.length; i++){
        let userObj = userList[i];
        if(userObj.id != socket.id){
            let onlineDiv = document.createElement("div");
            onlineDiv.classList.add('online-user');
            onlineDiv.setAttribute('id', userObj.id);
            onlineDiv.innerHTML = `<div class="profile-image-user">
                                    <img src="./user.jpg" alt="user.jpg">
                                    </div>
                                <div class="profile-name-user">${userObj.name}</div>`
            onlineList.append(onlineDiv);
        }

    }
})

socket.on("leave", function(userObj){
    console.log("leave", userObj.name);
    let leaveDiv = document.createElement("div");
    leaveDiv.classList.add("chat");
    leaveDiv.classList.add("leave");
    leaveDiv.textContent = `${userObj.name} left the chat`;
    chatWindow.append(leaveDiv);
    // update the online list after user leave
    deleteUserFromOnlineList(userObj.id);
})

function addUserToOnlineList(userObj) {
    let onlineDiv = document.createElement('div');
    onlineDiv.classList.add('online-user');
    onlineDiv.setAttribute('id', userObj.id);
    onlineDiv.innerHTML = 
    `<div class="profile-image-user">
        <img src="./user.jpg" alt="user.jpg">
    </div>
    <div class="profile-name-user">${userObj.name}</div>`
    onlineList.append(onlineDiv);
}

function deleteUserFromOnlineList(id) {
    document.querySelector(`#${id}`).remove();
}