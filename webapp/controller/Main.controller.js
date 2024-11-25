sap.ui.define([
    "./BaseController", "sap/m/MessageToast", "sap/ui/model/odata/v2/ODataModel"
], function (BaseController, MessageToast, ODataModel) {
    "use strict";

    return BaseController.extend("com.myorg.myapp.controller.Main", {
        onInit() {
            var oModel = new ODataModel("http://localhost:3000/odata", {
                headers: {
                    "Content-Type": "application/atom+xml", 
                    "Accept": "application/atom+xml"      
                },
                maxDataServiceVersion: "3.0"
            });
            this.getView().setModel(oModel);
        },

        onPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oBindingContext = oItem.getBindingContext();
            var oCategory = oBindingContext.getObject();

            var oPanel = this.byId("categoryDetailPanel");
            var oCategoryIDText = this.byId("categoryID");
            var oCategoryNameText = this.byId("categoryName");

            oCategoryIDText.setText("Category ID: " + oCategory.ID);
            oCategoryNameText.setText("Category Name: " + oCategory.Name);

            MessageToast.show("Selected Category: " + oCategory.Name);
        },

        onCreateCategory: function () {
            var sXML = '<?xml version="1.0" encoding="utf-8"?>' +
  '<entry xml:base="http://localhost:3000/odata" xmlns="http://www.w3.org/2005/Atom" ' +
  'xmlns:d="http://schemas.microsoft.com/ado/2007/08/dataservices" ' +
  'xmlns:m="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata">' +
  '<id>http://localhost:3000/odata/Categories(1)</id>' +
  '<category term="ODataDemo.Category" scheme="http://schemas.microsoft.com/ado/2007/08/dataservices/scheme" />' +
  '<link rel="edit" title="Category" href="Categories(1)" />' +
  '<title type="text">New Category</title>' +
  '<updated>2024-11-25T17:11:10Z</updated>' +
  '<author><name /></author>' +
  '<content type="application/xml">' +
    '<m:properties>' +
      '<d:ID m:type="Edm.Int32">1</d:ID>' +
      '<d:Name>New Category</d:Name>' +
    '</m:properties>' +
  '</content>' +
  '</entry>';

            var oModel = this.getView().getModel();

            // Post the XML data to the server
            oModel.create("/Categories", sXML, {
                method: "POST", // Explicitly using POST for creating the entity
                headers: {
                    "Content-Type": "application/atom+xml", // Atom format for POST body
                    "Accept": "application/atom+xml"        // Accept Atom response
                },
                success: function () {
                    sap.m.MessageToast.show("Category Created Successfully");
                },
                error: function (oError) {
                    console.log("Error creating category: ", oError);
                    sap.m.MessageToast.show("Error Creating Category");
                }
            });
        }
    });
});
