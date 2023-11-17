import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack } from '@mui/material';

const Annotations = ({ event }) => {
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/seatingdata/${event}`);
        const data = response.data;

        const annotationArray = data.map((item) => (
          <Stack direction="row" key={event + item.name}>
            <div>{item.name}</div>
          </Stack>
        ));

        setAnnotations(annotationArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [event]);

  return <div>{annotations}</div>;
};

export default Annotations;
