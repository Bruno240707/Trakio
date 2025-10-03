import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React from "react";
import "./CopiarDataButton.css";

export default function DescargarExcel({ data, employee, sucursal, dataType, year, month, day, week }) {
  const descargarExcel = () => {
    if (!data || data.length === 0) return;

    // Crear datos para la hoja con información del empleado
    const headerData = [
      ["Reporte de Asistencia"],
      [""],
      ["Nombre del Empleado:", employee ? `${employee.nombre} ${employee.apellido}` : "N/A"],
      ["Sucursal:", sucursal ? sucursal.nombre : "N/A"],
      ["Tipo de Datos:", dataType || "General"],
      ["Período:", year && month ? `${year}-${month.toString().padStart(2,'0')}${day ? `-${day.toString().padStart(2,'0')}` : ''}${week && week > 0 ? ` Semana ${week}` : ''}` : (() => { const today = new Date(); return `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2,'0')}-${today.getDate().toString().padStart(2,'0')}`; })()],
      [""],
    ];

    // Agregar encabezados de la tabla de datos
    const dataHeaders = Object.keys(data[0] || {});
    headerData.push(dataHeaders);

    // Agregar filas de datos
    data.forEach(row => {
      headerData.push(dataHeaders.map(header => row[header] || ""));
    });

    // Crear hoja de Excel desde array de arrays
    const worksheet = XLSX.utils.aoa_to_sheet(headerData);

    // Establecer anchos de columna
    worksheet['!cols'] = dataHeaders.map(() => ({ wch: 15 }));

    // Fusionar celdas para el título
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: dataHeaders.length - 1 } }
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, dataType || "Datos");

    // Crear archivo Excel
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

    // Nombre del archivo más descriptivo
    const employeeName = employee ? `${employee.nombre}_${employee.apellido}`.replace(/\s+/g, '_') : "Empleado";
    const period = year && month ? `${year}_${month}${day ? `_${day}` : ''}${week && week > 0 ? `_Semana${week}` : ''}` : "General";
    const fileName = `Asistencia_${employeeName}_${dataType.replace(/\s+/g, '_')}_${period}.xlsx`;

    saveAs(blob, fileName);
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
