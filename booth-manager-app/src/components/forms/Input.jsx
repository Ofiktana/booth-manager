/*
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
*/

export default function Input({ inputBox }){

  const flexStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  return (

    inputBox.visible && 
    
    <div className="mb-3" style={flexStyle}>
      <label htmlFor={inputBox.name}>{inputBox.label}</label>
      <input className='' type={inputBox.type} name={inputBox.name} placeholder={inputBox.placeholder}/>
    </div>
  )
}