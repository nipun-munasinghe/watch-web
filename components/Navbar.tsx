import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <div>
            <Link href={"/"}>Watch Web</Link>
            <div>
                <div>{/*Search Icon*/}</div>
                <input type="text" placeholder='Search'/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar