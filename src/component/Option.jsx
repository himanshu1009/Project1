import React from 'react'

const Option = (props) => {
  let style=' border-[#293264] text-[#293264]';
  if (!props.isShow && props.selected) {
    style = 'bg-[#D6DBF5] border-[#D6DBF5] text-[#293264]'

  }
  else if (props.isShow && props.isanswer) {
    style = 'bg-[#94D7A2] border-[#94D7A2] text-[#293264]'

  }
  else if (props.isShow && !props.isanswer && props.selected) {
    style = 'bg-[#F8BCBC] border-[#F8BCBC] text-[#4D5B9E]'
  }
  else if (props.isShow && !props.isanswer) {
    style = ' border-[#4D5B9E] text-[#4D5B9E]'
  }
  return (

    <button className={`text-medium border-2 border-solid ${style}  rounded-2xl px-[15px] py-[5px] font-medium inter hover:scale-2 mx-4`} id={props.id} onClick={props.clickhandler} >{props.option}</button>

  )
}

export default Option
