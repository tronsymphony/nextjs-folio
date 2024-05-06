'use client'
// components/ContactForm.js
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect, useRef, useState } from "react";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    url: "",
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(false);
    // isValidUrl
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://getform.io/f/jbwxknxa", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });
      if (response.ok) {
        console.log("Form submitted successfully");
        // Reset form fields if needed
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <div className="form-container-object">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Your Name"
          variant="outlined"
          name="Name"
          fullWidth
          required
        />

        <TextField
          type="email"
          name="email"
          label="Your Email"
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          label="Your Website URL"
          variant="outlined"
          value={formData.url}
          onChange={handleChange}
          error={error}
          helperText={error ? 'Invalid URL' : ''}
          fullWidth
        />

        <TextField
          multiline
          rows={4} // Adjust the number of rows as needed
          name="message"
          label="Your Message"
          variant="outlined"
          fullWidth
        />

        <input type="hidden" name="_gotcha" style={{ display: "none" }} />

        <Button variant="outlined" type="submit">
          Send
        </Button>
      </Box>
    </div>
  );
};

export default ContactForm;
