import { Profile } from "iconsax-react"

export const MemberActionBtn = () => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1">
                <div className="px-10 py-2 border-1px border-purple-text text-purple-text rounded-full">
                    Admin
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <a className="flex space-x-6">
                        <Profile size="20" color="#344054" variant="Outline" />
                        Admin
                    </a>
                </li>
                <li>
                    <a className="flex space-x-6">
                        <Profile size="20" color="#344054" variant="Outline" />
                        Sub Admin
                    </a>
                </li>
                <li>
                    <a className="flex space-x-6">
                        <Profile size="20" color="#344054" variant="Outline" />
                        User
                    </a>
                </li>
            </ul>
        </div>
    )
}