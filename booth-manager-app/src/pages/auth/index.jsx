import { auth, provider } from '../../config/firebase-config'
import { signInWithPopup } from 'firebase/auth'

export default function Auth(){

  async function signInWithGoogle(){
    try{
      const result = await signInWithPopup(auth, provider)
      console.log(result)
    }
    catch(err){
      console.log(err)
    }

  }

  return (
    <div>
      <h1>Hello Home</h1>

      <button className='btn btn-primary' onClick={signInWithGoogle}>Sign In with Google</button>
    </div>

    
  )
}