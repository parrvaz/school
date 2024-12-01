'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import ReactSelect from 'app/components/select';
import fa from 'app/lib/fa.json';
import { GradeRoute } from 'app/lib/routes';
import Button from 'app/components/button';
import FormInput from 'app/components/formInput';
import { ScoreHomeworkAction } from 'app/lib/actions';
import { numberValidation, valueValidation } from 'app/utils/common.util';
import SaveModal from 'app/components/saveModal';
import { GiveScoreType } from 'app/types/common.type';

const GiveScore: React.FC<{ data: GiveScoreType[] }> = ({ data }) => {
  type FormType = { score: string };
  const router = useRouter();
  const { gradeId, homeworkId } = useParams();
  const searchParams = useSearchParams();
  const [nextAction, setNextAction] = useState<(() => void) | null>(null);

  const id = searchParams.get('id') || '';

  const studentOptions = useMemo(
    () => data.map(({ name, id }) => ({ value: id, label: name })),
    [data]
  );
  const itemIndex = data.findIndex((k) => k.id === +id);
  const nextId = data[itemIndex + 1]?.id;
  const perviousId = data[itemIndex - 1]?.id;
  const examScore = 20;
  const homework = data[itemIndex];
  const initialScore = typeof homework?.score === 'number' ? homework.score.toString() : '';

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm<FormType>({ defaultValues: { score: undefined } });

  useEffect(() => {
    !id &&
      data.length &&
      router.replace(
        GradeRoute(gradeId, 'homework-list', `/give-score/${homeworkId}?id=${data[0].id}`)
      );
    reset({ score: initialScore });
  }, [id]);

  const { mutate, isPending } = useMutation({
    mutationFn: ({ score }: FormType) =>
      ScoreHomeworkAction(score, gradeId.toString(), homework.id),
    onSuccess: (ok) => {
      if (ok) {
        nextId && router.push(GradeRoute(gradeId, 'homework-list', `?tab=give-score&id=${nextId}`));
      }
    },
  });

  const onSave = async (): Promise<void> => await mutate({ score: watch('score') });
  const hasChange = JSON.stringify(watch('score')) !== JSON.stringify(initialScore);

  const handlePervious = (): void => {
    const url = GradeRoute(gradeId, 'homework-list', `?tab=give-score&id=${perviousId}`);
    hasChange ? setNextAction(() => () => router.push(url)) : router.push(url);
  };

  return (
    <div>
      <div className="bg-white rounded-lg p-5 flex justify-between items-center">
        <ReactSelect
          className="w-60"
          options={studentOptions}
          placeholder={fa.global.chooseStudent}
          value={studentOptions.find((k) => k.value === +id)}
          onChange={(e) =>
            router.push(GradeRoute(gradeId, 'homework-list', `?tab=give-score&id=${e.value}`))
          }
        />

        <div className="flex gap-2 items-center">
          <Button
            disabled={perviousId === undefined}
            onClick={handlePervious}
            className="btn btn-primary btn-outline btn-sm"
          >
            {fa.global.previous}
          </Button>
          <form className="flex gap-2 items-center" onSubmit={handleSubmit((e) => mutate(e))}>
            <FormInput
              {...{ errors, control }}
              name="score"
              placeholder={fa.global.score}
              rules={numberValidation({ ...valueValidation(0, Number(examScore) || 100) }, true)}
            />
            <Button className="btn btn-primary min-h-10 w-24 !h-10" isLoading={isPending}>
              {fa.homework[nextId ? 'submitContinue' : 'submit']}
            </Button>
          </form>
        </div>
      </div>

      <div className="font-light text-14 mt-4">
        {fa.homework.studentNote} : {homework?.note || fa.homework.noNote}
      </div>

      <div className="w-full h-[calc(100vh-100px)] mt-3">
        <iframe src={homework?.solution} width="100%" height="100%" title="PDF Viewer" />
      </div>

      <SaveModal {...{ nextAction, setNextAction, onSave, isPending }} />
    </div>
  );
};

export default GiveScore;
