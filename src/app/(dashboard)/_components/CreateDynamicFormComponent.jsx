"use client";

import { NumberField } from "./Fields/NumberField";
import { TextField } from "./Fields/TextField";
import { Title } from "./Title";
import { BooleanField } from "./Fields/BooleanField";
import { EmailField } from "./Fields/EmailField";
import { useEffect, useState } from "react";
import Image from "next/image";
import { DateField } from "./Fields/DateField";
import { getEventFormAction, updateEventFormAction } from "@/actions/eventAction";
import { InputCreate } from "./FieldsType/InputCreate";
import { toast } from "react-toastify";
import { BooleanCreate } from "./FieldsType/BooleanCreate";
import React from "@heroicons/react";

export const CreateDynamicForm = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [viewField, setViewField] = useState(null);
  const [choosedField, setChoosedField] = useState([]);
  const [confirmField, setConfirmField] = useState([
    { fieldType: "name,Full Name" },
    { fieldType: "number,Phone Number" }
  ]);
  const [addFieldNamePopup, setAddFieldNamePopup] = useState(false);
  const [fieldName, setFieldName] = useState('');

  // Set data to view before confirm add btn
  const parentFunc = (x) => {
    setViewField(x);
  };

  // Confirm field we need 
  const handleAddClick = () => {
    if (viewField != null) setAddFieldNamePopup(true);
  };

  // Confirm fields, form and create form 
  const handleFinishClick = () => {
    if (choosedField.length !== 0) {
      setConfirmField((prev) => [...prev, ...choosedField]);
      setChoosedField([]);
      setPopUp(false);
    }
  };

  // Another popup
  const handleResetPopup = () => {
    setAddFieldNamePopup(false);
  };

  const handleAddFieldName = () => {
    const newField = {
      fieldType: `${viewField},${fieldName}`
    };
    if (fieldName !== '') {
      if (viewField != null) {
        setConfirmField((prev) => [...prev, newField]);
        setChoosedField((prev) => [...prev, newField]);
      }
    }
    setViewField(null);
    setFieldName('');
    setAddFieldNamePopup(false);
    setPopUp(false);
  };

  const notify = (status, detail) => {
    if (status === "OK") {
      toast.success("Form has been created successfully", {
        position: "top-center"
      });
    } else if (status === 400) {
      toast.error(`Can't create form, ${detail}`, {
        position: "top-center"
      });
    }
  };

  const handleCreateForm = async (id) => {
    setLoading(true);
    const pushData = {
      data: {
        form: confirmField
      }
    };
    const res = await updateEventFormAction(pushData, id);
    notify(res?.status);
    setChoosedField([]);
    setLoading(false);
  };

  const getFormData = async (id) => {
    const res = await getEventFormAction(id);
    setConfirmField(res?.payload?.data?.form || []);
  };

  const handleRemove = (index) => {
    console.log('checking after remove', confirmField)
    console.log('checking index', index)
    setConfirmField((prev) => prev.filter((x, i) => i !== index));
    setChoosedField(confirmField)
    toast.info(`Removed item ${index + 1}`, {
      position: "top-center"
    });
    console.log('checking after remove', confirmField)
  };

  useEffect(() => {
    getFormData(id);
  }, []);

  console.log('checking outsite', confirmField)

  return (
    <>
      <div className="space-y-6">
        <div className="p-5 w-full rounded-3xl h-[33%] bg-white shadow-soft">
          <div className="text-primary-text font-semibold text-xl flex mb-4 content-center gap-2 ">
            <div className="content-center">
              <img
                src="https://em-content.zobj.net/source/microsoft-teams/337/card-index_1f4c7.png"
                alt=""
                className="h-4"
              />
            </div>
            <p>Contact Information</p>
          </div>
          <div className="grid gap-4 mt-5 ">
            <div className="grid grid-cols-2 gap-4">
              {confirmField.map((x, index) => {
                const [inputType, inputName] = x.fieldType.split(",");
                return (
                  <>
                    {inputType === 'boolean' ? (
                      <BooleanCreate name={inputName} id={index} func={handleRemove} />
                    ) : (
                      <InputCreate key={index} id={index} type={inputType} name={inputName} func={handleRemove} />
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4 justify-end mt-6">
            <button onClick={() => setPopUp(true)} className="rounded-2xl w-32 border-purple-text border-[1px] text-purple-text font-semibold antialiased py-3 h-full">
              Add field
            </button>
            {choosedField.length !== 0 && (
              <button onClick={() => handleCreateForm(id)} className="rounded-2xl w-32 border-purple-text border-[1px] text-white bg-purple-text font-semibold antialiased py-3 h-full flex justify-center">
                <p className={`${!loading ? 'block' : 'hidden'}`}>Save</p>
                <div className={`loader ${loading ? 'block' : 'hidden'}`}></div>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* popup form */}
      <div className={`${!popUp ? `hidden` : `flex`} fixed top-0 left-0 h-full w-full bg-black/25 backdrop-blur-sx flex-col justify-center items-center z-50`}>
        {/* add field form  */}
        <div className={`${!addFieldNamePopup ? `block` : `hidden`} bg-white w-1/2 h-auto py-6 px-8 rounded-3xl mx-auto space-y-6`}>
          <div className="flex justify-between">
            <Title title={"Choose field for your form"} />
            <svg onClick={() => setPopUp(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <TextField parentFunc={parentFunc} />
            <NumberField parentFunc={parentFunc} />
            <DateField parentFunc={parentFunc} />
            <BooleanField parentFunc={parentFunc} />
            <EmailField parentFunc={parentFunc} />
          </div>
          <hr />
          <div className="space-x-3 flex justify-end">
            <button onClick={() => handleAddClick()} className="flex items-center justify-center gap-2 rounded-2xl w-32 bg-purple-text text-white py-3">
              <Image src="/icons/add.svg" alt="Add Icon" width={20} height={20} priority />
              Add
            </button>
          </div>
        </div>
        {/* pop up add field name  */}
        <div className={`${addFieldNamePopup ? `block` : `hidden`} bg-white w-2/5 h-auto py-6 px-8 rounded-2xl mx-auto space-y-6 z-50`}>
          <div className="flex justify-between">
            <Title title={"Add name for your chosen field"} />
            <svg onClick={() => handleResetPopup()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <input
              onChange={(e) => setFieldName(e.target.value)}
              value={fieldName}
              type="text"
              className="bg-gray-50 px-4 py-2 rounded-2xl border border-slate-200 focus:outline-none w-full"
            />
          </div>
          <div className="space-x-3 flex justify-end">
            <button onClick={() => handleAddFieldName()} className="px-4 py-3 flex items-center gap-2 rounded-2xl bg-[#038446] duration-300 text-white">
              <Image src="/icons/edit.svg" alt="Add Icon" width={20} height={20} priority />
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
