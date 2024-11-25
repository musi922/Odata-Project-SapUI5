sap.ui.define([
	"./BaseController", "sap/m/MessageBox","sap/ui/model/odata/v2/ODataModel"
], function (BaseController, MessageBox,ODataModel) {
	"use strict";

	return BaseController.extend("com.myorg.myapp.controller.Main", {
		onInit(){
			var oModel = new ODataModel("http://localhost:3000/odata");
this.getView().setModel(oModel);


			oModel.read("/Products",{
				success(odata){
					console.log("Data Loaded Successfully",odata);
				},
				error(oError){
					console.log("We faced Error",oError);
					
				}
			})
		},	
		sayHello: function () {
			MessageBox.show("Hello World!");
		}
	});
});
