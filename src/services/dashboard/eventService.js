import { headerToken } from "@/app/api/auth/headerToken";

export const getAllEventsService = async () => {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}events?offset=1&limit=1000`,
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
export const getCategoryName = async (cateName) => {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}categories/${cateName}`, {
        next: { tags: ["category"] },
        method: 'GET',
        cache: "no-store",
        headers: header

    }
    );

    const data = await res.json()
    return data
}

export const findEvent = async (searchData) => {
    console.log("searching event in :", searchData);
    const header = await headerToken();
    const handerToken = {
        next: { tags: ["events"] },
        method: 'GET',
        cache: "no-store",
        headers: header

    }
    searchData.categoryId ? console.log('have data') : console.log('no data')
    let res;
    if (searchData.categoryId) {
        res = await fetch(`${process.env.API_URL}events/search?eventName=${searchData.eventName}&categoryId=${searchData.categoryName}&status=${searchData.status}&startDateTime=${searchData.startDateTime !== 'T12:00:00' ? searchData.startDateTime : ''}&endDateTime=${searchData.endDateTime !== 'T12:00:00' ? searchData.endDateTime : ''}, ${handerToken}`)
    } else {
        res = await fetch(`${process.env.API_URL}events/search?eventName=${searchData.eventName}&status=${searchData.status}&startDateTime=${searchData.startDateTime !== 'T12:00:00' ? searchData.startDateTime : ''}&endDateTime=${searchData.endDateTime !== 'T12:00:00' ? searchData.endDateTime : ''}, ${handerToken}`)
    }
    const data = await res.json()
    return data
}

export const deleteEventById = async (eventId) => {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}events/${eventId}`, {
        next: { tags: ["materials"] },
        method: "DELETE",
        headers: header,
    });
    const data = await res.json();
    console.log("Data response event service ", data);
    return data;
}

export const updateEventService = async (id, data) => {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}events/update/${id}`, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(data),
    });
    const dataEvent = await res.json();
    return dataEvent;
};

export const updateEventForm = async (data, id) => {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}events/registration-form/${id}`, {
        method: "PUT",
        headers: header,
        body: JSON.stringify(data),
    });
    const dataEvent = await res.json();
    return dataEvent;
}

export const getEventForm = async (id) => {
    const res = await fetch(`${process.env.API_URL}landing-page/form/${id}`);
    const data = await res.json();
    return data;
}

export const getEventById = async (id) => {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}events/${id}`, {
        headers: header,
    });
    const data = await res.json();
    return data;
}

export const addAttendeeToEvent = async (data) => {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}attendees/create`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(data),
    });
    const val = await res.json();
    return val;
}
