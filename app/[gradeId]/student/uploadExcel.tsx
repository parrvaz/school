import React, { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import Modal from 'app/components/modal';
import { UploadFileAction } from 'app/lib/actions';
import { tagRevalidate } from 'app/lib/server.util';
import { faNumber } from 'app/utils/common.util';

const UploadExcel: React.FC<{ tag: string }> = ({ tag }) => {
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mistakes, setMistakes] = useState<object | undefined>();
  const sampleUrl = `http://pishkarserver.semimnet.ir/storage/sample.xlsx`;
  const { gradeId } = useParams();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    file && setFile(file);
  };

  const handleClose = (): void => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    setOpenModal(false);
    setFile(undefined);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => UploadFileAction(gradeId.toString(), file),
    onSuccess: (res) => {
      if (res.ok) {
        handleClose();
        tagRevalidate(tag);
      } else {
        setMistakes(res.data?.mistakes);
      }
    },
  });

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} className="btn btn-outline btn-primary">
        {fa.student.groupAdd}
      </Button>
      <Modal open={openModal} setOpen={handleClose} id="upload-excel">
        <div className="font-bold text-center">{fa.student.groupAdd}</div>
        <div className="font-regular text-14 mt-6 mb-3">{fa.student.excelInfo1}</div>
        <a href={sampleUrl} className="text-blue50">
          {fa.student.downloadSample}
        </a>
        <div className="font-regular text-14 mt-3">{fa.student.excelInfo2}</div>
        <div className="font-regular text-14 mt-2">{fa.student.rule2}</div>
        <div className="font-regular text-14 mt-2">{fa.student.rule3}</div>
        <div className="font-regular text-14 mt-2">{fa.student.rule4}</div>
        <div className="font-regular text-14 mt-2">{fa.student.rule1}</div>

        <div className="flex items-center mt-7 gap-4">
          <label>
            <span className="btn btn-primary btn-outline">{fa.student.chooseFile}</span>
            <input
              ref={fileInputRef}
              accept=".xlsx"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
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

      <Modal open={!!mistakes} setOpen={() => setMistakes(undefined)} id="mistake">
        <div className="text-center font-bold mb-5">{fa.student.mistakeList}</div>

        <div className="flex gap-3 text-12 font-bold">
          <div className="">{fa.global.row}</div>
          <div className="">{fa.global.description}</div>
        </div>

        <div className="flex flex-col gap-2">
          {Object.keys(mistakes || {}).map((key) => (
            <div key={key} className="flex bg-berry10 items-center rounded-lg py-2 px-3 gap-4">
              <div className="">{faNumber(key)}</div>
              <div className="text-13 font-light">{mistakes?.[key]}</div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default UploadExcel;
