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

const BASE_URL = "https://localhost:5001/api/";
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
      const response = await fetch(`${BASE_URL}facility/${id}`, {
        method: PUT,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFacility),
      });

      if (!response.ok) {
        throw new Error(`Failed to edit facility`);
      }

      const editedFacility = await response.json();
      return editedFacility;
    } catch (error) {
      console.error("Error editing facility:", error);
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
      console.error("Error fetching facilities:", error);
      return undefined;
    }
  },

  createFacility: async (
    facilityRequest: FacilityRequest
  ): Promise<Facility | undefined> => {
    try {
      const response = await fetch(`${BASE_URL}facility`, {
        method: POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facilityRequest),
      });

      if (response.ok) {
        const createdFacility = await response.json();
        console.log("Created Facility:", createdFacility);
        return createdFacility;
      } else {
        console.error("Failed to create facility:", response.statusText);
        return undefined;
      }
    } catch (error) {
      console.error("Error creating facility:", error);
      return undefined;
    }
  },

  deleteFacility: async (id: number): Promise<void> => {
    try {
      const headers = authenticationService.addAuthorizationHeader({});
      console.log("Request Headers:", headers);

      const response = await fetch(`${BASE_URL}facility/${id}`, {
        method: DELETE,
        headers,
      });

      if (!response.ok) {
        console.error("Failed to delete facility:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting facility:", error);
    }
  },
};

export default facilityService;
