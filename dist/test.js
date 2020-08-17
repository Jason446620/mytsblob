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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.main = void 0;
/*
 Setup: Enter your storage account name and shared key in main()
*/
var storage_blob_1 = require("@azure/storage-blob");
// Load the .env file if it exists
var dotenv = require("dotenv");
dotenv.config();
function main() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var account, accountKey, sharedKeyCredential, containerName, blobServiceClient, containerClient, client, _b, _c, blob, blockBlobClient, downloadBlockBlobResponse, _d, _e, _f, e_1_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    account = "panshubeistorage";
                    accountKey = "IHa48xxo+0anyKQ2GzQ2KStN7SrqAgVvf6hC4EB8krlc5UvUnq4MzOo0dPZBxgJ0VotCpGs/PMftkebb9UFqyg==";
                    sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(account, accountKey);
                    containerName = "testcontainerName";
                    blobServiceClient = new storage_blob_1.BlobServiceClient(
                    // When using AnonymousCredential, following url should include a valid SAS or support public access
                    "DefaultEndpointsProtocol=https;AccountName=panshubeistorage;AccountKey=IHa48xxo+0anyKQ2GzQ2KStN7SrqAgVvf6hC4EB8krlc5UvUnq4MzOo0dPZBxgJ0VotCpGs/PMftkebb9UFqyg==;EndpointSuffix=core.windows.net", sharedKeyCredential);
                    containerClient = blobServiceClient.getContainerClient(containerName);
                    console.log(containerClient);
                    if (!!containerClient.exists()) return [3 /*break*/, 2];
                    console.log("the container does not exit");
                    return [4 /*yield*/, containerClient.create()];
                case 1:
                    _g.sent();
                    _g.label = 2;
                case 2:
                    client = containerClient.getBlockBlobClient(this.currentFile.name);
                    //name of uploded blob
                    console.log(this.currentFile.name);
                    //metaata from the blob
                    console.log(client);
                    _g.label = 3;
                case 3:
                    _g.trys.push([3, 10, 11, 16]);
                    _b = __asyncValues(containerClient.listBlobsFlat());
                    _g.label = 4;
                case 4: return [4 /*yield*/, _b.next()];
                case 5:
                    if (!(_c = _g.sent(), !_c.done)) return [3 /*break*/, 9];
                    blob = _c.value;
                    console.log('\t', blob.name);
                    blockBlobClient = containerClient.getBlockBlobClient(blob.name);
                    return [4 /*yield*/, blockBlobClient.download(0)];
                case 6:
                    downloadBlockBlobResponse = _g.sent();
                    console.log('\nDownloaded blob content...');
                    _e = (_d = console).log;
                    _f = ['\t'];
                    return [4 /*yield*/, streamToString(downloadBlockBlobResponse.readableStreamBody)];
                case 7:
                    _e.apply(_d, _f.concat([_g.sent()]));
                    _g.label = 8;
                case 8: return [3 /*break*/, 4];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _g.trys.push([11, , 14, 15]);
                    if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 13];
                    return [4 /*yield*/, _a.call(_b)];
                case 12:
                    _g.sent();
                    _g.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16: return [2 /*return*/];
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
