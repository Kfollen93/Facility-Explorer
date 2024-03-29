import React from "react";
import { Facility } from "../services/facilityService";
import { List, ListItem, ListItemText, Button, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface SelectedFacilitiesProps {
  selectedFacilities: Facility[];
  removeSelectedFacility: (id: number) => void;
  handleGeneratePDF: () => void;
}

const SelectedFacilitiesList: React.FC<SelectedFacilitiesProps> = ({
  selectedFacilities,
  removeSelectedFacility,
  handleGeneratePDF,
}) => {
  if (selectedFacilities.length === 0) return null;
  return (
    <div>
      <h2 style={{ color: "black" }}>Selected Facilities</h2>
      <div>
        <Paper
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "30%",
            margin: "20px auto",
            backgroundColor: "#ccac8c",
          }}
        >
          <List style={{ flex: 1, width: "100%" }}>
            {selectedFacilities.map((facility) => (
              <ListItem
                key={facility.id}
                style={{
                  marginBottom: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  width: "100%",
                  backgroundColor: "#f9f9f9",
                  textAlign: "center",
                }}
              >
                <ListItemText
                  primary={`${facility.name} (${facility.typeOfFacility})`}
                />
                <Button
                  onClick={() => removeSelectedFacility(facility.id)}
                  style={{ color: "#1eb3a4" }}
                >
                  <DeleteIcon />
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
        <button
          onClick={handleGeneratePDF}
          style={{
            backgroundColor: "#ccac8c",
            color: "#FFFFFF",
            fontWeight: "bold",
            border: "none",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "5px",
          }}
        >
          Download Selected PDF
        </button>
      </div>
    </div>
  );
};

export default SelectedFacilitiesList;
