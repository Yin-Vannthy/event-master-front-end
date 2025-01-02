'use server'
import { headerToken } from "@/app/api/auth/headerToken";
import { revalidateTag } from "next/cache";

export const getMaterialById = async (id) => {
  try {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}materials/${id}`, {
      next: { tags: ["materials"] },
      cache: "no-store",
      headers: header,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching the material data:", error);
  }
};

export const getMaterialByEventId = async (id) => {
  // console.log("t")
  try {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}materials/getAll/${id}`, {
      next: { tags: ["materials"] },
      cache: "no-store",
      headers: header,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching the material data:", error);
  }
};

export const countMaterialStatusByEventId = async (id) => {
  try {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}materials/count-status/${id}`, {
      next: { tags: ["materials"] },
      cache: "no-store",
      headers: header,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching the material data:", error);
  }
};

export const CreateMultipleMaterialService = async (data) => {
  try {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}materials/multipleCreate`, {
      next: { tags: ["materials"] },
      method: "POST",
      headers: header,
      body: JSON.stringify(data), // Stringify the data
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw `Error: ${errorText}`;
    }

    const dataMaterial = await res.json();
    return dataMaterial;
  } catch (error) {
    console.error("There was an error creating the material:", error);
    throw error;
  }
};


export const DeleteMaterialService = async (listId) => {
  try {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}materials/deletes`, {
      next: { tags: ["materials"] },
      method: "DELETE",
      headers: header,
      body: JSON.stringify({ 'materialIds': listId }),
    });
    const data = await res.json();
    console.log("Data response material service ", data);
    return data;
  } catch (err) {
    console.log("error material service", err);
  }
};

export const UpdateMaterialService = async (data, id) => {
  try {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}materials/update/${id}`, {
      method: "PUT",
      next: { tags: ["materials"] },
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
    console.error("There was an error updating the materials:", error);
    throw error;
  }
};
// http://34.124.203.109:8081/api/materials/count-status/


