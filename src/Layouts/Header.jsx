import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { deleteCookie } from "src/utils/cookie";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "src/services/user";

function Header() {
  const { refetch, data } = useQuery(["profile"], getProfile);

  const navigate = useNavigate();
  const deleteHandler = () => {
    deleteCookie();
    navigate("/");
    toast.success("با موفقیت از حساب خود خارج شدید");
    refetch();
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      {/* .............menubar................. */}

      <div className={styles.menubar}>
        <img src="profile.svg" />
        <span style={{fontSize:"1rem", alignItems:"center", marginRight:"5px"}}>منو </span>
        <div className={styles.menuitems}>
          <div>
            <Link to="/auth">
              <span>
                <img src="profile.svg" />
                <p>دیوار من</p>
              </span>
            </Link>
          </div>
          <div>
            <span>
              <button onClick={deleteHandler} className={styles.exit}>
                <img src="exit.svg" />
              </button>
              <p>خروج</p>
            </span>
          </div>
          <div>
            {data?.data?.role === "ADMIN" && (
              <Link to="/admin" className={styles.admin}>
                <span>
                  <img src="setting.svg" style={{width:"30px", height:"30px" , color:"gray" , fontSize:"1rem"}}/>
                  <p>ادمین</p>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Link to="dashboard" className={styles.button}>
        ثبت آگهی
      </Link>

      <Toaster />
    </header>
  );
}

export default Header;
