'use client'

import { useEffect, useState } from "react";
import { RedirectBackComponent } from "../../_componenets/RedirectButtonComponent"

import { useForm } from "react-hook-form"
import { getFormAction } from "@/actions/landingAction";
import { Boolean } from "@/app/(dashboard)/_components/FieldsType/Boolean";
import { InputField } from "@/app/(dashboard)/_components/InputField";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { addAttendeeToEventAction } from "@/actions/eventAction";

const Page = ({ params: { id } }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const notify = (status, detail) => {
        if (status == "OK") {
            toast.success("Your submission has been recorded.", {
                position: "top-center"
            });
        }
        if (status == 400) {
            toast.error(`Your submission has been not recorded., ${detail}`, {
                position: "top-center"
            });
        }
    }

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [registerForm, setRegisterForm] = useState();

    const gen = watch("gender");

    const onSubmit = (data) => {
        console.log(data);
    };

    const getData = async (id) => {
        const res = await getFormAction(id);
        console.log(res, 'checking form')
        setRegisterForm(res?.payload?.data?.form)
    }

    const submit = async (v) => {
        v.preventDefault();
        setLoading(true)
        const formData = new FormData(v.target);
        const data = {};
        let allFieldsFilled = true; // Flag to check if all fields are filled

        formData.forEach((value, key) => {
            const trimmedKey = key.toLowerCase().replace(/\s+/g, '');
            data[trimmedKey] = value;

            // Check if any field is empty
            if (!value) {
                allFieldsFilled = false;
            }
        });

        console.log(data, 'checking from form');
        console.log(formData);

        // If any field is empty, do not proceed with the API call
        if (!allFieldsFilled) {
            console.log('All fields must be filled');
            setLoading(false)
            notify(400, "make sure you have fill each information.");
            return;
        }

        router.push('/');
        const sendData = {
            data: data,
            eventId: id
        };
        const res = await addAttendeeToEventAction(sendData);
        console.log(sendData, 'checking send data');
        console.log(res, 'checking res after send api');

        setLoading(false)
        setTimeout(() => {
            notify('OK');
        }, 300);
    };

    useEffect(() => {
        getData(id)
    }, [])

    console.log('checking form data', registerForm)
    return (
        <div className="container">
            <RedirectBackComponent link={'/'} />
            <div className="p-6 rounded-3xl border-2 border-slate-100 bg-white drop-shadow-sm">
                <h2 className="font-bold text-2xl mb-8">Register Form</h2>
                <form action="" className="space-y-4 lg:space-y-6" onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-8">
                        {registerForm?.map((x, index) => {
                            const [inputType, inputName] = x.fieldType.split(",");
                            return (
                                <>
                                    {inputType == 'boolean' ?
                                        <Boolean name={inputName} />
                                        :
                                        <InputField key={index} type={inputType} name={inputName} />
                                    }
                                </>
                            )
                        })}
                    </div>
                    <div className="w-full flex justify-end">
                        <button type="submit" className="rounded-full w-32 flex justify-center text-sm lg:text-base px-8 py-3 bg-purple-text text-white font-bold">
                            <p className={`${!loading ? 'block' : 'hidden'}`}>Submit</p>
                            <div className={`loader ${loading ? 'block' : 'hidden'}`}></div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page