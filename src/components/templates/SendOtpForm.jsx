import { sendOtp } from "services/auth";
import styles from "./SendOtpForm.module.css";
import toast from "react-hot-toast";
import { e2p } from "src/utils/numbers";

function SendOtpForm({ setMobile, setStep, mobile }) {

  const submitHandler =async (event)=>{
    event.preventDefault();
    
    if (mobile.length !== 11) return;

    const {response , error} = await sendOtp(mobile);

    if(response) setStep(2);
    if(error) toast.error(error.response.data.message)
    
  }
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید. کد
        تایید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <input
        
        id="input"
        value={e2p(mobile)}
        placeholder="شماره موبایل"
        onChange={(e) => setMobile(e.target.value)}
      />
      <button type="submit">ارسال کد تایید</button>
      
    </form>
  );
}

export default SendOtpForm;
