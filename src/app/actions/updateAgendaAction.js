'use server';
import { revalidateTag } from "next/cache";
import { UpdateAgendaService } from "@/services/dashboard/agenda.service";

async function updateAgenda(agendaData, id) {
  const data = await UpdateAgendaService(agendaData, id);
  revalidateTag("agenda");
  return data;
}

export default updateAgenda;
