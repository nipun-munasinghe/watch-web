// import React from 'react'

// const Footer = () => {
//   return (
//     <footer className='text-[#495057] text-sm text-center px-4 md:px-12 py-4 md:py-6'>Copyright © 2025</footer>
//   )
// }

// export default Footer

import React from "react";

const Footer = () => (
  <footer className="py-6 mt-12 bg-white border-t border-gray-200 text-gray-500 text-sm text-center">
    &copy; {new Date().getFullYear()} Watch Web. All rights reserved.
  </footer>
);

export default Footer;
