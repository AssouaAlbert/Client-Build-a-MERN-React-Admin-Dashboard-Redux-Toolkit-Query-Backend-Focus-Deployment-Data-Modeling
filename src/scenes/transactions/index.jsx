import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import { useGetTransactionsQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolBar from "components/DataGridCustomToolBar";

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
  },
  {
    field: "products",
    headerName: "No. of Products",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => {
      return params.value.length;
    },
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params) => {
      return `$${Number(params.value).toFixed(2)}`;
    },
  },
];

function Transactions() {
  const theme = useTheme();
  // params for GET request
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort,
    search,
  });
  return (
    <Box>
      <Header title={"TRANSACTIONS"} subtitle={"LIST OF TRNSACTIONS"} />
      <Box
        mt="40px"
        height="80vh"
        p={"2rem"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={2}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPaginationModelChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort({ ...newSortModel })}
          components={{ Toolbar: DataGridCustomToolBar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
}

export default Transactions;
