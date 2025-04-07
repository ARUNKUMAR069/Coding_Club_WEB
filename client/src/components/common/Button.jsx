import React from 'react';

const Button = ({ onClick, children, className = '', type = 'button' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition duration-300 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;