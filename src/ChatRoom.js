import React, { Component } from 'react';
import ioc from 'socket.io-client';
import './style.scss';

const socket = ioc('http://localhost:4000');

class ChatRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            messages: []
        }
        this.handle_text = this.handle_text.bind(this);
        this.send_message = this.send_message.bind(this);
    }

    componentDidMount() {
        socket.on('connect', () => {
            console.log('>>> ChatRoom connected <<<');
        });
        socket.on('update', (msg) => {
            this.setState(prevState => ({
                messages: [...prevState.messages, { text: msg }]
            }));
            document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
        });
    }

    handle_text(e) {
        this.setState({text: e.target.value});
    }

    send_message() {
        socket.emit('message', this.state.text);
        document.getElementById('text').value = '';
    }

    render() {
        return (
            <main>
                <div className="chatroom">
                    <div className="messages" id="messages">
                        <ul>
                            {
                                this.state.messages.map((item, index) => (
                                    <li key={index}>
                                        <span>{item.text}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="form">
                        <div>
                            <input id="text" onChange={this.handle_text} placeholder="Type here ..." type="text" />
                        </div>
                        <div>
                            <button onClick={this.send_message}>Send</button>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default ChatRoom;
