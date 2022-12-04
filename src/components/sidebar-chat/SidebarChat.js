import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import {doc, collection, setDoc} from 'firebase/firestore' 
import db from '../../firebaseConfig'

const SidebarChat = ({addNewChat, id, name}) => {

    const  [seed, setSeed] = useState('')

    useEffect(() =>{
        setSeed(Math.floor(Math.random() *5000))
    }, [])

    const createChat = async () =>{
        const roomName = prompt("Please enter name for chat")

        if(roomName){
          const roomRef = doc(collection(db, "rooms"))
          const result = await setDoc(roomRef, {
            'name': roomName
          })

          console.log(result)
            //DO SOME DATABASE STUFF
        }
    }

  return !addNewChat? (
    <div className='sidebarChat'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

        <div className="sidebarChat__info">
            <h2>{ name}</h2>
            <p>Last Message..</p>
        </div>
    </div>
  ):(
    <div onClick={createChat} className="sidebarChat">
        <h2>Add new chat</h2>
    </div>
  )
}

export default SidebarChat