import { auth, signInWithGoogle,  
  authUpdateProfile, 
  registerNewUserWithEmail,
  signInUserWithEmail,
  addNewDataToCollection,
  getDocsByParam
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


  async function navigateHome(user){
    if(user){

      {/* This function receives the user object after authentication and extracts relevant details */}

      const authInfo = {
        userId: user.uid,
        name: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        affiliation: user.affiliation || 'Seplat Exhibition Booth',
        occupation: user.occupation || 'Guest'
      }

      const retrievedUserById = await getDocsByParam('users',{field: 'userId', operator: '==', value: authInfo.userId})
      console.log(retrievedUserById)

      if (retrievedUserById.length > 0){
        navigate('/home')
      }else{
        addNewDataToCollection('users', authInfo)
        navigate('/home')
      }
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

    const loginForm = {}
    formData.forEach((value, key) => loginForm[key] = value)

    try{
      
      if(regUser){

        const newUser = await registerNewUserWithEmail(loginForm.email, loginForm.password)
        
        if(auth.currentUser.displayName == null){
          await authUpdateProfile(loginForm.firstName, loginForm.lastName)
        }
        
        newUser.displayName = `${loginForm.firstName} ${loginForm.lastName}`
        newUser.affiliation = loginForm.affiliation
        newUser.occupation = loginForm.occupation

        navigateHome(newUser)

      }else{
        let user = await signInUserWithEmail(loginForm.email, loginForm.password)
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
      name: 'occupation',
      label: 'Occupation',
      placeholder: 'Student',
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
      
      {/* Sign in / Registration form */}

      <form id='reg-form' className='text-center m-5' style={formStyle} onSubmit={handleEmailAndPassword} method='post'>
        <legend>{ regUser ? 'Register New User' : 'Log in'}</legend>

        {/* Form input fields */}
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