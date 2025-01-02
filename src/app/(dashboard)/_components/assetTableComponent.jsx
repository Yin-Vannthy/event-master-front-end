import { EditAssetComponents } from "./EditAssetComponents";
import { DeleteAssetComponent } from "./DeleteAssetComponent";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { jwtDecode } from "jwt-decode";
import { RPaginate } from "./paginate/RPaginate";
import Image from "next/image";
export const AssetTableComponent = async ({ data, nullsearch }) => {
  const session = await getServerSession(authOption);
  let userInfo = jwtDecode(session?.user?.token);
  const userRole = userInfo.role;
  return (
    <div className="flex flex-col w-full">
      <table className="w-full px-1 border-separate border-spacing-y-3 mt-0 ">
        <thead className="h-14 shadow-soft text-primary-text rounded-radiusUi bg-tableBg uppercase">
          <tr className="w-full overflow-auto text-xs lg:text-base px-4">
            <th className="py-3 font-medium px-2 rounded-l-radiusUi">NO</th>
            <th className="py-3 font-medium">ASSET NAME</th>
            <th className="font-medium">QTY</th>
            <th className="font-medium">UNIT</th>
            <th className="font-medium">CREATED AT</th>
            <th
              className={`${
                userRole == "ROLE_USER" && "px-3 rounded-r-radiusUi"
              } font-medium `}
            >
              STATUS
            </th>
            <th
              className={`${
                userRole == "ROLE_USER" && "hidden"
              } font-medium rounded-r-radiusUi px-3 `}
            >
              ACTION
            </th>
          </tr>
        </thead>
        <tbody className="border rounded-radiusUi w-full bg-white ">
          {nullsearch > 0 &&
            data?.payload?.map((asset, index) => (
              <tr
                key={asset.assetId}
                className="text-center shadow-soft mx-5 h-14 rounded-radiusUi gap-20 box-border"
              >
                <td className="py-3 rounded-l-radiusUi items-center ml-1   text-xs xl:text-base w-20">
                  {index + 1}
                </td>
                <td className="w-28">
                  <div className="text-xs xl:text-base border rounded-radiusUi mx-3.5 py-1 w-auto">
                    {asset.assetName}
                  </div>
                </td>
                <td className="w-16">
                  <div
                    className={`text-xs xl:text-base border rounded-radiusUi mx-3 py-1 
              ${asset.qty <= 0 && "text-redUi"}
              `}
                  >
                    {asset.qty}
                  </div>
                </td>
                <td className="w-16">
                  <div className="text-xs xl:text-base border rounded-radiusUi mx-3 py-1">
                    {asset.unit}
                  </div>
                </td>
                <td className="w-28">
                  <div className="text-xs xl:text-base border rounded-radiusUi mx-3 py-1">
                    {asset.createdAt}
                  </div>
                </td>
                <td className={`${userRole == "ROLE_USER" && "px-3"} w-14`}>
                  <div
                    className={`text-xs xl:text-base border rounded-radiusUi py-1
                  ${asset.qty <= 0 ? "bg-softRedUi" : "bg-softGreenUi"} `}
                  >
                    {/* out of stock, qty color red */}
                    {asset.qty <= 0 ? "Out of stock" : "In stock"}
                  </div>
                </td>
                <td
                  className={`${
                    userRole == "ROLE_USER" && "hidden"
                  } rounded-r-radiusUi w-20`}
                >
                  <div className="flex justify-center items-center gap-3 mx-3">
                    <div className="cursor-pointer">
                      <DeleteAssetComponent assetIdprop={asset.assetId} />
                    </div>
                    <div className="cursor-pointer">
                      <EditAssetComponents
                        assetEdit={asset.assetId}
                        name={asset.assetName}
                        qty={asset.qty}
                        unit={asset.unit}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {nullsearch === 0 && (
        <div className="justify-center h-[60vh] w-full content-center space-y-2 pb-10 flex flex-col items-center">
          <Image
            className=""
            src="/images/empty-amico.png"
            alt="empty image"
            width={180}
            height={180}
            priority
          />
          <p className="text-center text-4xl font-semibold text-primary-text">
            No results found
          </p>
          <p className="text-center text-xl text-gray-500">
            Please try another search!
          </p>
        </div>
      )}
      {nullsearch > 0 && (
        <div
          className={`w-full  ${
            nullsearch > 0 ? "flex" : "hidden"
          } h-full  justify-end mt-8 mb-8`}
        >
          <RPaginate totalData={data?.totalRecord} />
        </div>
      )}
    </div>
  );
};
