import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';

const SignUpPage = () => {

    const {register,watch,reset,handleSubmit,formState:{errors}} = useForm();

    const submitForm = (data) => {
        // console.log(data);
        console.log(data.username);
        console.log(data.email);
        console.log(data.password);
        console.log(data.confirmPassword);
        const requestOptions = {
            method: 'POST',
            headers: { 
                'content-type': 'application/json', 
            },
            body: JSON.stringify(data)
        }
        fetch('/auth/signup', requestOptions)
        reset()
    }
    console.log(watch('username'));
    console.log(watch('email'));
    console.log(watch('password'));
    console.log(watch('confirmPassword'));
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder = 'Email Address'
                        {...register("email", {required: true,maxLength: 85})}/>
                        {errors.email && <p style={{color: 'red'}}><small>Email is required</small></p>}
                        {errors.email?.type==='maxLength' && <p style={{color: 'red'}}><small>Max Characters should be 80</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder = 'Password' 
                        {...register("password", {required: true,minLength: 8})}/>
                        {errors.password&& <p style={{color: 'red'}}><small>password is required</small></p>}
                        {errors.password?.type==='maxLength' && <p style={{color: 'red'}}><small>Min Characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder = 'Password' 
                        {...register("confirmPassword", {required: true,minLength: 8})}/>
                        {errors.confirmPassword && <p style={{color: 'red'}}><small>confirmPassword is required</small></p>}
                        {errors.confirmPassword?.type==='maxLength' && <p style={{color: 'red'}}><small>Min Characters should be 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as='sub' variant='primary' onClick={handleSubmit(submitForm)}>SignUp</Button>
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