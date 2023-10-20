import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

const Guest = (props) => {
    const [data, setData] = useState('No result');

    const handleQrResult = async (result, error) => {
        if (result) {
            setData(result?.text);
            console.log(result?.text);
            try {
                const response = await axios.put("http://localhost:8800/attendance/"+result.text);
                console.log('Axios Response:', response.data); // Add this line
                // Assuming the result.text contains the adminNo for updating attendance
            } catch (error) {
                console.error(error);
            }
        }

        if (error) {
            console.info(error);
        }
    };

    return (
        <div>
            <div>Guest</div>
            <QrReader
                onResult={handleQrResult}
                style={{ width: '10%' }}
            />
            <p>{data}</p>
        </div>
    );
}

export default Guest;