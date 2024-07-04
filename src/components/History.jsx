// import React, { useEffect, useState } from 'react'
// import Nav from '../component/navbar/Nav';
// // import Box from '@mui/material/Box';
// // import Card from '@mui/material/Card';
// // import CardActions from '@mui/material/CardActions';
// // import CardContent from '@mui/material/CardContent';
// // import Button from '@mui/material/Button';
// // import Typography from '@mui/material/Typography';

// const History = () => {
//     const[apidata,setApidata] = useState();

// const fetchapi = async()=>{
//     try{
//         const response = await fetch("https://academics.newtonschool.co/api/v1/bookingportals/booking/",
//             {
//                 method:"GET",
//                 headers: { projectID: "uhks9mjjdr82",
//                 Authorization: `Bearer ${localStorage.getItem("token")}` ,
//                  },
//             }
//         )
//         const result = await response.json();
//         setApidata(result.data);
//         console.log(result.data);
//     }
//     catch(error){
//         console.log(error);
//     }
// }
// useEffect(()=>{
//     fetchapi();
// },[])

// const bull = (
//     <Box
//       component="span"
//       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//       •
//     </Box>
//   );

//   return (
//     <div>
//     <Nav/>

//     {/* <div>
//         {apidata && apidata.map((item)=>(
            
    

//     <Card sx={{ minWidth: 275, marginBottom:2, }}>
//       <CardContent>
//         <Typography sx={{ fontSize: 20,fontWeight:600 }} color="text.secondary" gutterBottom>
//         {item.booking_type}
//         </Typography>
//         <Typography variant="h5" component="div">
//           {item.booking_type == "hotel" ? <>{item.location}</>:<>{item.destination}</>}
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           status : {item.status}
//         </Typography>
//         <Typography variant="body2">
//         Start date :{item.start_date}
//           <br />
//           End date : {item.end_date}
//         </Typography>
//       </CardContent>
//       <CardActions>
    
//       </CardActions>
//     </Card>

// ))}
// </div> */}

//     </div>
//   )
// }

// export default History
