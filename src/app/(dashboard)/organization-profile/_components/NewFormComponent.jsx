"use client";

import { LiaUserEditSolid } from "react-icons/lia";
import Image from "next/image";
import defaultProfile from "../../../../../public/images/default-profile.jpg";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { CgAddR } from "react-icons/cg";
import { TbEdit } from "react-icons/tb";
import { updateOrganization } from "@/services/profile/org";

const NewFormComponent = () => {
  // fetch data

  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [organizationCode, setOrganizationCode] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [address, setAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [imageSrc, setImageSrc] = useState(defaultProfile);
  const [copied, setCopied] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Status:", status);
      console.log("Session:", session);
      if (status === "authenticated" && session?.user?.token) {
        const decodedToken = jwtDecode(session.user.token);
        setUserInfo(decodedToken);
        const orgData = decodedToken.organization || {};
        setOrganizationCode(orgData.code || "");
        setOrganizationName(orgData.orgName || "");
        setAddress(orgData.address || "");
        setImageSrc(orgData?.logo || defaultProfile);
      }
    };
    fetchData();
  }, [status, session]);

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImageSrc(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setLogoFile(file);
  //     setImageSrc(URL.createObjectURL(file)); // Display the image immediately
  //   }
  // };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setImageSrc(file.name);
  //   }
  // };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the selected file is the default profile image
      if (file.name === "default-profile.png") {
        setImageSrc(defaultProfile);
      } else {
        setLogoFile(file);
        setImageSrc(URL.createObjectURL(file)); // Display the image immediately
      }
    }
  };


  const handleCancelChanges = () => {
    setOrganizationName(userInfo?.organization?.orgName || "");
    setAddress(userInfo?.organization?.address || "");
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    const organizationData = {
      orgId: userInfo.organization.orgId,
      orgName: organizationName,
      address: address,
      logo: imageSrc,
      // logo: "/string.jpg"
    };

    try {
      console.log("Saving changes...", organizationData);
      const updatedOrganization = await updateOrganization(organizationData.orgId, organizationData);
      console.log("Changes saved successfully: ", updatedOrganization);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating organization: ", error);
    }
  };

  const handleOrganizationNameChange = (e) => {
    setOrganizationName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // =========handle copy organization code===========
  const handleCopy = () => {
    navigator.clipboard
      .writeText(organizationCode)
      .then(() => setCopied(true))
      .catch((error) => console.error("Error copying text: ", error));

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <form action="">
      <div className="rounded-2xl w-full h-[800px] flex flex-col shadow-md relative">
        <div className="bg-purple-text h-[20%] rounded-t-2xl flex items-center justify-center">
          <Image
            src={imageSrc && /^(http|https):\/\//.test(imageSrc) ? imageSrc : defaultProfile}
            alt="logo"
            width={130}
            height={130}
            className="rounded-full mt-48 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-52 lg:h-52 xl:w-60 xl:h-60 2xl:w-64 2xl:h-64"
          />
          <div className="absolute transform translate-x-10 translate-y-36 sm:translate-x-10 sm:translate-y-36 md:translate-x-16 md:translate-y-36 lg:translate-x-20 lg:translate-y-40 xl:translate-x-20 xl:translate-y-44 2xl:translate-x-20 2xl:translate-y-48">
            <label
              htmlFor="image-upload"
              className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center bg-gray-300 duration-300 hover:bg-gray-200 cursor-pointer"
            >
              <LiaUserEditSolid className="w-6 h-6 text-gray-800 relative" />
              <input id="file-upload" name="file-upload" type="file" class="sr-only w-14 h-14 cursor-pointer z-50" />
            </label>
          </div>
        </div>
        <div className="absolute text-center w-full top-64 sm:top-64 md:top-64 lg:top-72 xl:top-80 2xl:top-[330px]">
          <p className="text-primary-text font-bold text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-3xl 2xl:text-3xl">
            {userInfo?.organization?.orgName}
          </p>
        </div>

        <div className="z-10">
          {/* input field here */}
          <div className="mx-7 mt-40 sm:mt-40 md:mt-44 lg:mt-52 xl:mt-56 2xl:mt-60 my-auto sm:mx-24 md:mx-32 lg:mx-52 xl:mx-56 2xl:mx-64 z-10">
            <div className="mt-0 sm:mt-0 md:mt-5 lg:mt-16 xl:mt-24 2xl:mt-32">
              <label
                htmlFor="text"
                className="text-sm font-medium primary-text block mb-2"
              >
                Organization code <span className="text-red-600">*</span>
              </label>
              <div className="flex align-middle">
                <input
                  type="number"
                  id="text"
                  className={`shadow-sm cursor-default bg-gray-100 border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                  placeholder={userInfo?.organization?.code}
                  readOnly
                />
                <FaRegCopy
                  className="text-gray-600 w-5 h-5 mt-4  -ml-10 cursor-pointer"
                  onClick={() => {
                    handleCopy();
                  }}
                />
                {copied && (
                  <div className="absolute right-6 sm:right-24 md:right-32 lg:right-52 xl:right-56 2xl:right-64 -mt-10">
                    <div className="bg-white shadow-md rounded p-2">
                      <p className="text-green-500 text-sm">copied!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-7">
              <label
                htmlFor="text"
                className="text-sm font-medium primary-text block mb-2"
              >
                Organization name <span className="text-red-600">*</span>
              </label>
              <div>
                <input
                  type="text"
                  id="orgName"
                  name="orgName"
                  className={`shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                  placeholder="Enter full name"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="mt-7">
              <label
                htmlFor="text"
                className="text-sm font-medium primary-text block mb-2"
              >
                Address <span className="text-red-600">*</span>
              </label>
              <div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className={`shadow-sm bg-white border primary-text sm:text-sm rounded-2xl focus:outline-none focus:border-purple-text block w-full p-3.5`}
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* button here */}
          <div className="z-20 mt-5 flex justify-end items-center w-full h-16 mb-24 sm:mb-20 md:mb-10 lg-mb-5 xl:mb-5 2xl:mb-5">
            {isEditing ? (
              <div className="mr-5 flex align-middle sm:mr-10 md:mr-14 lg:mr-20 xl:mr-24 2xl:mr-28">
                <button
                  className="btn btn-outlinen hover:bg-gray-300 border-solid border-1 border-primary-text text-lg w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32 2xl:w-32"
                  onClick={handleCancelChanges}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className={`flex justify-center align-middle items-center rounded-lg bg-purple-text text-white text-lg ml-5 w-28 sm:w-32 md:w-32 lg:w-32 xl:w-32 2xl:w-32 
                  ${!organizationName || !address
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-violet-500"
                    }`}
                  onClick={handleSaveChanges}
                  type="button"
                  disabled={!organizationName.trim() || !address.trim()}
                >
                  <CgAddR className="w-5 h-5 mr-2 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6 lg:h-6 xl:w-6 xl:h-6 2xl:w-6 2xl:h-6" />
                  Save
                </button>
              </div>
            ) : (
              <button
                className="btn btn-success text-white w-28 sm:w-32 md:w-32 lg:w-32 xl:w-32 2xl:w-32 text-lg mr-5 sm:mr-10 md:mr-14 lg:mr-20 xl:mr-24 xl:mr-28"
                type="button"
                onClick={() => setIsEditing(true)}
              >
                <TbEdit className="w-6 h-6" />
                Edit
              </button>
            )}
          </div>
        </div>

        {/* background */}
        <div className="absolute bottom-0 z-0">
          <Image
            src="/images/myOrg.png"
            alt="background"
            width={150}
            height={150}
            className="sm:h-72 md:h-80 lg:h-96 xl:h-96 2xl:h-96"
          />
        </div>
      </div>
    </form>
  );
};

export default NewFormComponent;
