import { useState } from 'react';
import ChatWindow from './ChatWindow';


export default function OnlineUsers(props) {

    const { openUser, users, username, receiver, message, setMessage, sendMessage, groupMsg, sortNames, setMedia, handleKeyDown } = props;
    return (
        <div className="Chat_Window">

            <div className='Online_Users'>
                <div className='Online_Users_head'>
                    🧑‍🦱 Online Users 🧑‍🦱
                </div>
                <div className='Online_peps'>
                    {

                        Object.keys(users).length <= 1 ? <h3>No Online Users!!</h3>
                            : users && Object.keys(users).map((user, index) => (
                                <>
                                    {

                                        (user !== username) ? <div key={index} className="User" onClick={() => openUser(user)}>
                                            <div className='UserDetail'>
                                                <div className='UserIconBox'>
                                                    <img className='UserIcon' src="https://cdn-icons-png.flaticon.com/512/149/149071.png"></img>
                                                </div>
                                                <h4 className='UserName'>{user}</h4>
                                            </div>
                                            {/* <div className='MessageCounter'>0</div> */}
                                        </div> : null

                                    }
                                </>
                            ))}
                </div>
            </div>

            <div className='User_Chat'>
                {
                    props.step >= 2 ? <ChatWindow
                        receiver={receiver}
                        username={username}
                        value={message}
                        setMedia={setMedia}
                        onChange={(e) => setMessage(e.target.value)}
                        sendMessage={sendMessage}
                        handleKeyDown={handleKeyDown}
                        groupMsg={groupMsg}
                        sortNames={sortNames} /> : <h2>Click on an online person to start chat</h2>
                }
            </div>

        </div>
    )
}
