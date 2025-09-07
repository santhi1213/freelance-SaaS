import React from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const PopupMessage = ({ type = "success", message, onClose }) => {
  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        <div className="flex flex-col items-center">
          {isSuccess ? (
            <FaCheckCircle className="text-green-500 text-4xl mb-3" />
          ) : (
            <FaExclamationCircle className="text-red-500 text-4xl mb-3" />
          )}
          <p className="text-lg font-medium">{message}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupMessage;
