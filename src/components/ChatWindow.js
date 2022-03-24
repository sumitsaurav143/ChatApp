import ReceiverChat from "./ReceiverChat";
import SenderChat from "./SenderChat";

export default function ChatWindow(props) {

    const { sendMessage, value, onChange, receiver, username, sortNames, groupMsg, handleKeyDown, setMedia } = props;

    const Messages = groupMsg ? groupMsg[sortNames(username, receiver)] : [];
    return (
        <div className="Chat_Box">
            <div className="Chat_UserName">
                <h2>{receiver}</h2>
            </div>

            <div className="Messenger_box">
                <ul>
                    {
                        Messages && Messages.length > 0 ? Messages.map((msg, index) => 
                        
                            msg.receiver!=receiver
                            ? 
                            <>
                            {console.log(msg)}
                            <ReceiverChat index={index} msg={msg}/> 
                            </>
                            : 
                            <>
                            {console.log(msg)}
                            <SenderChat index={index} msg={msg}/> 
                            </>) : null 
                    }
                                {/* <li className="message_data_opp" >
                                    <div className="user-pic">
                                        <img className='UserIcon_chat_opp' src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"></img>
                                    </div>
                                    <div className="Opp_msg">
                                        <div>essay, an analytic, interpretative, or er and less systematic and formal than a dissertation or thesis and usually dealing with its subject from a limited and often personal point of view. er and less systematic and formal than a dissertation or thesis and usually dealing with its subject fro er and less systematic and formal than a dissertation or thesis and usually dealing with its subject from a limited and often personal point of view.m a limited and often personal point of view. critical literary composition usually much short padding-left: 5px; <span id="curr_time">10:00</span></div> 
                                        
                                    </div>
                                    
                                </li > */}

                </ul>
            </div>

            <form onSubmit={sendMessage} className="message-control">
                <textarea value={value} onChange={onChange} onKeyDown={handleKeyDown} placeholder="Type something...!" />
                {/* <div>
                    <input type="file" onChange={(e)=>{
                        const file=e.target.files[0];
                        const reader= new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function(){
                            console.log(reader.result);
                            setMedia(
                                {
                                    image: true,
                                    content: reader.result,
                                    name: file.name,
                                });
                        }
                        reader.error = function(error){
                            console.log(error);
                        }
                    }}id="hidden-file" />
                    <label htmlFor="hidden-file">
                        <img className="attach_btn" src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/attachment-512.png" />
                    </label>
                </div> */}
                <button type="submit">
                    <img className="send_btn" src="https://icons-for-free.com/iconfiles/png/512/plane+airline+airplane+origame+paper+paper+plane+send+icon-1320086457003410702.png" />
                </button>
            </form>
        </div>
    )
}
