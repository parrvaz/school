import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import Modal from 'app/components/modal';
import { siteURL } from 'app/lib/request';
import { UploadFileAction } from 'app/lib/actions';

const UploadExcel: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const sampleUrl = `${siteURL}students/sampleExcel`;
  const { gradeId } = useParams();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    file && setFile(file);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => UploadFileAction(gradeId.toString(), file),
    onSuccess: (ok) => {
      if (ok) {
        setOpenModal(false);
        setFile(undefined);
      }
    },
  });

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="btn btn-outline btn-primary">
        {fa.student.groupAdd}
      </Button>
      <Modal
        mustConfirm
        open={openModal}
        setOpen={() => (setOpenModal(false), setFile(undefined))}
        id="upload-excel"
      >
        <div className="font-bold text-center">{fa.student.groupAdd}</div>
        <div className="font-regular text-14 mt-6 mb-3">{fa.student.excelInfo1}</div>
        <a href={sampleUrl} className="text-blue50">
          {sampleUrl}
        </a>
        <div className="font-regular text-14 mt-3">{fa.student.excelInfo2}</div>
        <div className="font-regular text-14 mt-2">{fa.student.rule2}</div>
        <div className="font-regular text-14 mt-2">{fa.student.rule3}</div>
        <div className="font-regular text-14 mt-2">{fa.student.rule4}</div>
        <div className="font-regular text-14 mt-2">{fa.student.rule1}</div>

        <div className="flex items-center mt-7 gap-4">
          <label>
            <span className="btn btn-primary btn-outline">{fa.student.chooseFile}</span>
            <input accept=".xlsx" type="file" onChange={handleFileChange} className="hidden" />
          </label>
          {file && <div className="">{file.name}</div>}
        </div>

        <div className="w-full text-end border-t border-t-berry20 mt-5">
          <Button
            disabled={!file}
            onClick={() => mutate()}
            isLoading={isPending}
            className="btn mt-4 text-end btn-primary"
          >
            {fa.global.submit}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UploadExcel;
