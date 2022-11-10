sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/export/library",
    "sap/ui/export/Spreadsheet",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, exportLibrary, Spreadsheet) {
    "use strict";

    return Controller.extend("com.exercise.exportexcel1.controller.View1", {
      onInit: function () {},

      handleProductDownload: function (oEvent) {
        var aColumns = this.createColumnConfig();
        var oTable = this.getView().byId("idTable");
        var oRowBinding = oTable.getBinding("items");
        var oSettings = {
          workbook: {
            columns: aColumns,
            context: {
              application: "Debug Test Application",
              version: "${version}",
              title: "Some random title",
              modifiedBy: "John Doe",
              metaSheetName: "Custom metadata",
              metainfo: [
                {
                  name: "Grouped Properties",
                  items: [{ key: "CategoryID", value: "1" }],
                },
              ],
            },
            hierarchyLevel: "level",
          },
          dataSource: oRowBinding,
          fileName: "Products.xlsx",
          worker: false, // We need to disable worker because we are using a Mockserver as OData Service
        };

        var oSheet = new Spreadsheet(oSettings);
        oSheet.attachBeforeExport(this.handleBeforeExport);
        oSheet.build().finally(function () {
          oSheet.destroy();
        });
      },

      createColumnConfig: function () {
        var aCols = [];
        var aProperties = [
          "ProductID",
          "ProductName",
          "SupplierID",
          "CategoryID",
        ];
        aProperties.forEach((sPropertyName) => {
          aCols.push({
            label: "Text",
            type: exportLibrary.EdmType.String,
            property: sPropertyName,
            width: 20,
            wrap: true,
          });
        });
        return aCols;
      },

      handleBeforeExport: function (oEvent) {
        debugger;
      },
    });
  }
);
