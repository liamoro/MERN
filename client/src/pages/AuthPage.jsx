import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import useHttp from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()

  const {loading, error, request, clearError} = useHttp()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const formHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      // console.log("Data", data)
      message(data.message)
    } catch (error) {}
  }
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
      // console.log("Data", data)
      message(data.message)
    } catch (error) {}
  }

  return(
    <div className='row auth-row'>
      <div className='col s6 offset-s3'>
        {/* <h1>Авторизация</h1> */}
        <div className='card white'>
        <div className='card-content white-text'>
          <span className='card-title black-text auth-title'>Авторизация</span>
          <div className='row'>

            <div className='input-field'>
              <input
                id='email'
                type='text'
                name='email'
                value={form.email}
                className='black-text'
                onChange={formHandler}
              />
              <label
                className='blue-text text-darken-2'
                htmlFor='email'>E-mail</label>
            </div>

            <div className='input-field'>
              <input
                id='password'
                type='password'
                name='password'
                value={form.password}
                className='black-text'
                onChange={formHandler}
              />
              <label
                className='blue-text text-darken-2'
                htmlFor='password'>Password</label>
            </div>

          </div>
        </div>
        <div className='card-action '>
          <button 
            className='btn blue darken-2' style={{marginRight: 10}}
            disabled={loading}
            onClick={loginHandler}
            >
            Войти
          </button>
          <button 
            className='btn white  black-text'
            onClick={registerHandler}
            disabled={loading}
            >
            Регистрация
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}


export default AuthPage