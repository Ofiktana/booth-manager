import { auth, provider } from '../../config/firebase-config'
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'

export default function Auth(){

  const [regUser, setRegUser] = useState(false)

  function toggleRegUser(){
    setRegUser(prev => !prev)
  }

  // Google Sign-in implementation

  async function signInWithGoogle(){
    try{
      const result = await signInWithPopup(auth, provider)
      console.log(result)
    }
    catch(err){
      console.log(err)
    }

  }

  //Email and password sign-in implementation

  async function signInWithEmailAndPassword(event){
    event.preventDefault()

    const formEl = document.getElementById('reg-form')
    const formData = new FormData(formEl)

    const email = formData.get('email')
    const password = formData.get('password')

    try{
      const result = regUser ? (await createUserWithEmailAndPassword(auth, email, password)).user : (await signInWithEmailAndPassword(auth, email, password)).user
      console.log(result)

    }catch(err){
      console.log(err)

    }finally{
      formEl.reset()
    }


  }

  //In-line styles applied to the form below

  const formStyle = {
    maxWidth: '300px'
  }

  const flexStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  return (
    <div>
      <button type='button' className='btn btn-success' onClick={toggleRegUser}>{ regUser ? 'Login existing account' : 'Register new user'}</button>
      
      <form id='reg-form' className='text-center m-5' style={formStyle} onSubmit={signInWithEmailAndPassword} method='post'>
        <legend>{ regUser ? 'Register New User' : 'Log in'}</legend>

        {regUser && <div className='mb-3' style={flexStyle}>
          <label className='form-label' htmlFor="fullName">Full Name</label>
          <input className='' type="text" name='fullName' />
        </div>}

        <div className='mb-3' style={flexStyle}>
          <label className='form-label' htmlFor="email">Email</label>
          <input className='' type="email" name='email' />
        </div>

        {regUser && <div className='mb-3' style={flexStyle}>
          <label className='form-label' htmlFor="phoneNo">Phone No.</label>
          <input className='' type='text' name='phoneNo' />
        </div>}

        <div className="mb-3" style={flexStyle}>
          <label htmlFor="password">Password</label>
          <input className='' type="password" name='password' />
        </div>

        <button type='submit' className="btn btn-success mb-2" >Sign {regUser ? 'up' : 'in'} with Email & Password</button>
        <br />
        <button type='button' className='btn btn-success' onClick={signInWithGoogle}>Sign {regUser ? 'up' : 'in'} with Google</button>
      </form>
    </div>

    
  )
}