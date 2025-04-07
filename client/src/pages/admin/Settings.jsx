import React, { useState } from 'react';

const Settings = () => {
    const [settings, setSettings] = useState({
        clubName: '',
        clubDescription: '',
        contactEmail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save settings (e.g., API call)
        console.log('Settings saved:', settings);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="clubName">
                        Club Name
                    </label>
                    <input
                        type="text"
                        name="clubName"
                        id="clubName"
                        value={settings.clubName}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="clubDescription">
                        Club Description
                    </label>
                    <textarea
                        name="clubDescription"
                        id="clubDescription"
                        value={settings.clubDescription}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="contactEmail">
                        Contact Email
                    </label>
                    <input
                        type="email"
                        name="contactEmail"
                        id="contactEmail"
                        value={settings.contactEmail}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Save Settings
                </button>
            </form>
        </div>
    );
};

export default Settings;