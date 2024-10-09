'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import ReactSelect from 'app/components/select';
import { GradeRoute, HomeRoute } from 'app/lib/routes';
import { SelectOptionType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import request from 'app/lib/request';
import { DeleteGradeUrl } from 'app/lib/urls';
import DeleteModal from 'app/components/deleteModal';
import { tagRevalidate } from 'app/lib/server.util';

const GradeSelect: React.FC<{ options: { label: string; value: string }[]; tag: string }> = ({
  options,
  tag,
}) => {
  const { gradeId } = useParams();
  const router = useRouter();
  const activeGrade = options.find((k) => k.value === gradeId);
  const [deleteId, setDeleteId] = useState<boolean | string>(false);

  const PostDelete = async (): Promise<void> => {
    const res = await request.post(DeleteGradeUrl(deleteId as string));
    if (res.ok) {
      tagRevalidate(tag);

      if (gradeId === deleteId) {
        const otherOptions = options.filter((k) => k.value !== gradeId);
        router.replace(
          otherOptions.length ? GradeRoute(otherOptions[0].value, 'dashboard') : HomeRoute()
        );
      }
      setDeleteId(false);
    }
  };

  const { mutate, isPending } = useMutation({ mutationFn: PostDelete });

  return (
    <div className="w-64 absolute left-0 top-8">
      <ReactSelect
        options={options}
        value={activeGrade}
        onDelete={(item: SelectOptionType) => setDeleteId(item.value.toString())}
        onEdit={(item: SelectOptionType) => router.push(HomeRoute(String(item.value)))}
        onAdd={(): void => router.push(HomeRoute('', true))}
        addMessage={fa.home.createNewGrade}
        onChange={(e) =>
          router.push(GradeRoute(e?.value.toString() || gradeId.toString(), 'dashboard'))
        }
      />
      <DeleteModal
        open={!!deleteId}
        setOpen={setDeleteId}
        title={fa.home.deleteConfirm1}
        onDelete={(): void => mutate()}
        isPending={isPending}
        component={<div className="font-regular text-14 text-red70">{fa.home.deleteConfirm2}</div>}
      />
    </div>
  );
};

export default GradeSelect;
