import React, { useState } from "react";
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
import { formatPhoneNumber, phoneNumberRegex } from "../utils/phoneNumberUtils";
import { addressRegex } from "../utils/addressUtils";

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
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  const [addressError, setAddressError] = useState<string | null>(null);

  const validatePhoneNumber = (value: string) =>
    setPhoneNumberError(
      !phoneNumberRegex.test(value) ? "Invalid phone number format." : null
    );
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    validatePhoneNumber(value);
    handleInputChange("phoneNumber", value);
  };

  const validateAddress = (value: string) =>
    setAddressError(
      !addressRegex.test(value) ? "Invalid address format." : null
    );
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    validateAddress(value);
    handleInputChange("fullAddress", value);
  };

  const potentialErrors: Array<string | null> = [
    phoneNumberError,
    addressError,
  ];
  const hasErrors = potentialErrors.some(
    (err) => err !== null && err !== undefined
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasErrors) return;
    isEditing ? await handleEditFacility(e) : await handleCreateFacility(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ textAlign: "center", color: "black" }}>
        {isEditing ? <h2>Edit a Facility</h2> : <h2>Create a Facility</h2>}
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
            placeholder="123 Ez Street, Coolville, WA 98101"
            value={formatPhoneNumber(newFacility.fullAddress)}
            onChange={handleAddressChange}
            error={Boolean(addressError)}
            helperText={addressError}
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
            fullWidth
            required
            placeholder="(xxx) xxx-xxxx"
            value={formatPhoneNumber(newFacility.phoneNumber)}
            onChange={handlePhoneNumberChange}
            error={Boolean(phoneNumberError)}
            helperText={phoneNumberError}
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
