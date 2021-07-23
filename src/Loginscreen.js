import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Message from './components/Message'
import axios from 'axios'
import { Form,Button,Row,Col } from 'react-bootstrap'
import FormContainer from './components/FormContainer'

function LoginScreen({history}) {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, setLogin] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    
    
    
    useEffect(() => {
        if(userInfo && userInfo.is_staff)
        {
            history.push('/doctor')
        }
        
        else if(userInfo){
            history.push('/book')
        }
        
    }, [history,userInfo,login])

    
  

    

  

   

    const submitHandler = (e) => {
        e.preventDefault()
        
        async function login(){
                const {data} = await axios.post('http://127.0.0.1:8000/login/',
                {'username':email,"password":password})
                
                localStorage.setItem("userInfo", JSON.stringify(data));
                setLogin(true)
            }
    
        login()
        
        

    }
    return (
        <FormContainer>
            <Message variant="info">Credentials for admin = admin,admin</Message>
            <Message variant="info">Credentials for patient = patient,ptpassword</Message>
            <h1>Sign In</h1>

            
            
            
            <Form onSubmit={submitHandler} className="py-5">
                <Form.Group controlId='username'>
                    <Form.Label>
                        Username
                    </Form.Label><br></br>
                    <Form.Control
                        type='text'
                        placeholder='Enter Username'
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    >
                    </Form.Control><br></br>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label><br></br>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    >
                    </Form.Control><br></br>
                </Form.Group>
                <Button className="my-3" type='submit' variant='primary'>Sign In</Button>
            </Form>
            
         
        </FormContainer>
    )
}

export default LoginScreen
