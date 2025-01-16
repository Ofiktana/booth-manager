import { auth, signInWithGoogle,  
  authUpdateProfile, 
  registerNewUserWithEmail,
  signInUserWithEmail
} from '../../config/firebase-config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../../components/forms/Input'

export default function Auth(){

  const [regUser, setRegUser] = useState(false)

  const navigate = useNavigate()



  function toggleRegUser(){
    setRegUser(prev => !prev)
  }


  function navigateHome(user){
    if(user){
      const authInfo = {
        userId: user.uid,
        name: user.displayName,
        profilePhoto: user.photoURL,
        email: user.email,
        isAuth: true
      }

      localStorage.setItem('auth-booth-manager', JSON.stringify(authInfo))

      navigate('/home')

    }
  }

  // Google Sign-in implementation

  async function handleGoogleAuth(){
    const user =  await signInWithGoogle()
    navigateHome(user)
  }

  //Email and password sign-in implementation

  async function handleEmailAndPassword(event){
    event.preventDefault()

    const formEl = document.getElementById('reg-form')
    const formData = new FormData(formEl)

    const email = formData.get('email')
    const password = formData.get('password')

    try{
      
      if(regUser){
        const firstName = formData.get('firstName')
        const lastName = formData.get('lastName')

        const newUser = await registerNewUserWithEmail(email, password)
        
        if(auth.currentUser.displayName == null){
          await authUpdateProfile(firstName, lastName)
        }
        
        newUser.displayName = `${firstName} ${lastName}`

        navigateHome(newUser)

      }else{
        let user = await signInUserWithEmail(email, password)
        navigateHome(user)
      }



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

  // Form Input Elements declaration

  const formInputFields = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'John',
      visible: regUser
    },
    
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Doe',
      visible: regUser
    },
        
    {
      type: 'text',
      name: 'affiliation',
      label: 'Affiliation',
      placeholder: 'University of Nigeria',
      visible: regUser
    },
    
    {
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'johndoe@example.com',
      visible: true
    },
    
    {
      type: 'password',
      name: 'password',
      label: 'Password',
      placeholder: '********',
      visible: true
    },
  
  ]

  return (
    <div className='m-2'>
      <button type='button' className='btn btn-success' onClick={toggleRegUser}>{ regUser ? 'Login existing account' : 'Register new user'}</button>
      
      <form id='reg-form' className='text-center m-5' style={formStyle} onSubmit={handleEmailAndPassword} method='post'>
        <legend>{ regUser ? 'Register New User' : 'Log in'}</legend>


        {
          formInputFields.map((field) => {
            return (
              <Input key={field.name} inputBox={field} />
            )
          })
        }

        <button type='submit' className="btn btn-success mb-2" >Sign {regUser ? 'up' : 'in'} with Email & Password</button>
      
        <br />

        <button type='button' className='btn btn-success' onClick={handleGoogleAuth}>Sign {regUser ? 'up' : 'in'} with Google</button>

      </form>
    </div>

    
  )
}