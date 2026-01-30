import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const PricingSection = () => {
  return (
    <div className='p-4'>
        <div className='text-xl font-bold'>Pricing Section</div>
        <p>Start for free. Upgrade to Pro for more features and recipes.</p>

        <div>
        <PricingTable checkoutProps={{
          appearance: {
            elements:{
              drawerRoot:{zIndex: 2000}
            }
          }
        }}/>
        </div>
    </div>
  )
}

export default PricingSection