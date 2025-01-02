"use server"
import { headerToken } from "@/app/api/auth/headerToken";

export const getAgendaByEventId = async (id) => {
  try {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}agendas/${id}`, {
      next: { tags: ['agendas'] },
      cache: "no-store",
      headers: header
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching the agenda data:", error);
  }
};


export const CreateAgendaService = async (data, id) => {
  try {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}agendas/${id}`, {
      next: { tags: ['agendas'] },
      method: "POST",
      headers: header,
      body: JSON.stringify({
        data,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw `Error: ${errorText}`;
    }

    const dataAgenda = await res.json();
    return dataAgenda;
  } catch (error) {
    console.error("There was an error creating the agenda:", error);
    throw error;
  }
};

export const DeleteAgendaService = async (id) => {
  try {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}agendas/${id}`, {
      next: { tags: ['agendas'] },
      method: "DELETE",
      headers: header,
    });
    const data = await res.json();
    console.log("Data reponse agenda service ", data);
    return data;
  } catch (err) {
    console.log("error agenda service", err);
  }
};

export const UpdateAgendaService = async (data, id) => {
  try {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}agendas/${id}`, {
      method: "PUT",
      next: { tags: ['agendas'] },
      headers: header,
      body: JSON.stringify({
        data,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw `Error: ${errorText}`;
    }

    const dataAgenda = await res.json();
    return dataAgenda;
  } catch (error) {
    console.error("There was an error updating the agenda:", error);
    throw error;
  }
};