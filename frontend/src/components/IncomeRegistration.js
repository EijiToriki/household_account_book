import React, { useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid';

import Details from './subcomponents/registrationComponents/Details'
import DetailOpButton from './subcomponents/registrationComponents/DetailOpButton';
import { useNavigate } from 'react-router-dom';

export default function IncomeRegistration({userId}) {
  const navigate = useNavigate()

  const handleAddDetails = () => {
    setDetails([
      ...details, {
        registerDate: "",
        money: 0,
        category: 1,
        comment: ""
      }])
  }

  const handleRegisterDetails = () => {
    let baseURL = "http://127.0.0.1:5000/incomeRegister"
    details.map((detail) => {
      try{
        axios.post(baseURL, {
          "id": userId,
          "detail": detail
        })
      }catch(error){
        console.log(error)
      } 
    })
    navigate('/summary')
  }

  const handleRemoveDetails = () => {
    if(details.length > 1){
      const updatedDetails = [...details];
      updatedDetails.splice(details.length-1, 1);
      setDetails(updatedDetails);  
    }
  }

  const formChar = '収入'
  const [details, setDetails] = useState([{
    registerDate: "",
    money: 0,
    category: 1,
    comment: ""
  }])

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {details.map((data, idx) => (
          <Grid item xs={6} key={idx}>
            <Details formChar={formChar} detailCount={idx+1} data={data} type={0}/>
          </Grid>
        ))} 
      </Grid>
      <DetailOpButton 
        handleAddDetails={handleAddDetails} 
        handleRegisterDetails={handleRegisterDetails} 
        handleRemoveDetails={handleRemoveDetails} 
      />
    </React.Fragment>
  )
}
