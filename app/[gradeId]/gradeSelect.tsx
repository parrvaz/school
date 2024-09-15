'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactSelect from 'app/components/select';
import { GradeRoute, HomeRoute } from 'app/lib/routes';
import { SelectOptionType } from 'app/types/common.type';
import Modal from 'app/components/modal';
import fa from 'app/lib/fa.json';
import Button from 'app/components/button';
import { useMutation } from '@tanstack/react-query';
import request from 'app/lib/request';
import { DeleteGradeUrl } from 'app/lib/urls';

const GradeSelect: React.FC<{ options: { label: string; value: number }[] }> = ({ options }) => {
  const { gradeId } = useParams();
  const router = useRouter();
  const activeGrade = options.find((k) => k.value === Number(gradeId));
  const [deleteId, setDeleteId] = useState<boolean | number>(false);

  const PostDelete = async (): Promise<void> => {
    const res = await request.post(DeleteGradeUrl(deleteId as number));
    if (res.ok) {
      Number(gradeId) === deleteId && router.replace(HomeRoute());
      setDeleteId(false);
    }
  };

  const { mutate, isPending } = useMutation({ mutationFn: PostDelete });

  return (
    <div className="w-48 absolute left-0 top-0">
      <ReactSelect
        options={options}
        value={activeGrade}
        onDelete={(item: SelectOptionType) => setDeleteId(Number(item.value))}
        onEdit={(item: SelectOptionType) => router.push(HomeRoute(String(item.value)))}
        onChange={(e) => router.push(GradeRoute(e?.value || Number(gradeId), 'dashboard'))}
      />
      <Modal open={!!deleteId} setOpen={setDeleteId} id="delete-modal">
        <div className="font-regular mb-3">{fa.home.deleteConfirm1}</div>
        <div className="font-regular text-14 text-red70">{fa.home.deleteConfirm2}</div>
        <div className=" mt-5 justify-end flex gap-2">
          <Button className="btn btn-ghost" onClick={(): void => setDeleteId(false)}>
            {fa.global.cancel}
          </Button>
          <Button
            isLoading={isPending}
            className="btn btn-error w-20"
            onClick={(): void => mutate()}
          >
            {fa.global.yes}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default GradeSelect;
