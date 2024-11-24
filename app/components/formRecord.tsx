import React, { useEffect, useRef, useState } from 'react';
import { Mic, Pause } from 'react-feather';
import { Controller, Control } from 'react-hook-form';
import { handleError } from 'app/utils/component.util';

type FormRecordProps = {
  name: string;
  title: string;
  errors?: any; // eslint-disable-line
  control: Control<any>; // eslint-disable-line
  rules?: Record<string, boolean>;
};

const FormRecord: React.FC<FormRecordProps> = ({ name, control, rules, errors, title }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRecording) {
      timer = setInterval(() => setSeconds((prev) => prev + 1), 100);
    } else if (timer) {
      clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording]);

  const handleStartRecording = async (onChange: (value: string | null) => void): Promise<void> => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event): void => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = (): void => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        onChange(url); // Update form value with audio URL
      };

      mediaRecorder.start();
      setIsRecording(true);
      setSeconds(0);
    } catch (err) {
      setError('Microphone access denied or unavailable.');
    }
  };

  const handleStopRecording = (): void => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="form-record relative">
      <div className="font-bold text-berry100">{title}</div>
      <Controller
        {...{ control, name, rules }}
        render={({ field: { onChange, value } }) => (
          <div className="flex items-center justify-between">
            <div className="controls flex gap-4">
              {isRecording ? (
                <div className=" flex items-center gap-2">
                  <div
                    onClick={handleStopRecording}
                    className="bg-white cursor-pointer text-red70 size-12 rounded-full isCenter"
                  >
                    <Pause />
                  </div>
                  <span className="ltr text-18 w-10">{seconds / 10}</span>
                  <span className="relative flex size-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red70 opacity-75" />
                    <span className="relative inline-flex rounded-full size-3 bg-red70" />
                  </span>
                </div>
              ) : (
                <div
                  onClick={() => handleStartRecording(onChange)}
                  className="bg-white text-berry70 cursor-pointer size-12 rounded-full isCenter"
                >
                  <Mic />
                </div>
              )}
            </div>
            {value && (
              <div className="audio-preview">
                <audio src={value} controls />
              </div>
            )}
          </div>
        )}
      />
      {handleError(error ? { message: error } : errors?.[name])}
    </div>
  );
};

export default FormRecord;
