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
 Setup: Enter your storage account name, SAS and a path pointing to local file in main()
*/
var fs = require("fs");
var abort_controller_1 = require("@azure/abort-controller");
var storage_blob_1 = require("@azure/storage-blob");
// Load the .env file if it exists
var dotenv = require("dotenv");
dotenv.config();
// Enabling logging may help uncover useful information about failures.
// In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`.
// Alternatively, logging can be enabled at runtime by calling `setLogLevel("info");`
// `setLogLevel` can be imported from the `@azure/logger` package
var logger_1 = require("@azure/logger");
logger_1.setLogLevel("info");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var account, accountSas, localFilePath, pipeline, blobServiceClient, containerName, containerClient, err_1, blobName, blockBlobClient, err_2, err_3, fileSize, buffer, err_4, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    account = process.env.ACCOUNT_NAME || "";
                    accountSas = process.env.ACCOUNT_SAS || "";
                    localFilePath = "README.md";
                    pipeline = storage_blob_1.newPipeline(new storage_blob_1.AnonymousCredential(), {
                        // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
                        retryOptions: { maxTries: 4 },
                        userAgentOptions: { userAgentPrefix: "AdvancedSample V1.0.0" },
                        keepAliveOptions: {
                            // Keep alive is enabled by default, disable keep alive by setting false
                            enable: false
                        }
                    });
                    blobServiceClient = new storage_blob_1.BlobServiceClient("https://" + account + ".blob.core.windows.net" + accountSas, pipeline);
                    containerName = "newcontainer" + new Date().getTime();
                    containerClient = blobServiceClient.getContainerClient(containerName);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, containerClient.create()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log("Creating a container fails, requestId - " + err_1.details.requestId + ", statusCode - " + err_1.statusCode + ", errorCode - " + err_1.details.errorCode);
                    return [3 /*break*/, 4];
                case 4:
                    blobName = "newblob" + new Date().getTime();
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, blockBlobClient.uploadFile(localFilePath, {
                            blockSize: 4 * 1024 * 1024,
                            concurrency: 20,
                            onProgress: function (ev) { return console.log(ev); }
                        })];
                case 6:
                    _a.sent();
                    console.log("uploadFile succeeds");
                    return [3 /*break*/, 8];
                case 7:
                    err_2 = _a.sent();
                    console.log("uploadFile failed, requestId - " + err_2.details.requestId + ", statusCode - " + err_2.statusCode + ", errorCode - " + err_2.details.errorCode);
                    return [3 /*break*/, 8];
                case 8:
                    _a.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, blockBlobClient.uploadStream(fs.createReadStream(localFilePath), 4 * 1024 * 1024, 20, {
                            abortSignal: abort_controller_1.AbortController.timeout(30 * 60 * 1000),
                            onProgress: function (ev) { return console.log(ev); }
                        })];
                case 9:
                    _a.sent();
                    console.log("uploadStream succeeds");
                    return [3 /*break*/, 11];
                case 10:
                    err_3 = _a.sent();
                    console.log("uploadStream failed, requestId - " + err_3.details.requestId + ", statusCode - " + err_3.statusCode + ", errorCode - " + err_3.details.errorCode);
                    return [3 /*break*/, 11];
                case 11:
                    fileSize = fs.statSync(localFilePath).size;
                    buffer = Buffer.alloc(fileSize);
                    _a.label = 12;
                case 12:
                    _a.trys.push([12, 14, , 15]);
                    return [4 /*yield*/, blockBlobClient.downloadToBuffer(buffer, 0, undefined, {
                            abortSignal: abort_controller_1.AbortController.timeout(30 * 60 * 1000),
                            blockSize: 4 * 1024 * 1024,
                            concurrency: 20,
                            onProgress: function (ev) { return console.log(ev); }
                        })];
                case 13:
                    _a.sent();
                    console.log("downloadToBuffer succeeds");
                    return [3 /*break*/, 15];
                case 14:
                    err_4 = _a.sent();
                    console.log("downloadToBuffer failed, requestId - " + err_4.details.requestId + ", statusCode - " + err_4.statusCode + ", errorCode - " + err_4.details.errorCode);
                    return [3 /*break*/, 15];
                case 15: 
                // Archive the blob - Log the error codes
                return [4 /*yield*/, blockBlobClient.setAccessTier("Archive")];
                case 16:
                    // Archive the blob - Log the error codes
                    _a.sent();
                    _a.label = 17;
                case 17:
                    _a.trys.push([17, 19, , 20]);
                    // Downloading an archived blockBlob fails
                    console.log("// Downloading an archived blockBlob fails...");
                    return [4 /*yield*/, blockBlobClient.download()];
                case 18:
                    _a.sent();
                    return [3 /*break*/, 20];
                case 19:
                    err_5 = _a.sent();
                    // BlobArchived	Conflict (409)	This operation is not permitted on an archived blob.
                    console.log("requestId - " + err_5.details.requestId + ", statusCode - " + err_5.statusCode + ", errorCode - " + err_5.details.errorCode);
                    console.log("error message - " + err_5.details.message + "\n");
                    return [3 /*break*/, 20];
                case 20: 
                // Delete container
                return [4 /*yield*/, containerClient["delete"]()];
                case 21:
                    // Delete container
                    _a.sent();
                    console.log("deleted container");
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
main()["catch"](function (err) {
    console.error("Error running sample:", err.message);
});
