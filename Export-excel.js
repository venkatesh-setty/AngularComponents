// export to excel 
npm install file-saver xlsx
//excel.service.ts

import * as FileSaver from 'file-saver';  
import * as XLSX from 'xlsx';  
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';  
const EXCEL_EXTENSION = '.xlsx';  
@Injectable({  
  providedIn: 'root'  
})  
export class ExcelServicesService {  
  constructor() { }  
  public exportAsExcelFile(json: any[], excelFileName: string, header?:string[]): void {  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json,header);  
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    this.saveAsExcelFile(excelBuffer, excelFileName);  
  }  
 
  
  public exportMultipleSheets(sheets : {[sheet:string]:any[]}, excelFileName: string,):void {
	 if(!sheets) {return};
	const worksheets: { [sheet:string]: XLSX.WorkSheet} ={};
	if(let sheet in worksheets) {
		worksheets[sheet] = XLSX.utils.json_to_sheet(sheets[sheet]);  
	}
    const workbook: XLSX.WorkBook = { Sheets:worksheets, SheetNames: Object.keys(worksheets)};  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); 
	 this.saveAsExcelFile(excelBuffer, excelFileName);  
  }
  
    private saveAsExcelFile(buffer: any, fileName: string): void {  
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});  
     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);  
  } 
}  

//your.component.ts
public excel:any =[];
public downloadData1 = this.excel.map( row =>{
	const result ={...row
	// delete one key from response add in side result
	// delete["keyname"]
	
	//rename key name in the  response
	//newkeyname = row['oldkeyname']
	}
	return result;
	// delete multiple keys sfrom response add in side result
	//const {key name1,keyname2,etc ...newResult} = result;
	//return newResult;
	
	
})
public header = ["id","name"];
this.excelservice.exportAsExcelFile(this.downloadData1,"download_file_name", this.header);
	
})


this.excelservice.exportAsExcelFile({ Sheet1 :this.downloadData1, Sheet2:this.downloadData}, 'test_download');
	// sheet1 is sheet name , downloadData1 is data you want download from Api in Array of jsons