'use client'

import IconRegistry from "@repo/ui/icons"
import { useEffect, useState } from "react";

interface ErrorNoticeProps {
  text: string;
  closeCallback: () => void;
}

const ErrorNotice: React.FC<ErrorNoticeProps> = ({ text, closeCallback }) => {
  const CloseIcon = IconRegistry['Cross'];
  const [progress, setProgress] = useState<number>(100); // Initial progress at 100%

  useEffect(() => {
    const disappearTimer = setTimeout(() => {
      closeCallback();
    }, 5000); // 10 seconds timer

    const interval = setInterval(() => {
      setProgress(prevProgress => prevProgress - 0.5); // Decrease progress by 1% every 100 milliseconds
    }, 25);

    return () => {
      clearInterval(interval);
      clearTimeout(disappearTimer);
    }
  }, [closeCallback]);

  return (
    <div className="fixed w-96 min-h-16 bottom-5 right-5 rounded-lg bg-red-500 text-white overflow-hidden">
      <button onClick={closeCallback} className="absolute right-3 top-3 text-white">
        {CloseIcon && <CloseIcon />}
      </button>
      <div className="px-4 py-3">
        {text}
      </div>
      <div className="w-full absolute bottom-0 h-1 bg-red-300">
        <div style={{ width: `${progress}%`, backgroundColor: '#fff', height: '100%' }} />
      </div>
    </div>
  );
}

export default ErrorNotice;
