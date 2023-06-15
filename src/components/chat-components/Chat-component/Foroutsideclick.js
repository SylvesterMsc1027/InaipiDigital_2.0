import React,{useRef,useEffect} from 'react'

const Foroutsideclick = (props) => {

    const ref =useRef(null);
    const {onClickOutside,children} = props

    const handelClickOutside = (event) =>{
        if(ref.current && !ref.current.contains(event.target)){
            onClickOutside && onClickOutside()
        }
    };

    useEffect(() => {
      document.addEventListener("click",handelClickOutside,true);
      return ()=>{
      document.addEventListener("click",handelClickOutside,true)
      }
    }, [])
    
if(!children){
    return null;
}

  return (
    <div ref={ref}>{children}</div>
  )
}

export default Foroutsideclick