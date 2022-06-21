public with sharing class BR_Bike_Controller {
    
    @AuraEnabled
    public static Boolean connectBikeToRider(String recordId, String cDId){
        Id contentDocId = (Id)cDId;
        Id recordIdParam = (Id)recordId;
        System.debug('CDID ::' + contentDocId);
        System.debug('recordIdParam ::' + recordIdParam);
        ContentVersion cv = [SELECT Id, VersionData, Title, FileType, FileExtension FROM ContentVersion WHERE ContentDocumentId =: contentDocId];
        ContentVersion cvNew = new ContentVersion(
        	VersionData = cv.VersionData,
            Title = cv.Title,
            PathOnClient = cv.Title+'.'+cv.FileExtension
        );
        insert cvNew;
        ContentVersion cvQueried = [SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id =: cvNew.Id];
        
        ContentDocumentLink cdl = new ContentDocumentLink(
        	LinkedEntityId = recordIdParam,
            ContentDocumentId = cvQueried.ContentDocumentId
        );
        
        insert cdl;
        return true;
    }

}


// public with sharing class BR_Bike_Controller {
    
//     @AuraEnabled
//     public static Boolean connectBikeToRider(String recordId, String cDId){
//         Id contentDocId = (Id)cDId;
//         Id recordIdParam = (Id)recordId;
//         System.debug('CDID ::' + contentDocId);
//         System.debug('recordIdParam ::' + recordIdParam);
//         ContentVersion cv = [SELECT Id, VersionData, Title, FileType, FileExtension FROM ContentVersion WHERE ContentDocumentId =: contentDocId];
//         ContentVersion cvNew = new ContentVersion(
//         	VersionData = cv.VersionData,
//             Title = cv.Title,
//             PathOnClient = cv.Title+'.'+cv.FileExtension
//         );
//         insert cvNew;
//         ContentVersion cvQueried = [SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id =: cvNew.Id];
        
//         ContentDocumentLink cdl = new ContentDocumentLink(
//         	LinkedEntityId = recordIdParam,
//             ContentDocumentId = cvQueried.ContentDocumentId
//         );
        
//         insert cdl;
//         return true;
//     }

// }