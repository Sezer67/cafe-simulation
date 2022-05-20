import React from 'react'
import { Link } from 'react-router-dom'

const ErrorCard = ({msg,link}) => {
  return (
    <div className='my-1 md:w-1/2 w-full p-4 flex flex-row justify-between items-center bg-red-500 rounded-md' >
        <h4 className='text-light font-semibold'>
            {msg}
        </h4>
        {
            link && <Link className='text-light font-bold pl-4' to={link}>GİT</Link>
        }
    </div>
  )
}

export default ErrorCard