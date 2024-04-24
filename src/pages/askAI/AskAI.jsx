import React from 'react';
import s from './AskAI.module.css';
import { useForm } from 'react-hook-form';
import { IconButton, TextField } from '@mui/material';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import axios from 'axios';
import { useState } from 'react';

const AskAI = () => {
  const [response, setResponse] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const askButtonClick = async data => {
    console.log(data.question);
    const inputValue = data.question.trim();
    const apiKey = 'Bearer sk-proj-CsN58QAsPBJMrmWqDvuRT3BlbkFJIZCCh8RCHBOhS2txdDiC';

    if (!inputValue) {
      setResponse('Please enter a symbol');
      return;
    }
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          prompt: inputValue,
          max_tokens: 50,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: apiKey,
          },
        }
      );
      setResponse(res.data.choices[0].text.trim());
    } catch (error) {
      setResponse('Error fetching data');
    }
  };
  return (
    <div className={s.mainContainer}>
      <div className={s.answerBox}>{response}</div>
      <form onSubmit={handleSubmit(askButtonClick)}>
        <div className={s.inputTextField}>
          <TextField
            {...register('question')}
            size="small"
            label="Ask AI Anything"
            InputLabelProps={{ shrink: true }}
            style={{ width: '300px' }}
          />
          <IconButton type="submit">
            <PsychologyAltIcon />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default AskAI;
