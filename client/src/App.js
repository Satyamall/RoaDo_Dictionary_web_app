import React from 'react';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

const style = {
  width: 350,
  bgcolor: 'background.paper',
  border: '1px solid gray',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  textAlign: "center"
};

function App() {
  const [definitions, setDefinitions] = useState("");
  const [examples, setExamples] = useState("");
  const [shortDefinitions, setShortDefinitions] = useState("");
  const [subsense, setSubsense] = useState("");
  const [word, setWord] = useState("");
  
  const [data,setData] = useState([]);

  const getData = async()=>{
    await axios.get(`http://localhost:5000/meaning/${word}`) 
    .then((res)=>{
      setDefinitions(res.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions);
      setExamples(res.data.results[0].lexicalEntries[0].entries[0].senses[0].examples[0].text);
      setShortDefinitions(res.data.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions);
      setSubsense(res.data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].definitions);
      console.log(res.data.results[0].lexicalEntries[0].entries[0].senses[0])
    })
  }

  const handleSave = (e)=>{
    e.preventDefault();
    const payload = {
      word: word,
      definitions: definitions,
      examples: examples,
      shortDefinitions: shortDefinitions,
      subsense: subsense
    }
    setDefinitions("");
    return axios.post("http://localhost:3000/meaning",payload)
    .then((res)=>{
      getWords()
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const getWords = ()=>{
    return axios.get("http://localhost:3000/meaning")
    .then((res)=>{
      setData(res.data);
  })
  .catch((err)=>{
    console.log(err)
  })
  }
  
  useEffect(()=>{
    getWords()
  },[])

  const handleCancel = ()=>{
     setDefinitions("");
     setWord("");
  }
  
  const [open, setOpen] = useState(false);
  const [meaning, setMeaning] = useState([])
  const handleOpen = (id) => {
    setOpen(true);
    return axios.get(`http://localhost:3000/meaning/${id}`)
           .then((res)=>{
             setMeaning(res.data)
           })
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [show, setShow] = useState(false);
  const handleShow = ()=>{
    setShow(!show);
  }

  const handleDelete =(id)=>{
      return axios.delete(`http://localhost:3000/meaning/${id}`) 
      .then(res=>{
        getWords()
      })
  }

  return (
    <div className="App">
      <h1>A Simple Vocabulary Web App</h1>
      <div className="main-box">
      <div className='input-box'>
       <input type="text" placeholder="Type word here......"  value={word}
        onChange={(e)=>setWord(e.target.value)}
        />
       <button onClick={getData}>
          <SearchIcon />
        </button>
      </div>
      <div>
        {
          definitions && <Box sx={{ ...style}}>
          <h2 id="child-modal-title">{word}</h2>
          <div>
            {definitions}
          </div>
          <div>
            {
              show && <div>
                   <p>{examples}</p>
                   <p>{shortDefinitions}</p>
                   <p>{subsense}</p>
              </div>
            }
          </div>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleShow}>{show ? "Hide": "Show More"}</Button>
        </Box>
        }
      </div>
      <div>
         {
           data.length>0 && data.sort((a,b)=>b.id-a.id).map((word)=>{
             return <div className='word-box' key={word.id} onClick={()=>handleOpen(word.id)}>
             <h2 id="child-modal-title">{word.word}</h2>
             <div>
               {word.definitions}
             </div>
           </div>
           })
         }
      </div>
      <div>
        {
         open && <div className='pop-box'>
           <Button onClick={handleClose}>Close</Button>
           <h4>Word: </h4>
           <p>{meaning.word}</p>
           <h4>Definition: </h4>
           <p>{meaning.definitions}</p>
           <h4>Examples: </h4>
           <ul>
              <li>{meaning.examples}</li>
           </ul>
           <h4>Short Definitions: </h4>
           <p>{meaning.shortDefinitions}</p>
           <h4>Subsense: </h4>
           <p>{meaning.subsense}</p>
           <Button onClick={()=>handleDelete(meaning.id)}>Delete</Button>
        </div>
        }
      </div>
      </div>
    </div>
  );
}

export default App;
