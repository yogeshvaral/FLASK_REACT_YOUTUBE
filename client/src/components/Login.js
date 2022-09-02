import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {login} from '../auth';
import {useNavigate} from 'react-router-dom';
const LoginPage = () => {

    const {register,watch,reset,handleSubmit,formState:{errors}} = useForm();
    const navigate = useNavigate();

    const submitForm = (data) => {
        console.log(data);
        const requestOptions = {
            method: 'POST',
            headers: { 
                'content-type': 'application/json', 
            },
            body: JSON.stringify(data)
        }
        fetch('/auth/login', requestOptions)
        .then(response => response.json())
        .then(data => {console.log(data)
        console.log(data.access_token);
        login(data.access_token)
        navigate('/')
        });
        reset()
    }
    return(
        <div className=' container signup'>
            <div className='form'>
                <h1>Sign Up Page</h1>
                <Form>
                    <Form.Group>
                        <Form.Label>UserName</Form.Label>
                        <Form.Control type='text' placeholder   = 'User Name'
                         {...register("username", {required: true,maxLength: 25})}/>
                         {errors.username && <p style={{color: 'red'}}><small>User Name is required</small></p>}
                         {errors.username?.type==='maxLength' && <p style={{color: 'red'}}><small>Max Characters should be 25</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder = 'Password' 
                        {...register("password", {required: true,minLength: 8})}/>
                        {errors.password&& <p style={{color: 'red'}}><small>password is required</small></p>}
                        {errors.password?.type==='minLength' && <p style={{color: 'red'}}><small>Min Characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as='sub' variant='primary' onClick={handleSubmit(submitForm)}>Login</Button>
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