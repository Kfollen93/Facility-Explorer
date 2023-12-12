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
      <h2>Selected Facilities</h2>
      <div>
        <Paper
          elevation={3}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "600px",
            marginLeft: "340px",
            marginBottom: "20px",
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
                }}
              >
                <ListItemText
                  primary={`${facility.name} (${facility.typeOfFacility})`}
                />
                <Button onClick={() => removeSelectedFacility(facility.id)}>
                  <DeleteIcon />
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
        <button onClick={handleGeneratePDF}>Download Selected PDF</button>
      </div>
    </div>
  );
};

export default SelectedFacilitiesList;
