import { FC } from "react";
import { Button, Checkbox, Skeleton } from "antd";
import { Wrapper } from "./style";

const TableLoading: FC<{ trCount: number }> = ({ trCount = 5 }) => {
  return (
    <Wrapper>
      <Wrapper.TableWrapper>
        <Wrapper.Table>
          <Wrapper.Table.Head>
            <Wrapper.Table.Tr>
              <Wrapper.Table.Th first>
                <Checkbox disabled={true} />
              </Wrapper.Table.Th>
              <Wrapper.Table.Th>Имя фамили</Wrapper.Table.Th>
              <Wrapper.Table.Th borderLeft>Действие</Wrapper.Table.Th>
            </Wrapper.Table.Tr>
          </Wrapper.Table.Head>
          <Wrapper.Table.Body>
            {Array.from({ length: trCount }).map((_, index) => (
              <Wrapper.Table.Tr key={index}>
                <Wrapper.Table.Th first>
                  <Checkbox disabled={true} />
                </Wrapper.Table.Th>
                <Wrapper.Table.Th>
                  <Skeleton.Input active={true} size={"small"} />
                </Wrapper.Table.Th>
                <Wrapper.Table.Th>
                  <Button disabled={true} danger>
                    Удалить
                  </Button>
                </Wrapper.Table.Th>
              </Wrapper.Table.Tr>
            ))}
          </Wrapper.Table.Body>
        </Wrapper.Table>
      </Wrapper.TableWrapper>
    </Wrapper>
  );
};

export default TableLoading;
