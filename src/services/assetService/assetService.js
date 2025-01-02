import { headerToken } from "@/app/api/auth/headerToken";
//get all service
export const getAllAssetService = async (page) => {
//  console.log("page nn", page);
  const header = await headerToken() ;
  const res = await fetch(
    `${process.env.API_URL}assets?offset=${page ? page : 1}&limit=8`,
    {
      next: { tags: ["asset"] },
      headers: header,
    }
  );
  const assetData = await res.json();
  return assetData;
};

export const getAllAssetServiceNoPage = async () => {
  const header = await headerToken() ;
  const res = await fetch(
    `${process.env.API_URL}assets`,
    {
      next: { tags: ["asset"] },
      headers: header,
    }
  );
  const assetData = await res.json();
  return assetData;
};
//insert Asset
export const insertAssetService = async (newAsset) => {
  // console.log("data of asset is ", JSON.stringify(newAsset));
  const header = await headerToken();
  const res = await fetch(`${process.env.API_URL}assets/create`, {
    method: "POST",
    headers: header,
    body: JSON.stringify(newAsset),
  });
  const data = await res.json();
  return data;
};

//delete asset by id
export const deleteAssetService = async (id) => {
  const header = await headerToken();
  const res = await fetch(`${process.env.API_URL}assets/delete/${id}`, {
    method: "DELETE",
    headers: header,
  });
  const data1 = await res.json();
  return data1;
};

//update asset
export const updateAssetService = async (id, newAsset) => {
  const header = await headerToken();
  const res = await fetch(`${process.env.API_URL}assets/update/${id}`, {
    method: "PUT",
    headers: header,
    body: JSON.stringify(newAsset),
  });
  const data = await res.json();
  return data;
};

//search asseet by name
export const searchAssetByName = async (name,page) => {
  const header = await headerToken();
  const res = await fetch(
    `${process.env.API_URL}assets/search?name=${name}&offset=${page ? page : 1}&limit=8`,
    {
      next: { tags: ["asset"] },
      headers: header,
    }
  );
  const data = await res.json();
  return data;
};
