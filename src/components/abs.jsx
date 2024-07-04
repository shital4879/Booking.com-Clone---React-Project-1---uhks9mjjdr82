import React, { useEffect, useState } from 'react'
import Navbar from '../component/navbar/Navbar';
import Nav from '../component/navbar/Nav';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Mytrip = () => {
    const [datahistory, setDatahistory] = useState();

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );


    const fetchapi = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/bookingportals/booking/`, {
                method: "GET",
                headers: {
                    projectID: "uhks9mjjdr82",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },

            })
            const result = await response.json();
            setDatahistory(result.data);
            console.log(result.data);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchapi();
    },[])

    return (
        <>
                {
                    datahistory && datahistory.map((item) => (
                        <div key={item._id}>
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {item.booking_type}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    be{bull}nev{bull}o{bull}lent
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    adjective
                                </Typography>
                                <Typography variant="body2">
                                    well meaning and kindly.
                                    <br />
                                    {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </div>
                    ))
                }
        </>
    )
}

export default Mytrip
