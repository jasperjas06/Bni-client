import React, { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, FormControlLabel, Checkbox, RadioGroup, Radio, Container, Paper, Typography, Grid } from '@mui/material';

const BNIForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    chapterName: '',
    memberName: '',
    mobileNumber: '',
    email: '',
    category: '',
    powerTeam: '',
    registrationType: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h5" color="primary" align="center" gutterBottom>
          Registration Here
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="First Name" name="firstName" fullWidth value={formData.firstName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Last Name" name="lastName" fullWidth value={formData.lastName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Chapter Name</InputLabel>
                <Select name="chapterName" value={formData.chapterName} onChange={handleChange}>
                  <MenuItem value="chapter1">Chapter 1</MenuItem>
                  <MenuItem value="chapter2">Chapter 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Member Name</InputLabel>
                <Select name="memberName" value={formData.memberName} onChange={handleChange}>
                  <MenuItem value="member1">Member 1</MenuItem>
                  <MenuItem value="member2">Member 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Mobile Number" name="mobileNumber" fullWidth type="tel" value={formData.mobileNumber} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Email ID" name="email" fullWidth type="email" value={formData.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category in BNI</InputLabel>
                <Select name="category" value={formData.category} onChange={handleChange}>
                  <MenuItem value="category1">Category 1</MenuItem>
                  <MenuItem value="category2">Category 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Power Team</InputLabel>
                <Select name="powerTeam" value={formData.powerTeam} onChange={handleChange}>
                  <MenuItem value="team1">Team 1</MenuItem>
                  <MenuItem value="team2">Team 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Registration Type</Typography>
              <RadioGroup name="registrationType" value={formData.registrationType} onChange={handleChange}>
                <FormControlLabel value="member" control={<Radio />} label="Member" />
                <FormControlLabel value="ed-rd" control={<Radio />} label="ED / RD" />
                <FormControlLabel value="ad-md" control={<Radio />} label="AD / MD" />
                <FormControlLabel value="regional-admin" control={<Radio />} label="Regional Admin" />
                <FormControlLabel value="global-support" control={<Radio />} label="Global Support Team" />
                <FormControlLabel value="international" control={<Radio />} label="International BNI Members" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={formData.termsAccepted} onChange={handleCheckboxChange} />}
                label="I agree to the Terms and Conditions and accept that all fees are non-refundable and non-transferable."
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default BNIForm;