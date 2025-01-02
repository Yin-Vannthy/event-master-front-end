"use server";
import { CreateMultipleMaterialService } from "@/services/dashboard/materialService";
import { revalidateTag } from "next/cache";

async function CreateMultipleMaterial(materialData) {
  // console.log("data in action is",materialData)

  const data = await CreateMultipleMaterialService(materialData);
  revalidateTag("materials");
  return data;
}

export default CreateMultipleMaterial;
