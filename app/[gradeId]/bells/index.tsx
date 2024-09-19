'use client';

import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import FormInput from 'app/components/formInput';
import FormTimePicker from 'app/components/formTimePicker';

export type BellsFormType = { time: string; totalScore: string };
const defaultValues = { time: '', totalScore: '' };

const Bells: React.FC = () => {
  const [time, settime] = useState('00:00');
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BellsFormType>({ defaultValues });

  //   const { mutate, isPending } = useMutation({
  //     mutationFn: (e: BellsFormType) => console.log('submit', e),
  //   });
  return (
    <div>
      <div className=""></div>
      {/* <form className="relative w-[20rem]" onSubmit={handleSubmit((e) => mutate(e))}>
        <div className="flex gap-2">
          <FormTimePicker {...{ errors, control }} name="time" rules={{ required: true }} />

          <FormInput
            {...{ errors, control }}
            name="totalScore"
            placeholder={fa.createExam.totalScore}
          />
        </div>

        <Button className="btn btn-primary mt-5 w-full" isLoading={isPending}>
          {fa.global.approve}
        </Button>
      </form> */}
    </div>
  );
};

export default Bells;
