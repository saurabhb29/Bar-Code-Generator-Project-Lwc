public class RecordNameController {

    // @AuraEnabled annotation makes the method accessible to Lightning components
    // cacheable=true enables caching of the method's result on the client side
    @AuraEnabled(cacheable=true)
    public static String getProductRecordName(Id recordId) {
        try {
            // Attempt to query the Name field from the Product2 object where the Id matches the provided recordId
            // LIMIT 1 ensures that only one record is retrieved (since we're querying by Id, it should be unique)
            String productRecordName = [SELECT Name FROM Product2 WHERE Id = :recordId LIMIT 1].Name;
            
            // Return the retrieved product record name
            return productRecordName;
        } catch (Exception e) {
            // If an exception occurs during the execution of the try block, return the error message
            return e.getMessage();
        }
    }
}
