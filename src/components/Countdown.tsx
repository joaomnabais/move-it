import { useContext, useState } from 'react';

import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    chosenTime,
    resetCountdown, 
    startCountdown, 
    setChosenTime,
    setTime
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      <div className={styles.countdownForm}>
        <input 
          type="number" 
          className={styles.countdownFormInput}
          value={chosenTime} 
          onChange={e => setChosenTime(+e.target.value)} 
          disabled={isActive || hasFinished}
        />
        <button 
          type="button" 
          className={`${styles.countdownFormButton} ${(isActive || hasFinished) ? styles.countdownFormButtonActive : ''}`}
          disabled={isActive || hasFinished}
          onClick={() => setTime(chosenTime * 60)}
        >
          Definir tempo
        </button>
      </div>
      
      { hasFinished ? (
        <button 
          disabled
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
          { isActive ? (
            <button 
              type="button" 
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={() => resetCountdown()}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button 
              type="button" 
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          ) }
        </>
      ) }
    </div>
  );
}