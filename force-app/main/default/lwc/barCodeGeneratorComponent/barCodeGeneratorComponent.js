// Import necessary Lightning elements and utilities
import { LightningElement, api,wire } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';

// Import the barcode resource URL defined in the static resource
import barcode from "@salesforce/resourceUrl/barcode"; 
import getRecordName from '@salesforce/apex/RecordNameController.getRecordName';

export default class BarCodeGeneratorComponent extends LightningElement {
    // Expose the recordId as an API property to make it accessible in the Lightning App Builder
    @api recordId;
   // Declare a variable to store the product name.
    productName;

// Wire the getRecordName function to retrieve data based on the provided recordId.
    @wire(getRecordName, { recordId: '$recordId' })
    wiredRecordName({ data, error }) {
    // Check if data is available (successful response).
        if (data) {
        // Assign the retrieved data to the productName variable.
            this.productName = data;
        // Reset the error variable to undefined in case it was previously set.
            this.error = undefined;
    } 
    // Check if there is an error in the response.
    else if (error) {
        // Set productName to undefined in case of an error.
            this.productName = undefined;
        // Extract and store the error message in the error variable.
            this.error = error.body.message;
        }
    }
    // Flag to track whether the script has been loaded or not
    isScriptLoaded = false;

    // Lifecycle hook that gets called after the component has been rendered
    renderedCallback() {
        // Load the barcode script using the platformResourceLoader
        Promise.all([
            loadScript(this, barcode)
        ]).then(() => {
            // Log a message indicating that the script has been successfully loaded
            console.log('script loaded');

            // Call the function to generate the barcode
            this.generateBarcode();
            
        }).catch(error => {
            // Log an error message if there's an issue loading the script
            window.console.log("Error " + error);
        });
    }
     
    // Function to render buttons (not implemented in the provided code)
    renderButtons(){
        // Set the boolShowSpinner property to false (assuming it is declared in another part of the code)
        this.boolShowSpinner = false;
    }

    // Function to generate the barcode using the JsBarcode library
    generateBarcode(){
        // Get the canvas element with the specified data-id attribute
        const canvas = this.template.querySelector('[data-id="barcode"]');  

        // Use JsBarcode library to generate the barcode on the canvas
        JsBarcode(canvas, this.recordId, {
            format: "CODE39"
        });        

        // Initialize JsBarcode (assuming there might be a typo in ".barcode")
        JsBarcode(".barcode").init(); 
    }  
}