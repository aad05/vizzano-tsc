import React, { FC, useState } from "react";
import { Title } from "../../Generic/Styles/style";
import { Wrapper } from "./style";
import TableComponent from "./Table";
import TableLoading from "../../Generic/TableLoading";
import useQueryHandler from "../../hooks/useQuery";
import { Button } from "antd";
import AddModal from "./AddModal";

const Store: FC<{ cancelFeatures?: boolean }> = React.memo(
  ({ cancelFeatures }) => {
    const useQuery = useQueryHandler();
    const [addModalOpen, setAddModalOpen] = useState(false);

    const { data, isLoading } = useQuery({
      method: "GET",
      queryLink: "/store",
      queryKey: `/store`,
    });

    return (
      <Wrapper>
        <AddModal open={addModalOpen} onCancel={() => setAddModalOpen(false)} />
        <Title first={!cancelFeatures}>Склад</Title>
        {!!isLoading ? (
          <TableLoading trCount={10} />
        ) : (
          <TableComponent
            cancelFeatures={cancelFeatures}
            data={data?.data?.data}
          />
        )}

        {!cancelFeatures && (
          <Button
            type="primary"
            style={{
              borderRadius: "12px",
              margin: "50px 0",
            }}
            onClick={() => setAddModalOpen(true)}
            disabled={isLoading}
          >
            + Добавить товар
          </Button>
        )}
      </Wrapper>
    );
  }
);

export default Store;
