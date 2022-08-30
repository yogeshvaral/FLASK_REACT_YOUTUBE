import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    const [username,setUsername] =useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [confirmPassword,setConfirmPassword] =useState('')
    const submitForm = () => {
        console.log('Form submitted')
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder = 'Email Address'
                        value={email}
                        name="email" 
                        onChange={(e)=> {setEmail(e.target.value)}}/>
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
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder = 'Password' 
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={(e)=> {setConfirmPassword(e.target.value)}} />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as='sub' variant='primary' onClick={submitForm}>SignUp</Button>
                    </Form.Group>
                    <Form.Group>
                        <small>Already have an account?<Link to='/login'>Login</Link></small>
                    </Form.Group>
                </Form>
            </div>

        </div>
    )
}

export default SignUpPage