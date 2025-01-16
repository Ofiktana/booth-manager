import { useNavigate } from "react-router-dom"
import { authSignOut, auth } from "../../config/firebase-config"

export default function Home(){

  const navigate = useNavigate()

  async function signOutUser(){
    await authSignOut()
    navigate('/')
  }

  const userDisplayName = auth.currentUser.displayName

  return (
    <div>
      Welcome {userDisplayName} , you are logged in

      <button className="warning" onClick={signOutUser}>Sign Out</button>
    </div>
  )
}