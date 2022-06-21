import { LightningElement, wire } from 'lwc';
import getBikes from '@salesforce/apex/bikeController.getBikes';

//LMS and a message channel
import{subscribe, MessageContext} from 'lightning/messageService';
import BIKES_FILTERED_MESSAGE from '@salesforce/messageChannel/BikesFiltered__c';
import {getFieldValue} from 'lightning/uiRecordApi';

export default class BikeTileList extends LightningElement {

    bikes;
    error;
    filters = {};
    bikeFilterSubscription;
    selectedBike;
    bikeName;
    bikePicture;

    showPopup = false;

    @wire(getBikes, {filters:'$filters'})
    bikesHandler({data, error}){
        if(data){
            console.log(data);
            this.bikes = data;
        }if(error){
            console.error(error);
            this.error = error;
        }

    }

    showModal = false;

    // handleShowModal() {
    //     const modal = this.template.querySelector("c-bike-card");
    //     modal.show();

    //     this.showModal=true;
    //   }

    // Load context for LMS
    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeHandler();        
    }
    
    subscribeHandler(){
        this.bikeFilterSubscription = subscribe(this.messageContext, BIKES_FILTERED_MESSAGE, (message)=>this.handleFilterChanges(message));
    }

    handleFilterChanges(message){
        console.log(message.filters);
        this.filters = {...message.filters}
    }

    handleBikeSelected(event){
        console.log("selected bike id", event.detail);
        this.selectedBike = event.detail;
        this.showPopup = true;
        
    }

    handleBikeClicked(event){
        this.showPopup = true;
        // const{records} = id;
        
        // const recordData = records[this.recordId]; 
        // this.bikeName = getFieldValue(recordData, NAME_FIELD);
        // this.bikePicture = getFieldValue(recordData, PICTURE_URL_FIELD);
        // console.log('TRUE VALUE 2');
        // console.log(this.bikeName, this.bikePicture);




    }

}