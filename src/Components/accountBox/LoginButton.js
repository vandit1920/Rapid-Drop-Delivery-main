import Axios from 'axios'
import { useNavigate } from "react-router-dom"

const clientId = "73712902965-e3seb15rmsp7153hf80i69cdtbcrq07b.apps.googleusercontent.com"

function LoginButton() {

    const navigate = useNavigate()

    function onSuccess(res) {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj)

        const email = res.profileObj.email
        const password = res.profileObj.password
        const fullname = res.profileObj.name
        
        Axios.post('https://rapid-drop-delivery-9172cd7ac0e7.herokuapp.com/login/google', {
            email: email,
            password: password,
            fullname: fullname
        })
            .then((data) => {
                const user_id = data.data.user_id

                console.log(`user id is ${user_id}`)

                navigate(`/customer/${user_id}`)
            })
    }

    function onFailure(res) {
        console.log("failed")
    }

    return (
        <div id="signInButton">
        </div>
    )

}

export default LoginButton