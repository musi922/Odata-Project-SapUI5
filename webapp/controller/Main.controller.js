sap.ui.define([
	"./BaseController", "sap/m/MessageBox","sap/ui/model/odata/v2/ODataModel"
], function (BaseController, MessageBox,ODataModel) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.Main", {
		onInit(){
			var oModel = new ODataModel("http://localhost:3000/odata",{
				maxDataServiceVersion: "3.0" 
			});
            this.getView().setModel(oModel);
		}
	});
});
