import Image from "next/image";
import Link from "next/link";
import {MdKeyboardArrowLeft} from "react-icons/md";
import SignupComponent from "@/app/(auth)/_components/SignupComponent";
import signupAction from "@/actions/auth/signupAction";
import registerUserAction from "@/actions/auth/signupAction";

const SignUpPage = () => {

    // define handle signup
    // async function handleUserRegister(userInfo) {
    //
    //     // define object structure
    //     const newUser = {
    //         name: userInfo.get("name"),
    //         email: userInfo.get("email"),
    //         password: userInfo.get("password"),
    //         confirmPassword: userInfo.get("confirmPassword"),
    //         phoneNumber: userInfo.get("phoneNumber"),
    //         organizationCode: userInfo.get("organizationCode"),
    //     }
    //
    //     // calling next auth service and passing " newUseInfo "
    //     const res = await signupAction("credentials", {
    //         redirect: false,
    //         ...newUser,
    //     });
    //     if (res.ok) {
    //         router.push("/verify-register");
    //     }
    //
    //     const res = await registerUserAction("credentials", {
    //         redirect: false,
    //         ...newUser,
    //     });
    //     if (res.ok) {
    //         router.push("/verify-register");
    //     }
    // }


    // define handle signup
    async function handleUserRegister(userInfo) {

        // define object structure
        const newUser = {
            name: userInfo.get("name"),
            email: userInfo.get("email"),
            password: userInfo.get("password"),
            confirmPassword: userInfo.get("confirmPassword"),
            phoneNumber: userInfo.get("phoneNumber"),
            organizationCode: userInfo.get("organizationCode"),
            userName: userInfo.get("userName"), // add userName property here
            role: userInfo.get("role") // add role property here
        }

        // calling next auth service and passing " newUseInfo "
        const res1 = await signupAction("credentials", {
            redirect: false,
            ...newUser,
        });
        if (res1.ok) {
            router.push("/verify-register");
        }

        const res2 = await registerUserAction("credentials", {
            redirect: false,
            ...newUser,
        });
        if (res2.ok) {
            router.push("/verify-register");
        }
    }


    return (
        <div className="w-full relative h-screen p-8 md:px-8 flex justify-center mb-40 ">
            <Image
                className="absolute w-full object-cover mx-4 -mt-[70px] bg-cover -top-5 block h-2/3"
                src={`/icons/signup.svg`}
                alt={`image`}
                width={1920}
                height={100}
                property=""
            />

            <Link
                href={`/login`}
                className="absolute top-5 left-8 flex text-white text-xl gap-1"
            >
                <MdKeyboardArrowLeft size={30} className="bg-red-40 flex"/>
                Back
            </Link>

            <Image
                className="hidden xl:block absolute left-[200px] top-[62%] transform translate-y-[-50%]"
                src={`/icons/signup-amico.svg`}
                alt={`img`}
                width={520}
                height={300}
            />
            <div className="hidden xl:block absolute top-32 left-32 text-white text-2xl">
                <h1 className="2xl:text-[58px] font-medium xl:text-[50px]">
                    Register New Account
                </h1>
                <p className="pt-10 text-xl line-clamp-2 ">
                    Create a new account to access our application.
                </p>
            </div>

            {/*Sign Up Component*/}
            <SignupComponent/>
        </div>
    );
};

export default SignUpPage;


