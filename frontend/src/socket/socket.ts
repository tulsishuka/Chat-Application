import {io} from "socket.io-client";


const socket = io(
// "http://localhost:3000",
"https://chat-1-l165.onrender.com/",
{
autoConnect:false
}
);

export default socket;