import React, { useState } from 'react';
import axios from '../api/api';
import QRCodeDisplay from './QRCodeDisplay';
import StatusMessage from './StatusMessage';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [status, setStatus] = useState('');
    const [recipientEmail, setRecipientEmail] = useState(''); // State for recipient email

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRecipientChange = (e) => {
        setRecipientEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setStatus('Please select a file to upload.');
            return;
        }

        if (!recipientEmail) {
            setStatus('Please enter a recipient email.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('recipientEmail', recipientEmail); // Include recipient email in form data

        try {
            setStatus('Uploading...');
            const response = await axios.post('/upload', formData);
            setQrCode(response.data.qrCode);
            setStatus('File shared successfully!');
        } catch (error) {
            setStatus('Error uploading file. Please try again.');
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-gray-100 py-8">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">File Sharing with QR Code</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Recipient Email"
                        value={recipientEmail}
                        onChange={handleRecipientChange}
                        className="block w-full text-sm border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 w-full rounded-lg transition"
                    >
                        Upload and Generate QR Code
                    </button>
                </form>

                {status && <StatusMessage message={status} />}
                {qrCode && <QRCodeDisplay qrCode={qrCode} />}
            </div>
        </div>
    );
};

export default FileUpload;
