//dom queries
const chatList = document.querySelector('.chat-list');
const input = document.querySelector('.new-chat');
const changeName = document.querySelector('.new-name');
const displayName = document.querySelector('.display-name');
const room = document.querySelector('.chat-rooms');
const displayRoom = document.querySelector('.display-room');

//instances
const chatroom = new ChatRoom('general');
const chatui = new ChatUI(chatList);

chatroom.getChats(data=>{
    chatui.render(data);
});

const checkName = ()=>{
    const name = localStorage.getItem('name')? localStorage.getItem('name') : 'Anon';
    console.log(name);
    displayName.innerHTML = `<div> Your current name: <b>${name}</b> </div>`;
}


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
    changeName.reset();
    chatroom.updateUsername(newName);
    chatui.updateDisplayRoomName(newName,displayName);
});

//to change the room
room.addEventListener('click',e=>{
    if(e.target.tagName = "BUTTON"){
        const newroom = e.target.id;
        chatroom.updateRoom(newroom);
        chatui.updateDisplayRoomName(newroom,displayRoom);
        chatList.innerHTML = " ";
        chatroom.getChats(data=>{
            chatui.render(data);
       });
    }
});


checkName();