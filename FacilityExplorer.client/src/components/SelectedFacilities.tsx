import React from "react";
import { Facility } from "../services/facilityService";

interface SelectedFacilitiesProps {
  selectedFacilities: Facility[];
  removeSelectedFacility: (id: number) => void;
}

const SelectedFacilitiesList: React.FC<SelectedFacilitiesProps> = ({
  selectedFacilities,
  removeSelectedFacility,
}) => {
  return (
    <div>
      <h2>Selected Facilities</h2>
      <table id="my-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>City</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {selectedFacilities.map((facility) => (
            <tr key={facility.id}>
              <td>{facility.name}</td>
              <td>{facility.phoneNumber}</td>
              <td>{facility.websiteUrl}</td>
              <td>
                <button onClick={() => removeSelectedFacility(facility.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectedFacilitiesList;
