import React,{useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table,Form,Button,Row,Col } from 'react-bootstrap'
import Message from './components/Message'

import FormContainer from './components/FormContainer'
import axios from 'axios'

function Homescreen({history}) {

    const [details,setDetails] = useState([])
    const [book,setBook] = useState(false)
    const [name,setName] = useState('')
    const [slot,setSlot] = useState('')
    const [alert,setAlert] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))


    useEffect(() => {

        if(userInfo){
        
        
        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        async function book(){
            const {data} = await axios.get('http://127.0.0.1:8000/avail/',
            config)
            setDetails(data)

            
        }

        book()
    }
    else{
        history.push("/")
    }
        
    }, [alert])

    const bookHandler = (slot) =>{
        setBook(true)
        setSlot(slot)

    }

    const submitHandler = () => {
    
        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        async function bookapt(){
            const {data} = await axios.post('http://127.0.0.1:8000/bookApt/',
            {"name":name,"slot":slot},
            config)
            setBook(false)
            setAlert(true)
            
            
            
        }

        bookapt()

    }

    return (
        <div>
            {alert && <Message variant="success">Your Appointment has been booked successfully</Message>}
            <FormContainer>
            <Table striped responsive bordered hover className="table-sm">
                    <thead>
                        
                        <th>TIME SLOTS</th>
                        <th>AVAILABILITY</th>
                        <th>BOOK</th>
                        
                        <th></th>
                    </thead>
                    <tbody>
                    {details.map((detail) =>(
                            <tr key={detail.id}>
                                <td>
                                {detail.slots}
                                </td>
                                <td>
                                {detail.status}
                                </td>
                                <td>
                                    
                                        <Button variant="dark" className="btn-sm" disabled={detail.status == "Booked"} onClick={() => {bookHandler(detail.slots)}}>
                                            Book Appointment
                                        </Button>
                                    
                                    
                                </td>
                            </tr>
                    ))}
                        
                    </tbody>

                </Table>
                </FormContainer>
                {book && (
                    <FormContainer>
                    <Form className="py-5" onSubmit={submitHandler}>
                    <Form.Group controlId='username'>
                        <Form.Label>
                            Patient Name
                        </Form.Label><br></br>
                        <Form.Control
                            type='text'
                            placeholder='Enter Patient Name'
                            value = {name}
                            onChange = {(e) => setName(e.target.value)}
                        >
                        </Form.Control><br></br>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>
                            Time Slot
                        </Form.Label><br></br>
                        <Form.Control
                            type='text'
                            
                            value = {slot}
                            disabled
                        >
                        </Form.Control><br></br>
                    </Form.Group>
                    <Button className="my-3" type='submit' variant='primary'>Book</Button>
                </Form>
                </FormContainer>
                )}
        </div>
    )
}

export default Homescreen
