'use server';

import { DeleteAgendaService } from "@/services/dashboard/agenda.service";


async function deleteAgenda(id) {
  try {
    const data = await DeleteAgendaService(id)
    return data;
  } catch (error) {
    console.error("Error in deleteAgenda action:", error);
    throw error;
  }
}

export default deleteAgenda;
