'use client';

import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from 'app/components/formInput';
import fa from 'app/lib/fa.json';
import FormUpload from 'app/components/formUpload';
import Button from 'app/components/button';
import { SendHomeworkAction } from 'app/lib/actions';

type FormType = { note: string; pdf: File };
const HomeworkForm: React.FC<{ id?: number }> = ({ id }) => {
  const { gradeId } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormType>({ defaultValues: { pdf: undefined, note: '' } });

  const { mutate, isPending } = useMutation({
    mutationFn: (e: FormType) => SendHomeworkAction(e, gradeId.toString(), id),
    // onSuccess: (ok) => {
    //   if (ok) {
    //     tagRevalidate(coursesTag);
    //     reset();
    //   }
    // },
  });
  return (
    <form onSubmit={handleSubmit((e) => mutate(e))} className="bg-white rounded-lg mt-3 p-4">
      <div className="font-bold mb-5">{fa.homework.sendHomework}</div>

      <div className="flex justify-between">
        <FormUpload
          className="h-28"
          title={fa.homework.uploadHomework}
          name="pdf"
          type={['pdf']}
          control={control}
          errors={errors}
        />
        <FormInput
          {...{ errors, control }}
          className="w-96 mb-3 h-fit shrink-0"
          name="note"
          rtl
          placeholder={fa.homework.note}
        />
      </div>

      <Button isLoading={isPending} className="btn btn-primary w-48">
        {fa.homework.sendHomework}
      </Button>
    </form>
  );
};

export default HomeworkForm;
