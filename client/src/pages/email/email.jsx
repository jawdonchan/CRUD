// src/components/EmailForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../navigationbar";

const EmailForm = () => {
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmails = async () => {
    const emailsArray = emails.split(',').map((email) => email.trim());

    try {
      const response = await axios.post(`http://localhost:8800/send-email`, {
        emails: emailsArray,
        subject,
        message,
      });

      console.log(response.data.message);
    } catch (error) {
      console.error('Error sending emails:', error);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <label>Emails (comma-separated):</label>
      <input type="text" value={emails} onChange={(e) => setEmails(e.target.value)} />
      <label>Subject:</label>
      <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <label>Message:</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendEmails}>Send Emails</button>
    </div>
  );
};

export default EmailForm;
