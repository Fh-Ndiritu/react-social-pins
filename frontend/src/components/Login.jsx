import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client } from '../client'

const Login = () => {

  const navigate = useNavigate();

  function responseGoogle (response){
    let userObj = jwtDecode(response.credential);
    localStorage.setItem('user', JSON.stringify(userObj))
    const {name, picture, sub} =  userObj

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(doc)
    .then(() => {
      navigate('/', {replace: true})

    })

  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_API_TOKEN,
      callback: responseGoogle
    })

    google.accounts.id.renderButton(
      document.getElementById('google-login'),
      {theme: "outline", size: "large"}
    )

  }, [])

  return (

    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          muted
          controls={false}
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src ={logo} alt='logo' width='130px'/>
            <div className='shadow-2xl'>
              <div id='google-login'
                  className='bg-mainColor justify-center items-center p-3 mt-4 rounded-lg cursor-pointer outline-none'
                  >
              </div>
            </div>
          </div>
        </div>
      </div>
      
      Login</div>
  )
}

export default Login