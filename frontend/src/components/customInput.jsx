import React from 'react';

const CustomInput = ({ customInput, setCustomInput }) => {
    return (
        <div>
            <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
            />
        </div>
    );
};
export default CustomInput;