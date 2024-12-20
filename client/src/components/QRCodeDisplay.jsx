import React from 'react';

const QRCodeDisplay = ({ qrCode }) => {
    return (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Scan this QR Code:</h2>
            <div className="flex justify-center mt-4">
                <img src={qrCode} alt="QR Code" className="w-48 h-48 object-contain border-2 border-gray-200 rounded" />
            </div>
        </div>
    );
};

export default QRCodeDisplay;
