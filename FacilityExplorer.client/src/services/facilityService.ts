import authenticationService from "./authenticationService";

export interface FacilityRequest {
  name: string;
  typeOfFacility: string;
  fullAddress: string;
  hours: string;
  phoneNumber: string;
  websiteUrl: string;
  description: string;
  insurance?: string;
  payment?: string;
}

export const defaultFacilityRequest: FacilityRequest = {
  name: "",
  typeOfFacility: "",
  fullAddress: "",
  hours: "",
  phoneNumber: "",
  websiteUrl: "",
  description: "",
  insurance: "",
  payment: "",
};

export interface Facility {
  id: number;
  name: string;
  typeOfFacility: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  hours: string;
  phoneNumber: string;
  websiteUrl: string;
  description: string;
  insurance?: string;
  payment?: string;
}

const isLocalhost = window.location.hostname === "localhost";
// Note add /api for facility calls.
const BASE_URL = isLocalhost
  ? "https://localhost:5001/api/"
  : "https://facilityexplorer.azurewebsites.net/api/";
const GET = "GET";
const DELETE = "DELETE";
const PUT = "PUT";
const POST = "POST";

const facilityService = {
  updateFacility: async (
    id: number,
    updatedFacility: FacilityRequest
  ): Promise<FacilityRequest> => {
    try {
      const headers = authenticationService.addAuthorizationHeader({});
      const response = await fetch(`${BASE_URL}facility/${id}`, {
        method: PUT,
        headers,
        body: JSON.stringify(updatedFacility),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit facility`);
      }

      const editedFacility = await response.json();
      return editedFacility;
    } catch (error) {
      console.error("Error editing facility:");
      throw error;
    }
  },

  getFacilities: async (): Promise<Facility[] | undefined> => {
    try {
      const response = await fetch(`${BASE_URL}facilities`, {
        method: GET,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching facilities");
      return undefined;
    }
  },

  createFacility: async (
    facilityRequest: FacilityRequest
  ): Promise<Facility | undefined> => {
    try {
      const headers = authenticationService.addAuthorizationHeader({});
      const response = await fetch(`${BASE_URL}facility`, {
        method: POST,
        headers,
        body: JSON.stringify(facilityRequest),
      });

      if (response.ok) {
        const createdFacility = await response.json();
        console.log("Created Facility");
        return createdFacility;
      } else {
        console.error("Failed to create facility");
        return undefined;
      }
    } catch (error) {
      console.error("Error creating facility");
      return undefined;
    }
  },

  deleteFacility: async (id: number): Promise<void> => {
    try {
      const headers = authenticationService.addAuthorizationHeader({});
      const response = await fetch(`${BASE_URL}facility/${id}`, {
        method: DELETE,
        headers,
      });

      if (!response.ok) {
        console.error("Failed to delete facility");
      }
    } catch (error) {
      console.error("Error deleting facility");
    }
  },
};

export default facilityService;
