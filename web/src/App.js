import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import './App.css'

const socket = io.connect('http://localhost:4000')

function App() {
  const [state, setStaet] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }])
    })
  })

  const onTextChange = e => {
    setStaet({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    const { name, message } = state
    socket.emit('message', { name, message })
    setStaet({ message: '', name })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }

  return (
    <>
    <h1 id="hdr">Muhi's Chat App</h1>
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 210"><path id="wave"fill="#5000ca" fill-opacity="1" d="M0,128L34.3,138.7C68.6,149,137,171,206,165.3C274.3,160,343,128,411,138.7C480,149,549,203,617,202.7C685.7,203,754,149,823,133.3C891.4,117,960,139,1029,154.7C1097.1,171,1166,181,1234,170.7C1302.9,160,1371,128,1406,112L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1 >Messenger</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={e => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={e => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
       <center><h1>Chat Room</h1></center> 
        {renderChat()}
      </div>
    </div>
    </>
  )
}

export default App
