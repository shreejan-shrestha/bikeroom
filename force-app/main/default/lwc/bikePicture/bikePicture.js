import { LightningElement, api, wire } from 'lwc';
import getPicture from '@salesforce/apex/bikeController.getPicture';

export default class BikePicture extends LightningElement {

    @api recordId;
    bikeImg;
    bikeTitle

    @wire(getPicture,{recordId:'$recordId'})
    pictureHandler({data, error}){
        if(data){
            this.bikeTitle = data[0].Name;
            this.bikeImg = data[0].Picture_URL__c;}
            console.log("result",this.bikeImg);
        if(error){
            console.error(error);
            this.error = error;
        }
    }
    

}