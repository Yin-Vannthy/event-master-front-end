import { headerToken } from "@/app/api/auth/headerToken";
export const getAttendeeByEventIdService = async (eventId, page) => {
  const header = await headerToken();
  const res = await fetch(
    `${process.env.API_URL}attendees/${eventId}?offset=${
      page ? page : 1
    }&limit=8`,
    {
      cache: "no-store",
      headers: header,
    }
  );
  const data = await res.json();
  // console.log("data:", data);
  return data;
};
export const DeleteAttendeeService = async (attendeeId) => {
  const header = await headerToken();
  const res = await fetch(`${process.env.API_URL}attendees/${attendeeId}`, {
    next: { tags: ["attendee"] },
    method: "DELETE",
    headers: header,
  });
  const data = await res.json();
  return data;
};

export const searchAttendeeByNameOrPhoneService = async (
  id,
  attendeeNameOrPhone
) => {
  const header = await headerToken();
  const res = await fetch(
    `${process.env.API_URL}attendees/search?eventId=${id}&attendeeNameOrPhone=${attendeeNameOrPhone}`,
    {
      method: "GET",
      headers: header,
      next: { tags: ["attendee"] },
    }
  );
  const data = await res.json();
  return data;
};
export const getRegistrationFormService = async (eventId) => {
  console.log("eventId:>>>>>", eventId);
  const header = await headerToken();
  const res = await fetch(
    `${process.env.API_URL}events/registration-form/${eventId}`,
    // http://34.124.203.109:8081/api/events/registration-form/62
    {
      method: "GET",
      headers: header,
    }
  );
  const data = await res.json();
  return data;
};

// export const getRegistrationForm = async (eventId) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/events/registration-form/${eventId}`);
//     return response.data; // Assuming this returns JSON with form fields
//   } catch (error) {
//     console.error('Error fetching registration form:', error);
//     throw error;
//   }
// };
