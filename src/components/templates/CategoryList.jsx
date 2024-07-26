import { useQuery } from "@tanstack/react-query";
import { getCategory } from "src/services/admin";
import Loader from "../modules/Loader";
import styles from "./CategoryList.module.css";
import { deleteCategory } from "src/services/admin";

function CategoryList() {
  const { isLoading, data } = useQuery(["get-categories"], getCategory);
  console.log({ isLoading, data });

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id}>
            <img src={`${i.icon}.svg`} />
            <h5>{i.name}</h5>
            <p>slug: {i.slug}</p>
            <button onClick={() => deleteCategory(i._id) }>حذف</button>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
