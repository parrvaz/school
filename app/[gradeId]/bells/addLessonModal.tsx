import React, { useMemo, useState } from 'react';
import Button from 'app/components/button';
import fa from 'app/lib/fa.json';
import { CourseType } from 'app/types/common.type';
import Modal from 'app/components/modal';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { tagRevalidate } from 'app/lib/server.util';
import { useParams } from 'next/navigation';
import { CreateCourseAction, DeleteCourseAction } from 'app/lib/actions';
import FormInput from 'app/components/formInput';

type FormType = { name: string };

const AddLessonModal: React.FC<{ courses: CourseType[]; coursesTag: string }> = ({
  courses,
  coursesTag,
}) => {
  const { gradeId } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const names = useMemo(() => [...courses.map((k) => k.name), fa.bells.empty], [courses]);
  const userCourses = useMemo(() => courses.filter((k) => k.isUser), [courses]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormType>({ defaultValues: { name: '' } });

  const { mutate, isPending } = useMutation({
    mutationFn: (e: FormType) => CreateCourseAction(e.name, gradeId.toString()),
    onSuccess: (ok) => {
      if (ok) {
        tagRevalidate(coursesTag);
        reset();
      }
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: number) => DeleteCourseAction(id, gradeId.toString()),
    onMutate: (id: number) => setLoadingId(id),
    onSuccess: (ok) => {
      setLoadingId(null);
      if (ok) {
        tagRevalidate(coursesTag);
      }
    },
  });

  console.log(errors, isPending);
  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        type="button"
        className="btn btn-success ml-44 self-end mt-4 btn-outline"
      >
        {fa.bells.addNewClass}
      </Button>
      <Modal open={openModal} setOpen={setOpenModal} id="create-course">
        <form className="text-end" onSubmit={handleSubmit((e) => mutate(e))}>
          <div className="font-bold text-berry100 text-center mb-8">{fa.bells.updateCourses}</div>
          {!!userCourses.length && (
            <div className=" mb-8">
              <div className="text-start text-14 mb-2">{fa.bells.yourClasses}</div>
              <div className="flex flex-wrap gap-2">
                {userCourses.map((k) => (
                  <div
                    key={k.id}
                    className="py-1 flex items-center pl-2 pr-4 rounded-lg text-14 font-light bg-black20"
                  >
                    {k.name}
                    {loadingId === k.id ? (
                      <span className="loading loading-spinner mr-2 loading-sm" />
                    ) : (
                      <i
                        onClick={() => deleteMutate(k.id || 0)}
                        className="icon-close cursor-pointer mr-2 text-24"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <FormInput
            {...{ errors, control }}
            name="name"
            rtl
            rules={{
              required: true,
              validate: (value: string) => !names.includes(value) || fa.global.rules.nameExist,
            }}
            placeholder={fa.bells.addCourseName}
          />
          <Button isLoading={isPending} className="btn btn-primary mt-4">
            {fa.bells.addNewClass}
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddLessonModal;
