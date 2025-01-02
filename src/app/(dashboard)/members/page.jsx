"use server";
import { MemberComponent } from "../_components/MemberProfileComponent";
import { DeleteMemberbutton } from "../_components/DeleteMemberbutton";
import { MemberRoleComponent } from "../_components/MemberRoleComponent";
import {
  getAllMembersAction,
  searchMemberAction,
} from "@/actions/memberAction";
import { getServerSession } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { SearchMemberComponent } from "../_components/SearchMemberComponent";
import { RPaginate } from "../_components/paginate/RPaginate";
import Image from "next/image";

// console.log("ROLE::", userRole);

const MemberPage = async ({ searchParams }) => {
  console.log("param:", searchParams);
  const query = searchParams?.query || "";
  const page = searchParams?.page;
  console.log("page:", page);
  const session = await getServerSession(authOption);
  let userInfo = jwtDecode(session?.user?.token);
  const userRole = userInfo.role;
  const memberData = await getAllMembersAction(page);
  const search = await searchMemberAction(query, page);
  const data = query == "" || query == null ? memberData : search;
     const nullsearch= data.totalRecord;
  console.log("recive data:", data);
  return (
    <div className="main bg-white h-auto p-6 rounded-3xl">
      <div className="flex flex-col lg:flex-row w-full justify-between px-[3px]">
        <div className="lg:w-[650px] md:w-full w-full">
          <a className="md:text-lg xl:text-xl font-semibold text-primary-text">
            Show All Members
          </a>
        </div>
        <div className="w-full flex justify-end lg:mt-0 mt-3">
          <SearchMemberComponent />
        </div>
      </div>
      <div className="w-full overflow-scroll">
        <table className="table w-full px-1 border-separate border-spacing-y-3 mt-5">
          <thead className="h-14 text-primary-text rounded-radiusUi bg-[#FFFFFF] uppercase">
            <tr className="w-full overflow-auto text-xs lg:text-base">
              <th className="px-5 py-2 font-medium rounded-l-radiusUi border border-r-0 border-member-border">
                NO
              </th>
              <th className="px-5 py-2 font-medium border border-x-0 border-member-border sm:text-sm sm:w-48 sm:mr-5">
                NAME
              </th>
              <th className="px-5 py-2 font-medium border border-x-0 border-member-border sm:text-sm">
                GENDER
              </th>
              <th className="px-5 py-2 font-medium border border-x-0 border-member-border sm:text-sm">
                EMAIL
              </th>
              <th className="px-5 py-2 font-medium border border-x-0 border-member-border sm:text-sm">
                ADDRESS
              </th>
              <th className="px-5 py-2 font-medium border border-x-0 border-member-border sm:text-sm">
                ROLE
              </th>
              <th
                className={`${
                  (userRole == "ROLE_USER" || userRole == "ROLE_SUB_ADMIN") &&
                  "hidden"
                } px-5 py-2 font-medium rounded-r-radiusUi border border-l-0 border-member-border sm:text-sm`}
              >
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.payload?.map((member, index) => (
              <tr
                key={member.id}
                className={`h-14 shadow-sm rounded-radiusUi odd:bg-softwhiteUi even:bg-white text-primary-text`}
              >
                <td className="px-5 py-2 text-xs xl:text-base rounded-l-radiusUi border border-r-0 border-member-border sm:text-sm">
                  {index + 1}
                </td>
                <td className="text-xs xl:text-base sm:text-sm ">
                  <MemberComponent memberInfo={member} />
                </td>
                <td className="px-5 py-2 text-xs xl:text-base border border-x-0 border-member-border sm:text-sm">
                  {member.gender ? member.gender : "No gender"}
                </td>
                <td className="px-5 py-2 text-xs xl:text-base border border-x-0 border-member-border sm:text-sm">
                  {member.email}
                </td>
                <td className="px-5 text-xs xl:text-base border border-x-0 border-member-border sm:text-sm">
                  {member.address}
                </td>
                <td
                  className={`${
                    (userRole == "ROLE_USER" || userRole == "ROLE_SUB_ADMIN") &&
                    "rounded-r-radiusUi"
                  } px-5 py-2 text-xs xl:text-base border border-x-0 border-member-border sm:text-sm `}
                >
                  <MemberRoleComponent
                    memberId={member.memberId}
                    memberRoles={member.role}
                  />
                </td>
                <td
                  className={`${
                    (userRole == "ROLE_USER" || userRole == "ROLE_SUB_ADMIN") &&
                    "hidden"
                  } px-5 py-2 xl:text-sm rounded-r-radiusUi border border-l-0 border-member-border`}
                >
                  <DeleteMemberbutton member={member} />
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
        <div className="w-full flex justify-end mt-8">
          <RPaginate totalData={data?.totalRecord} />
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
