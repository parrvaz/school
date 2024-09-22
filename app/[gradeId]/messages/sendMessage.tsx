'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import FormSelect from 'app/components/formSelect';
import fa from 'app/lib/fa.json';
import FormInput from 'app/components/formInput';
import Button from 'app/components/button';
import { useMutation } from '@tanstack/react-query';
import { revalidatePage } from 'app/lib/server.util';
import { useParams, usePathname } from 'next/navigation';
import { SendMessageFormType } from 'app/types/common.type';
import { SendMessageAction } from 'app/lib/actions';

const SendMessage: React.FC = () => {
  const rules = { required: true };
  const path = usePathname();
  const { gradeId } = useParams();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<SendMessageFormType>({
    defaultValues: { type: undefined, subject: '', body: '', audience: [], recipients: [] },
  });
  const typeOptions = [
    { value: 1, label: 'aa' },
    { value: 2, label: 'bb' },
  ];
  const audienceOptions = [
    { value: 1, label: 'ززسی' },
    { value: 2, label: 'بیس یس' },
  ];
  const recipientsOptions = [
    { value: 1, label: 'cccc' },
    { value: 2, label: 'bbdcd' },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: (e: SendMessageFormType) => SendMessageAction(e, gradeId.toString()),
    onSuccess: (ok) => ok && (revalidatePage(path), reset()),
  });
  return (
    <form onSubmit={handleSubmit((e) => mutate(e))}>
      <div className="flex gap-2 mt-10 max-w-[50rem]">
        <FormSelect
          {...{ errors, control, rules }}
          name="type"
          options={typeOptions}
          placeholder={fa.messages.type}
        />
        <FormSelect
          {...{ errors, control, rules }}
          name="audience"
          isMulti
          options={audienceOptions}
          placeholder={fa.messages.audience}
        />
        <FormSelect
          {...{ errors, control, rules }}
          name="recipients"
          isMulti
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
