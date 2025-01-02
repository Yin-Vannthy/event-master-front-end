'use server';

import { DeleteMaterialService } from "@/services/dashboard/materialService";


async function deleteMaterialMultiple(listId) {
  try {
    const data = await DeleteMaterialService(listId);
    return data;
  } catch (error) {
    console.error("Error in material action:", error);
    throw error;
  }
}

export default deleteMaterialMultiple;