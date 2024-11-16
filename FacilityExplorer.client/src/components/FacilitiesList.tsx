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
  Link,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { formatPhoneNumber } from "../utils/phoneNumberUtils";
import Login from "./Login";

interface FacilitiesListProps {
  facilities: Facility[] | undefined;
  addSelectedFacility: (id: number) => void;
  deleteFacility: (id: number) => void;
  editFacility: (id: number) => void;
  createFacility: () => void;
  searchTerm: string;
  roles: string[] | undefined;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  handleLogin: (email: string, password: string) => void;
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
  searchTerm,
  setPage,
  page,
  roles,
  handleLogin,
}) => {
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Facility>("name");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const filteredFacilities = React.useMemo(() => {
    if (!Array.isArray(facilities)) return [];
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
        boxShadow:
          "0px 4px 4px rgba(0, 0, 0, 0.2), 0px 0px 4px rgba(0, 0, 0, 0.2) inset",
        borderRadius: "8px",
        padding: "8px",
        backgroundColor: "#ccac8c", // Space between border and table.
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "8px",
        }}
      >
        <div style={{ marginBottom: "8px" }}>
          <Login onLogin={handleLogin} />
        </div>
        <div>
          {roles && roles.includes("Admin") && (
            <Button
              variant="contained"
              size="small"
              style={{
                backgroundColor: "#FFFFFF",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={createFacility}
            >
              Create <AddBusinessIcon style={{ paddingLeft: "5px" }} />
            </Button>
          )}
        </div>
      </div>

      <TableContainer
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          borderRadius: "8px",
        }}
      >
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              {headerCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  style={{
                    backgroundColor: "#FFFFFF",
                    fontWeight: "bold",
                    color: "black",
                  }} // Header row.
                >
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
              <TableCell
                style={{
                  backgroundColor: "#FFFFFF",
                  fontWeight: "bold",
                  color: "black",
                }} // ACTIONS
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedFacilities
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((facility) => (
                <TableRow
                  key={facility.id}
                  style={{
                    backgroundColor: "#f9f9f9",
                  }} // Body of table data.
                >
                  {headerCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      style={{}} // Table text
                    >
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
                      ) : headCell.id === "description" &&
                        facility.description.length > 30 ? (
                        <Tooltip title={facility.description} arrow>
                          <span>
                            {facility.description.substring(0, 30)}...
                          </span>
                        </Tooltip>
                      ) : headCell.id === "phoneNumber" ? (
                        formatPhoneNumber(facility[headCell.id] as string)
                      ) : (
                        facility[headCell.id]
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Button
                          size="small"
                          style={{
                            minWidth: "15px",
                            height: "15px",
                            color: "#1eb3a4",
                          }}
                          onClick={() => addSelectedFacility(facility.id)}
                        >
                          <AddIcon />
                        </Button>
                        {roles && roles.includes("Admin") && (
                          <Button
                            size="small"
                            style={{
                              minWidth: "15px",
                              height: "15px",
                              color: "#1eb3a4",
                            }}
                            onClick={() => editFacility(facility.id)}
                          >
                            <EditIcon fontSize="small" />
                          </Button>
                        )}
                      </div>
                      {roles && roles.includes("Admin") && (
                        <Button
                          size="small"
                          style={{
                            minWidth: "15px",
                            height: "15px",
                            marginTop: "5px",
                            color: "#1eb3a4",
                          }}
                          onClick={() => deleteFacility(facility.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                    </div>
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
