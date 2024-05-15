import React, { useState } from 'react';

const Right = () => {
  const [cod, setCod] = useState('');

  const handleCodeChange1 = (event) => {
    const newCode = event.target.value;
    setCod(newCode);

    // Pass the updated code to the parent component using a callback function
    //onCodeChange(newCode);
  };
  return (
    <div className='space-y-4'>
    <h1 className='text-center text-2xl'>Output Code</h1>
<textarea className='w-[700px] h-[500px] focus:outline-none  text-black rounded-md p-5 resize-none'
        value={cod}
        onChange={handleCodeChange1}
        placeholder="Ouput code in python"
       
      />

    </div>
  )
}

export default Right