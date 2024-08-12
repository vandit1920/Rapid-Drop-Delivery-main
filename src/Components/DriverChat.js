import DriverNav from '../Components/DriverNav'
import { MultiChatSocket, MultiChatWindow, useMultiChatLogic } from 'react-chat-engine-advanced'
import { useParams } from "react-router-dom"

export default function DriverChat(props) {

    const { driver_id, fullname } = useParams()

    const chatProps = useMultiChatLogic('4798eb2c-aaa0-4fa6-a006-74e1c900467b', fullname, fullname)

    return (
        <>
            <DriverNav id={driver_id}></DriverNav>
            <div style={{ height: '100vh' }}>
                <MultiChatSocket {...chatProps}></MultiChatSocket>
                <MultiChatWindow {...chatProps} style={{ height: '100%' }}></MultiChatWindow>
            </div>
        </>
    )
}