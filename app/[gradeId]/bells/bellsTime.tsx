import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import FormTimePicker from 'app/components/formTimePicker';
import { BellsFormType, BellsType } from 'app/types/common.type';
import { tagRevalidate } from 'app/lib/server.util';
import { DeleteBellsAction, UpdateBellsAction } from 'app/lib/actions';

const rawTime = { startTime: '', endTime: '' };

const BellsTime: React.FC<{
  bells: BellsType[];
  bellsTag: string;
  setShowBells: (status: boolean) => void;
}> = ({ bells, bellsTag, setShowBells }) => {
  const { gradeId } = useParams();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const defaultValues = {
    bells: bells.length ? bells.map((k) => ({ ...k, bellId: k.id })) : [rawTime, rawTime],
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<BellsFormType>({ defaultValues });
  const { fields, append } = useFieldArray({ control, name: 'bells' });

  const { mutate, isPending } = useMutation({
    mutationFn: (e: BellsFormType) => UpdateBellsAction(e, gradeId.toString(), !bells.length),
    onSuccess: (data) => {
      if (typeof data !== 'boolean') {
        tagRevalidate(bellsTag);
        reset({ bells: data.map((k) => ({ ...k, bellId: k.id })) });
      }
    },
  });
  const { mutate: DeleteMutate } = useMutation({
    mutationFn: (e: number) => DeleteBellsAction(e, gradeId.toString()),
    onMutate: (id: number) => setLoadingId(id),
    onSuccess: (data) => {
      setLoadingId(null);
      if (typeof data !== 'boolean') {
        tagRevalidate(bellsTag);
        reset({ bells: data.map((k) => ({ ...k, bellId: k.id })) });
      }
    },
  });

  return (
    <form className="relative w-fit" onSubmit={handleSubmit((e) => mutate(e))}>
      <div className="mb-4 text-start">{fa.bells.setTimes}</div>
      <div className="flex gap-1 items-center ">
        <div className="gap-6 mt-7 flex flex-col">
          <div className="font-regular text-14 w-20  h-10 py-2.5">{fa.bells.startTime}:</div>
          <div className="font-regular text-14 w-20 h-10 py-2.5">{fa.bells.endTime}:</div>
        </div>
        {fields.map((field, index) => (
          <div className="flex flex-col items-center" key={field.bellId}>
            <div className="font-regular flex gap-1 items-center mb-1 w-fit text-14">
              {(fa.global as any)[`bell${index + 1}` as keyof typeof fa.global]}
              {index > 1 &&
                (loadingId === field.bellId ? (
                  <span className="loading loading-spinner loading-sm text-error" />
                ) : (
                  <i
                    onClick={() => DeleteMutate(field.bellId || 0)}
                    className="icon-close text-24 cursor-pointer text-red70"
                  />
                ))}
            </div>
            <FormTimePicker
              {...{ errors, control }}
              name={`bells.${index}.startTime`}
              rules={{ required: true }}
            />
            <FormTimePicker
              {...{ errors, control }}
              className="mt-6"
              name={`bells.${index}.endTime`}
              rules={{ required: true }}
            />
          </div>
        ))}

        {fields.length < 10 && (
          <Button
            type="button"
            className="btn btn-sm btn-primary leading-5 w-20 h-24 mt-8 btn-outline"
            onClick={() => append(rawTime)}
          >
            {fa.bells.newBell}
          </Button>
        )}
      </div>

      <div className="gap-2 flex mt-7">
        <Button className="btn leading-5 btn-primary w-56" isLoading={isPending}>
          {fa.bells[bells.length ? 'updateBells' : 'submitBells']}
        </Button>
        {!!bells.length && (
          <Button
            type="button"
            onClick={() => setShowBells(false)}
            className="btn !text-black60 btn-ghost !font-regular"
          >
            {fa.bells.returnToWeek}
          </Button>
        )}
      </div>
    </form>
  );
};

export default BellsTime;
