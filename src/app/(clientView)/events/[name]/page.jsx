import { InfiniteLoad } from "../../_componenets/InfiteLoad"
import { EventInCategory } from "../../_componenets/EventInCategory"
import { getEventByCategoryNameAction } from "@/actions/landingAction"
import { RedirectBackComponent } from "../../_componenets/RedirectButtonComponent";

const Page = async ({ params: { name } }) => {
    let page = 1;
    const eventData = await getEventByCategoryNameAction({ name, page })

    return (
        <div className="container">
            <RedirectBackComponent link={'/'} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
                <EventInCategory data={eventData} />
                <InfiniteLoad name={name} />
            </div>
        </div>
    )
}

export default Page