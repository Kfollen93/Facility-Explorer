import jsPDF from "jspdf";
import "jspdf-autotable";
import { Facility } from "../services/facilityService";
import { facilityTypes } from "./facilityTypes";
import { getCurrentDateMonthDayYear } from "./dateFormats";

async function generatePDF(selectedFacilities: Facility[]) {
  const doc = new jsPDF();

  // Set font styles
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(getCurrentDateMonthDayYear, 10, 10);

  let yPosition = 20;

  Object.entries(facilityTypes).forEach(([typeKey, typeName]) => {
    const facilitiesOfType = selectedFacilities.filter(
      (facility) => facility.typeOfFacility === typeKey
    );

    if (facilitiesOfType.length > 0) {
      yPosition += 5; // Additional space

      // Section header styling
      doc.setTextColor("#2196F3"); // Blue
      doc.setFont("_", "bold").setFontSize(20);
      doc.text(typeName, 10, yPosition);
      yPosition += 10;

      facilitiesOfType.forEach((facility) => {
        // Facility details styling
        doc.setTextColor("#000000"); // Black
        doc.setFont("_", "normal").setFontSize(12);
        doc.text(`${facility.name}`, 20, yPosition);
        doc.text(
          `${facility.address.street}, ${facility.address.city}, ${facility.address.state} ${facility.address.zipcode}`,
          20,
          (yPosition += 4)
        );
        doc.text(`Hours: ${facility.hours}`, 20, (yPosition += 4));
        doc.text(`Phone: ${facility.phoneNumber}`, 20, (yPosition += 4));
        doc.text(`Website: ${facility.websiteUrl}`, 20, (yPosition += 4));
        doc.text(`Description: ${facility.description}`, 20, (yPosition += 4));

        // Add spacing between facilities
        yPosition += 8;
      });

      // Add line separator after each section
      doc.setDrawColor("#000000"); // Black color for the line separator
      doc.line(10, yPosition, 200, yPosition);
      yPosition += 5; // Additional space
    }
  });

  doc.save("Facilities.pdf");
}

export default generatePDF;
