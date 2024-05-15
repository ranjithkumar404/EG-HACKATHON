import React ,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import Right from "./Right"
import Left from "./Left"
import axios from 'axios';
import one from "../images/one.png"
const OPENAI_API_KEY = "###########";
const systemMessage = { "role": "system", "content": "Your task is to convert the VB code to documentation with explaination." };

const Home = () => {
  const [cod, setCod] = useState('');

  const handleCodeChange1 = (event) => {
    const newCode = event.target.value;
    setCod(newCode);

    // Pass the updated code to the parent component using a callback function
    //onCodeChange(newCode);
  };
  const [code, setCode] = useState('');

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);

    // Pass the updated code to the parent component using a callback function
    //onCodeChange(newCode);
  };
    const [data, setData] = useState(null);
    const[bot,setBot]=useState(false);
    
 const [messages, setMessages] = useState([
    {
      message: "Hello, I'm your bot! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role: role, content: messageObject.message }
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ]
    };

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + OPENAI_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      });

      const data = await response.json();
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
    }
  }
    // useEffect(() => {
    //     // Define a function to fetch data using Axios
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://127.0.0.1:5000/about');
    //             setData(response.data);
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     // Call the fetchData function when the component mounts
    //     fetchData();

    //     // Clean up any resources (e.g., cancel pending requests) when the component unmounts
    //     return () => {
    //         // Optional cleanup code
    //     };
    // }, []);
    const handleBotClick = () => {
        setBot(!bot);
      };
      const submitModel = async () => {
        console.log(code);
        try {
            if(code===""){
                alert("Please enter the code")
            }
          const response = await axios.post('http://127.0.0.1:5000/translate', {
          code: code,
          });
          console.log("Code is  converted")
          const translatedCode = response.data.translated_code;
          console.log('Translated code:', translatedCode);
          setCod(translatedCode);
        } catch (error) {
          console.error('Error submitting model:', error);
        }
      };
  return (
    <>
    {/* <div>
        {data ?<div>
          
        </div> :
        <div></div>}
    </div> */}
    
    <div className='flex justify-around p-3'>
    <div className='space-y-5'>
      <h1 className='text-center text-2xl'>Input Code</h1>
      <textarea className='w-[700px] focus:outline-none  text-black h-[500px] rounded-md p-5 resize-none'
        value={code || ''}
        onChange={handleCodeChange}
        placeholder="Paste or write your code in VB  here..."
      />
    </div>
    <div className='space-y-4'>
    <h1 className='text-center text-2xl'>Output Code</h1>
<textarea className='w-[700px] h-[500px] focus:outline-none  text-black rounded-md p-5 resize-none'
        value={cod || ''}
        onChange={handleCodeChange1}
        placeholder="Ouput code in python"
       
      />

    </div>
    </div>
    <div className='flex items-center justify-center'>
        <button onClick={submitModel} className='bg-white text-black p-3 rounded-md font-bold text-xl'>Convert</button>
    </div>
    <div className=' left-[1400px] absolute z-40  top-[630px]' >
   <button onClick={handleBotClick}> <img className='rounded-full w-[70px] animate-bounce' src={one} alt="" /></button>
    </div>
    {
bot&& <div className=''>
<div className='bg-slate-400  w-[400px] h-[650px] -mt-[700px] ml-[1000px] absolute rounded-md' >
        <MainContainer style={{ height: "700px", width: "500px"  }}>
          <ChatContainer>
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => (
                <Message key={i} model={message} />
              ))}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
</div>}
    </> 
  )
}

export default Home