import React from 'react'
import PictureComponent from './_components/PictureComponent';
import FormComponent from './_components/FormComponent';
import { getAllMemberProfile } from '@/services/profile/profile.service';


async function page() {
  const getAllMember = await getAllMemberProfile();
  return (
    <>
      <div className='p-2 rounded-2xl relative'>
        <div className='w-full bg-white sm:w-auto sm:h-auto rounded-2xl md:flex justify-between shadow-md relative'>
            <div className='w-full flex justify-center items-center py-5'>
                <FormComponent getAllMember={getAllMember.payload}/>
            </div>
            <PictureComponent/>
        </div>
      </div>   
    </>

  )
}

export default page