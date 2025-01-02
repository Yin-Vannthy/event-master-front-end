"use client";

import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import CardEventComponent from "./CardEventComponent";

export default function SearchComponent({ eventData }) {
  const [text, setText] = useState('');
  const [query] = useDebounce(text, 750);
  const [filteredEvents, setFilteredEvents] = useState(eventData);

  useEffect(() => {
    if (query) {
      setFilteredEvents(eventData.filter(event =>
        event.eventName.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFilteredEvents(eventData);
    }
  }, [query, eventData]);

  return (
    <>
      <div className="relative z-3 mb-8">
        <div className="w-full">
          <input
            type="text"
            onChange={e => setText(e.target.value)}
            placeholder="Search"
            className="font-medium text-xs lg:text-base focus:outline-none focus:border-purple-text w-full h-12 border rounded-3xl pl-10"
          />
          <IoSearchOutline className="w-[24px] h-[24px] -mt-9 ml-3" />
        </div>
      </div>

      <CardEventComponent eventData={filteredEvents} />
    </>
  );
}

