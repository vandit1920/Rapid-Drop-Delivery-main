import Navbar from "./Navbar"
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced'
import { useParams } from "react-router-dom"

export default function CustomerChat(props) {

    const { user_id, fullname } = useParams()

    const chatProps = useMultiChatLogic('4798eb2c-aaa0-4fa6-a006-74e1c900467b', fullname, fullname)

    return (
        <>
            <Navbar id={user_id}></Navbar>
            <div style={{ height: '100vh' }}>
                <MultiChatSocket {...chatProps}></MultiChatSocket>
                <MultiChatWindow {...chatProps} style={{ height: '100%' }}></MultiChatWindow>
            </div>
        </>
    )
}