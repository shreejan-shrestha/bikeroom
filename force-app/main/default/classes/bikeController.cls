public with sharing class bikeController {
    
    public class Filters{
        @AuraEnabled
        public String searchKey{get;set;}
        @AuraEnabled
        public Decimal maxPrice{get;set;}
        @AuraEnabled
        public String[] categories{get;set;}
        @AuraEnabled
        public String[] manufacturers{get;set;}        
    }

    @AuraEnabled(Cacheable = true)
    public static List<Bike__c> getBikes(Filters filters){
        String key, whereClause='';
        Decimal maxPrice;
        String[] categories, manufacturers, criteria = new List<String>{};
        if(filters!=null){
            maxPrice = filters.maxPrice;
            categories = filters.categories;
            manufacturers = filters.manufacturers;
            if(!String.isEmpty(filters.searchKey)){
                key = '%'+filters.searchKey+'%';
                criteria.add('Name LIKE :key');
            }
            if(maxPrice >= 0){
                criteria.add('MSRP__c <= :maxPrice');
            }
            if(filters.categories != null){
                criteria.add('Category__c IN :categories');
            }
            if(filters.manufacturers != null){
                criteria.add('Manufacturer__c IN :manufacturers');
            }
            if(criteria.size() > 0){
                whereClause = 'WHERE ' + String.join(criteria, ' AND ');
            }
        }
        String query = 'SELECT Id, Name, Category__c, Description__c, Manufacturer__c, Mileage__c, MSRP__c, Picture_URL__c FROM Bike__c ' + whereClause + ' WITH SECURITY_ENFORCED ORDER BY Name';
        return Database.query(query);
    }

    // @AuraEnabled(Cacheable = true)
    // public static Boolean linkContent(Id recordId){

    //     return [SELECT Id, Name, Category__c, Description__c, Manufacturer__c, Mileage__c, MSRP__c, Picture_URL__c FROM Bike__c WHERE Id = :recordId];

    // }

    @AuraEnabled(Cacheable = true)
    public static List<Bike__c> getPicture(Id recordId){

        return [SELECT Id, Name, Category__c, Description__c, Manufacturer__c, Mileage__c, MSRP__c, Picture_URL__c FROM Bike__c WHERE Id = :recordId];

    }

    
    // @AuraEnabled(cacheable=true)
    // public static List<ContentDocumentLink> fetchFiles(String recordId){
    //     return [SELECT LinkedEntityId, ContentDocument.CreatedDate, ContentDocument.Title, ContentDocument.ContentSize, ContentDocument.FileType FROM ContentDocumentLink WHERE LinkedEntityId  =:recordId];
    // }

    @AuraEnabled
    public static void approvalRequest(Id recordId){

        //system.assert(false, recordId);

         // Create an approval request for the account
        Approval.ProcessSubmitRequest req1 = new Approval.ProcessSubmitRequest();
        req1.setComments('Submitting request for approval.');
        req1.setObjectId(recordId);
        
        // Submit on behalf of a specific submitter
        req1.setSubmitterId(UserInfo.getUserId());

        // Submit the record to specific process and skip the criteria evaluation
        req1.setProcessDefinitionNameOrId('Test_Ride_Approval');
        req1.setSkipEntryCriteria(true);
        
        // Submit the approval request for the account
        Approval.ProcessResult result = Approval.process(req1);
        
        // Verify the result
        //System.assert(result.isSuccess());
    }

}