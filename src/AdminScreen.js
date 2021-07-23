import React,{useState,useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table,Form,Button,Row,Col } from 'react-bootstrap'
import Message from './components/Message'

import FormContainer from './components/FormContainer'
import axios from 'axios'

function Homescreen({history}) {

    const [details,setDetails] = useState([])
    const [breakss,setBreak] = useState([])
    const [alert,setAlert] = useState(false)
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))


    useEffect(() => {

        

        if(userInfo && userInfo.is_staff){
        
        
        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        async function book(){
            const {data} = await axios.get('http://127.0.0.1:8000/bookings/',
            config)
            console.log(data)
            setDetails(data)
            if(!data.length){
                setAlert(true)
                
            }

            
        }
        async function breaks(){
            const {data} = await axios.get('http://127.0.0.1:8000/break/',
            config)
            
            setBreak(data)
            

            
        }

        breaks()
        book()
    }
    else{
        history.push("/")
    }
        
    }, [alert])

    

    

    return (
        <div>
            
            <FormContainer>
            <h1 className="py-5">My appointments</h1>
            {alert && <Message variant="info">No appointments</Message>}
            <Table striped responsive bordered hover className="table-sm">
                    <thead>
                        
                        <th>Patient Name</th>
                        <th>Time Slot</th>
                        <th>Status</th>
                        
                        
                        <th></th>
                    </thead>
                    <tbody>
                    {details.map((detail) =>(
                            <tr key={detail.id}>
                                <td>
                                {detail.patientName}
                                </td>
                                <td>
                                {detail.slot.slots}
                                </td>
                                <td>Booked</td>
                                
                            </tr>
                    ))}
                    {breakss.map((b) =>(
                            <tr key={b.id}>
                                <td>
                                No Patients
                                </td>
                                <td>
                                {b.slots}
                                </td>
                                <td>Break</td>
                                
                            </tr>
                    ))}
                        
                    </tbody>

                </Table>
                </FormContainer>
                
        </div>
    )
}

export default Homescreen
