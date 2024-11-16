import React, { useEffect, useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import { GroupDateType, ReportCardType } from 'app/types/common.type';
import { faNumber } from 'app/utils/common.util';
import Modal from 'app/components/modal';

const PdfDownload: React.FC<{
  data: ReportCardType[] | undefined;
  date: GroupDateType;
  gradeId: number;
}> = ({ data, date, gradeId }) => {
  const i18n = fa.reports.pdfDownload;
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [pdfUrl, setPdfUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const name = `${fa.reports.card.card}-${date.startDate}-${date.endDate}`;

  const handleConvertToPdf = async (): Promise<void> => {
    if (imageUrls.length === 0) return;

    try {
      const pdfDoc = await PDFDocument.create();
      const a4Width = 595.28;
      const a4Height = 841.89;
      const batchSize = 20; // Process images in batches of 20
      for (let i = 0; i < imageUrls.length; i += batchSize) {
        const batch = imageUrls.slice(i, i + batchSize);
        for (const itemImageUrl of batch) {
          const pngBytes = await fetch(itemImageUrl).then((res) => res.arrayBuffer());
          const pngImage = await pdfDoc.embedPng(pngBytes);
          const page = pdfDoc.addPage([a4Width, a4Height]);
          page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: a4Width,
            height: a4Height,
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error('Could not generate PDF', error);
    }
  };
  const handleCapture = async (): Promise<void> => {
    const capturedImages: string[] = [];
    for (let i = 0; i < (data?.length || 0); i++) {
      const element = elementRefs.current[i];
      if (element) {
        try {
          const dataUrl = await toPng(element, { width: 794, height: 1123 });
          capturedImages.push(dataUrl);
        } catch (error) {
          console.error('Could not capture image for item', data?.[i].name, error);
        }
      }
    }
    setImageUrls(capturedImages);
  };

  useEffect(() => {
    openModal && handleCapture();
  }, [JSON.stringify(data), openModal]);

  useEffect(() => {
    handleConvertToPdf();
  }, [imageUrls]);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className=" btn btn-primary w-32 ml-4 btn-outline">
        {fa.reports.card.downloadPdf}
      </Button>

      <Modal
        className="min-w-[54rem] p-0 text-center flex flex-col items-center relative bg-berry10"
        open={openModal}
        setOpen={setOpenModal}
        id="download-card"
      >
        <div className="mt-6 font-bold text-18 mb-4">{fa.global.download}</div>
        <div className="">
          {data?.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => {
                elementRefs.current[index] = el;
              }}
              className="w-[794px] h-[1123px] p-7 bg-white"
            >
              <div className="flex gap-3 mb-2">
                <div className="font-semibold leading-5 text-13">
                  <div className="">{i18n.info1}</div>
                  <div className="">{i18n.info2}</div>
                  <div className="">{i18n.info3}</div>
                  <div className="">{i18n.info4}</div>
                  <div className="">{fa.global[`grade${gradeId}th`]}</div>
                </div>
                <div className="flex-1 border border-black60 text-12 text-start px-1 bg-black30 font-semibold">
                  <div className="">{i18n.info5}</div>
                  <div className="">{i18n.info6}</div>
                  <div className="">{i18n.info7}</div>
                  <div className="">{i18n.info8}</div>
                </div>
                <div className="flex-1 border border-black60 text-12 text-start px-1 bg-black30 font-semibold">
                  <div className="">
                    {i18n.info9} {item.firstName ? `: ${item?.firstName}` : ''}
                  </div>
                  <div className="">
                    {i18n.info10} {item.lastName ? `: ${item.lastName}` : ''}
                  </div>
                  <div className="">{i18n.info11}</div>
                  <div className="">{i18n.info12}</div>
                </div>
                <div className="w-20 h-24 border border-black60" />
              </div>
              <div className="text-center border border-black50 rounded-md overflow-hidden">
                <table className="w-full rtl">
                  <thead className="border-b border-b-black50 te">
                    <tr>
                      <th className="p-2">{fa.global.courseName}</th>
                      <th className="p-2 border-x border-x-black50">{fa.global.factor}</th>
                      <th className="p-2">{fa.global.score}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item?.scores?.map((item, index) => (
                      <tr key={index} className={`${index % 2 ? 'bg-[#eee]' : 'bg-white'}`}>
                        <td className="p-1">{item.course}</td>
                        <td className="p-1 border-x border-x-black50">{faNumber(item.factor)}</td>
                        <td className="p-1">{faNumber(item.score)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center w-fit font-bold border border-black50 rounded-md mt-5">
                <div className="border-l border-l-black50 py-2 px-5">{fa.global.average}</div>
                <div className="px-5 text-20">{faNumber(item?.average)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-berry10 w-full text-end p-3">
          <Button onClick={() => saveAs(pdfUrl, name)} className="btn w-56 btn-primary">
            {fa.reports.card.downloadPdf}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default PdfDownload;
