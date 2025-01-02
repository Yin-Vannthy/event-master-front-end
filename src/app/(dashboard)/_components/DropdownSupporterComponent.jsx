// Child Component: Dropdown.jsx

import { useState, useEffect } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { getAllMemberService } from "@/services/dashboard/memberService";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({ onSupporterChange }) {
  const [selected, setSelected] = useState([]);
  const [memberData, setMemberData] = useState([]);

  const fetchData = async () => {
    const res = await getAllMemberService();
    setMemberData(res?.payload?.map(member => ({
      id: member.memberId,
      name: member.memberName,
      avatar: member.picture || 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=', // Use a placeholder if no picture
    })));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectionChange = (person) => {
    if (selected.some((p) => p.id === person.id)) {
      setSelected(selected.filter((p) => p.id !== person.id));
    } else if (selected.length < 2) {
      setSelected([...selected, person]);
    }
  };

  const removeSelection = (person) => {
    setSelected(selected.filter((p) => p.id !== person.id));
  };

  useEffect(() => {
    if (onSupporterChange && typeof onSupporterChange === 'function') {
      onSupporterChange(selected);
    }
  }, [selected, onSupporterChange]);

  return (
    <Listbox value={selected} onChange={() => {}}>
      {({ open }) => (
        <div className="relative">
          <ListboxButton className="relative h-[42px] cursor-default rounded-xl bg-white pl-2 w-[150px] pr-8 text-left text-black ring-1 ring-inset ring-gray-200 focus:outline-none sm:text-sm sm:leading-6 z-50">
            <span className="flex items-center gap-2">
              {selected.map((person) => (
                <span key={person.id} className="flex items-center gap-2 py-[1px] rounded-xl">
                  <img src={person.avatar} alt="" className="h-5 w-5 ml-1 rounded-full " />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelection(person);
                    }}
                    className="text-gray-500 hover:text-gray-700 mr-1"
                  >
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </span>
              ))}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <Image
                className=""
                src="/icons/dropdown.svg"
                alt="Location"
                width={15}
                height={25}
                priority
              />
            </span>
          </ListboxButton>

          <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <ListboxOptions className="absolute z-50 mt-1 max-h-56 w-52 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {memberData?.map((person) => (
                <ListboxOption
                  key={person.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-blue-400 text-white' : '',
                      !active ? 'text-gray-900' : '',
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    )
                  }
                  value={person}
                  onClick={() => handleSelectionChange(person)}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => handleSelectionChange(person)}
                          className="h-4 w-4 rounded-xl text-blue-500"
                        />
                        <img src={person.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-2 block truncate')}
                        >
                          {person.name}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
