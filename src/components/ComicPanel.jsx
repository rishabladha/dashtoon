import React, { useState } from "react";
import DisplayImage from "./DisplayImage";
import {logo, img} from '../assets/index'; 


const ComicPanel = () => {
    
  return (
    <div>
         <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      <div className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"><a href="https://github.com/dikshaverma1502">Contact Me</a></div>
    </header>
    
    
      <DisplayImage/>
      <div class="mt-5 w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src={logo} class="h-8" alt="Flowbite Logo" />
                <span class="font-extrabold text-[#222328] text-[30px]">Comic Creater</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="" class="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="https://github.com/dikshaverma1502" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Comic Creater™</a>. All Rights Reserved.</span>
    </div>
    </div>
  )
}

export default ComicPanel
