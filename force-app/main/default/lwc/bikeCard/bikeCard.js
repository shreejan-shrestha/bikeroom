import { LightningElement ,api, wire} from 'lwc';

import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
//bike__c

// import NAME_FIELD from '@salesforce/schema/bike__c.Name';
// import CATEGORY_FIELD from '@salesforce/schema/bike__c.Category__c';
// import DESCRIPTION_FIELD from '@salesforce/schema/bike__c.Description__c';
// import MANUFACTURER_FIELD from '@salesforce/schema/bike__c.Manufacturer__c';
// import MILEAGE_FIELD from '@salesforce/schema/bike__c.Mileage__c';
// import MSRP_FIELD from '@salesforce/schema/bike__c.MSRP__c';
// import PICTURE_URL_FIELD from '@salesforce/schema/bike__c.Picture_URL__c';

// const fields = [NAME_FIELD, PICTURE_URL_FIELD];



export default class BikeCard extends LightningElement {
    
    bikeName;
    bikePicture;
    // testId;


    _record;
    boolId;

    @api
    get record() {
        return this._record;
    }

    set record(value) {

       if(value){
       this._record = value;
       this.boolId=true;
       this.bikeName = value.Name;
       this.bikePicture = value.Picture_URL__c;
       this.bikeCategory = value.Category__c;
       this.bikeDescription = value.Description__c;
       this.bikeManufacturer = value.Manufacturer__c;
       this.bikeMileage = value.Mileage__c;
       this.bikeMSRP = value.MSRP__c;
       

      //  this.handleRecord();
      //  console.log('THIS IS VALUE' + value);
      //  this.testId = value;
       }

    }

    get nameOfBike(){
      return this._record.Name;
    }

    //Code for pop up
    
      handleDialogClose() {
        this.boolId = false;
        // let container = element.shadowRoot.querySelector('div.content');
        
        // container.blur();
        
      }

    // category_field = CATEGORY_FIELD;
    // description_field = DESCRIPTION_FIELD;
    // manufacturer_field = MANUFACTURER_FIELD;
    // mileage_field = MILEAGE_FIELD;
    // msrp_field = MSRP_FIELD;


    // name_field = NAME_FIELD;
    // picture_url_field = PICTURE_URL_FIELD;
    // recordId = "a005i000004EPIqAAO";
   
    // bikeName;
    // bikePicture;
    
    // handleRecord(id){
    //     console.log('TRUE VALUE');
    //     const{records} = id;
    //     console.log(records);
        
    //     const recordData = records[id]; 
    //     this.bikeName = getFieldValue(recordData, NAME_FIELD);
    //     this.bikePicture = getFieldValue(recordData, PICTURE_URL_FIELD);
    //     console.log('TRUE VALUE 2');
    //     console.log(this.bikeName, this.bikePicture);

    // }

    // debugger;

    // @wire(getRecord, { recordId: '$recordId', fields })
    // bike;
    
    handleRecord(){
      console.log('TRUE VALUE');
      const{records} = this.recordId;
      console.log(records);
      
      const recordData = this.recordId; 
      this.bikeName = getFieldValue(this.bike.data, NAME_FIELD);
      this.bikePicture = getFieldValue(this.bike.data, PICTURE_URL_FIELD);
      console.log('TRUE VALUE 2');
      console.log(this.bikeName, this.bikePicture);

  }
    
}