import {useSelector } from "react-redux";
import { auth } from "./firebase";

export const Showadmin=({children})=>{
    const useremail = auth.currentUser.email
    if (useremail==='ry128037@gmail.com'){
        return children
    }
    return null

}

export default Showadmin;
