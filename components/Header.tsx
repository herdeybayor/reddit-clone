import Image from 'next/image'
import React, { useRef } from 'react'
import {
  HiChevronDown,
  HiHome,
  HiSearch,
  HiMenu,
  HiOutlineBell,
  HiOutlineChat,
  HiOutlineGlobe,
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineSpeakerphone,
  HiOutlineVideoCamera,
  HiOutlineX,
} from 'react-icons/hi'
import MobileHeaderIcon from './MobileHeaderIcon'
import { gsap, Power3 } from 'gsap'

function Header() {
  const navigationRef = useRef(null)
  const navOpacityRef = useRef(null)
  const mobileNavRef = useRef(null)

  function openNavbar() {
    gsap.to(navigationRef.current, {
      transform: 'translateX(0)',
      duration: 0.3,
      ease: Power3.easeOut,
    })
    gsap.to(mobileNavRef.current, {
      zIndex: 999,
    })
    gsap.to(navOpacityRef.current, {
      opacity: 0.3,
      duration: 0.5,
    })
  }

  function closeNavbar() {
    gsap.to(navigationRef.current, {
      transform: 'translateX(100%)',
      duration: 0.3,
      ease: Power3.easeOut,
    })
    gsap.to(mobileNavRef.current, {
      zIndex: -40,
    })
    gsap.to(navOpacityRef.current, {
      opacity: 0,
      duration: 0.1,
    })
  }

  return (
    <div className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          src="https://links.papareact.com/fqy"
          layout="fill"
          alt="reddit logo"
          objectFit="contain"
          priority
        />
      </div>

      <div className="mx-7 flex items-center xl:min-w-[300px]">
        <HiHome title="Home" className="h-5 w-5 cursor-pointer" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <HiChevronDown title="More" className="h-5 w-5 cursor-pointer" />
      </div>

      {/* Search box */}
      <form
        title="Search"
        className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-2"
      >
        <HiSearch className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      <div className="mx-5 hidden items-center space-x-2 text-gray-500 md:flex">
        <HiOutlineSparkles title="Popular" className="icon" />
        <HiOutlineGlobe title="All" className="icon" />
        <HiOutlineVideoCamera title="Reddit Live" className="icon" />
        <hr className="h-10 border border-gray-100" />
        <HiOutlineChat title="Chat" className="icon" />
        <HiOutlineBell title="Notifications" className="icon" />
        <HiOutlinePlus title="Create Post" className="icon" />
        <HiOutlineSpeakerphone title="Advertise" className="icon" />
      </div>
      <div className="ml-5 text-gray-500 md:hidden">
        <HiMenu onClick={openNavbar} className="icon" />
      </div>

      {/* Mobil Navbar */}
      <div
        ref={mobileNavRef}
        className="absolute top-0 left-0 -z-10 flex h-screen w-full flex-row-reverse overflow-hidden"
      >
        <div
          ref={navigationRef}
          className="relative w-[250px] translate-x-full bg-white pt-14 pl-5"
        >
          <HiOutlineX
            onClick={closeNavbar}
            className="absolute top-3 left-3 h-8 w-8 cursor-pointer transition-transform active:scale-125"
          />
          <MobileHeaderIcon Icon={HiHome} text="Home" active />
          <MobileHeaderIcon Icon={HiOutlineSparkles} text="Popular" />
          <MobileHeaderIcon Icon={HiOutlineGlobe} text="All" />
          <MobileHeaderIcon Icon={HiOutlineVideoCamera} text="Reddit Live" />
          <hr />
          <MobileHeaderIcon Icon={HiOutlineChat} text="Chat" />
          <MobileHeaderIcon Icon={HiOutlineBell} text="Notifications" />
          <MobileHeaderIcon Icon={HiOutlinePlus} text="Create Post" />
          <MobileHeaderIcon Icon={HiOutlineSpeakerphone} text="Advertise" />
        </div>
        <div
          onClick={closeNavbar}
          ref={navOpacityRef}
          className="flex-1 bg-black opacity-0"
        ></div>
      </div>
    </div>
  )
}

export default Header