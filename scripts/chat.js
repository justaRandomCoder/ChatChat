class ChatRoom{
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub = null;
    }
    //adding new chat documents
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
    //setting up a realtime listener
    getChats(callback){
        this.unsub = this.chats
            .where('room','==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot=>{
                snapshot.docChanges().forEach(change =>{
                    if(change.type==="added"){
                        callback(change.doc.data());
                    }
                });
        });
       
    }
    //updating the username
    updateUsername(newUsername){
        this.username = newUsername;
        localStorage.setItem('name',this.username);
    }
    //updating the room
    updateRoom(newRoom){
        this.room = newRoom;
        console.log('room updated');
        this.unsub();
        this.getChats();
    }
}
