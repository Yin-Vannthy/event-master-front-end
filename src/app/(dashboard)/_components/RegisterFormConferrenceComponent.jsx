import React from "react";

export const RegisterFormConferrence = () => {
  return (
    <div className=" m-auto w-full rounded-2xl h-[50%] bg-white shadow-[#D5D4DC] shadow  py-6 px-4">
      <div className="text-primary-text font-semibold text-xl flex mb-4 content-center gap-2 ">
        <div className="content-center">
          <img
            src="https://em-content.zobj.net/source/microsoft-teams/337/card-index_1f4c7.png"
            alt=""
            className="h-4"
          />
        </div>

        <p>Contact Information</p>
      </div>

      <div className="lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid gap-x-8">
        <div className="form-group w-full col-md-4 text-sm font-semibold text-primary-text block mb-2">
          <label
            htmlFor="full-name"
            className="text-sm font-semibold text-primary-text block mb-2"
          >
            Full Name<span className="align-top text-red-600">*</span>
          </label>
          <input
            type="text"
            name="full-name"
            className="input input-bordered font-medium text-sm w-full rounded-xl"
            required
            placeholder="Enter full name"
          />
        </div>
        <form>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="gender"
              className="text-sm font-semibold text-primary-text block mb-2"
            >
              Status<span className="align-top text-red-600">*</span>
            </label>

            <select
              name="gender"
              className=" select select-bordered text-primary-text sm:text-sm rounded-xl block w-full p-3 focus:outline-none"
              required
            >
              <option disabled selected>
                Choosing Gender
              </option>
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>
        </form>

        <div className="form-group w-full col-md-4 text-sm font-semibold text-primary-text block mb-2">
          <label
            htmlFor="phone"
            className="text-sm font-semibold text-primary-text block mb-2"
          >
            Phone Number<span className="align-top text-red-600">*</span>
          </label>
          <input
            type="text"
            name="phone"
            className="input input-bordered font-medium text-sm w-full rounded-xl"
            required
            placeholder="Enter phone number"
          />
        </div>

        <div className="form-group w-full col-md-4 text-sm font-semibold text-primary-text block mb-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-primary-text block mb-2"
          >
            Email<span className="align-top text-red-600">*</span>
          </label>
          <input
            type="text"
            name="email"
            className="input input-bordered font-medium text-sm w-full rounded-xl"
            required
            placeholder="Enter email"
          />
        </div>
      </div>

      <div className="text-primary-text font-semibold text-xl flex my-4 gap-2">
        <div className="content-center">
          <img
            src=" https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-flat/128/Office-Building-Flat-icon.png"
            alt=""
            className="h-4"
          />
        </div>
        Affiliation
      </div>

      <div className="lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid  gap-5">
        <div className="form-group w-full col-md-4 text-sm font-semibold text-primary-text block mb-2">
          <label
            htmlFor="company"
            className="text-sm font-semibold text-primary-text block mb-2"
          >
            Company Name<span className="align-top text-red-600">*</span>
          </label>
          <input
            type="text"
            name="company"
            className="input input-bordered font-medium text-sm w-full rounded-xl"
            required
            placeholder="Enter company name"
          />
        </div>
        <div className="form-group w-full col-md-4 text-sm font-semibold text-primary-text block mb-2">
          <label
            htmlFor="position"
            className="text-sm font-semibold text-primary-text block mb-2"
          >
            Title/Position
          </label>
          <input
            type="text"
            name="position"
            className="input input-bordered font-medium text-sm w-full rounded-xl"
            required
            placeholder="Enter title/position"
          />
        </div>
      </div>
    </div>
  );
};

