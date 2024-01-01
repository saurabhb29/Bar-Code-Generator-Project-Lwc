public  class RecordNameController {
    @AuraEnabled(cacheable=true)
    public static String getRecordName(Id recordId) {
        try {
            // Query the record name based on the recordId
            // Replace 'ObjectName__c' with your object API name
            String recordName = [SELECT Name FROM Product2 WHERE Id = :recordId LIMIT 1].Name;
            return recordName;
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}