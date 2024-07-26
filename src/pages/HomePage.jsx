import { useQuery } from "@tanstack/react-query";
import Loader from "src/components/modules/Loader";
import Main from "src/components/templates/Main";
import Sidebar from "src/components/templates/Sidebar";
import { addCategory } from "src/services/admin";
import { getCategory } from "src/services/admin";
import { getAllPost } from "src/services/user";

function HomePage() {
  const style = { display: "flex" };
  const { data: posts, isLoading: postsLoading} = useQuery(["post-list"], getAllPost);
  const { data: categories , isLoading: categoryLoading } = useQuery(["get-categories"], getCategory);

  return (
    <>
      {postsLoading || categoryLoading ? (
        <Loader />
      ) : (
        <div style={style}>
          <Sidebar categories={categories}/>
          <Main posts={posts}/>
        </div>
      )}
    </>
  );
}

export default HomePage;
