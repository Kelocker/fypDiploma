// import React from 'react';
// import Compiler from '../components/compiler/compiler.jsx';

// const Quiz =() =>{
//     return (
//         <div className='quizWrapper'>
//             <h1>Word Count</h1>
//             <div className='quizContent'>
//                 <p>
//                 Your task is to count how many times each word occurs in a subtitle of a drama.

// The subtitles from these dramas use only ASCII characters.

// The characters often speak in casual English, using contractions like they're or it's. Though these contractions come from two words (e.g. we are), the contraction (we're) is considered a single word.

// Words can be separated by any form of punctuation (e.g. ":", "!", or "?") or whitespace (e.g. "\t", "\n", or " "). The only punctuation that does not separate words is the apostrophe in contractions.

// Numbers are considered words. If the subtitles say It costs 100 dollars. then 100 will be its own word.

// Words are case insensitive. For example, the word you occurs three times in the following sentence:

// You come back, you hear me? DO YOU HEAR ME?

// The ordering of the word counts in the results doesn't matter.

// Here's an example that incorporates several of the elements discussed above:

// simple words
// contractions
// numbers
// case insensitive words
// punctuation (including apostrophes) to separate words
// different forms of whitespace to separate words
// "That's the password: 'PASSWORD 123'!", cried the Special Agent.\nSo I fled.

// The mapping for this subtitle would be:
//                 </p>
//             </div>
//             <><Compiler />
//             </>
//         </div>
//     );
// }

// export default Quiz;


// src/ExerciseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Quiz() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/exercises/')
            .then(response => setExercises(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Exercise List</h1>
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise.id}>
                        {exercise.solution}
                        <a href={`#`} onClick={() => runTests(exercise.id)}>Run Tests</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function runTests(exerciseId) {
    axios.post(`http://localhost:8000/api/exercises/${exerciseId}/run_tests/`)
        .then(response => console.log("Tests run successfully"))
        .catch(error => console.error("Error running tests:", error));
}

export default Quiz;
