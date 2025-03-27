import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import TrainIcon from "@mui/icons-material/Train";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import axios from "axios";
import { motion } from "framer-motion";

const HomePage = () => {
  const TOTAL_SEATS = 500; // Total seats available
  const [stats, setStats] = useState({
    totalBookedSeats: 0,
    availableSeats: TOTAL_SEATS,
    recentBooking: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://train-reservation-api.com/api/tickets")
      .then((res) => {
        const tickets = res.data;
        
        const totalBookedSeats = tickets.filter(ticket => ticket.status === "Booked").length;
        const availableSeats = TOTAL_SEATS - totalBookedSeats;
        const recentBooking = tickets.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.passengerName || "No recent bookings";
        
        setStats({ totalBookedSeats, availableSeats, recentBooking });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ticket stats:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", py: 5, backgroundColor: "#f4f4f4", borderRadius: 2, boxShadow: 3, mt: 3, mb: 3 }}>
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Typography variant="h2" component="h1" color="primary" gutterBottom sx={{ fontWeight: "bold" }}>
          Train Ticket Reservation
        </Typography>
      </motion.div>
      
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}>
        <Typography variant="h4" color="textSecondary" gutterBottom>
          Book your train tickets with ease
        </Typography>
      </motion.div>

      <Grid container spacing={4} mt={6} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <EventSeatIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h4">{stats.totalBookedSeats}</Typography>
              <Typography variant="subtitle1" color="text.secondary">Booked Seats</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <TrainIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h4">{stats.availableSeats}</Typography>
              <Typography variant="subtitle1" color="text.secondary">Available Seats</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <AccessTimeIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h4">Latest Booking</Typography>
              <Typography variant="subtitle1" color="text.secondary">{stats.recentBooking}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h5" gutterBottom color="primary.light">Features</Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/tickets" variant="contained" size="large" startIcon={<EventSeatIcon />} fullWidth sx={{ py: 2 }}>
            View Tickets
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/book-ticket" variant="contained" size="large" startIcon={<AddIcon />} fullWidth sx={{ py: 2 }}>
            Book Ticket
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/search" variant="contained" size="large" startIcon={<SearchIcon />} fullWidth sx={{ py: 2 }}>
            Search Ticket
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/passengers" variant="contained" size="large" startIcon={<PeopleIcon />} fullWidth sx={{ py: 2 }}>
            View Passengers
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
