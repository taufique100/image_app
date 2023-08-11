import React, { useState } from "react";
import axios from "axios";
import '../Component/Image.css'


function Images() {
  const [image, setImage] = useState([]);
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0);


  const getImage=()=>{
    axios.get(
      `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=4lCsqbnE9ZpmIsNNXpQwG0uPo7dfKUFhzDeUmUMW2d4`
    )
    .then((response) => {
      console.log(response)
      setImage(response.data.results);
      console.log(response.data.results)
//const total_page = response.data.total_pages
    })
    .catch((error) => {
      console.log(error);
    });
  }
  const nextPage=()=>{
      setPage(prevCount=>{
        return prevCount+1
      })
      getImage()
  }

  const backPage=()=>{
    if(page>0){
      setPage(prevCount=>{
        return prevCount-1
      })
    }
    getImage();
  }
//  const downloadImage=(index)=>{
//     return image[index].links.download_location
//   }
  return (
    <div className="main-container">
      <div className="controler">
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)}/>
        <button onClick={getImage}>Get Image</button>

      </div>
      <div className="section-xy"></div>
      {
        image.map((items, index)=>{
          return(
            <div className="container" key={index}>
            <img src={items.urls.small} alt="images"/>
            {/* <div className="icon" onClick={downloadImage}>
              <FontAwesomeIcon icon={faDownload} style={{color: "red", height:"40px", width:"40px"}}/>
            </div> */}
          </div>
          )
        })
      }
      <div className="bottom">
          <button id="right" onClick={nextPage} >Next</button>
          <button id="left" onClick={backPage}>Back</button>
      </div>
    </div>
  );
}

export default Images;
