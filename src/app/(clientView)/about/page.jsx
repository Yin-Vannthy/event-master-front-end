import Image from "next/image"
import arrowLeftImage from "../../../../public/images/arrow-left.png"
import arrowRightImage from "../../../../public/images/arrow-right.png"
import { AboutCardComponent } from "../_componenets/AboutCardComponent"
import { TeamCardComponent } from "../_componenets/TeamCardComponent"
import featureData from "../../../data/feature.json"
import teamData from "../../../data/team.json"

const Page = () => {
    return (
        <div className="container overflow-hidden">
            <section className="bg-pattern bg-cover text-center mt-24">
                <h1 className="text-4xl lg:text-6xl font-semibold">About Event Master</h1>
                <p className="text-sm text-slate-500 lg:text-xl font-light mt-10 w-full lg:w-1/2 mx-auto">
                    Our Event Management System simplifies managing
                    events like weddings, sports, and conferences. Users
                    can join events without an account, while admins
                    efficiently handle event creation, materials, and
                    task delegation.
                </p>
                <div className="hidden lg:flex justify-center gap-[712px]">
                    <Image src={arrowLeftImage} width={208} height={249} />
                    <Image src={arrowRightImage} width={208} height={249} />
                </div>
                <div className="h-20"></div>
            </section>
            <section className="relative lg:-top-40">
                <h2 className="text-4xl lg:text-6xl font-semibold text-center">Our Features</h2>
                <div className="lg:px-16 grid grid-col-1 lg:grid-cols-2 gap-8 mt-8 relative">
                    {featureData.payload.map((x, index) => (
                        <AboutCardComponent key={index} title={x.title} detail={x.detail} logo={x.logo} />
                    ))}
                    <div className="h-96 w-96 hidden lg:block bg-purple-text/35 rounded-full blur-3xl absolute left-1/3 top-1/4 z-10"></div>
                </div>
            </section>
            <section>
                <div className="text-center space-y-6 mt-12 lg:mt-0">
                    <h2 className="text-4xl lg:text-6xl font-semibold">Meet Our Core Teams</h2>
                    <p className="font-light text-sm lg:text-base w-full lg:w-1/2 mx-auto">Young and talented developers, shaping the
                        future of event management with their exceptional
                        skills and innovative ideas.
                    </p>
                </div>
                <div className="flex flex-wrap items-start gap-16 mt-16 justify-center">
                    {teamData.payload?.map((x, index) => (
                        <TeamCardComponent key={index} img={x.image} name={x.name} quote={x.quote} />
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Page