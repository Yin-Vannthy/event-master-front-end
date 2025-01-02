export const TextField = ({ parentFunc }) => {
    return (
        <button onClick={() => parentFunc('text')} className={`flex flex-col px-4 py-2 rounded-2xl border focus:border-[#551FFF] cursor-pointer duration-300 bg-white`}>
            <h2>Text</h2>
            <p className="text-sm text-neutral-400 font-normal">A small text ( require input )</p>
        </button>
    )
}
