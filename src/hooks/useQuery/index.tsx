import { useQuery } from "react-query";
import { useAxios } from "../useAxios";

interface QueryHandlerProp {
  queryKey: string;
  queryLink: string;
  method: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  body?: Object;
}

const useQueryHandler = () => {
  const axios = useAxios();
  const QueryHandler = (props: QueryHandlerProp) => {
    const { queryKey, method, queryLink, body } = props;
    return useQuery(queryKey, () => axios({ url: queryLink, method, body }), {
      refetchOnWindowFocus: false,
    });
  };
  return QueryHandler;
};
export default useQueryHandler;
