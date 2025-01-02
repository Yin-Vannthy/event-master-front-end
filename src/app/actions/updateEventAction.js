"use server";

import { updateEventService } from "@/services/dashboard/eventService";
import { createEventService } from "@/services/dashboard/overviewService";
import { revalidateTag } from "next/cache";
import { eventNames } from "process";

export async function handleEvent(data) {
  console.log("data", data);
  const submitData = {
    eventName: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    duration: diffChange,
    address: data.address,
    poster: `${url}~.png`,
    isPost: isPublic,
    maxAttendee: data.maxAttendee,
    categoryId: cateId
  };
  console.log("event", name);
  await createEventService(submitData);
  revalidateTag("events");
}
//update
export async function handleUpdateEvent(eventId, submitData) {
  const updateEventData = {
    poster: `${url}~.png`,
    eventName: submitData.eventName,
    categoryId: cateId,
    startDate: submitData.startDate,
    endDate: submitData.endDate,
    duration: diffChange,
    maxAttendee: submitData.maxAttendee,
    address: submitData.address,
    description: submitData.description,
    isPost: isPublic
    
  };
  await updateEventService(eventId, updateEventData);
  revalidateTag("events");
}