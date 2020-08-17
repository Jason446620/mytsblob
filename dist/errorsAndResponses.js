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
 Setup: Enter connection string of your storage account name in main()
*/
var storage_blob_1 = require("@azure/storage-blob");
// Load the .env file if it exists
var dotenv = require("dotenv");
dotenv.config();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var STORAGE_CONNECTION_STRING, blobServiceClient, containerName, containerClient, createContainerResponse, err_1, content, blobName, blockBlobClient, err_2, uploadBlobResponse, blobProperties, err_3, downloadBlockBlobResponse, _a, _b, _c, err_4, err_5, deleteContainerResponse;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    STORAGE_CONNECTION_STRING = process.env.STORAGE_CONNECTION_STRING || "";
                    blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(STORAGE_CONNECTION_STRING);
                    // Create a container
                    console.log("// Create a new container..");
                    containerName = "newcontainer" + new Date().getTime();
                    containerClient = blobServiceClient.getContainerClient(containerName);
                    return [4 /*yield*/, containerClient.create()];
                case 1:
                    createContainerResponse = _d.sent();
                    console.log("Created container " + containerName + " successfully,");
                    console.log("requestId - " + createContainerResponse.requestId + ", statusCode - " + createContainerResponse._response.status + "\n");
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 4, , 5]);
                    // Creating an existing container fails...
                    console.log("// Creating an existing container fails...");
                    return [4 /*yield*/, containerClient.create()];
                case 3:
                    createContainerResponse = _d.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _d.sent();
                    console.log("requestId - " + err_1.details.requestId + ", statusCode - " + err_1.statusCode + ", errorCode - " + err_1.details.errorCode + "\n");
                    return [3 /*break*/, 5];
                case 5:
                    content = "hello";
                    blobName = "newblob" + new Date().getTime();
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    _d.label = 6;
                case 6:
                    _d.trys.push([6, 8, , 10]);
                    // Invoke getProperties() on a non existing blob
                    console.log("// Invoke getProperties() on a non existing blob...");
                    return [4 /*yield*/, blockBlobClient.getProperties()];
                case 7:
                    _d.sent();
                    return [3 /*break*/, 10];
                case 8:
                    err_2 = _d.sent();
                    console.log("getProperties() failed as expected,");
                    console.log("requestId - " + err_2.details.requestId + ", statusCode - " + err_2.statusCode + ", errorCode - " + err_2.details.errorCode + "\n");
                    // Create a new block blob
                    console.log("// Create a new block blob...");
                    return [4 /*yield*/, blockBlobClient.upload(content, Buffer.byteLength(content))];
                case 9:
                    uploadBlobResponse = _d.sent();
                    console.log("Uploaded block blob " + blobName + " successfully,");
                    console.log("requestId - " + uploadBlobResponse.requestId + ", statusCode - " + uploadBlobResponse._response.status + "\n");
                    return [3 /*break*/, 10];
                case 10:
                    // Invoke getProperties() on an existing blob
                    console.log("// Invoke getProperties() on an existing blob...");
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.getProperties()];
                case 11:
                    blobProperties = _d.sent();
                    console.log("getProperties() on blob - " + blobName + ", blobType = " + blobProperties.blobType + ", accessTier = " + blobProperties.accessTier + " ");
                    console.log("requestId - " + blobProperties.requestId + ", statusCode - " + blobProperties._response.status + "\n");
                    _d.label = 12;
                case 12:
                    _d.trys.push([12, 14, , 17]);
                    // Downloading from a non existing blob
                    console.log("// Downloading from a non existing blob...");
                    blockBlobClient = containerClient.getBlockBlobClient("invalid" + blobName);
                    return [4 /*yield*/, blockBlobClient.download()];
                case 13:
                    _d.sent();
                    return [3 /*break*/, 17];
                case 14:
                    err_3 = _d.sent();
                    console.log("download() failed as expected,");
                    console.log("requestId - " + err_3.details.requestId + ", statusCode - " + err_3.statusCode + ", errorCode - " + err_3.details.errorCode + "\n");
                    // Download blob content
                    console.log("// Download blob content...");
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.download()];
                case 15:
                    downloadBlockBlobResponse = _d.sent();
                    _b = (_a = console).log;
                    _c = "Downloaded blob content - ";
                    return [4 /*yield*/, streamToString(downloadBlockBlobResponse.readableStreamBody)];
                case 16:
                    _b.apply(_a, [_c + (_d.sent()) + ","]);
                    console.log("requestId - " + downloadBlockBlobResponse.requestId + ", statusCode - " + downloadBlockBlobResponse._response.status + "\n");
                    return [3 /*break*/, 17];
                case 17:
                    _d.trys.push([17, 20, , 21]);
                    // Archive the blob
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.setAccessTier("Archive")];
                case 18:
                    _d.sent();
                    // Downloading an archived blockBlob fails
                    console.log("// Downloading an archived blockBlob fails...");
                    return [4 /*yield*/, blockBlobClient.download()];
                case 19:
                    _d.sent();
                    return [3 /*break*/, 21];
                case 20:
                    err_4 = _d.sent();
                    // BlobArchived	Conflict (409)	This operation is not permitted on an archived blob.
                    console.log("requestId - " + err_4.details.requestId + ", statusCode - " + err_4.statusCode + ", errorCode - " + err_4.details.errorCode);
                    console.log("error message - " + err_4.details.message + "\n");
                    return [3 /*break*/, 21];
                case 21:
                    _d.trys.push([21, 23, , 25]);
                    // Deleting a non-existing container
                    console.log("// Deleting a non-existing container...");
                    containerClient = blobServiceClient.getContainerClient("invalid" + containerName);
                    return [4 /*yield*/, containerClient["delete"]()];
                case 22:
                    _d.sent();
                    return [3 /*break*/, 25];
                case 23:
                    err_5 = _d.sent();
                    console.log("Deleting a non-existing container fails as expected");
                    console.log("requestId - " + err_5.details.requestId + ", statusCode - " + err_5.statusCode + ", errorCode - " + err_5.details.errorCode);
                    console.log("error message - \n" + err_5.details.message + "\n");
                    // Delete container
                    containerClient = blobServiceClient.getContainerClient(containerName);
                    return [4 /*yield*/, containerClient["delete"]()];
                case 24:
                    deleteContainerResponse = _d.sent();
                    console.log("Deleted container successfully -");
                    console.log("requestId - " + deleteContainerResponse.requestId + ", statusCode - " + deleteContainerResponse._response.status + "\n");
                    return [3 /*break*/, 25];
                case 25: return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
// A helper method used to read a Node.js readable stream into string
function streamToString(readableStream) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var chunks = [];
                    readableStream.on("data", function (data) {
                        chunks.push(data.toString());
                    });
                    readableStream.on("end", function () {
                        resolve(chunks.join(""));
                    });
                    readableStream.on("error", reject);
                })];
        });
    });
}
main()["catch"](function (err) {
    console.error("Error running sample:", err.message);
});
