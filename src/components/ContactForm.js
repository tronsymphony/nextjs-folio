import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!error) {
      try {
        const response = await fetch("https://getform.io/f/jbwxknxa", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });
        if (response.ok) {
          alert("Form submitted successfully");
          setFormData({
            name: "",
            email: "",
            message: "",
            url: "",
          });
        } else {
          console.error("Form submission failed");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="form-container-object">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        
        autoComplete="off"
      >

        <TextField
          id="outlined-basic"
          label="Your Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          type="email"
          name="email"
          label="Your Email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          label="Your Website URL"
          variant="outlined"
          name="url"
          type="text"
          value={formData.url}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          multiline
          rows={4}
          name="message"
          label="Your Message"
          value={formData.message}
          onChange={handleChange}
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
