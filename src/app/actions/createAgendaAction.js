'use server';
import { revalidateTag } from "next/cache";
import { CreateAgendaService } from "@/services/dashboard/agenda.service";

async function createAgenda(agendaData,id) {
  revalidateTag('agendas');
  const data = await CreateAgendaService(agendaData,id);
  return data;
}

export default createAgenda;
