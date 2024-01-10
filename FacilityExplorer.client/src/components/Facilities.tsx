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
import { Button, TextField } from "@mui/material";
import { facilityTypes } from "../utils/facilityTypes";
import Login from "./Login";
import authenticationService from "../services/authenticationService";

function Facilities() {
  const [facilities, setFacilities] = useState<Facility[] | undefined>(
    undefined
  );
  const [copyOfFacilities, setCopyOfFacilities] = useState<
    Facility[] | undefined
  >(undefined);

  const [loading, setLoading] = useState<boolean>(false);
  const [newFacility, setNewFacility] = useState<FacilityRequest>(
    defaultFacilityRequest
  );
  const [selectedFacilities, setSelectedFacilities] = useState<Facility[]>([]);
  const [isGenericModalOpen, setIsGenericModalOpen] = useState<boolean>(false);
  const [editingFacilityId, setEditingFacilityId] = useState<number>(-1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const allButtonColor = "#ec8c1b";
  const [filterButtonClicked, setFilterButtonClicked] =
    useState<boolean>(false);
  const [page, setPage] = React.useState(0);

  useEffect(() => {
    getFacilities();
  }, []); // Fetch facilities on component mount

  const getFacilities = async () => {
    setLoading(true);
    try {
      const data = await facilityService.getFacilities();
      if (data !== undefined) {
        setFacilities(data);
        setCopyOfFacilities(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewFacility((prevFacility) => ({
      ...prevFacility,
      [field]: value,
    }));
  };

  const handleCreateFacility = async (e: React.FormEvent) => {
    e.preventDefault();
    await facilityService.createFacility(newFacility);
    setNewFacility(defaultFacilityRequest);
    await getFacilities();
    closeGenericModal();
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
    setIsGenericModalOpen(true);
  };

  const closeGenericModal = () => {
    setIsGenericModalOpen(false);
    setIsEditing(false);
  };

  const handleGeneratePDF = () => {
    generatePDF(selectedFacilities);
  };

  const filterSubTableByType = (facilityType: string) => {
    if (facilityType === "All") {
      setFacilities(copyOfFacilities);
    } else {
      const filteredFacilities = copyOfFacilities?.filter(
        (facility) => facility.typeOfFacility === facilityType
      );
      setFacilities(filteredFacilities);
    }
    setPage(0); // Reset table page when clicking new tab.
    setFilterButtonClicked(true);
  };

  const handleLogin = async (username: string, password: string) => {
    await authenticationService.login(username, password);
  };

  const renderFilterButtons = () => {
    // Array of facility type button colors, may remove. Right now same color.
    const buttonColors = ["#248cdc", "#eccc3c", "#2cb464"];
    return (
      <>
        <div style={{ marginBottom: "10px" }}>
          <Button
            variant="contained"
            style={{ backgroundColor: allButtonColor, marginRight: "10px" }}
            onClick={() => {
              filterSubTableByType("All");
            }}
          >
            All
          </Button>
          {Object.entries(facilityTypes).map(([facilityType], index) => (
            <Button
              key={facilityType}
              variant="contained"
              style={{
                marginRight: "10px",
                backgroundColor:
                  facilityType === "All" ? allButtonColor : buttonColors[index],
              }}
              onClick={() => {
                filterSubTableByType(facilityType);
              }}
            >
              {facilityType}
            </Button>
          ))}
        </div>
      </>
    );
  };

  const contents = loading ? (
    <p>
      <i>Loading facilities...</i>
    </p>
  ) : facilities === undefined ? (
    <div>
      <i>
        Try to refresh, but please note the server may be down for development.
      </i>
      <p>
        <Button variant="contained" onClick={getFacilities}>
          Refresh Facilities
        </Button>
      </p>
    </div>
  ) : (
    <div>
      <Login onLogin={handleLogin} />
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
      <>{renderFilterButtons()}</>
      {searchTerm !== "" || filterButtonClicked ? (
        <FacilitiesList
          facilities={facilities}
          addSelectedFacility={addSelectedFacility}
          deleteFacility={deleteFacility}
          editFacility={editFacility}
          createFacility={openGenericModal}
          searchTerm={searchTerm}
          handleSearchChange={(event) => setSearchTerm(event.target.value)}
          setPage={setPage}
          page={page}
        />
      ) : (
        ""
      )}

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
      <div style={{ marginBottom: "16px" }}>
        <TextField
          label="Search..."
          size="small"
          variant="outlined"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      {contents}
    </div>
  );
}

export default Facilities;
