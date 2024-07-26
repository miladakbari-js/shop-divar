import { checkOtp } from "services/auth";
import { setCookie } from "src/utils/cookie";

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "src/services/user";
import styles from "./CheckOtpForm.module.css"
import toast from "react-hot-toast";


function CheckOtpForm({ setCode, setStep, code, mobile }) {
  const {refetch} = useQuery(["profile"] , getProfile);
  const navigate = useNavigate();
  const submitHandler =async (event)=>{
    event.preventDefault();
    const {response , error} =await checkOtp(mobile , code);
    
    if (code.length !== 5) return;
    if(response) {
      
      toast.success(response.data.message);
      setCookie(response.data)
      navigate("/")
      refetch();
      
    }
    if(error) toast.error(error.response.data.message)
  }
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد پیامک شده</p>
      <span>لطفا کد پیامک شده به شماره «{mobile}»را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit" >ورود</button>
      <button onClick={()=>setStep(1)} className={styles.backButton}>تغییر شماره موبایل</button>
      
    </form>
  );
}

export default CheckOtpForm;
