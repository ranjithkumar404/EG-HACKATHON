import React ,{useState} from 'react'

const Left = () => {
  const [code, setCode] = useState('');

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);

    // Pass the updated code to the parent component using a callback function
    //onCodeChange(newCode);
  };
  return (
    <div className='space-y-5'>
      <h1 className='text-center text-2xl'>Input Code</h1>
      <textarea className='w-[700px] focus:outline-none  text-black h-[500px] rounded-md p-5 resize-none'
        value={code}
        onChange={handleCodeChange}
        placeholder="Paste or write your code in VB  here..."
      />
    </div>
  )
}

export default Left