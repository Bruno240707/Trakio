import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React from "react";
import "./CopiarDataButton.css";

export default function CopiarDataGeneralButton({ empleados }) {
  const descargarExcel = () => {
    if (!empleados || empleados.length === 0) return;

    const headerData = [
      ["Lista de Empleados"],
      [""],
      ["Vista:", "General"],
      ["Fecha de Exportación:", new Date().toLocaleDateString()],
      [""],
    ];

    const dataHeaders = ["ID", "Nombre", "Apellido", "Email", "Teléfono"];
    headerData.push(dataHeaders);

    empleados.forEach(emp => {
      headerData.push([emp.id, emp.nombre, emp.apellido, emp.email, emp.telefono]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(headerData);
    worksheet['!cols'] = dataHeaders.map(() => ({ wch: 15 }));
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: dataHeaders.length - 1 } }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Empleados");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    const fileName = `Empleados_General_${new Date().toISOString().slice(0,10)}.xlsx`;

    saveAs(blob, fileName);
    return empleados;
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
