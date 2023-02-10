import { useState } from 'react'
import axios from 'axios'
import { requestroute } from '../../constants';
import { Button, Input } from '@chakra-ui/react';
// import { ChakraProvider } from '@chakra-ui/react';
// import './App.css'

async function postImage({image, description}) {
  const formData = new FormData();
  formData.append("image", image)
  formData.append("description", description)

  const result = await axios.post(`${requestroute}image`, formData, { headers: {'Content-Type': 'multipart/form-data'}})
  return result.data
}


function App({images, setImages}) {

  const [file, setFile] = useState()
  const [description, setDescription] = useState("")
 

  const submit = async event => {
    event.preventDefault()
    const result = await postImage({image: file, description})
    console.log(result);
    setImages(result.imagePath)
  }

  const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
  }

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        {/* <input value={description} onChange={e => setDescription(e.target.value)} type="text"></input> */}
        <Button type="submit" style={{backgroundColor:"#6c9fda"}}>Upload</Button>
      </form>

    
          {/* {
            images && <img src={`${requestroute}${images}`}></img>
          } */}
        
      

    </div>
  );
}

export default App;