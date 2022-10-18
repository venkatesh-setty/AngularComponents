// download pdf using jspdf and js autotable

npm install jspdf jspdf - autotable

//angular.json

"scripts": [
    "node_modules/jspdf/dist/jspdf.es.min.js",
    "node_modules/jspdf/dist/jspdf.plugin.autotable.min.js",
]

//@component.service.ts
import {jspdf} from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({  
  providedIn: 'root'  
})  
export class ExcelServicesService {  
  constructor() { }  

}

public downloadPdf(header,data) {
    const doc = new jsPdf("l", "pt", "a0");
    autoTable(doc, {
        (
            theme: 'grid',
            styles: {
            fontSize: 10,
            cellWidth: 'auto',
            overflow: 'visible'
        },
            columns: header,
            body: data)
    })
    doc.save("Report")
}


//yourcomponent.ts

columns: any = [{
        "datakey": "id",
        "header": "ID"
    } {
        "datakey": "name",
        "header": "Name"
    }
];
data: any = [{
        "id": 1,
        "name": "test user1"
    }, {
        "id": 2,
        "name": "test user2"
    }
];

this.service.downloadPdf(this.columns, this.data);