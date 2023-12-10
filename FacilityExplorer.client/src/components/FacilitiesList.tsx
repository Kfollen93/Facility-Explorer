import React from "react";
import { Facility } from "../services/facilityService";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

interface FacilitiesListProps {
  facilities: Facility[] | undefined;
  addSelectedFacility: (id: number) => void;
  deleteFacility: (id: number) => void;
  editFacility: (id: number) => void;
  createFacility: () => void;
}

interface HeadCell {
  id: keyof Facility;
  label: string;
}

const headerCells: HeadCell[] = [
  { id: "name", label: "Name" },
  { id: "typeOfFacility", label: "Type" },
  { id: "address", label: "Address" },
  { id: "hours", label: "Hours" },
  { id: "phoneNumber", label: "Phone Number" },
  { id: "websiteUrl", label: "Website" },
  { id: "description", label: "Description" },
  { id: "insurance", label: "Insurance" },
  { id: "payment", label: "Payment" },
];

const FacilitiesList: React.FC<FacilitiesListProps> = ({
  facilities,
  addSelectedFacility,
  deleteFacility,
  editFacility,
  createFacility,
}) => {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Facility>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleRequestSort = (property: keyof Facility) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredFacilities = React.useMemo(() => {
    if (!facilities) return [];
    return facilities.filter((facility) =>
      Object.values(facility).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [facilities, searchTerm]);

  const sortedFacilities = React.useMemo(() => {
    return filteredFacilities.slice().sort((a, b) => {
      const valueA = a[orderBy] as string;
      const valueB = b[orderBy] as string;

      return order === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }, [filteredFacilities, orderBy, order]);

  return (
    <div
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        padding: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          style={{ marginRight: "8px", paddingLeft: "8px" }}
          label="Search..."
          size="small"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Button
          variant="contained"
          size="small"
          style={{
            marginLeft: "945px",
            minWidth: "25px",
            height: "25px",
          }}
          onClick={createFacility}
        >
          <AddBusinessIcon />
        </Button>
      </div>
      <TableContainer style={{ maxHeight: "600px", overflowY: "auto" }}>
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              {headerCells.map((headCell) => (
                <TableCell key={headCell.id}>
                  {["name", "typeOfFacility", "insurance"].includes(
                    headCell.id
                  ) ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={order}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    <span>{headCell.label}</span>
                  )}
                </TableCell>
              ))}
              <TableCell>Select</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedFacilities
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((facility) => (
                <TableRow key={facility.id}>
                  {headerCells.map((headCell) => (
                    <TableCell key={headCell.id}>
                      {headCell.id === "address" ? (
                        `${facility.address.street}, ${facility.address.city}, ${facility.address.state} ${facility.address.zipcode}`
                      ) : headCell.id === "websiteUrl" ? (
                        <Link
                          href={facility[headCell.id] as string}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {facility[headCell.id]}
                        </Link>
                      ) : (
                        facility[headCell.id]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        minWidth: "25px",
                        height: "25px",
                      }}
                      onClick={() => addSelectedFacility(facility.id)}
                    >
                      <AddIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        minWidth: "25px",
                        height: "25px",
                      }}
                      onClick={() => editFacility(facility.id)}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        minWidth: "25px",
                        height: "25px",
                      }}
                      onClick={() => deleteFacility(facility.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedFacilities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default FacilitiesList;
