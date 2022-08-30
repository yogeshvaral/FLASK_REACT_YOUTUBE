import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';

const SignUpPage = () => {

    const {register,watch,reset,handleSubmit,formState:{errors}} = useForm();

    const submitForm = (data) => {
        console.log(data);
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
                        <br></br>
                        {errors.username && <span style={{color: 'red'}}>User Name is required</span>}
                        {errors.username?.type=='maxLength' && <span style={{color: 'red'}}>Max Characters should be 25</span>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' placeholder = 'Email Address'
                        {...register("email", {required: true,maxLength: 85})}/>
                        <br></br>
                        {errors.email && <p style={{color: 'red'}}>Email is required</p>}
                        {errors.email?.type=='maxLength' && <span style={{color: 'red'}}>Max Characters should be 80</span>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder = 'Password' 
                        {...register("password", {required: true,minLength: 8})}/>
                        <br></br>
                        {errors.password&& <span style={{color: 'red'}}>password is required</span>}
                        {errors.password?.type=='maxLength' && <span style={{color: 'red'}}>Min Characters should be 8</span>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' placeholder = 'Password' 
                        {...register("confirmPassword", {required: true,minLength: 8})}/>
                        <br></br>
                        {errors.confirmPassword && <span style={{color: 'red'}}>confirmPassword is required</span>}
                        {errors.confirmPassword?.type=='maxLength' && <span style={{color: 'red'}}>Min Characters should be 8</span>}
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