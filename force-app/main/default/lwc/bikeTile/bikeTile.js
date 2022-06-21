import { LightningElement, api } from 'lwc';
// import bikeimg from '@salesforce/resourceUrl/bikeroom';
export default class BikeTile extends LightningElement {

    @api bike={};
    // @api recordId;
    imageUrl;

    _testid;

    @api
    get testid(){
            return this._testid;
    }

    set testid(value){
        this._testid = value;
        this.imageUrl= "https://ambarkaar30-dev-ed.lightning.force.com/lightning/r/Bike__c/"+value+"/view";
        console.log(this.imageUrl);
    }
    

    // bike_src = bikeimg + '/images/yamaha-WR450F.png';

    handleClick(event){
        console.log("handle click");
        console.log(this.bike.Id)   ;
        console.log(this.bike);
        // this.dispatchEvent(new customEvent('selected', {
        //     detail:this.bike.Id,
        // }))
        

        
        const selectEvent = new CustomEvent('selected', {
            detail: this.bike,
        });
       this.dispatchEvent(selectEvent);
    }

    

}