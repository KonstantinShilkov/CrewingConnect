import axios from 'axios';
import { useState } from 'react';

export const useAskAI = () => {
  const [response, setResponse] = useState('');

  const getAnswer = inputValue => {
    console.log(inputValue);
  };

  return { response, getAnswer };
};

//     try {
//       const res = await axios.get(`https://api.gemini.com/v1/pubticker/${inputValue}`);
//       setResponse(JSON.stringify(res.data, null, 2));
//     } catch (error) {
//       setResponse('Error fetching data');
//     }
//   };
