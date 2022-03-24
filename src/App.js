
import './App.css';
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from 'react';
import CreateNewUser from './components/CreateNewUser';
import OnlineUsers from './components/OnlineUsers';

const socket = io(`https://samchatindia.herokuapp.com/`);

function App() {

  const [step, setStep] = useState(0);
  const [receiver, setReceiver] = useState("Username (Testing Data)")
  const [username, setUsername] = useState("")
  const [users, setUsers] = useState({});
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);
  const [time,setTime]=useState("");
  const [groupMsg, setGroupMsg] = useState({});
  const receiverRef = useRef(null);

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
  useEffect(()=>{
  const d = new Date();
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let s = addZero(d.getSeconds());
  let curr = h + ":" + m + ":" + s;
  setTime(curr);
})

  function sortNames(username1, username2) {
    return [username1, username2].sort().join("-");
  }

  function NewUser() {
    socket.emit("new_user", username);
    setStep(step => step + 1);
  }

  function openUser(name) {
    setReceiver(name);
    receiverRef.current = name;
    setStep(step => step + 1);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage(event);
    }
  }


  function sendMessage(e) {
    e.preventDefault();

    const data = {
      sender: username,
      receiver,
      message,
      media,
      time
    };

    socket.emit("send_message", data);

    const key = sortNames(username, receiver);
    const tempGrpMsg= {...groupMsg};
    if (key in tempGrpMsg) {
      tempGrpMsg[key]= [...tempGrpMsg[key],data];
    }
    else {
      tempGrpMsg[key] = [data];
    }

    setGroupMsg({ ...tempGrpMsg });

    if(media!==null)
    {
      setMedia(null);
    }

    setMessage("");

  }

  useEffect(() => {
    socket.on("all_user", (users) => {
      // console.log(users);
      setUsers(users);
    })

    socket.on("new_message", (data) => {
      // console.log(data.message);
      setGroupMsg(prevGroupMsg => {
        const message ={...prevGroupMsg};
        const key = sortNames(data.sender, data.receiver);
        if (key in message) {
          message[key] = [...message[key], data];
        } else {
          message[key] = [data];
        }
        return { ...message };
      });
    });
  }, []);


  return (
    <div className="App" id="abc">
      <div className="main_container">
        <div>
          <div className="Chat_Header">
            <div className="Header_Logo_div">
              {/* <img  className="Header_Logo" src={require('./components/DeviserD.png')} alt="Logo"></img>Chat */}
              <img className="Header_Logo" src="https://see.fontimg.com/api/renderfont4/7BYR4/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjRkZGQUZBIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/U2FtQ2hhdA/celosia-golden.png" alt="SAM CHAT">
              </img>
            </div>
            <div>
              <h4 className="madein">Made with <span style={{ color: "red" }}>❤️ </span>in India</h4>
            </div>
          </div>
          <hr className="wrapper" />
        </div>

        <div className="Chat_Body">
          {
            /* Login Page */
            step == 0 ? <CreateNewUser
              NewUser={NewUser}
              value={username}
              onChange={(e) => setUsername(e.target.value)} /> : null
          }

          {
            step >= 1 ? <OnlineUsers
              openUser={openUser}
              step={step} users={users}
              receiver={receiver}
              username={username}
              setMedia={setMedia}
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage} 
              handleKeyDown={handleKeyDown}
              groupMsg={groupMsg}
              sortNames={sortNames}/> : null
          }

        </div>
      </div>

    </div>
  );
}

export default App;
