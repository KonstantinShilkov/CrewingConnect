import axios from 'axios';
import { useState } from 'react';

export const useAskAI = () => {
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isFetchingAnswer, setIsFetchingAnswer] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([
    { role: 'system', text: 'You are a helpful assistant' },
  ]);

  const getAnswer = async inputValue => {
    setIsFetchingAnswer(true);
    const newMessage = { role: 'user', text: inputValue.question };
    const updatedHistory = [...conversationHistory, newMessage];
    setConversationHistory(updatedHistory);

    const url = 'http://localhost:3001/api/getAnswer';
    const requestData = {
      question: inputValue.question,
      modelUri: 'gpt://b1gnd2qf7vdt46956g5e/yandexgpt-lite',
      completionOptions: {
        stream: false,
        temperature: 0.5,
        maxTokens: 2000,
      },
      messages: updatedHistory,
    };

    const config = {
      headers: {},
    };

    try {
      const response = await axios.post(url, requestData, config);
      const answerText = response.data.result.alternatives[0].message.text;
      const aiMessage = { role: 'assistant', text: answerText };

      setConversationHistory(prevHistory => [...prevHistory, aiMessage]);
      setResponse(answerText);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error fetching data');
    } finally {
      setIsFetchingAnswer(false);
    }
  };
  return { response, getAnswer, error, isFetchingAnswer, conversationHistory };
};

// import axios from 'axios';
// import { useState } from 'react';

// export const useAskAI = () => {
//   const [response, setResponse] = useState('');
//   const [error, setError] = useState('');
//   const [isFetchingAnswer, setIsFetchingAnswer] = useState(false);
//   const [conversationHistory, setConversationHistory] = useState([]);

//   const getAnswer = async inputValue => {
//     setIsFetchingAnswer(true);
//     const newMessage = { role: 'user', text: inputValue.question };
//     setConversationHistory([...conversationHistory, newMessage]);

//     const url = 'http://localhost:3001/api/getAnswer';
//     const requestData = {
//       question: inputValue.question,
//       modelUri: 'gpt://b1gnd2qf7vdt46956g5e/yandexgpt-lite',
//       completionOptions: {
//         stream: false,
//         temperature: 0.5,
//         maxTokens: 2000,
//       },
//       messages: [...conversationHistory, newMessage],
//     };

//     const config = {
//       headers: {},
//     };

//     try {
//       const response = await axios.post(url, requestData, config);
//       const answerText = response.data.result.alternatives[0].message.text;
//       const aiMessage = { role: 'ai', text: answerText };
//       setConversationHistory(prevHistory => [...prevHistory, aiMessage]);
//       setResponse(answerText);
//       setError('');
//     } catch (error) {
//       console.error(error);
//       setError('Error fetching data');
//     } finally {
//       setIsFetchingAnswer(false);
//     }
//   };
//   return { response, getAnswer, error, isFetchingAnswer, conversationHistory };
// };
