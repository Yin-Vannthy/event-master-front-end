export const EmailField = ({ parentFunc }) => {
    return (
        <button onClick={() => parentFunc('email')} className={`flex flex-col px-4 py-2 focus:border-[#551FFF] rounded-2xl border duration-300 cursor-pointer bg-white`}>
            <h2>Email</h2>
            <p className="text-sm text-neutral-400 font-normal">Email ex: meganotclone@gmail.com</p>
        </button>
    )
}
