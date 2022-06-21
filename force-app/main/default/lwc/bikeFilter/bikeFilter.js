import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import BIKE_OBJECT from '@salesforce/schema/Bike__c';
import CATEGORY_FIELD from '@salesforce/schema/Bike__c.Category__c';
import MANUFACTURER_FIELD from '@salesforce/schema/Bike__c.Manufacturer__c';

//constants
const CATEGORY_ERROR = 'Error loading the categories';
const MANUFACTURER_ERROR = 'Error loading the manufacturers'

//LMS and a message channel
import{publish, MessageContext} from 'lightning/messageService';
import BIKES_FILTERED_MESSAGE from '@salesforce/messageChannel/BikesFiltered__c';

export default class BikeFilter extends LightningElement {
    filters={
        searchKey:'',
        maxPrice:999999
    }

    categoryError = CATEGORY_ERROR;
    manufacturerError = MANUFACTURER_ERROR;
    timer;

    // Load context for LMS
    @wire(MessageContext)
    messageContext;

    // //Fetching category picklist
    // @wire(getObjectInfo, {objectApiName:BIKE_OBJECT})
    // bikeObjectInfo;

    // @wire(getPicklistValues, {
    //     recordTypeId: '$bikeObjectInfo.data.defaultRecordTypeId',
    //     fieldApiName: CATEGORY_FIELD
    // })categories;
    
    // //Fetching manufacturer picklist
    
    // @wire(getPicklistValues, {
    //     recordTypeId: '$bikeObjectInfo.data.defaultRecordTypeId',
    //     fieldApiName: MANUFACTURER_FIELD
    // })manufacturers;

    handleSearchKeyChange(event){
        console.log(event.target.value);
        this.filters = {...this.filters, "searchKey":event.target.value};
        this.sendDataToBikeList();
    }

    handleMaxPriceChange(event){
        console.log(event.target.value);
        this.filters = {...this.filters, "maxPrice":event.target.value};
        this.sendDataToBikeList();
    }

    // handleCheckbox(event){
    //     if(!this.filters.categories){
    //         const categories = this.categories.data.values.map(item=>item.value);
    //         const manufacturers = this.manufacturers.data.values.map(item=>item.value);
    //         this.filters = {...this.filters, categories, manufacturers}
    //     }

    //     const {name, value} = event.target.dataset;

    //     if(event.target.checked){
    //         if(!this.filters[name].includes(value)){
    //             this.filters[name] = [...this.filters[name], value]
    //         }
    //     }else{
    //         this.filters[name] = this.filters[name].filter(item=>item !== value)
    //     }

    //     this.sendDataToBikeList();
        
    //     // console.log("name", name);
    //     // console.log("value", value);
        
    // }

    sendDataToBikeList(){
        window.clearTimeout()
        this.timer = window.setTimeout(()=>{
            publish(this.messageContext, BIKES_FILTERED_MESSAGE, {
                filters: this.filters
            })
        }, 400)
    }
    
}