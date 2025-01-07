import { useEffect, useState } from "react"

export function OutsideClick(ref) {
  const [isClicked, setIsClicked] = useState()
  // useEffect(() => {
  //   function handleClickOutside(ev) {
  //     setIsClicked(ref.current && !ref.current.contains(ev.target))
  //   }

  //   document.addEventListener("mousedown", handleClickOutside)
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside)
  //   }
  // }, [ref])
  return isClicked
}
