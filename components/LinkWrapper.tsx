import Image from 'next/image'
import React from 'react'

interface Props {
  props: any
  ref: any
}

const LinkWrapper = React.forwardRef((props: any, ref) => {
  return <div {...props}>{props.children}</div>
})

export default LinkWrapper
