import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MainTable = ({
  category,
  data,
  columns,
  deleteItemHandler,
  editItemHandler,
  dataCategory,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ bgcolor: "#758889" }}>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell key={index} sx={{ color: "white" }}>
                {col.header}
              </TableCell>
            ))}
            <TableCell sx={{ color: "white" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) =>
            row[category] === dataCategory ? (
              <TableRow key={row.id}>
                {columns.map((col, index) => (
                  <TableCell key={index}>{row[col.field]}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => editItemHandler(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteItemHandler(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ) : (
              <TableRow key={row.id}>
                {columns.map((col, index) => (
                  <TableCell key={index}>{row[col.field]}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => editItemHandler(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteItemHandler(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
