"use server";
import {
  getAllAssetService,
  insertAssetService,
  updateAssetService,
  getAllAssetServiceNoPage
} from "@/services/assetService/assetService";
import { revalidateTag } from "next/cache";
import { deleteAssetService } from "@/services/assetService/assetService";

//insert asset
export async function handleAsset(assetInput) {
  const newAsset = {
    assetName: assetInput.assetName,
    qty: assetInput.qty,
    unit: assetInput.unit,
  };
  const data = await insertAssetService(newAsset);
  
 // console.log("return insert asset:",data);
  revalidateTag("asset");
  
  return data;
}
export const getAllAssetAction = async (page) => {
//console.log('pages:',page);
    const data = await getAllAssetService(page);
    revalidateTag('overview');
    return data;
}
//update
export async function handleUpdateAsset(id, newAsset) {
  const editAsset = {
    assetName: newAsset.assetName,
    qty: newAsset.qty,
    unit: newAsset.unit,
  };
  await updateAssetService(id, editAsset);
  revalidateTag("asset");
}

//handle delete asset
export async function handleDeleteAsset(id) {
  await deleteAssetService(id);
  revalidateTag("asset");
}

export const getAllAssetNoPageAction = async () => {
      const data = await getAllAssetServiceNoPage();
      revalidateTag('asset');
      return data
  }
