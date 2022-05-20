import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { FormData } from '../typings'

interface Props {
  register: UseFormRegister<FormData>
  placeholder: string
  name: 'postTitle' | 'postBody' | 'postImage' | 'subreddit'
  label: string
  required?: boolean
}

function FormInput({ register, placeholder, name, label, required }: Props) {
  return (
    <div className="flex items-center px-2">
      <label htmlFor={name} className="min-w-[90px] cursor-pointer">
        {label}:
      </label>
      <input
        className="m-2 flex-1 bg-blue-50 p-2 outline-none"
        {...register(!required ? name : name, { required: true })}
        type="text"
        placeholder={placeholder}
        id={name}
      />
    </div>
  )
}

export default FormInput
