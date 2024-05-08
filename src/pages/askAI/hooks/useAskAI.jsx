import axios from 'axios';
import { useState } from 'react';

export const useAskAI = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isFetchingAnswer, setIsFetchingAnswer] = useState(false);

  const getAnswer = async inputValue => {
    setIsFetchingAnswer(true);
    const url = 'http://localhost:3001/api/getAnswer';
    const data = {
      question: inputValue.question,
      modelUri: 'gpt://b1gnd2qf7vdt46956g5e/yandexgpt-lite',
      completionOptions: {
        stream: false,
        temperature: 0.5,
        maxTokens: 2000,
      },
      messages: [
        {
          role: 'user',
          text: inputValue.question,
        },
      ],
    };

    const config = {
      headers: {},
    };

    try {
      const response = await axios.post(url, data, config);
      const answerTexr = response.data.result.alternatives[0].message.text;
      setResponse(answerTexr);
      setIsFetchingAnswer(false);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error fetching data');
    }
  };
  return { response, getAnswer, error, isFetchingAnswer };
};
