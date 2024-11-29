import { SxProps, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./styled-table";
import { TableBodyKeyType, alignType } from "../../common/types";
import { TableBodyProps } from "./custom-table";

const TableBody = ({ paginated, data, table, resource, onOpen, defined, header, viewOnly }: TableBodyProps) => {
  if (!resource) throw new Error("The resource props are not being passed as TableBody props.");
  const keys = resource?.keys;
  // const search = resource?.search;
  const callback = resource?.callback;

  const permissions = resource?.permissions;

  // const regex = new RegExp(search, "gi");
  const valueProp: { align?: alignType; sx?: SxProps } = { align: "center" };

  const { page, rowsPerPage } = table;

  if (!defined && paginated) data = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const prevIndex = page * rowsPerPage;

  return (
    <>
      {data.map((val: any, index: any) => (
        <StyledTableRow key={prevIndex + index}>
          {keys.map((_key: TableBodyKeyType, i: number) => {
            // if (typeof key === "string") {
            //   if (Array.isArray(val?.[key])) {
            //     return (
            //       <StyledTableCell {...valueProp}>
            //         {val?.[key].map((value: any, i: number) => {
            //           const highlightedText = value?.toString().replace(regex, "<mark>$&</mark>");
            //           return <Typography key={i} fontSize={13} dangerouslySetInnerHTML={{ __html: highlightedText }} />;
            //         })}
            //       </StyledTableCell>
            //     );
            //   }

            //   const highlightedText = val?.[key]?.toString().replace(regex, "<mark>$&</mark>");
            //   return <StyledTableCell {...valueProp} key={i} dangerouslySetInnerHTML={{ __html: highlightedText }} />;
            // }

            let { key, Component, formatter, align } = _key;
            if (viewOnly && header[i].label?.toLowerCase() === "action") return;
            if (!formatter)
              formatter = (data: any) => {
                if (Array.isArray(data)) {
                  return data.map((list, i) => (
                    <Typography key={i} fontSize={13}>
                      {list}
                    </Typography>
                  ));
                } else return data;
              };
            return (
              <StyledTableCell {...valueProp} align={align ?? "center"} key={i} sx={{ height: 45 }}>
                {Component ? (
                  <Component
                    onOpen={onOpen}
                    callback={callback}
                    permissions={permissions}
                    data={key ? val[key] : val}
                  />
                ) : (
                  // @ts-ignore
                  formatter(val[key])
                )}
              </StyledTableCell>
            );
          })}
        </StyledTableRow>
      ))}
    </>
  );
};

export default TableBody;
