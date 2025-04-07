import React, { useState } from 'react';
import { generateUsername, generatePassword } from '../../utils/userUtils';

const UserGenerator = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');

    const handleGenerateUser = () => {
        const newUsername = generateUsername();
        const newPassword = generatePassword();
        const newUserId = Date.now(); // Simple unique ID based on timestamp

        setUsername(newUsername);
        setPassword(newPassword);
        setUserId(newUserId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to send the new user data to the backend
        console.log('New User:', { userId, username, password });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Generate New User</h2>
            <button 
                onClick={handleGenerateUser} 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Generate User
            </button>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">User ID:</label>
                    <input 
                        type="text" 
                        value={userId} 
                        readOnly 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        readOnly 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input 
                        type="text" 
                        value={password} 
                        readOnly 
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <button 
                    type="submit" 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Save User
                </button>
            </form>
        </div>
    );
};

export default UserGenerator;