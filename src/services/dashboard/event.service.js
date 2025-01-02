import { headerToken } from "@/app/api/auth/headerToken";

export const getAllEventsService = async () => {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}events`,
        {
            cache: "no-store",
            headers: header
        }
    )
    const data = await res.json();
    return data
}

export const getEventByIdService = async (id) => {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}events/${id}`,
        {
            next: { tags: ['events'] },
            cache: "no-store",
            headers: header
        }
    )
    const data = await res.json();
    return data
}

export const findEvent = async (searchData) => {
    const res = await fetch(`
        ${process.env.API_URL}events/search?&startDateTime=${searchData.startDateTime !== 'T12:00:00' ? searchData.startDateTime : ''}&endDateTime=${searchData.endDateTime !== 'T12:00:00' ? searchData.endDateTime : ''}`,
        {
            cache: "no-store",
            method: 'POST',
        }
    )
    const data = await res.json();
    return data
}

export const createEventService = async (newEvent) => {
    console.log("new event", newEvent)
    const res = await fetch(`${process.env.API_URL}events`,
        {
            next: { tags: 'events' },
            method: "POST",
            body: JSON.stringify(newEvent),
            headers: header
        }
    )
    const data = await res.json();
    return data;
}


export const updateEventService = async (data, id) => {
    try {
        const res = await fetch(`${process.env.API_URL}events/${id}`, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify({
                data
            }),
        })
        if (!res.ok) {
            const errorText = await res.text();
            throw (`Error: ${errorText}`);
        }

        const dataAgenda = await res.json();
        return dataAgenda;
    } catch (error) {
        console.error("There was an error updating the event:", error);
        throw error;
    };
}

export const deleteEventById = async (id) => {
    try {
      const header = await headerToken();
      const res = await fetch(`${process.env.API_URL}events/${id}`, {
        next: { tags: ["materials"] },
        method: "DELETE",
        headers: header,
      });
      const data = await res.json();
      console.log("Data response event service ", data);
      return data;
    } catch (err) {
      console.log("error event service", err);
    }
  };

