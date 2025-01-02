'use server';

import { createEventService } from "@/services/dashboard/eventService";
import { revalidateTag } from "next/cache";
import { createEventService } from '@/services/dashboard/event.service';

async function createAgenda(eventData,id) {
  const data = await createEventService(eventData,id);
  revalidateTag('events');
  return data;
}

export default createAgenda;