//adding new chat documents

//setting up a realtime listener

//updating the username

//updating the room

class ChatRoom{
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    async addChat(message){
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await(this.chats.add(chat));
        return response;
    }
    getChats(){
        this.chats
            .where('room','==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot=>{
                snapshot.docChanges().forEach(change =>{
                    if(change.type==="added"){
                        //update UI
                        console.log(change.doc.data());
                    }
                });
        });
    }
}

const chatroom = new ChatRoom('gaming','shawn');
// chatroom.addChat("Hello everyone")
//     .then(()=>{console.log('chat added')}).catch(e=> console.log(e));
// console.log(chatroom);
chatroom.getChats();