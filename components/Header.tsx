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
import AuthButton from './AuthButton'
import Link from 'next/link'
import LinkWrapper from './LinkWrapper'

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
      display: 'flex',
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
      display: 'none',
    })
    gsap.to(navOpacityRef.current, {
      opacity: 0,
      duration: 0.1,
    })
  }

  return (
    <div className="sticky top-0 z-30 flex items-center bg-white px-4 py-2 shadow-sm">
      <Link href="/">
        <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
          <Image
            src="https://www.redditinc.com/assets/images/site/reddit-logo.png"
            layout="fill"
            alt="reddit logo"
            objectFit="contain"
          />
        </div>
      </Link>

      <div className="mx-7 flex flex-1 items-center justify-between">
        <>
          <HiHome title="Home" className="h-5 w-5 cursor-pointer" />
          <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        </>
        <HiChevronDown title="More" className="h-5 w-5 cursor-pointer" />
      </div>

      {/* Search box */}
      <form
        title="Search"
        className="hidden flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-2 sm:flex"
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

      {/* Bugger */}
      <div className="ml-5 text-gray-500 md:hidden">
        <HiMenu onClick={openNavbar} className="icon" />
      </div>

      {/* Sign in/Sign out button */}
      <AuthButton />

      {/* Mobil Navbar */}
      <div
        ref={mobileNavRef}
        className="absolute top-0 left-0 z-50 hidden h-screen w-full flex-row-reverse overflow-hidden"
      >
        <div
          ref={navigationRef}
          className="max-h-screen w-[250px] translate-x-full overflow-x-scroll bg-white pt-5 pl-5"
        >
          <div className="mb-5 flex items-center justify-between pr-5">
            <HiOutlineX
              onClick={closeNavbar}
              className="h-8 w-8 cursor-pointer transition-transform active:scale-125"
            />
            <AuthButton mobile />
          </div>
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
