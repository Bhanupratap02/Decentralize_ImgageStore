import {useState} from 'react'
import axios from "axios";
import "./FileUpload.css"
const FileUpload = ({account,provider,contract}) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No Image Selected")
  const handleSubmit =async (e) =>{
      e.preventDefault();
      if(file){
        try {
          const form = new FormData();
          form.append("file", file);
          const pinataUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";
          const config = {
            headers: {
              pinata_api_key: `86477a04871e7d1982ef`,
              pinata_secret_api_key: `f8911116c41e056fb3a5ca1f61f669a7989ee5837ed59645747926fb942cdc0c`,
              "Content-Type": "multipart/form-data", }
          }
          const res = await axios.post(pinataUrl,form,config);
          console.log(res);
          const ImgHash = `ipfs://${res.data.IpfsHash}`;
           //const signer = contract.connect(provider.getSigner());
           await  contract.add(account,ImgHash);
          alert("Image Successfully Uploaded");
          setFile(null);
          setFileName("No Image Selected")
        } catch (error) {
          console.log(error.message);
          alert("Unable to Upload Image to pinata")
        }
      }
  }
  const retreiveFile = (e) =>{
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    // e.preventDefault();
  }
  return (
    <div className="top">
      <form  className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-Upload" className="choose">Choose Image</label>
        <input disabled={!account} type={"file"} id="file-Upload" name='data' accept="image/*" onChange={retreiveFile}/>
        <span className='textArea'>Image:{fileName}</span>
        <button type="submit" disabled={!file} className="upload">Upload File</button>
      </form>
    </div>
  )
}

export default FileUpload