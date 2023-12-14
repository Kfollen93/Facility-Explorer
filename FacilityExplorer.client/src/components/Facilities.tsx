import React, { useState, useEffect } from "react";
import facilityService, {
  Facility,
  FacilityRequest,
  defaultFacilityRequest,
} from "../services/facilityService";
import FacilitiesList from "./FacilitiesList";
import FacilityForm from "./FacilityForm";
import SelectedFacilitiesList from "./SelectedFacilities";
import generatePDF from "../utils/pdfUtils";
import GenericModal from "./GenericModal";
import { Button } from "@mui/material";

function Facilities() {
  const [facilities, setFacilities] = useState<Facility[] | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [newFacility, setNewFacility] = useState<FacilityRequest>(
    defaultFacilityRequest
  );
  const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState<boolean>(false);
  const [editingFacilityId, setEditingFacilityId] = useState<number>(-1);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    getFacilities();
  }, []); // Fetch facilities on component mount

  const getFacilities = async () => {
    setLoading(true);
    try {
      const data = await facilityService.getFacilities();
      if (data !== undefined) {
        setFacilities(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    console.log("handleinputchange");
    setNewFacility((prevFacility) => ({
      ...prevFacility,
      [field]: value,
    }));
  };

  const handleCreateFacility = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating facility with data:", newFacility);

    const createdFacility = await facilityService.createFacility(newFacility);

    if (createdFacility !== undefined) {
      console.log("Created Facility:", createdFacility);
      setNewFacility(defaultFacilityRequest);
      await getFacilities();
      closeGenericModal();
    } else {
      // Logging for now, should display to user.
      console.error("Failed to create facility. Please check your input.");
    }
  };

  const deleteFacility = async (id: number) => {
    await facilityService.deleteFacility(id);
    await getFacilities();
  };

  const handleEditFacility = async (e: React.FormEvent) => {
    e.preventDefault();
    await facilityService.updateFacility(editingFacilityId, newFacility);
    await getFacilities();
    closeGenericModal();
  };

  const editFacility = async (id: number) => {
    const selectedFacility = facilities!.find((facility) => facility.id === id);

    if (selectedFacility) {
      const fullAddress = `${selectedFacility.address.street}, ${selectedFacility.address.city}, ${selectedFacility.address.state} ${selectedFacility.address.zipcode}`;
      setNewFacility({
        ...defaultFacilityRequest,
        ...selectedFacility,
        fullAddress,
      });
      setIsEditing(true);
      setEditingFacilityId(id);
      openGenericModal();
    }
  };

  // Clear the "Create" form of any prior edit values before it opens.
  useEffect(() => {
    if (!isEditing && isGenericModalOpen)
      setNewFacility(defaultFacilityRequest);
  }, [isEditing, isGenericModalOpen]);

  const addSelectedFacility = (id: number) => {
    const selectedFacility = facilities!.find((facility) => facility.id === id);
    if (selectedFacilities.includes(selectedFacility!)) return;

    setSelectedFacilities((prevSelectedFacilities) => [
      ...prevSelectedFacilities,
      selectedFacility as Facility,
    ]);
  };

  const removeSelectedFacility = (id: number) => {
    setSelectedFacilities((prevSelectedFacilities) =>
      prevSelectedFacilities.filter((facility) => facility.id !== id)
    );
  };

  const openGenericModal = () => {
    console.log("modal opened");
    setIsGenericModalOpen(true);
  };

  const closeGenericModal = () => {
    setIsGenericModalOpen(false);
    setIsEditing(false);
  };

  const handleGeneratePDF = () => {
    generatePDF(selectedFacilities);
  };

  const contents = loading ? (
    <p>Loading facilities...</p>
  ) : facilities === undefined ? (
    <p>
      <Button variant="contained" onClick={getFacilities}>
        Refresh Facilities
      </Button>
    </p>
  ) : (
    <div>
      <GenericModal
        open={isGenericModalOpen}
        onClose={closeGenericModal}
        anyComponent={
          <FacilityForm
            newFacility={newFacility}
            handleInputChange={handleInputChange}
            handleCreateFacility={handleCreateFacility}
            handleEditFacility={handleEditFacility}
            isEditing={isEditing}
          />
        }
      />
      <FacilitiesList
        facilities={facilities}
        addSelectedFacility={addSelectedFacility}
        deleteFacility={deleteFacility}
        editFacility={editFacility}
        createFacility={openGenericModal}
      />
      <SelectedFacilitiesList
        selectedFacilities={selectedFacilities}
        removeSelectedFacility={removeSelectedFacility}
        handleGeneratePDF={handleGeneratePDF}
      />
    </div>
  );

  return (
    <div>
      <h2 id="tabelLabel">Facilities</h2>
      {contents}
    </div>
  );
}

export default Facilities;
