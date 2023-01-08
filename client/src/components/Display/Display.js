import {useState} from 'react'
import "./Display.css"
const Display = ({account,contract}) => {
  const [data, setData] = useState("")
  const getData = async () =>{
    let dataArray;
    const otherAddress = document.querySelector(".address").value;
    try {
      if(otherAddress){
        dataArray = await contract.display(otherAddress)
     
      } else{
        dataArray = await contract.display(account);
       
      }
    } catch (error) {
      console.log(error.message);
      alert("You donot have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if(!isEmpty){
      const str = dataArray.toString();
      const str_arr = str.split(",");
      const images = str_arr.map((item,i)=>{
         return (
           <a href={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} key={i} target="_blank">        
             <img className='img'
               key={i}
               src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
               alt="new"
             ></img>
           </a>
         );
      });
      setData(images);
    } else{
      alert("No image to display")
    }

  };
  return (
    <>
      <div className="image-list">
     {data}
      </div>
      <input type="text" placeholder='Enter Address' className="address" />
      <button className="center button" onClick={getData}>Get Data</button>
    </>
    
  )
}

export default Display