'use client'

import { DeleteButton } from "./Action/DeleteButton";
import CreateAgendaButton from "./Action/CreateAgendaButton";
import { UpdateAgendaButton } from "./UpdateAgendaButton";
import { useEffect, useState } from "react";
import fetchAgenda from "@/app/actions/fetchAgendaAction";


const convertTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  hours = parseInt(hours, 10);
  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert hour '0' to '12'
  return `${hours}:${minutes.padStart(2, "0")} ${period}`;
};

export default function AgendaComponent({id}) {
  // console.log('the id of event is ',id)
  const [data, setData] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const fetchData = async () => {
    const res = await fetchAgenda(id);
    setData(res?.payload?.data?.agenda);
  };


  useEffect(() => {
    fetchData();
  }, [saveSuccess, updateSuccess, deleteSuccess]);

  const handleSaveSuccess = (success) => {
    setSaveSuccess(success);
  };

  const handleUpdateSuccess = (success) => {
    setUpdateSuccess(success);
  };

  const handleDeleteSuccess = (success) => {
    setDeleteSuccess(success);
  };

  

  if (data == null) {
    return (
      <div className="mb-5 mt-10">
        <div className="flex justify-between align-middle content-center mb-4 ">
          <div className="flex items-center justify-center">
            <p className="text-primary-text font-semibold text-2xl">
              Agenda Management
            </p>
          </div>
          <CreateAgendaButton id={id} onSaveSuccess={handleSaveSuccess} />
        </div>

        <div className=" justify-center w-full content-center space-y-6 py-24">
          <div className="justify-center flex items-center">
            <svg
              width="122"
              height="98"
              viewBox="0 0 122 98"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.6443 2.48995C17.7058 0.681937 15.4794 -0.0229682 13.6714 0.915495C11.8634 1.85396 11.1584 4.08041 12.0969 5.88842L15.5925 12.623C16.531 14.431 18.7575 15.1359 20.5655 14.1974C22.3735 13.259 23.0784 11.0325 22.1399 9.22452L18.6443 2.48995ZM14.9613 3.40066C15.3968 3.17461 15.9331 3.3444 16.1591 3.77989L19.6548 10.5145C19.8808 10.95 19.711 11.4862 19.2755 11.7123C18.84 11.9383 18.3038 11.7685 18.0777 11.333L14.5821 4.59848C14.356 4.16299 14.5258 3.6267 14.9613 3.40066ZM27.9072 18.5879C23.268 18.5879 19.5072 22.3488 19.5072 26.9879V85.9328C19.5072 90.572 23.268 94.3328 27.9072 94.3328H83.9072C88.5463 94.3328 92.3072 90.5719 92.3072 85.9328V76.8412C86.4487 73.4523 82.5071 67.1181 82.5071 59.8633C82.5071 52.6086 86.4487 46.2744 92.3072 42.8855V26.9879C92.3072 22.3487 88.5463 18.5879 83.9072 18.5879H78.1624V20.7116C78.1624 24.5776 75.0284 27.7116 71.1624 27.7116H43.4521C39.5861 27.7116 36.4521 24.5776 36.4521 20.7116V18.5879H27.9072ZM95.1071 41.5503V26.9879C95.1071 20.8023 90.0927 15.7879 83.9072 15.7879H65.505C64.5542 12.1488 61.2444 9.46333 57.3073 9.46333C53.3702 9.46333 50.0603 12.1488 49.1095 15.7879H27.9072C21.7216 15.7879 16.7072 20.8024 16.7072 26.9879V85.9328C16.7072 92.1183 21.7216 97.1328 27.9072 97.1328H83.9072C90.0927 97.1328 95.1071 92.1183 95.1071 85.9328V78.1764C97.2811 79.0078 99.6409 79.4633 102.107 79.4633C112.932 79.4633 121.707 70.6881 121.707 59.8633C121.707 49.0385 112.932 40.2633 102.107 40.2633C99.6409 40.2633 97.2811 40.7188 95.1071 41.5503ZM1.1901 13.4923C2.10119 11.6704 4.31676 10.932 6.13872 11.8431L12.9252 15.2368C14.7472 16.1479 15.4856 18.3635 14.5745 20.1854C13.6634 22.0074 11.4478 22.7458 9.62586 21.8347L2.83935 18.441C1.0174 17.5299 0.279001 15.3143 1.1901 13.4923ZM4.88639 14.3474C4.44754 14.128 3.91388 14.3058 3.69443 14.7447C3.47497 15.1835 3.65283 15.7172 4.09168 15.9366L10.8782 19.3303C11.317 19.5498 11.8507 19.3719 12.0702 18.9331C12.2896 18.4942 12.1118 17.9606 11.6729 17.7411L4.88639 14.3474ZM49.3898 46.7561C49.3898 44.8231 50.9568 43.2561 52.8898 43.2561H76.6898C78.6228 43.2561 80.1898 44.8231 80.1898 46.7561C80.1898 48.6891 78.6228 50.2561 76.6898 50.2561H52.8898C50.9568 50.2561 49.3898 48.6891 49.3898 46.7561ZM52.8898 59.6459C50.9568 59.6459 49.3898 61.213 49.3898 63.1459C49.3898 65.0789 50.9568 66.6459 52.8898 66.6459H76.6898C78.6228 66.6459 80.1898 65.0789 80.1898 63.1459C80.1898 61.213 78.6228 59.6459 76.6898 59.6459H52.8898ZM52.1898 63.1459C52.1898 62.7593 52.5032 62.4459 52.8898 62.4459H76.6898C77.0764 62.4459 77.3898 62.7593 77.3898 63.1459C77.3898 63.5325 77.0764 63.8459 76.6898 63.8459H52.8898C52.5032 63.8459 52.1898 63.5325 52.1898 63.1459ZM49.3898 80.2836C49.3898 78.3506 50.9568 76.7836 52.8898 76.7836H76.6898C78.6228 76.7836 80.1898 78.3506 80.1898 80.2836C80.1898 82.2166 78.6228 83.7836 76.6898 83.7836H52.8898C50.9568 83.7836 49.3898 82.2166 49.3898 80.2836ZM52.8898 79.5836C52.5032 79.5836 52.1898 79.897 52.1898 80.2836C52.1898 80.6702 52.5032 80.9836 52.8898 80.9836H76.6898C77.0764 80.9836 77.3898 80.6702 77.3898 80.2836C77.3898 79.897 77.0764 79.5836 76.6898 79.5836H52.8898ZM33.7478 45.501C33.7478 43.1814 35.628241.301 37.9478 41.301H40.1685C42.4881 41.301 44.3685 43.1814 44.3685 45.501V47.7217C44.3685 50.0413 42.4881 51.9217 40.1685 51.9217H37.9478C35.6282 51.9217 33.7478 50.0413 33.7478 47.7217V45.501ZM37.9478 57.6909C35.6282 57.6909 33.7478 59.5713 33.7478 61.8909V64.1116C33.7478 66.4312 35.6282 68.3116 37.9478 68.3116H40.1685C42.4881 68.3116 44.3685 66.4312 44.3685 64.1116V61.8909C44.3685 59.5713 42.4881 57.6909 40.1685 57.6909H37.9478ZM36.5478 61.8909C36.5478 61.1177 37.1746 60.4909 37.9478 60.4909H40.1685C40.9417 60.4909 41.5685 61.1177 41.5685 61.8909V64.1116C41.5685 64.8848 40.9417 65.5116 40.1685 65.5116H37.9478C37.1746 65.5116 36.5478 64.8848 36.5478 64.1116V61.8909ZM33.7478 79.0286C33.7478 76.709 35.6282 74.8286 37.9478 74.8286H40.1685C42.4881 74.8286 44.3685 76.709 44.3685 79.0286V81.2493C44.3685 83.5688 42.4881 85.4493 40.1685 85.4493H37.9478C35.6282 85.4493 33.7478 83.5688 33.7478 81.2493V79.0286ZM37.9478 77.6286C37.1746 77.6286 36.5478 78.2554 36.5478 79.0286V81.2493C36.5478 82.0225 37.1746 82.6493 37.9478 82.6493H40.1685C40.9417 82.6493 41.5685 82.0225 41.5685 81.2493V79.0286C41.5685 78.2554 40.9417 77.6286 40.1685 77.6286H37.9478ZM85.3072 59.8633C85.3072 50.5849 92.8288 43.0633 102.107 43.0633C111.386 43.0633 118.907 50.5849 118.907 59.8633C118.907 69.1417 111.386 76.6633 102.107 76.6633C92.8288 76.6633 85.3072 69.1417 85.3072 59.8633ZM98.6071 50.7633C98.6071 48.8303 100.174 47.2633 102.107 47.2633C104.04 47.2633 105.607 48.8303 105.607 50.7633V59.1633C105.607 61.0963 104.04 62.6633 102.107 62.6633C100.174 62.6633 98.6071 61.0963 98.6071 59.1633V50.7633ZM102.107 50.0633C101.721 50.0633 101.407 50.3767 101.407 50.7633V59.1633C101.407 59.5499 101.721 59.8633 102.107 59.8633C102.494 59.8633 102.807 59.5499 102.807 59.1633V50.7633C102.807 50.3767 102.494 50.0633 102.107 50.0633ZM102.107 72.4633C100.174 72.4633 98.6071 70.8963 98.6071 68.9633C98.6071 67.0303 100.174 65.4633 102.107 65.4633C104.04 65.4633 105.607 67.0303 105.607 68.9633C105.607 70.8963 104.04 72.4633 102.107 72.4633ZM101.407 68.9633C101.407 69.3499 101.721 69.6633 102.107 69.6633C102.494 69.6633 102.807 69.3499 102.807 68.9633C102.807 68.5767 102.494 68.2633 102.107 68.2633C101.721 68.2633 101.407 68.5767 101.407 68.9633Z"
                fill="#5305E3"
              />
            </svg>
          </div>
          <p className=" text-center text-xl font-semibold  text-primary-text">
            You don’t have an agenda form!
          </p>
          <p className=" text-center text-xl font-medium  text-gray-500">
            Please create agenda form For attendees to join event!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-5 mt-10">
      <div className="flex justify-between align-middle content-center mb-5">
        <div className="flex items-center justify-center">
          <p className="text-primary-text font-semibold text-2xl">
            Agenda Management
          </p>
        </div>
        <div className="lg:space-x-4 sm:grid-cols-1 sm:space-x-0 md:grid-cols-2 lg:grid-cols-2 flex">
        <DeleteButton id={id} onDeleteSuccess={handleDeleteSuccess} />
            <UpdateAgendaButton id={id} onUpdateSuccess={handleUpdateSuccess} />
        
        </div>
      </div>
      {data?.map((data, index) => (
        <div key={index} className="space-y-4 ">
          <div
            className={`border h-auto py-4 px-4 rounded-3xl flex gap-5 ${index % 2 === 1 ? "bg-blue-0" : "bg-gray-100"
              }`}
          >
            <div
              className={`bg-red-100 h-auto border-l-[2.6px] ${index % 2 === 1 ? "border-blue-600" : "border-green-600"
                }`}
            ></div>
            <div className="h-auto w-full space-y-2 ">
              <p className="text-base font-regular text-primary-text">{`${convertTo12HourFormat(
                data?.startTime
              )} - ${convertTo12HourFormat(data.endTime)}`}</p>
              <p className="text-xl font-semibold text-primary-text">
                {data?.topic}
              </p>

              {(data?.description || data?.speaker) && (
                <hr className="h-[1px] w-full bg-gray-300" />
              )}
              {data.description && (
                <p className="text-base font-regular text-primary-text">
                  {data?.description}
                </p>
              )}
              {data?.speaker && (
                <p className="text-base font-medium text-primary-text">
                  <span className="font-semibold">Speaker:</span> {data?.speaker}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}