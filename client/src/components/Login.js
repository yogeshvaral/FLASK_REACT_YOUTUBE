import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [username,setUsername] =useState('')
    const [password,setPassword] =useState('')
    const LoginUser = () => {
        console.log('Form submitted')
        console.log(username)
        console.log(password)
        setUsername('')
        setPassword('')
    }
    return(
        <div className=' container signup'>
            <div className='form'>
                <h1>Sign Up Page</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>UserName</Form.Label>
                        <Form.Control type='text' placeholder   = 'User Name'
                        value={username}
                        name="username" 
                        onChange={(e)=> {setUsername(e.target.value)}}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder = 'Password' 
                        value={password}
                        name="password" 
                        onChange={(e)=> {setPassword(e.target.value)}}/>
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as='sub' variant='primary' onClick={LoginUser}>Login</Button>
                    </Form.Group>
                    <Form.Group>
                        <small>Do not have an account?<Link to='/signup'>Create one</Link></small>
                    </Form.Group>
                </Form>
            </div>

        </div>       
    )
}

export default LoginPage