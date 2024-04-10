'use client';

import { useEffect } from 'react';

interface IErrorCountdown {
  cooldown: number;
  setCooldown: React.Dispatch<React.SetStateAction<number>>;
}

const ErrorCountdown = ({ cooldown, setCooldown }: IErrorCountdown) => {
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown(cooldown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <>
      {cooldown > 0 && (
        <div className="text-red-500 text-center">
          <span id="cooldown-timer">
            Rate limit exceeded. Please try again in{' '}
            <span id="cooldown-countdown">{cooldown}</span>s
          </span>
        </div>
      )}
    </>
  );
};

export default ErrorCountdown;
