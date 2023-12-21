// src/components/EmailForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from "../navigationbar";
import ipaddress from '../../../port';

const EmailForm = () => {
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmails = async () => {
    const emailsArray = emails.split(',').map((email) => email.trim());

    try {
      const response = await axios.post(`http://${ipaddress}/send-email`, {
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
    <div className='emails'>
  {/* <Navbar></Navbar> */}
  <label className='labelmates'>Emails (comma-separated):</label>
  <input type="text" value={emails} onChange={(e) => setEmails(e.target.value)} />
  <label className='labelmates'>Subject:</label>
  <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
  <label className='labelmates'>Message:</label>
  <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
  <button className='submittion' onClick={handleSendEmails}>Send Emails</button>
  <style>
    {`
      .emails {
        max-width: 300px; /* Set your preferred max-width */
        margin: auto; /* Center the form horizontally */
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        //box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .labelmates {
        display: block;
        margin-bottom: 8px;
      }

      input,
      textarea {
        width: 100%;
        padding: 8px;
        margin-bottom: 16px;
        box-sizing: border-box;
      }

      .submittion {
        width: 100%;
        padding: 10px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .submittion:hover {
        background-color: #45a049;
      }
    `}
  </style>
</div>

  );
};

export default EmailForm;
