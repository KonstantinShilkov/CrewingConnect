import React from 'react';
import s from './AskAI.module.css';
import { useForm } from 'react-hook-form';
import { IconButton, TextField } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { useAskAI } from './hooks/useAskAI';
import { useContext } from 'react';
import { UserContext } from '../../context/user-context';
import Preloader from '../../common/Preloader';

const AskAI = () => {
  const { getAnswer, response, error, isFetchingAnswer } = useAskAI();
  const { isFetching } = useContext(UserContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const buttonOnClickAsk = data => {
    if (data.question !== '') {
      getAnswer(data);
      reset();
    }
  };

  if (isFetching) {
    return (
      <div className={s.preloader}>
        <Preloader />
      </div>
    );
  }
  return (
    <div className={s.mainContainer}>
      <form onSubmit={handleSubmit(buttonOnClickAsk)}>
        <div className={s.inputTextField}>
          <TextField
            {...register('question')}
            size="small"
            label="Ask AI Anything"
            InputLabelProps={{ shrink: true }}
            style={{ width: '300px' }}
          />
          <IconButton type="submit">
            <MicIcon />
          </IconButton>
        </div>
      </form>
      {isFetchingAnswer ? (
        <div className={s.preloaderWithMarginTop}>
          <Preloader />
        </div>
      ) : (
        <div className={s.answerBox}>
          <div className={s.answerText}>{response}</div>
        </div>
      )}
    </div>
  );
};

export default AskAI;
