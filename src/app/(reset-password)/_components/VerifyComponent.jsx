'use client'

const VerifyComponent = () => {

    return (
        <div className="absolute flex justify-center sm:pt-[700px] mt-[440px] sm:mt-[60px] lg:pt-[600px] 2xl:pt-[700px] w-full sm:w-full md:w-[100%] lg:w-[100%] h-[100%]">
            <form>
                <div className="lg:mt-[-130px] mt-5">
                    <h2 className="text-center text-3xl leading-9 font-extrabold text-purple-text-head flex justify-center">
                        Congratulations!
                    </h2>
                    <p className="flex justify-center greyUi mt-6">You have set up the new password successfully.</p>
                </div>
            </form>
        </div>
    )
}
export default VerifyComponent

