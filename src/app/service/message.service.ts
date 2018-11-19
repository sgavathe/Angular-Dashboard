import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

enum Enum  {
    Region = 'Region',
    Area = 'Area',
    District = 'District',
    OCD = 'District',
    ZIP = 'ZIP'
}

@Injectable({ providedIn: 'root' })
export class MessageService {
    // Create a subject to observe the results and changes over time
    private subject = new Subject<any>();    
    public importedResults = new Subject<any>();
    public regions = new Subject<any>();
    public areas = new Subject<any>();
    public districts = new Subject<any>();
    public ocds = new Subject<any>();
    public zips = new Subject<any>();
   
    sendMessage(message: string, type: string) {
        this.subject.next({ text: message, datatype: type });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    // Pass the data received from the import process through our subject to observe
    fetchImportedResults(data){
        this.importedResults.next(data);
    }
    
    // Pass the data received from the import process through our subject to observe
    fetchResults(data, datatype){
        console.log(datatype);
        this[datatype].next(data);
    }

    private handleError(error: Response): Observable<any> {
        console.log(error);
        return Observable.throw(error.json() || 'Server Issue');
    }
}
