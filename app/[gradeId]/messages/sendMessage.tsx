'use client';

import React, { useMemo } from 'react';
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

const SendMessage: React.FC<{ options: Record<number, { value: number; label: string }[]> }> = ({
  options,
}) => {
  const rules = { required: true };
  const path = usePathname();
  const { gradeId } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<SendMessageFormType>({
    defaultValues: { type: undefined, subject: '', body: '', roll: [], recipients: [] },
  });
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
  const recipientsOptions = useMemo(
    () =>
      watch('roll')
        .map((k) => options[k.value])
        .flat(),
    [watch('roll')]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (e: SendMessageFormType) => SendMessageAction(e, gradeId.toString()),
    onSuccess: (ok) => ok && (revalidatePage(path), reset()),
  });

  return (
    <form onSubmit={handleSubmit((e) => mutate(e))}>
      <div className="flex gap-2 mt-10 max-w-[50rem]">
        <FormSelect
          {...{ errors, control, rules }}
          name="roll"
          isMulti
          options={rollOptions}
          placeholder={fa.messages.roll}
        />
        <FormSelect
          {...{ errors, control, rules }}
          name="recipients"
          isMulti
          isDisabled={!watch('roll').length}
          options={recipientsOptions}
          placeholder={fa.messages.recipients}
        />
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
        className="max-w-96 mt-6"
        placeholder={fa.messages.body}
      />

      <Button type="submit" className="btn btn-primary mt-6 w-52" isLoading={isPending}>
        {fa.messages.sendMessage}
      </Button>
    </form>
  );
};

export default SendMessage;
