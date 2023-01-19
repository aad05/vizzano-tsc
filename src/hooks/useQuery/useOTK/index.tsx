import { useMutation, useQueryClient } from "react-query";
import { useDateFormatter } from "../../../Generic/HeaderCalendar";
import { useAxios } from "../../useAxios";

// Cache Handler
const useDeleteProductFromCache = () => {
  const format = useDateFormatter();
  const queryClient = useQueryClient();

  return (recievedData: { date: Date; idFlow: string; _id: string }) => {
    queryClient.setQueryData(
      `${recievedData.idFlow}/otk/${format(recievedData.date)}`,
      (oldQuery: any) => {
        const data = oldQuery?.data?.data[0];

        return {
          ...oldQuery,
          data: {
            ...oldQuery.data,
            data: [
              {
                ...data,
                data: data.data.filter(
                  (value: { _id: string }) => value._id !== recievedData._id
                ),
              },
            ],
          },
        };
      }
    );
  };
};
const useUpdateByIdCache = () => {
  const format = useDateFormatter();
  const queryClient = useQueryClient();

  return (recievedData: {
    idFlow?: string;
    date: Date;
    productData: { _id?: string };
  }) => {
    queryClient.setQueryData(
      `${recievedData.idFlow}/otk/${format(recievedData.date)}`,
      (oldQuery: any) => {
        const filterData = oldQuery?.data?.data[0];

        return {
          ...oldQuery,
          data: {
            ...oldQuery.data,
            data: [
              {
                ...filterData,
                data: filterData?.data?.map((value: { _id: string }) =>
                  value?._id === recievedData.productData?._id
                    ? recievedData.productData
                    : value
                ),
              },
            ],
          },
        };
      }
    );
  };
};

const useAddOTKProductCache = () => {
  const format = useDateFormatter();
  const queryClient = useQueryClient();

  return (recievedData: {
    date: Date;
    idFlow: string;
    productData: Object;
  }) => {
    queryClient.setQueryData(
      `${recievedData.idFlow}/otk/${format(recievedData.date)}`,
      (oldQuery: any) => {
        const filterData = oldQuery?.data?.data[0];

        return {
          ...oldQuery,
          data: {
            ...oldQuery.data,
            data: [
              {
                ...filterData,
                data: [...filterData.data, recievedData.productData],
              },
            ],
          },
        };
      }
    );
  };
};

const useUpdateOTKByID = () => {
  const axios = useAxios();
  const updateFromCache = useUpdateByIdCache();

  return useMutation(
    (data: {
      date: Date;
      idFlow?: string;
      _id: string;
      productData: { _id?: string };
    }) => {
      updateFromCache(data);

      return axios({
        url: "/otk/update",
        method: "POST",
        body: {
          flowType: data.idFlow,
          createDate: data.date.getTime(),
          shoudUpdateData: {
            ...data.productData,
          },
          _id: data._id,
        },
      });
    }
  );
};

const useOTKProductDeleteByID = () => {
  const axios = useAxios();
  const deleteById = useDeleteProductFromCache();

  return useMutation((data: { date: Date; idFlow: string; _id: string }) => {
    deleteById(data);
    return axios({
      url: "/otk/remove",
      method: "POST",
      body: {
        flowType: data.idFlow,
        createDate: data.date.getTime(),
        idProducts: [data._id],
      },
    });
  });
};

export { useAddOTKProductCache, useOTKProductDeleteByID, useUpdateOTKByID };
