//dom queries
const chatList = document.querySelector('.chat-list');
const input = document.querySelector('.new-chat');
const changeName = document.querySelector('.new-name');
const displayName = document.querySelector('.display-name');

//instances
const chatroom = new ChatRoom('general','shaun');
const chatui = new ChatUI(chatList);

chatroom.getChats(data=>{
    chatui.render(data);
});

//event listeners
//to send data to the database
input.addEventListener('submit', (e)=>{
    e.preventDefault();
    const msg = input.message.value;
    const response = chatroom.addChat(msg).then(()=>{
        input.reset();
        console.log(response);
    });
    // console.log(msg);
});

//to change the name
changeName.addEventListener('submit',(e)=>{
    e.preventDefault();
    const newName = changeName.name.value;
    newName.reset();
    chatroom.updateUsername(newName);
    displayName.innerHTML = `<div> Your name is: <b>${newName}</b> </div>`
});

//to change the room
