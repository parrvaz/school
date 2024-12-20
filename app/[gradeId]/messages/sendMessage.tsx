'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useParams, usePathname } from 'next/navigation';
import FormSelect from 'app/components/formSelect';
import { revalidatePage } from 'app/lib/server.util';
import fa from 'app/lib/fa.json';
import FormInput from 'app/components/formInput';
import Button from 'app/components/button';
import { SendMessageFormType } from 'app/types/common.type';
import { SendMessageAction } from 'app/lib/actions';
import SelectModal from 'app/components/selectModal';
import { ROLES } from 'app/utils/common.util';

const SendMessage: React.FC<{
  role: string;
  options: Record<number, { value: number; label: string }[]>;
}> = ({ options, role }) => {
  const rules = { required: true };
  const path = usePathname();
  const { gradeId } = useParams();
  const defaultRoles = role === ROLES.student ? [{ value: 4, label: 'assistant' }] : [];

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    register,
    setValue,
    watch,
  } = useForm<SendMessageFormType>({
    defaultValues: { type: undefined, subject: '', body: '', roll: defaultRoles, students: [] },
  });

  const rolls = watch('roll').map((k) => k.value);
  // const typeOptions = [
  //   { value: 1, label: 'aa' },
  //   { value: 2, label: 'bb' },
  // ];
  const rollOptions = [
    { value: 1, label: fa.messages.students },
    { value: 2, label: fa.messages.parents },
    { value: 3, label: fa.messages.teachers },
    { value: 4, label: fa.messages.assistant },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: (e: SendMessageFormType) => SendMessageAction(e, gradeId.toString()),
    onSuccess: (ok) => ok && (revalidatePage(path), reset()),
  });

  return (
    <form onSubmit={handleSubmit((e) => mutate(e))}>
      <div className="flex flex-col gap-2 mt-10 ">
        {role !== ROLES.student && (
          <FormSelect
            {...{ errors, control, rules }}
            name="roll"
            isMulti
            className="max-w-96"
            options={rollOptions}
            placeholder={fa.messages.roll}
          />
        )}
        <div className="flex gap-3">
          {['students', 'parents', 'teachers', 'assistant'].map(
            (key, index) =>
              rolls.includes(index + 1) && (
                <SelectModal
                  key={key}
                  options={options[index + 1]}
                  title={fa.global[key]}
                  name={key}
                  className="mt-4 max-w-xs flex-1"
                  {...{ register, setValue, errors }}
                />
              )
          )}
        </div>
      </div>

      <FormInput
        {...{ errors, control, rules }}
        name="subject"
        rtl
        className="max-w-72 mt-6"
        placeholder={fa.messages.subject}
      />
      <FormInput
        {...{ errors, control, rules }}
        name="body"
        rtl
        textarea
        className="max-w-96 mt-6 h-20"
        placeholder={fa.messages.body}
      />

      <Button type="submit" className="btn btn-primary mt-6 w-52" isLoading={isPending}>
        {fa.messages.sendMessage}
      </Button>
    </form>
  );
};

export default SendMessage;
