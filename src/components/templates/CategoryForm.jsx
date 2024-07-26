import { useState } from "react";

import styles from "./CategoryForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "services/admin";

function CategoryForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", icon: "", slug: "" });

  const { mutate, isLoading, error, data } = useMutation(addCategory, {
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });
  console.log({ isLoading, error, data });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3>دسته بندی</h3>
      {!!error && <p>مشکلی پیش آمده است</p>}
      {data?.status && <p>دسته بندی با موفقیت ایجاد شد</p>}
      <label htmlFor="name">نام دسته بندی</label>
      <input name="name" type="text" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input name="slug" type="text" id="slug" />
      <label htmlFor="icon"> آیکن </label>
      <input name="icon" type="text" id="icon" />
      <button type="submit" disabled={isLoading}>
        ایجاد کردن
      </button>
    </form>
  );
}

export default CategoryForm;
