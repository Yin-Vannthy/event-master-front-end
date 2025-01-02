export const DateField = ({ parentFunc }) => {
    return (
        <button onClick={() => parentFunc("date")} className={`flex flex-col px-4 py-2 rounded-2xl border focus:border-[#551FFF] duration-300 cursor-pointer bg-white`}>
            <h2>Date</h2>
            <p className="text-sm text-neutral-400 font-normal">date time (dd, mm, yyyy)</p>
        </button>
    )
}
