import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Button,
  Divider,
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

const TicketDetails = () => {
  const [ticket, setTicket] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`https://your-backend-api.com/api/tickets/${id}`)
      .then((res) => setTicket(res.data))
      .catch((error) => {
        console.error('Error fetching ticket details:', error.message);
        enqueueSnackbar('Error fetching ticket details!', { variant: 'error' });
      });
  }, [id, enqueueSnackbar]);

  const onDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDeleteConfirm = () => {
    axios
      .delete(`https://your-backend-api.com/api/tickets/${id}`)
      .then(() => {
        enqueueSnackbar('Ticket deleted successfully!', { variant: 'success' });
        navigate('/tickets');
      })
      .catch((err) => {
        console.error('Error deleting ticket:', err);
        enqueueSnackbar('Failed to delete the ticket. Please try again.', { variant: 'error' });
      });
    setOpenDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="md">
      <StyledPaper>
        <Typography variant="h4" component="h1" gutterBottom>
          Ticket ID: {ticket._id || 'N/A'}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" flexDirection="column">
          <Typography variant="body1">Passenger Name: {ticket.passengerName || 'N/A'}</Typography>
          <Typography variant="body1">Phone Number: {ticket.phoneNumber || 'N/A'}</Typography>
          <Typography variant="body1">Train Number: {ticket.trainNumber || 'N/A'}</Typography>
          <Typography variant="body1">Train Name: {ticket.trainName || 'N/A'}</Typography>
          <Typography variant="body1">Class Type: {ticket.classType || 'N/A'}</Typography>
          <Typography variant="body1">Journey Date: {ticket.journeyDate || 'N/A'}</Typography>
          <Typography variant="body1">Number of Seats: {ticket.seatCount || 'N/A'}</Typography>
          <Typography variant="body1">Total Fare: {ticket.totalFare || 0} Rupees</Typography>
        </Box>
        <Box mt={4} display="flex" justifyContent="space-between">
          <Button startIcon={<ArrowBackIcon />} component={RouterLink} to="/tickets" variant="outlined">
            Back to Tickets
          </Button>
          <Box>
            <Button
              startIcon={<EditIcon />}
              component={RouterLink}
              to={`/edit-ticket/${ticket._id}`}
              variant="contained"
              color="primary"
              sx={{ mr: 1 }}
            >
              Edit Ticket
            </Button>
            <Button startIcon={<DeleteIcon />} onClick={onDeleteClick} variant="contained" color="error">
              Delete Ticket
            </Button>
          </Box>
        </Box>
      </StyledPaper>

      <Dialog open={openDialog} onClose={handleDeleteCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this ticket? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TicketDetails;
