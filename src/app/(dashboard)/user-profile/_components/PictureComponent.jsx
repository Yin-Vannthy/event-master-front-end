import React from 'react'
import Image from 'next/image'
import styles from './MyComponent.module.css';

function PictureComponent() {
  return (
    <>
        <div className={`w-[70%] h-auto block absolute z-0 bottom-0 left-0 rounded-xl`}>
            <Image src="/images/Group 1000005619.png" alt="My Image" width={500} height={400} className="absolute bottom-0 rounded-bl-2xl lg:mt-[-100px] lg:w-[250px]"/>
        </div>
    </>
  )
}

export default PictureComponent