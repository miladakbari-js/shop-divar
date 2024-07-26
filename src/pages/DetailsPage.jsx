import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "src/services/user";

function DetailsPage() {
    const { data, isLoading} = useQuery(["post-list"], getAllPost);
    console.log({data});
  return (
    <div>DetailsPage</div>
  )
}

export default DetailsPage