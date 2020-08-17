"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.main = void 0;
/*
  ONLY AVAILABLE IN NODE.JS RUNTIME

  Setup :
    - Reference - Authorize access to blobs and queues with Azure Active Directory from a client application
      - https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-app
 
    - Register a new AAD application and give permissions to access Azure Storage on behalf of the signed-in user
      - Register a new application in the Azure Active Directory(in the azure-portal) - https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app
      - In the `API permissions` section, select `Add a permission` and choose `Microsoft APIs`.
      - Pick `Azure Storage` and select the checkbox next to `user_impersonation` and then click `Add permissions`. This would allow the application to access Azure Storage on behalf of the signed-in user.
    - Grant access to Azure Blob data with RBAC in the Azure Portal
      - RBAC roles for blobs and queues - https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-rbac-portal.
      - In the azure portal, go to your storage-account and assign **Storage Blob Data Contributor** role to the registered AAD application from `Access control (IAM)` tab (in the left-side-navbar of your storage account in the azure-portal).
    
    - Environment setup for the sample
      - From the overview page of your AAD Application, note down the `CLIENT ID` and `TENANT ID`. In the "Certificates & Secrets" tab, create a secret and note that down.
      - Make sure you have AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET as environment variables to successfully execute the sample(Can leverage process.env).
*/
var storage_blob_1 = require("@azure/storage-blob");
var identity_1 = require("@azure/identity");
// Load the .env file if it exists
var dotenv = require("dotenv");
dotenv.config();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var account, defaultAzureCredential, blobServiceClient, containerName, createContainerResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    account = process.env.ACCOUNT_NAME || "";
                    // Azure AD Credential information is required to run this sample:
                    if (!process.env.AZURE_TENANT_ID ||
                        !process.env.AZURE_CLIENT_ID ||
                        !process.env.AZURE_CLIENT_SECRET) {
                        console.warn("Azure AD authentication information not provided, but it is required to run this sample. Exiting.");
                        return [2 /*return*/];
                    }
                    defaultAzureCredential = new identity_1.DefaultAzureCredential();
                    blobServiceClient = new storage_blob_1.BlobServiceClient("https://" + account + ".blob.core.windows.net", defaultAzureCredential);
                    containerName = "newcontainer" + new Date().getTime();
                    return [4 /*yield*/, blobServiceClient
                            .getContainerClient(containerName)
                            .create()];
                case 1:
                    createContainerResponse = _a.sent();
                    console.log("Created container " + containerName + " successfully", createContainerResponse.requestId);
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
main()["catch"](function (err) {
    console.error("Error running sample:", err.message);
});
