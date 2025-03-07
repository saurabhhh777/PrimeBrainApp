import React from 'react'

const Signin = () => {
  return (
    <div>
        <div className='flex flex-col items-center justify-center h-screen'>
            <h2 className='text-4xl font-bold'>Signin</h2>
            <form>
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='Password' />
                <button type='submit'>Signin</button>
            </form>
        </div>
    </div>
  )
}

export default Signin