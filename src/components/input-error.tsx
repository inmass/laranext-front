import React from 'react';
interface InputErrorProps {
  messages?: string[]; // Array of error messages, defaults to empty array
  className?: string; // Optional className prop
}

const InputError: React.FC<InputErrorProps> = ({
  messages = [],
  className = '',
}) => (
  <>
    {messages.length > 0 && (
      <>
        {messages.map((message, index) => (
          <p className={`${className} text-sm text-red-600`} key={index}>
            {message}
          </p>
        ))}
      </>
    )}
  </>
);

export default InputError;
