import { useForm } from 'react-hook-form';
import React, { memo } from 'react';
import Modal from 'app/components/modal';
import fa from 'app/lib/fa.json';
import FormInput from 'app/components/formInput';
import Button from 'app/components/button';

const PlanNameModal: React.FC<{
  names: string[];
  id: number | null;
  setId: (id: number | null) => void;
  onSetName: (name: string, id: number | null) => void;
}> = ({ id, setId, onSetName, names }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<{ name: string }>({ defaultValues: { name: '' } });
  const handleClose = (name?: string): void => {
    name && onSetName(name, id);
    setId(null);
    reset();
  };
  return (
    <Modal open={!!id} setOpen={() => handleClose()} id="plan-name">
      <div className="font-regular text-16 mb-6">{fa.plan.newPlanName}</div>
      <form onSubmit={handleSubmit(({ name }) => handleClose(name))}>
        <FormInput
          {...{ errors, control }}
          name="name"
          rules={{
            required: true,
            validate: (value: string) => !names.includes(value) || fa.global.rules.planExist,
          }}
          rtl
          placeholder={fa.plan.newName}
        />

        <div className="flex justify-end mt-4">
          <Button className="btn btn-primary">{fa.global.approve}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default memo(PlanNameModal);
