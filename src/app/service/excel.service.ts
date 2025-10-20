/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }
}
*/

import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'; // Importar la librería xlsx

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  /**
   * Exporta un array de JSON a un archivo de Excel (.xlsx).
   * @param json El array de objetos JSON con los datos.
   * @param excelFileName El nombre del archivo de salida.
   */
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    console.log("exportAsExcelFile", json, excelFileName);
    // 1. Crear la hoja de trabajo (WorkSheet)
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    // 2. Crear el libro de trabajo (WorkBook) con la hoja
    const workbook: XLSX.WorkBook = { 
        Sheets: { 'data': worksheet }, 
        SheetNames: ['data'] 
    };

    // 3. Escribir el archivo
    // Usamos directamente writeFile con el workbook para generar el .xlsx correctamente
    // (evita pasar el buffer como hoja, lo que provocaba archivos vacíos)
    XLSX.writeFile(workbook, excelFileName + EXCEL_EXTENSION);
  }

  /**
   * Función interna para descargar el archivo.
   */
  // Nota: mantenemos el método en caso de futuras necesidades (por ejemplo usar FileSaver).
  // Actualmente la exportación se realiza con XLSX.writeFile(workbook, filename) en
  // exportAsExcelFile para garantizar que el archivo no salga vacío.
}