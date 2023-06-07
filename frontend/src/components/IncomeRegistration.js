import React, { useState } from 'react'
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

  const formChar = '収入'
  const [details, setDetails] = useState([{
    registerDate: "",
    money: 0,
    category: 1,
    comment: ""
  }])

  console.log(details)

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {details.map((data, idx) => (
          <Grid item xs={6} key={idx}>
            <Details formChar={formChar} detailCount={idx+1} data={data}/>
          </Grid>
        ))}
        
      </Grid>
      
      <DetailOpButton handleAddDetails={handleAddDetails} />
    </React.Fragment>
  )
}
