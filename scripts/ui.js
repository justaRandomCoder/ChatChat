class ChatUI{
    constructor(list){
        this.list = list;
    }
    //render chat templates
    render(data){
        const when = new Date();
        const html = 
        `<li class = "list-group-item">
            <span class = "username">${data.username}</span>
            <span class = "message">${data.message}</span>
            <div class = "time"> ${when}</div>    
        </li>
        `;
        this.list.innerHTML += html;
    }
    //clear the user name
    updateDisplayUserName(newName,displayName){
        displayName.innerHTML = `<div> Your current name: <b>${newName}</b> </div>`;
    }
    //clear the display name
    updateDisplayRoomName(newroom,displayRoom){
        displayRoom.innerHTML = `<div> Your current room: <b>${newroom}</b> </div>`;
    }
}