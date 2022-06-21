import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Test_Rider from '@salesforce/schema/Test_Rider__c';
import Email_Address from '@salesforce/schema/Test_Rider__c.Email_Address__c';
import Phone_Number from '@salesforce/schema/Test_Rider__c.Phone_Number__c';
import Rider_Name from '@salesforce/schema/Test_Rider__c.Name';
import Bike_Name from '@salesforce/schema/Test_Rider__c.Bike_Name__c';

// import fetchFiles from '@salesforce/apex/bikeController.fetchFiles';
import LinkBikeWithRider from '@salesforce/apex/BR_Bike_Controller.connectBikeToRider';
import approvalRequest from '@salesforce/apex/bikeController.approvalRequest';

import { NavigationMixin } from 'lightning/navigation';

export default class MovieRecordForm extends NavigationMixin(LightningElement) {

    @api recordId;

    testRider = Test_Rider;

    myFields = [Rider_Name, Phone_Number, Email_Address, Bike_Name];
    
    identificationImg;

    error;

    contentDocumentId = '';

    // overrideCss = override;

    get acceptedFormats() {
        return ['.pdf', '.png', '.jpeg', '.jpg'];
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        // const uploadedFiles = event.detail.files;
        // alert('No. of files uploaded : ' + uploadedFiles.length);
        // this.connectedCallback();
        console.log(event.detail.files);
        this.contentDocumentId = event.detail.files[0].documentId;
        // const fileUploadSuccessEvent = new ShowToastEvent({
        //     title: "File Uploaded",
        //     message: "File Upload successfully",
        //     variant: "success"
        // });

        // // event.target.recordFormClass = event.target.recordFormClass.replace('slds-has-error', '');

        // this.dispatchEvent(fileUploadSuccessEvent);
        

    }

    // connectedCallback(){
    //     fetchFiles({recordId:this.recordId})
    //     .then(result=>{
    //         this.identificationImg = result; 
    //     }).catch(error=>{
    //         this.error = error;
    //     })
        
    //     // loadStyle(this, this.overrideCss)
    //     // .then(() => {
    //     //     console.log('overrideCss loaded');
    //     // });
    // }

    handleRequestCreated(event) {

        LinkBikeWithRider({recordId:event.detail.id, cDId:this.contentDocumentId})
        .then(result=>{
            // this.identificationImg = result; 
            debugger;
        }).catch(error=>{
            this.error = error;
        })

        approvalRequest({ recordId: event.detail.id }).then(result=>{
            console.log("APPROVAL REQUEST SUCCESS");
        }).catch(error=>{
            this.error = error;
        })

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.detail.id,
                objectApiName: 'Test_Rider__c',
                actionName: 'view'
            }
        });
        const evt = new ShowToastEvent({
            title: "Request Sent",
            message: "Requested for Test Ride",
            variant: "success"
        });

        // event.target.recordFormClass = event.target.recordFormClass.replace('slds-has-error', '');

        this.dispatchEvent(evt);
        
    }    
}