import React from 'react'
import { FastField, Formik, Form } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Box, Typography, Button, TextField, MenuItem } from '@mui/material';
const Contact = () => {
  return (
    <div>
      <Box sx={{ py: 7 }}></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          py: 6,
          px: { xs: 2, md: 11, lg: 12, xl: 24 },
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Left Side - Contact Info */}
        <Box sx={{ flex: 1, minWidth: "200px", color: "white", textAlign: { xs: "center", md: "left" } }}>
          <Typography variant="h4" fontWeight="bold">
            Got An <span className="gradientS">Idea?</span>
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ mt: -1 }}>
            Make It Reality.
          </Typography>
          <Typography sx={{ mt: 2, color: "#AAAAAA" }}>
            Tell us a little about your project and we’ll connect with you within 24 hours.
          </Typography>

          {/* Contact Info */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 4, justifyContent: { xs: "center", md: "flex-start" } }}>
            <Box sx={{ width: 50, height: 50, backgroundColor: "#0E2A3A", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 2 }}>
              <FontAwesomeIcon icon={faEnvelope} color="#00C8FF" size="lg" />
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2" sx={{ color: "#AAAAAA" }}>Email</Typography>
              <Typography variant="body1" fontWeight="bold">contact@test.com</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: 3, justifyContent: { xs: "center", md: "flex-start" } }}>
            <Box sx={{ width: 50, height: 50, backgroundColor: "#0E2A3A", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 2 }}>
              <FontAwesomeIcon icon={faCalendar} color="#00C8FF" size="lg" />
            </Box>
            <Box sx={{ ml: 2 }}>
              <Typography variant="body2" sx={{ color: "#AAAAAA" }}>Schedule a Call with our team</Typography>
              <Typography variant="body1" fontWeight="bold">Free Consultation</Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Side - Contact Form */}
        <Formik
          initialValues={{
            email: "",
            jobTitle: "",
            service: "",
            budget: "",
            message: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email").required("Email is required"),
            jobTitle: Yup.string().required("Job title is required"),
            service: Yup.string().required("Please select a service"),
            budget: Yup.string().required("Please select a budget"),
            message: Yup.string().required("Message is required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Form Data:", values);
            alert("Message Sent Successfully!");
            setSubmitting(false);
          }}
        >
          {({ handleSubmit }) => (
            <Box component={Form} onSubmit={handleSubmit} sx={{ flex: 1, minWidth: "200px", backgroundColor: "#111", p: 4, borderRadius: 2 }}>
              {/* Email */}
              <FastField name="email">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email*"
                    variant="outlined"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    sx={{
                      backgroundColor: "#222",
                      borderRadius: 1,
                      input: { color: "white" },
                      label: { color: "white" },
                      mb: 2,
                    }}
                  />
                )}
              </FastField>

              {/* Job Title */}
              <FastField name="jobTitle">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Job Title*"
                    variant="outlined"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    sx={{
                      backgroundColor: "#222",
                      borderRadius: 1,
                      input: { color: "white" },
                      label: { color: "white" },
                      mb: 2,
                    }}
                  />
                )}
              </FastField>

              {/* Service Dropdown */}
              <FastField name="service">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    fullWidth
                    select
                    label="Service*"
                    variant="outlined"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    sx={{
                      backgroundColor: "#222",
                      borderRadius: 1,
                      mb: 2,
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiInputLabel-root": { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#ccc" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiSelect-select": { color: "white" },
                    }}
                  >
                    <MenuItem value="Business Solution">Business Solution</MenuItem>
                    <MenuItem value="Software Development">Software Development</MenuItem>
                    <MenuItem value="Consulting">Consulting</MenuItem>
                  </TextField>
                )}
              </FastField>

              {/* Budget Dropdown */}
              <FastField name="budget">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    fullWidth
                    select
                    label="Budget*"
                    variant="outlined"
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    sx={{
                      backgroundColor: "#222",
                      borderRadius: 1,
                      mb: 2,
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiInputLabel-root": { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#ccc" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiSelect-select": { color: "white" },
                    }}
                  >
                    <MenuItem value="$0-$7k">$0-$7k</MenuItem>
                    <MenuItem value="$7k-$20k">$7k-$20k</MenuItem>
                    <MenuItem value="$20k+">$20k+</MenuItem>
                  </TextField>
                )}
              </FastField>

              {/* Message */}
              <FastField name="message">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Message*"
                    variant="outlined"
                    multiline
                    rows={4}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    sx={{
                      backgroundColor: "#222",
                      borderRadius: 1,
                      mb: 2,
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiInputLabel-root": { color: "white" },
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": { borderColor: "#ccc" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiSelect-select": { color: "white" },
                    }}
                  />
                )}
              </FastField>

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "#00C8FF",
                  color: "white",
                  fontWeight: "bold",
                  p: 1.5,
                  "&:hover": { backgroundColor: "#0099CC" },
                }}
              >
                Send Message
              </Button>
            </Box>
          )}
        </Formik>
      </Box>
    </div>
  )
}

export default Contact