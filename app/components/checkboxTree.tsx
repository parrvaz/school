import React, { useEffect, useId, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdIndeterminateCheckBox } from 'react-icons/md';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { TreeNodeType } from 'app/types/common.type';
import fa from 'app/lib/fa.json';
import { faNumber } from 'app/utils/common.util';
import Modal from './modal';
import Button from './button';

const Tree: React.FC<{
  nodes: TreeNodeType[];
  values: string[];
  label: string;
  className?: string;
  inputLabel?: string;
  length?: number;
  setValues: (item: string[]) => void;
}> = ({ nodes, values, setValues, length, label, className, inputLabel }) => {
  const [checked, setChecked] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const hasError = !values.length;
  const id = useId();

  const getLeafNodeValues = (nodes): string[] => {
    const leafValues: string[] = [];

    nodes.forEach((node) => {
      node.children && node.children.length > 0
        ? leafValues.push(...getLeafNodeValues(node.children))
        : leafValues.push(node.value);
    });

    return leafValues;
  };

  useEffect(() => {
    // Initialize all nodes as checked on load
    const allNodeValues = getLeafNodeValues(nodes);
    setChecked(allNodeValues);
    setValues(allNodeValues);
  }, [JSON.stringify(nodes)]);

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className={`${hasError ? 'border-red70' : 'border-black30'} bg-white border relative flex items-center cursor-pointer justify-between disabled:bg-black10 disabled:text-black40 h-10 w-full rounded-lg pr-4 font-regular text-13 text-black70 outline-none transition-shadow duration-500 ${className}`}
      >
        <div className="absolute font-bold text-black70 text-11 right-2 -top-4">{label}</div>
        <div className="">
          {faNumber(length || values.length)} {inputLabel || fa.global.student}
        </div>
        <i className="icon-down-outlined text-18 pl-3" />
        {hasError && (
          <div className="absolute right-2 text-11 font-light -bottom-4 text-red70">
            {fa.global.rules.required}
          </div>
        )}
      </div>

      <Modal mustConfirm open={openModal} setOpen={setOpenModal} id={'tree' + id}>
        <div className="text-center font-bold text-16 mb-3">{label}</div>
        <CheckboxTree
          nodes={nodes}
          checked={checked}
          expanded={expanded}
          onCheck={(newChecked) => setChecked(newChecked)}
          onExpand={(newExpanded) => setExpanded(newExpanded)}
          icons={{
            check: <MdCheckBox className="text-berry70 !w-6 h-6 text-20" />,
            uncheck: <MdCheckBoxOutlineBlank className="text-berry70 !w-6 h-6 text-20" />,
            halfCheck: <MdIndeterminateCheckBox className="text-berry70 !w-6 h-6 text-20" />,
            expandClose: <FaChevronRight className="text-16 text-black70" />,
            expandOpen: <FaChevronDown className="text-16 text-black70" />,
          }}
        />

        <div className="flex justify-end gap-3">
          <Button
            onClick={() => {
              setOpenModal(false);
              setChecked(values);
            }}
            className="btn btn-outline btn-error"
          >
            {fa.global.cancel}
          </Button>
          <Button
            onClick={() => {
              setOpenModal(false);
              setValues(checked);
            }}
            className="btn w-20 btn-primary"
          >
            {fa.global.approve}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Tree;
