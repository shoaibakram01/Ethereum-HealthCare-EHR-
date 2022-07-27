import React from "react";
import { useEffect } from "react";
function Home (props){
    useEffect(() => {
        console.log("props",props);
        props.setRoute();
     }
     , []);
    return(
        <div>
        <h1>Home</h1>
        </div>
    )
}
export default Home;