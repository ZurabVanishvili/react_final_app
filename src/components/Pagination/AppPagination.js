import { Box, Pagination } from "@mui/material";

const AppPagination = ({ count, pagingChange }) => {
  const handleChange = (e) => {
    const num = Number(e.target.innerText);
    if (num === 1) {
      pagingChange(0);
    } else {
      pagingChange(8 * (num - 1));
    }
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}
    >
      <Pagination
        onChange={handleChange}
        count={count}
        size="large"
        variant="outlined"
        shape="rounded"
        hideNextButton
        hidePrevButton
      />
    </Box>
  );
};

export default AppPagination;
