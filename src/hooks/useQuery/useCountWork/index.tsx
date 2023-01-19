import { useMutation, useQueryClient } from "react-query";
import { useDateFormatter } from "../../../Generic/HeaderCalendar";
import { useAxios } from "../../useAxios";

const UpdateByIdFromCache = () => {
  const format = useDateFormatter();
  const queryClient = useQueryClient();

  return (recievedData: {
    idFlow?: string;
    date: Date;
    userData: { _id?: string };
  }) => {
    queryClient.setQueryData(
      `${recievedData.idFlow}/attandances/${format(recievedData.date)}`,
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
                  value?._id === recievedData.userData?._id
                    ? recievedData.userData
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

const useChangeCountWork = () => {
  const axios = useAxios();
  const updateFromCache = UpdateByIdFromCache();

  return useMutation(
    (data: {
      date: Date;
      idFlow?: string;
      _id: string;
      userData: { _id?: string };
    }) => {
      updateFromCache(data);

      return axios({
        url: "/merchants/update",
        method: "POST",
        body: {
          flowType: data.idFlow,
          createDate: data.date.getTime(),
          shoudUpdateData: {
            ...data.userData,
          },
          _id: data._id,
        },
      });
    }
  );
};

export { useChangeCountWork };
