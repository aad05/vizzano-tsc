import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../useAxios";

// Cache Handler
const useDeleteProductFromCache = () => {
  const queryClient = useQueryClient();

  return (recievedData: { _id: string }) => {
    queryClient.setQueryData(`/store`, (oldQuery: any) => {
      const selectedData = oldQuery?.data?.data;

      return {
        ...oldQuery,
        data: {
          ...oldQuery.data,
          data: [
            ...selectedData?.filter(
              (value: { _id: string }) => value._id !== recievedData._id
            ),
          ],
        },
      };
    });
  };
};

const useUpdateByIdCache = () => {
  const queryClient = useQueryClient();

  return (recievedData: { productData: { _id?: string } }) => {
    queryClient.setQueryData(`/store`, (oldQuery: any) => {
      const filterData = oldQuery?.data?.data;

      return {
        ...oldQuery,
        data: {
          ...oldQuery.data,
          data: [
            ...filterData?.map((value: { _id: string }) =>
              value?._id === recievedData.productData?._id
                ? recievedData.productData
                : value
            ),
          ],
        },
      };
    });
  };
};

const useAddStoreProductCache = () => {
  const queryClient = useQueryClient();

  return (recievedData: { productData: Object }) => {
    queryClient.setQueryData(`/store`, (oldQuery: any) => {
      const filterData = oldQuery?.data?.data;

      return {
        ...oldQuery,
        data: {
          ...oldQuery.data,
          data: [...filterData, recievedData.productData],
        },
      };
    });
  };
};

const useUpdateStoreByID = () => {
  const axios = useAxios();
  const updateFromCache = useUpdateByIdCache();

  return useMutation(
    (data: {
      productData: {
        _id?: string;
        sendedThings?: number;
        productName?: string;
        things?: number;
      };
    }) => {
      updateFromCache(data);

      return axios({
        url: "/store/update",
        method: "POST",
        body: {
          ...data.productData,
        },
      });
    }
  );
};

const useStoreProductDeleteByID = () => {
  const axios = useAxios();
  const deleteById = useDeleteProductFromCache();

  return useMutation((data: { _id: string }) => {
    deleteById(data);
    return axios({
      url: "/store/delete",
      method: "POST",
      body: {
        _id: data._id,
      },
    });
  });
};

export {
  useAddStoreProductCache,
  useStoreProductDeleteByID,
  useUpdateStoreByID,
};
