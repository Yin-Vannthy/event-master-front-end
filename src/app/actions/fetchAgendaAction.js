'use server';
import { revalidateTag } from "next/cache";
import { getAgendaByEventId } from "@/services/dashboard/agenda.service";


async function fetchAgenda(id) {
const data = await getAgendaByEventId(id);
revalidateTag('agendas');
  return data;
}

export default fetchAgenda;