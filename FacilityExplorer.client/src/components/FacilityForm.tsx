import React from "react";
import { FacilityRequest } from "../services/facilityService";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import { facilityTypes } from "../utils/facilityTypes";

interface FacilityFormProps {
  newFacility: FacilityRequest;
  handleInputChange: (field: string, value: string) => void;
  handleCreateFacility: (e: React.FormEvent) => Promise<void>;
  isEditing: boolean;
  handleEditFacility: (e: React.FormEvent) => Promise<void>;
}

const FacilityForm: React.FC<FacilityFormProps> = ({
  newFacility,
  handleInputChange,
  handleCreateFacility,
  isEditing,
  handleEditFacility,
}) => {
  return (
    <form onSubmit={isEditing ? handleEditFacility : handleCreateFacility}>
      <div style={{ textAlign: "center" }}>
        {isEditing ? <h2>View/Edit a Facility</h2> : <h2>Create a Facility</h2>}
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            type="text"
            fullWidth
            required
            value={newFacility.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl required fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={newFacility.typeOfFacility}
              onChange={(e) =>
                handleInputChange("typeOfFacility", e.target.value as string)
              }
            >
              {Object.keys(facilityTypes).map((facilityType: string) => (
                <MenuItem key={facilityType} value={facilityType}>
                  {facilityType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            type="text"
            fullWidth
            required
            value={newFacility.fullAddress}
            onChange={(e) => handleInputChange("fullAddress", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Hours"
            type="text"
            fullWidth
            required
            value={newFacility.hours}
            onChange={(e) => handleInputChange("hours", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            type="tel"
            helperText="Format: xxx-xxx-xxxx"
            fullWidth
            required
            value={newFacility.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Website"
            type="url"
            fullWidth
            required
            value={newFacility.websiteUrl}
            onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            type="text"
            multiline
            rows={4}
            fullWidth
            required
            value={newFacility.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Insurance"
            type="text"
            fullWidth
            required
            value={newFacility.insurance}
            onChange={(e) => handleInputChange("insurance", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Payment"
            type="text"
            fullWidth
            required
            value={newFacility.payment}
            onChange={(e) => handleInputChange("payment", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          {isEditing ? (
            <Button type="submit" variant="contained" color="primary">
              Update Facility
            </Button>
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Add Facility
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default FacilityForm;
