
import "./Modal.css"
const Modal = ({ contract, setModalOpen, access, accessList }) => {
 
  const sharing = async  () =>{
    try {
      const address = document.querySelector(".address").value;
      await contract.allow(address);
      accessList()
      setModalOpen(false)
    } catch (error) {
      console.log(error.message);
    }
   
  };


  return (
    <>
   <div className="modalBackground">
    <div className="modalContainer">
      <div className="title">Share With</div>
      <div className="body">
        <input type="text" placeholder='Enter Address' className="address" />
      </div>
      <form id='myForm'>
            <select id="selectNumber">
              <option className="address">People With Access</option>
              {access?.map((item,i) => (<option key={i} className='address'>
                {item}
              </option>))}
            </select>
      </form>
      <div className="footer">
        <button onClick={()=> setModalOpen(false)} id="cancelBtn">
          Cancel
        </button>
        <button onClick={()=>sharing()}>Share</button>
      </div>
    </div>
   </div>

    </>
  )
}

export default Modal