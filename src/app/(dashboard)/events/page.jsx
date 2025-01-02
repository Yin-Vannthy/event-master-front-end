import CardEventComponent from "../_components/CardEventComponent";
import { SelectDropdown } from "../_components/SelectDropdownComponent";
import { SelectStatus } from "../_components/SelectStatusComponent";
import { getAllEventsService } from "@/services/dashboard/eventService";
import SearchComponent from "../_components/SearchComponent";

export default async function Page() {
  const eventData = await getAllEventsService();

  return (
    <main>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <SelectDropdown />
        <SelectStatus />

        <form>
          <div className="mb-5">
            <label
              htmlFor="start date"
              className="text-sm font-semibold text-primary-text block mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              name="start date"
              id="date"
              className="border text-primary-text sm:text-sm rounded-3xl block w-full p-3 focus:outline-none"
            />
          </div>
        </form>

        <form>
          <div className="mb-5">
            <label
              htmlFor="end date"
              className="text-sm font-semibold text-primary-text block mb-2"
            >
              End Date
            </label>
            <input
              type="date"
              name="end date"
              id="date"
              className="border text-primary-text sm:text-sm rounded-3xl block w-full p-3 focus:outline-none"
            />
          </div>
        </form>
      </div>
      <SearchComponent eventData={eventData.payload} />
    </main>
  );
}