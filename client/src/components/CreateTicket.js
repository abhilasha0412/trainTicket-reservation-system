import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, MenuItem, Button, Typography, Grid, Paper, Container, FormControl, InputLabel, Select } from '@mui/material';

const CreateTicket = () => {
    const navigate = useNavigate();
    const [ticket, setTicket] = useState({
        passengerName: '',
        phoneNumber: '',
        trainNumber: '',
        trainName: '',
        classType: '',
        journeyDate: '',
        seatCount: 1,
        totalFare: 0,
        farePerSeat: 100,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onChange = (e) => {
        const { name, value } = e.target;
        setTicket((prev) => {
            const updatedTicket = { ...prev, [name]: value };

            if (name === 'seatCount') {
                updatedTicket.totalFare = (parseInt(value, 10) || 0) * prev.farePerSeat;
            }
            return updatedTicket;
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!ticket.passengerName || !ticket.phoneNumber || !ticket.trainNumber || !ticket.trainName || !ticket.classType || !ticket.journeyDate) {
            setError('Please fill all required fields.');
            setLoading(false);
            return;
        }

        try {
            await axios.post('https://your-backend-api.com/api/tickets', ticket);
            alert('Ticket booked successfully!');
            setTicket({
                passengerName: '',
                phoneNumber: '',
                trainNumber: '',
                trainName: '',
                classType: '',
                journeyDate: '',
                seatCount: 1,
                totalFare: 0,
                farePerSeat: 100,
            });
            navigate('/tickets');
        } catch (err) {
            setError(err.response?.data || 'Failed to book ticket. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ my: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Book Train Ticket
            </Typography>
            <Paper sx={{ padding: 3 }}>
                <form onSubmit={onSubmit}>
                    <TextField fullWidth label="Passenger Name *" name="passengerName" value={ticket.passengerName} onChange={onChange} variant="outlined" margin="normal" required />
                    <TextField fullWidth label="Phone Number *" name="phoneNumber" value={ticket.phoneNumber} onChange={onChange} variant="outlined" margin="normal" required />
                    <TextField fullWidth label="Train Number *" name="trainNumber" value={ticket.trainNumber} onChange={onChange} variant="outlined" margin="normal" required />
                    <TextField fullWidth label="Train Name *" name="trainName" value={ticket.trainName} onChange={onChange} variant="outlined" margin="normal" required />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Class Type *</InputLabel>
                        <Select name="classType" value={ticket.classType} onChange={onChange} variant="outlined" required>
                            <MenuItem value="AC First Class">AC First Class</MenuItem>
                            <MenuItem value="Sleeper">Sleeper</MenuItem>
                            <MenuItem value="General">General</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField fullWidth label="Journey Date *" name="journeyDate" type="date" value={ticket.journeyDate} onChange={onChange} InputLabelProps={{ shrink: true }} variant="outlined" margin="normal" required />
                    <TextField fullWidth label="Number of Seats *" name="seatCount" type="number" value={ticket.seatCount} onChange={onChange} variant="outlined" margin="normal" required />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Total Fare: {ticket.totalFare} Rupees
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid item xs={6}>
                            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                                {loading ? 'Booking...' : 'Book Ticket'}
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate('/tickets')}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                            {typeof error === 'object' ? JSON.stringify(error) : error}
                        </Typography>
                    )}
                </form>
            </Paper>
        </Container>
    );
};

export default CreateTicket;
