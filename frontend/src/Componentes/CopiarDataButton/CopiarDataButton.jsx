import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React from "react";
import "./CopiarDataButton.css";

export default function DescargarExcel({ data }) {
  const descargarExcel = () => {
    if (!data || data.length === 0) return;

    // Convertir JSON a hoja de Excel
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Empleados");

    // Crear archivo Excel
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "empleados.xlsx");
  };

  return (
    <button className="descargar-excel-btn" onClick={descargarExcel}>
      <img
        className="logoExcel"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Microsoft_Excel_2013-2019_logo.svg/1200px-Microsoft_Excel_2013-2019_logo.svg.png"
      />
    </button>
  );
}
