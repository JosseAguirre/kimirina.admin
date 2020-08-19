import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExporterxlsService {

  constructor() { }

  exportExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: {'data': worksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    //Se llama al metodo
    this.saveToExcel(excelBuffer, excelFileName);
  }

  private saveToExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().toISOString().slice(0, 10) + EXEL_EXT);
  }

}
