'use server'

import { headerToken } from "@/app/api/auth/headerToken";

export const updateOrganization = async (id, organizationData) => {
  const header = await headerToken();
  const response = await fetch(
    `${process.env.API_URL}profiles/update-organization/${id}`,
    {
      method: "PUT",
      headers: header,
      body: JSON.stringify(organizationData),
    }
  );
  const test = await response.json()
  console.log('checking', test)
  return test;
};
