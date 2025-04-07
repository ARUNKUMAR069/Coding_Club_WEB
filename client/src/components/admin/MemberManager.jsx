import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MemberManager = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get('/api/members');
                setMembers(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/members/${id}`);
            setMembers(members.filter(member => member.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Member Management</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.id}>
                            <td className="py-2 px-4 border-b">{member.id}</td>
                            <td className="py-2 px-4 border-b">{member.name}</td>
                            <td className="py-2 px-4 border-b">{member.email}</td>
                            <td className="py-2 px-4 border-b">
                                <button 
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(member.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberManager;