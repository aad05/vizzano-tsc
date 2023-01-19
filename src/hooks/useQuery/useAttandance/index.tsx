import { useMutation, useQueryClient } from "react-query";
import { useDateFormatter } from "../../../Generic/HeaderCalendar";
import { useAxios } from "../../useAxios";

// Cache Handler
const SwitchAllInCache = () => {
  const format = useDateFormatter();
  const queryClient = useQueryClient();

  return (dataPr: {
    idFlow: string;
    date: Date;
    defaultValue?: boolean;
    switchParams: boolean;
  }) => {
    queryClient.setQueryData(
      `${dataPr.idFlow}/attandances/${format(dataPr.date)}`,
      (oldQuery: any) => {
        const data = oldQuery?.data?.data[0];

        return {
          ...oldQuery,
          data: {
            ...oldQuery.data,
            data: [
              {
                ...data,
                data: dataPr.defaultValue
                  ? data?.data
                  : data?.data?.map((value: {}) => {
                      return { ...value, isCome: dataPr.switchParams };
                    }),
                isAllCome: dataPr.defaultValue ? false : dataPr.switchParams,
              },
            ],
          },
        };
      }
    );
  };
};
const SwitchComeByIdInCache = () => {
  const format = useDateFormatter();
  const queryClient = useQueryClient();

  return (recievedData: {
    idFlow: string;
    date: Date;
    userData: { _id: string };
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
                data: filterData?.data?.map(
                  (value: { _id: string; isCome: boolean }) =>
                    value?._id === recievedData.userData?._id
                      ? { ...value, isCome: !value?.isCome }
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
const DeleteComeByIdInCache = () => {
  const format = useDateFormatter();
  const queryClient = useQueryClient();

  return (recievedData: { date: Date; idFlow: string; _id: string }) => {
    queryClient.setQueryData(
      `${recievedData.idFlow}/attandances/${format(recievedData.date)}`,
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
const useAddUserToCache = () => {
  const format = useDateFormatter();
  const queryClient = useQueryClient();

  return (recievedData: { date: Date; idFlow: string; userData: Object }) => {
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
                data: [...filterData.data, recievedData.userData],
              },
            ],
          },
        };
      }
    );
  };
};

// Hook controllers
const useSwitchAllCome = () => {
  const axios = useAxios();
  const switchInCache = SwitchAllInCache();

  return useMutation(
    (data: { switchParams: boolean; date: Date; idFlow: string }) => {
      switchInCache(data);

      return axios({
        url: "/merchants/update_all_come",
        method: "POST",
        body: {
          flowType: data.idFlow,
          isAllCome: data.switchParams,
          createDate: data.date.getTime(),
        },
      });
    },
    {
      onSuccess: (data) => {},
    }
  );
};
const useSwitchById = () => {
  const axios = useAxios();
  const switchById = SwitchComeByIdInCache();

  return useMutation(
    (data: {
      date: Date;
      idFlow: string;
      _id: string;
      userData: { isCome: boolean; _id: string };
    }) => {
      switchById({
        idFlow: data.idFlow,
        date: data.date,
        userData: data.userData,
      });
      return axios({
        url: "/merchants/update",
        method: "POST",
        body: {
          flowType: data.idFlow,
          createDate: data.date.getTime(),
          shoudUpdateData: {
            ...data.userData,
            isCome: !data.userData.isCome,
          },
          _id: data._id,
        },
      });
    }
  );
};

const useDeleteByID = () => {
  const axios = useAxios();
  const deleteById = DeleteComeByIdInCache();

  return useMutation((data: { date: Date; idFlow: string; _id: string }) => {
    deleteById(data);
    return axios({
      url: "/merchants/delete_user",
      method: "POST",
      body: {
        flowType: data.idFlow,
        createDate: data.date.getTime(),
        idUsers: [data._id],
      },
    });
  });
};

export { useSwitchAllCome, useSwitchById, useDeleteByID, useAddUserToCache };
