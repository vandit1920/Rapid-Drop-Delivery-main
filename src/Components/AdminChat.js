import AdminNav from "./AdminNav"
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced'

export default function AdminChat(props) {

    const chatProps = useMultiChatLogic('4798eb2c-aaa0-4fa6-a006-74e1c900467b', "admin", "admin")

    return (
        <>
            <AdminNav></AdminNav>
            <div style={{ height: '100vh' }}>
                <MultiChatSocket {...chatProps}></MultiChatSocket>
                <MultiChatWindow {...chatProps} style={{ height: '100%' }}></MultiChatWindow>
            </div>
        </>
    )
}