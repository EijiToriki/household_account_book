import React, { useState } from 'react'
import axios from 'axios'
import Grid from '@mui/material/Grid';

import Details from './subcomponents/Details';
import DetailOpButton from './subcomponents/DetailOpButton';

export default function IncomeRegistration() {
  const handleAddDetails = () => {
    setDetails([
      ...details, {
        registerDate: "",
        money: 0,
        category: 1,
        comment: ""
      }])
  }

  const handleRegisterDetails = async(e) => {
    // let baseURL = "http://127.0.0.1:5000/incomeRegister"
    // // JSON.stringify(details)
    // try{
    //   const res = await axios.post(baseURL, JSON.stringify(details))
    //   console.log(res.data)
    // }catch(error){
    //   console.log(error)
    // } 
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
            <Details formChar={formChar} detailCount={idx+1} data={data}/>
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
