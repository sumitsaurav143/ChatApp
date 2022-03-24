
export default function SenderChat(props) {
    const {index, msg } = props;
    return (
        <li key={index} className="message_data" >
            <div className="my_msg">
            {/* {
                    msg.media && msg.media.image ? 
                    <div>
                        <img src={msg.media.content} alt="" width="200"/>
                    </div> : null
                }
                { msg.message!=="" ? */}
                <div> {msg.message} <span id="curr_time">{msg.time}</span></div> 
                {/* : null }                    */}
            </div>
            <div className="user-pic">
                <img className='UserIcon_chat_opp' src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"></img>
            </div>

        </li >
    )
}
