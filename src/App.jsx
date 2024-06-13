import { useEffect, useState } from 'react'
import './App.css'
import Home from './component/Home'
import Questions from './component/Questions';
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';



function App() {
  function shuffles(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  async function temp() {
    await fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple')
      .then(response => response.json())
      .then((data) => { setdatas(() => { return { ...data } }) }).catch(error => console.error('Error:', error));
  }

  const [animation, setanimation] = useState(false);
  const [restartgame, setrestartgame] = useState(0)
  const [answer, setanswer] = useState({})
  const [questions, setquestions] = useState([]);
  const [option, setoption] = useState([]);
  const [choosen, setchoosen] = useState({});
  const [datas, setdatas] = useState();
  const[count,setcount]=useState(0)
  const [isShow, setisShow] = useState(false);
  const [questionarray, setquestionarray] = useState([]);

  useEffect(() => {
    temp();

  }, [restartgame])


  function startQuiz() {
    if (!datas.response_code) {


      const questiontemparray = []
      const optiontemparray = []
      let tempanswer = {}
      datas.results.map((ques) => {
        const options = []
        for (let index = 0; index < 3; index++) {
          options.push({
            'id': nanoid(),
            'option': decode(ques.incorrect_answers[index])
          });
        }

        options.push({
          "id": nanoid(),
          "option": decode(ques.correct_answer)
        });
        let yu={ id: nanoid(), question: decode(ques.question) }
        tempanswer = {
          ...tempanswer,
          [yu.id]:options[3].id
          }


        shuffles(options)

        questiontemparray.push(yu)
        optiontemparray.push(options)


      })
      setquestions([...questiontemparray]);
      setoption([...optiontemparray]);
      setanswer({...tempanswer});
    }




    setanimation((prev) => {
      return !prev
    })
  }


  useEffect(() => {
    const temparray = []
    for (let index = 0; index < 5; index++) {
      datas && temparray.push(<Questions key={questions[index].id} options={option[index]} choosen={choosen} question={questions[index]} answer={{answerid:answer[questions[index].id],isShow:isShow}} clickhandler={optionclicked} />)
      
    }
    setquestionarray([...temparray])


  }, [choosen, questions, option, isShow])
  
  


  function optionclicked(answerid, questionid) {
    !isShow&&setchoosen((prev) => {
      if (prev[questionid] == answerid) {
        return {
          ...prev,
          [questionid]: null
        }
      }
      return {
        ...prev,
        [questionid]: answerid
      }
    })
  }
  
  function Checkanswer() {
    
    setisShow((prev)=>!prev)
    for (let [qi, ai] of Object.entries(choosen)) {
      if(answer[qi]==ai){
        setcount((prev)=>prev+1)
      }
    }




  }
  function restartgamef(){
    setrestartgame((prev)=>!prev);
    setanimation((prev)=>!prev)
    setisShow((prev)=>!prev)
    setcount(0)
  }
  


  return (
    <div className=' '>
      <img src='bg-bob.png' className={`z-[-1] absolute top-0 left-0 ${animation ? 'sideway' : 'floating'}`}></img>
      <img src='bg-bob2.png' className={`z-[-1] absolute bottom-20 right-0 ${animation ? 'sideway2' : 'floating'}`}></img>
      {!animation ? <Home clickhandler={startQuiz} /> : (datas.response_code == 5 ? <p className='text-center font-medium my-6 text-red-500 inter '>Too many refresh wait! and Try Again</p> : <div className='w-full fixed inset-0 mx-auto mt-[20px] flex flex-col  zoom overflow-auto'>
        {questionarray}


        <div className=' flex flex-col justify-center items-center '>
          <p className={`font-medium text-center my-[5px] text-lg ${isShow?'block':'hidden'} `}>You Scored {count}/5.</p>
          <button className=' w-fit mx-auto rounded-2xl bg-[#4D5B9E] text-[#F5F7FB] px-[100px] py-[10px] mb-[15px] text-center text-lg hover:scale-110 hover:bg-blue-400' onClick={isShow?restartgamef:Checkanswer}>{isShow?'Try More':'Check Answer'}</button>
        </div>
      </div>)}


    </div>
  )
}

export default App
