// TODO: themes add a button change to dark mode
import React, { useState } from 'react';    

const monacoThemes = [
    { value: 'solarized-light', label: 'Solarized Light' },
    { value: 'dracula', label: 'Dracula' }
];

function DefineTheme() {
    const [theme, setTheme] = useState(monacoThemes[0].value);

    const handleChange = (event) => {
        setTheme(event.target.value);
    };

    return (
        <select value={theme} onChange={handleChange}>
            {monacoThemes.map((theme) => (
                <option key={theme.value} value={theme.value}>
                    {theme.label}
                </option>
            ))}
        </select>
    );
}
export default DefineTheme;
  