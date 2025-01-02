"use client";

import { useState, useEffect } from 'react';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { callingEventServiceAction, callingServiceAction } from '@/app/actions/findEventAction';

import { SelectDropdown } from './SelectDropdownComponent';
import { SelectStatus } from './SelectStatusComponent';

const FilterComponent = () => {
    const [findData, setFindData] = useState();
    const [search, setSearch] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [dropDownValue, setDropDownValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async (event) => {
        event.preventDefault();
        if (search === '' && startTime === '' && endTime === '' && statusValue === '' && dropDownValue === '') {
            setFindData(undefined);
            return;
        }
        setIsLoading(true);
        const searchData = {
            eventName: search,
            startDateTime: startTime ? `${startTime}T12:00:00` : '',
            endDateTime: endTime ? `${endTime}T12:00:00` : '',
            status: statusValue,
            categoryName: dropDownValue
        };
        console.log('Search Data:', searchData);
        const data = await callingEventServiceAction(searchData);
        console.log(data, 'check data in search')
        
        // Filter events based on dropDownValue (categoryName)
        const filteredData = data.payload?.map(category => ({
            ...category,
            events: category.events.filter(event => event.categoryName === dropDownValue)
        }));

        setFindData(filteredData);
        setIsLoading(false);
    };

    const getDropDownValue = (v) => setDropDownValue(v);
    const getStatusValue = (v) => setStatusValue(v);

    useEffect(() => {
        const allInputsEmpty = [
            search,
            startTime,
            endTime,
            statusValue,
            dropDownValue
        ].every(value => value === '');

        if (allInputsEmpty) {
            setFindData(undefined);
        }
    }, [search, startTime, endTime, statusValue, dropDownValue]);

    return (
        <div>
            <form onSubmit={fetchData}>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <SelectDropdown func={getDropDownValue} />
                    <SelectStatus func={getStatusValue} />
                    <div className="mb-5">
                        <label
                            htmlFor="start-date"
                            className="text-sm font-semibold text-primary-text block mb-2 "
                        >
                            Start Date
                        </label>
                        <input
                            onChange={(e) => setStartTime(e.target.value)}
                            type="date"
                            name="startDate"
                            id="startDate"
                            className="border text-primary-text sm:text-sm rounded-3xl block w-full p-3 focus:outline-none"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="end-date"
                            className="text-sm font-semibold text-primary-text block mb-2 "
                        >
                            End Date
                        </label>
                        <input
                            onChange={(e) => setEndTime(e.target.value)}
                            type="date"
                            name="endDate"
                            id="endDate"
                            className="border text-primary-text sm:text-sm rounded-3xl block w-full p-3 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="relative z-3 lg:mb-5 flex justify-center w-full gap-5">
                    <div className="flex grid-cols-2 w-4/5">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            htmlFor="search"
                            className=" input input-bordered border-[1px] pl-10 text-primary-text hover:border-gray-400  rounded-full w-full h-11 "
                            id="search"
                            name="search"
                            type="text"
                            placeholder="Search..."
                        />
                        <div className="absolute left-0 inset-y-0 flex items-center ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 ml-3 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <button className="bg-purple-text w-1/5 rounded-full text-white h-auto flex justify-center text-center items-center">
                        {!isLoading ? <p>Search</p> : <div className="loader"></div>}
                    </button>
                </div>
            </form>
            <section>
                {findData && findData.map((category, index) => (
                    <div key={index} className="m-5 grid justify-center">
                        <div className="card w-11/12 lg:w-[50rem] bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{category.categoryName}</h2>
                                {category.events.length > 0 ? (
                                    category.events.map((event, eventIndex) => (
                                        <div key={eventIndex} className="mb-4">
                                            <h3 className="text-lg font-bold">{event.eventName}</h3>
                                            <p>{event.description}</p>
                                            <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                                            <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No events available for this category.</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default FilterComponent;
