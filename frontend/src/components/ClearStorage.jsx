import React from 'react';

const ClearStorage = () => {
  const clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <div className="p-4 bg-yellow-100 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-2">Clear Storage</h3>
      <button 
        onClick={clearStorage}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Clear All Storage & Reload
      </button>
    </div>
  );
};

export default ClearStorage; 