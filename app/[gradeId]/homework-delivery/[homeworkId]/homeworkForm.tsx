'use client';

import { useMutation } from '@tanstack/react-query';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from 'app/components/formInput';
import fa from 'app/lib/fa.json';
import FormUpload from 'app/components/formUpload';
import Button from 'app/components/button';
import { SendHomeworkAction } from 'app/lib/actions';
import { GradeRoute } from 'app/lib/routes';
import { SingleStudentHomeworkType } from 'app/types/common.type';

type FormType = { note: string; pdf: File };
const HomeworkForm: React.FC<{ data: SingleStudentHomeworkType }> = ({ data }) => {
  console.log(data);
  const { gradeId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const homeworkId = searchParams.get('homeworkId') || '';

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormType>({ defaultValues: { pdf: undefined, note: data.note || '' } });

  const { mutate, isPending } = useMutation({
    mutationFn: (e: FormType) =>
      SendHomeworkAction({ ...e, homeworkId }, gradeId.toString(), data.studentHomework_id),
    onSuccess: (ok) => {
      if (ok) {
        router.replace(GradeRoute(gradeId, 'homework-delivery'));
      }
    },
  });
  return (
    <form onSubmit={handleSubmit((e) => mutate(e))} className="bg-white rounded-lg mt-3 p-4">
      <div className="font-bold mb-5">{fa.homework.sendHomework}</div>

      <div className="flex">
        <FormUpload
          className="h-28 flex-1 max-w-96 "
          title={fa.homework.uploadHomework}
          name="pdf"
          type={['pdf']}
          control={control}
          errors={errors}
        />
        <FormInput
          {...{ errors, control }}
          className="max-w-96 flex-1 mb-3 h-fit shrink-0"
          name="note"
          rtl
          placeholder={fa.homework.note}
        />
      </div>

      <div className="flex gap-4 items-center">
        <Button isLoading={isPending} className="btn btn-primary w-48">
          {fa.homework.sendHomework}
        </Button>
        {data.solution && (
          <a href={data.solution} download>
            <Button type="button" className="btn btn-primary btn-outline">
              <i className="icon-import text-20" />
              {fa.homework.downloadHomework}
            </Button>
          </a>
        )}
      </div>
    </form>
  );
};

export default HomeworkForm;
