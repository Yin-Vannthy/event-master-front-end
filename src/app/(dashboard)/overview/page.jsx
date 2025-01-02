import { OverviewCardComponent } from "../_components/OverviewCardComponent"
import { BarChartComponent } from "../_components/BarChartComponent"
import CreateCategoryButton from "../_components/Action/CreateCategoryButton"
import { Getstart } from "../_components/Action/GetstartBtn"
import { getAllCategory, getOverviewData } from "@/services/dashboard/overviewService"
import { getServerSession } from "next-auth"
import { authOption } from "@/app/api/auth/[...nextauth]/route"
import { jwtDecode } from "jwt-decode"
import { Suspense} from "react"
import 'react-toastify/dist/ReactToastify.css';
import { RPaginate } from "../_components/paginate/RPaginate"
import { CategoryDeleteAction } from "../_components/Action/CategoryDeleteAction"
import { CategoryEditAction } from "../_components/Action/CategoryEditAction"

const Page = async ({ searchParams }) => {
    const session = await getServerSession(authOption);
    let userInfo = jwtDecode(session?.user?.token);
    const userRole = userInfo.role;
    const data = await getOverviewData();
    const cateData = await getAllCategory(searchParams.page);
    console.log(data)
    const convertToObjectArray = (data) => {
        const mappings = {
            eventCount: { title: "Event Count", logo: "event" },
            publishEvent: { title: "Published Event", logo: "published" },
            totalAttendee: { title: "Total Attendees", logo: "attendee" },
            member: { title: "Members", logo: "member" }
        };

        return {
            payload: Object.entries(data).map(([key, value]) => ({
                logo: mappings[key].logo,
                title: mappings[key].title,
                count: value?.toLocaleString()
            }))
        };
    }
    const originalObject = {
        eventCount: data?.payload?.eventCount,
        publishEvent: data?.payload?.publishEvent,
        totalAttendee: data?.payload?.totalAttendee,
        member: data?.payload?.member
    };
    const result = convertToObjectArray(originalObject);
    let topCardData = result;

    return (
        <div className="space-y-4 xl:space-y-7">
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-6">
                <Suspense>
                    {topCardData.payload.map((x, index) => (
                        <OverviewCardComponent key={index} title={x.title} count={x.count} logo={x.logo} />
                    ))}
                </Suspense>
            </section>
            {/* second row */}
            <section className="flex flex-col xl:flex-row gap-4 xl:gap-8 w-full">
                <div className=" bg-white w-full xl:w-1/2 h-auto p-6 rounded-3xl space-y-6">
                    <h2 className="md:text-lg xl:text-xl font-semibold text-primary-text">Total Event By Category</h2>
                    <div className="rounded-3xl w-full">
                        <Suspense>
                            <BarChartComponent data={data.payload.categoryEventCountList} />
                        </Suspense>
                    </div>
                </div>
                <div className="w-full xl:w-1/2 rounded-3xl relative bg-[#7B61FF] space-y-8 p-8 overflow-hidden">
                    <h2 className="text-white text-2xl font-bold w-4/5">Let's manage your event with us</h2>
                    <p className="text-xs lg:text-sm text-white w-4/5 absolute z-20 !leading-relaxed">
                        Forge a Strategic Alliance with Our Esteemed Team,
                        Renowned htmlFor Its Meticulous Approach to Event Planning,
                        Impeccable Execution, and the Ability to Craft Timeless
                        Experiences That Will Resonate Long After the Occasion.
                    </p>
                    <p className="text-xs lg:text-sm text-white w-4/5 opacity-0">
                        Forge a Strategic Alliance with Our Esteemed Team,
                        Renowned htmlFor Its Meticulous Approach to Event Planning,
                        Impeccable Execution, and the Ability to Craft Timeless
                        Experiences That Will Resonate Long After the Occasion.
                    </p>
                    <Getstart className={`absolute z-20 mt-6 ${userRole == 'ROLE_USER' && 'hidden'}`} />
                    <Getstart className={`opacity-0 mt-6 ${userRole == 'ROLE_USER' && 'hidden'}`} />
                    <div className="absolute -bottom-56 rotate-[13.5deg] right-0 h-80 w-80 bg-[#AD9CFF] rounded-radius64 z-0"></div>
                    <div className="absolute -bottom-72 rotate-[13.5deg] -right-12 h-80 w-80 bg-[#9782FF] rounded-radius64 z-0"></div>
                </div>
            </section>
            <section className="w-full h-fit">
                <div className="space-y-8 rounded-3xl p-6 border-2 border-slate-100 bg-white">
                    <div className="flex justify-between items-center">
                        <h2 className="md:text-lg xl:text-xl font-semibold text-primary-text">Event Category</h2>
                        <div className={`${userRole == 'ROLE_USER' ? 'hidden' : 'block'}`}>
                            <CreateCategoryButton />
                        </div>
                    </div>
                    <div className="w-full overflow-scroll">
                        <Suspense>
                            <div>
                                <table className="table w-full px-1 border-separate border-spacing-y-3">
                                    <thead className="h-14 shadow-soft text-primary-text rounded-radiusUi bg-[#FFFFFF] uppercase">
                                        <tr className="text-xs lg:text-base">
                                            <th className="px-5 py-2 font-medium rounded-l-radiusUi">No</th>
                                            <th className="px-5 py-2 font-medium">Name</th>
                                            <th className="px-5 py-2 font-medium">Created At</th>
                                            <th className="px-5 py-2 font-medium">Created By</th>
                                            <th className={`${userRole == 'ROLE_USER' && 'hidden'} px-5 py-2 font-medium rounded-r-radiusUi`}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cateData?.payload?.map((x, index) => {
                                            const formatDate = dateString => new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                            const inputDate = x.createAt;
                                            const formattedDate = formatDate(inputDate);
                                            const formated = formattedDate;
                                            return (
                                                <tr key={x.categoryId} className={`h-14 shadow-soft rounded-radiusUi odd:bg-softwhiteUi even:bg-white text-primary-text`}>
                                                    <td className="px-5 py-2 text-xs xl:text-base rounded-l-radiusUi">{index + 1}</td>
                                                    <td className="px-5 py-2 text-xs xl:text-base">{x?.categoryName}</td>
                                                    <td className="px-5 py-2 text-xs xl:text-base">{formated}</td>
                                                    <td className="px-5 py-2 text-xs xl:text-base">{x?.createBy}</td>
                                                    <td className={`${userRole == 'ROLE_USER' && 'hidden'} px-5 py-2 text-xs xl:text-base rounded-r-radiusUi`}>
                                                        <div className="flex items-center gap-2 lg:gap-4">
                                                            <CategoryDeleteAction cateId={x?.categoryId} />
                                                            <CategoryEditAction cateId={x?.categoryId} name={x?.categoryName} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div className="w-full h-full flex justify-end mt-8">
                                    <RPaginate totalData={cateData?.totalRecord} />
                                </div>
                            </div>
                        </Suspense>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Page