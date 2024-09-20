import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import FormTimePicker from 'app/components/formTimePicker';
import { BellsFormType, BellsType } from 'app/types/common.type';
import { UpdateBellAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';

const rawTime = { startTime: '', endTime: '' };

const BellsTime: React.FC<{ bells: BellsType; tag: string }> = ({ bells, tag }) => {
  const { gradeId } = useParams();

  const defaultValues = {
    bells: [rawTime, rawTime],
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BellsFormType>({ defaultValues });
  const { fields, append, remove } = useFieldArray({ control, name: 'bells' });

  console.log(bells);
  const { mutate, isPending } = useMutation({
    mutationFn: (e: BellsFormType) => UpdateBellAction(e, gradeId.toString()),
    onSuccess: (ok) => {
      if (ok) {
        tagRevalidate(tag);
      }
    },
  });

  return (
    <form className="relative w-fit text-end" onSubmit={handleSubmit((e) => mutate(e))}>
      <div className="mb-4 text-start">{fa.bells.setTimes}</div>
      <div className="flex gap-1 items-center ">
        <div className="gap-6 mt-7 flex flex-col">
          <div className="font-regular text-14 w-20  h-10 py-2.5">{fa.bells.startTime}:</div>
          <div className="font-regular text-14 w-20 h-10 py-2.5">{fa.bells.endTime}:</div>
        </div>
        {fields.map((field, index) => (
          <div className="flex flex-col items-center" key={field.id}>
            <div className="font-regular flex gap-1 items-center mb-1 w-fit text-14">
              {fa.bells[`bell${index + 1}` as keyof typeof fa.bells]}
              {index > 1 && (
                <i
                  onClick={() => remove(index)}
                  className="icon-close text-24 cursor-pointer text-red70"
                />
              )}
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

      <Button className="btn btn-primary mt-7 w-28" isLoading={isPending}>
        {fa.global.submit}
      </Button>
    </form>
  );
};

export default BellsTime;
