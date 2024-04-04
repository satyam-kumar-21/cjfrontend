import React from 'react';
import { useSelector } from 'react-redux';

function ProfileDetails() {
    const user = useSelector(state => state.user.user);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="h-70vh flex justify-center items-center">
                <div className="bg-white shadow-2xl rounded-md p-6">
                    <h1 className="text-3xl font-bold mb-6 text-center text-blue-900">Welcome {user?.name}</h1>
                    {user ? (
                        <div className="text-gray-800 text-center">
                            <h1 className="mb-2 text-2xl font-bold text-gray-700"><strong className='text-blue-600'>Name:</strong> {user.name}</h1>
                            <h1 className="mb-2 text-2xl font-bold text-gray-700"><strong className='text-blue-600'>Email:</strong> {user.email}</h1>
                            {/* Add more details as needed */}
                        </div>
                    ) : (
                        <p className="text-center">Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileDetails;
