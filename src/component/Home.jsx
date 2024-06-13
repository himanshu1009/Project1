import React from 'react'

const Home = (props) => {
  return (
    <div className='flex flex-col justify-evenly items-center h-64 my-[150px]'>
       <div> <p className='text-center lg:text-4xl md:text-xl karla font-medium'>Quizzical</p>
        <p className='text-[#293264] my-3 text-center'>Step Up to the Quiz, Step Up Your Game!</p></div>
        <button className='rounded-2xl bg-[#4D5B9E] text-[#F5F7FB] px-[100px] py-[10px] text-lg hover:scale-110 hover:bg-blue-400' onClick={props.clickhandler} >Start Quiz</button>


      
    </div>
  )
}

export default Home
