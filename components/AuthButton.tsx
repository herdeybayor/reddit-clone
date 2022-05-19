import Image from 'next/image'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { HiChevronDown } from 'react-icons/hi'

interface Props {
  mobile?: boolean
}

function AuthButton({ mobile }: Props) {
  const { data: session } = useSession()

  return (
    <>
      {!session ? (
        <div
          className={`cursor-pointer items-center space-x-2 border border-gray-100 p-2 ${
            mobile ? 'flex' : 'hidden md:flex'
          }`}
          onClick={() => signIn()}
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src={'https://links.papareact.com/23l'}
              layout="fill"
              objectFit="contain"
              alt="avatar"
            />
          </div>

          <p
            className={`text-gray-400 ${
              mobile ? 'inline' : 'hidden lg:inline'
            }`}
          >
            Sign In
          </p>
        </div>
      ) : (
        <div
          className={`cursor-pointer items-center space-x-2 border border-gray-100 p-2 ${
            mobile ? 'flex' : 'hidden md:flex'
          }`}
          onClick={() => signOut()}
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src={'https://links.papareact.com/23l'}
              layout="fill"
              objectFit="contain"
              alt="avatar"
            />
          </div>

          <div
            className={`flex-1 text-xs ${
              mobile ? 'inline' : 'hidden lg:inline'
            }`}
          >
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>

          <HiChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400" />
        </div>
      )}
    </>
  )
}

export default AuthButton
