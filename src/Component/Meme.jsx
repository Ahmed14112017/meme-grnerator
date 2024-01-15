
import { useEffect, useState } from "react";
export default function Meme(){
    
    const [meme, setmeme] =useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })

    const [allmemes, setAllMemes] = useState([])
    useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json()).then(data=>setAllMemes(data.data.memes))
    },[])

    console.log(allmemes)

    function getMemeImage(){
       
        let randomNumber = Math.floor(Math.random()*allmemes.length)
        console.log(randomNumber)
        url=allmemes[randomNumber].url;
        console.log(url)
        
        
        setmeme(prvmeme=>{
            return{
                ...prvmeme,
                randomImage:url
            }
        })
    }
    function handelchange(e){
        setmeme(prevstate=>{
            return{
                ...prevstate,
               [ e.target.name]:e.target.value
            }
        })
    }
    let url;
    
    
    
    function handelsubmit(e){
        return(
            e.preventDefault()
        )
    }
    return(
        <main>
            
            <form className="form" onSubmit={handelsubmit}>
            <input
             type="text" 
             placeholder="top text"
              className="form-input"
              name="topText"
              value={meme.topText}
              onChange={handelchange}
              />
           <input 
           type="text" 
           placeholder="bottom text" 
           className="form-input"
           name="bottomText"
           value={meme.bottomText}
           onChange={handelchange}
           />
           <button className="form-button" onClick={getMemeImage}>Get a new meme image 🖼</button>
            </form>
            <div className="meme">
            <img src={meme.randomImage} className="meme--image" />
            <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
        </main>
    )
}