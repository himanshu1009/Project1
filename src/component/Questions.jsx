import React, { useEffect, useState } from 'react'
import Option from './Option'

const Questions = (props) => {

    
    let option=props.options.map((x)=>{

        return <Option key={x.id} id={x.id} selected={((props.choosen[props.question.id])===x.id)?true:false} isanswer={(props.answer.answerid===x.id)?true:false} option={x.option} isShow={props.answer.isShow} clickhandler={()=>{props.clickhandler(x.id,props.question.id)}}/>
    })
    
  return (
    <div className='mb-[20px]'>
        <p className='text-center font-medium text-xl block ' >{props.question.question}</p>
        <div className=' flex justify-around w-fit items-center mx-auto my-[10px] flex-wrap '>
            
          {option}
            
            
        </div>
        <hr className='w-[70vw] mx-auto'></hr>
        
    </div>
  )
}

export default Questions
