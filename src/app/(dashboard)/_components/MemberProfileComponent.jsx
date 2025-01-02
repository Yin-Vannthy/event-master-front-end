'use client'
import Image from 'next/image'
import React from 'react'

export const MemberComponent = ({ memberInfo }) => {
  const image = `${process.env.API_URL}file/getFile?fileName=cef74db9-d65f-4c5e-a947-7e51895ccbde.jpeg`;
  return (
    <div className="flex items-center text-xs xl:text-base w-48">
      <img
        src={`${image}`}
        alt={memberInfo.name}
        width={40}
        height={40}
        proprity={true}
        className="mr-4 rounded-full"
      />
      {memberInfo.memberName}
    </div>
  )
}
