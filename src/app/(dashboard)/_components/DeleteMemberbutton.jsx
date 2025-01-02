import React from 'react'
import { DeleteMemberComponent } from './DeleteMemberComponent'

export const DeleteMemberbutton = ({member}) => {
  return (
    <div>
        {member.role !== "ROLE_ADMIN" && <DeleteMemberComponent memberId = { member.memberId }/>}
    </div>
  )
}