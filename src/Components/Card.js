import React, { useEffect, useState } from "react";



export default function Card(props){
  
  if(props.status===1)
  {
    return (
      <div className="card">
        {props.value}
      </div>
    )
  }
  else if(props.status===2)
  {
    return (

      <img className="card" src="images/card.jpg" alt="card" onClick={()=>{props.handleClick(props.index);}}></img>
    )
  }
  else
  {
    return (
      <div >
      </div>
    )
  }



}