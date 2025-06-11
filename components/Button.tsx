import {type PropsWithChildren} from 'react'

export type ButtonProps = PropsWithChildren<{
  onClick: () => void
}>

export const Button = ({children, onClick}: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
}
