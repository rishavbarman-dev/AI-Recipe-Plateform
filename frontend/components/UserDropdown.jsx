"use client"

import { UserButton } from '@clerk/nextjs'
import { CookieIcon, Refrigerator } from 'lucide-react'
import React from 'react'

const UserDropdown = () => {
  return (
    <UserButton>
        <UserButton.MenuItems>
            <UserButton.Link label='My Recipes' labelIcon={<CookieIcon className="w-4 h-4"/>} href='/recipes'/>
            <UserButton.Link label='My Pantry' labelIcon={<Refrigerator className="w-4 h-4"/>} href='/pantry'/>
            <UserButton.Action label='manageAccount'/>
        </UserButton.MenuItems>
    </UserButton>
  )
}

export default UserDropdown