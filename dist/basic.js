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
    var e_1, _a, e_2, _b;
    return __awaiter(this, void 0, void 0, function () {
        var account, accountKey, sharedKeyCredential, blobServiceClient, i, _c, _d, container, e_1_1, containerName, containerClient, createContainerResponse, content, blobName, blockBlobClient, uploadBlobResponse, _e, _f, blob, e_2_1, downloadBlockBlobResponse, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    account = process.env.ACCOUNT_NAME || "";
                    accountKey = process.env.ACCOUNT_KEY || "";
                    sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(account, accountKey);
                    blobServiceClient = new storage_blob_1.BlobServiceClient(
                    // When using AnonymousCredential, following url should include a valid SAS or support public access
                    "https://" + account + ".blob.core.windows.net", sharedKeyCredential);
                    i = 1;
                    _k.label = 1;
                case 1:
                    _k.trys.push([1, 6, 7, 12]);
                    _c = __asyncValues(blobServiceClient.listContainers());
                    _k.label = 2;
                case 2: return [4 /*yield*/, _c.next()];
                case 3:
                    if (!(_d = _k.sent(), !_d.done)) return [3 /*break*/, 5];
                    container = _d.value;
                    console.log("Container " + i++ + ": " + container.name);
                    _k.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _k.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _k.trys.push([7, , 10, 11]);
                    if (!(_d && !_d.done && (_a = _c["return"]))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(_c)];
                case 8:
                    _k.sent();
                    _k.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    containerName = "newcontainer" + new Date().getTime();
                    containerClient = blobServiceClient.getContainerClient(containerName);
                    return [4 /*yield*/, containerClient.create()];
                case 13:
                    createContainerResponse = _k.sent();
                    console.log("Create container " + containerName + " successfully", createContainerResponse.requestId);
                    content = "hello, 你好";
                    blobName = "newblob" + new Date().getTime();
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(content, Buffer.byteLength(content))];
                case 14:
                    uploadBlobResponse = _k.sent();
                    console.log("Upload block blob " + blobName + " successfully", uploadBlobResponse.requestId);
                    // List blobs
                    i = 1;
                    _k.label = 15;
                case 15:
                    _k.trys.push([15, 20, 21, 26]);
                    _e = __asyncValues(containerClient.listBlobsFlat());
                    _k.label = 16;
                case 16: return [4 /*yield*/, _e.next()];
                case 17:
                    if (!(_f = _k.sent(), !_f.done)) return [3 /*break*/, 19];
                    blob = _f.value;
                    console.log("Blob " + i++ + ": " + blob.name);
                    _k.label = 18;
                case 18: return [3 /*break*/, 16];
                case 19: return [3 /*break*/, 26];
                case 20:
                    e_2_1 = _k.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 26];
                case 21:
                    _k.trys.push([21, , 24, 25]);
                    if (!(_f && !_f.done && (_b = _e["return"]))) return [3 /*break*/, 23];
                    return [4 /*yield*/, _b.call(_e)];
                case 22:
                    _k.sent();
                    _k.label = 23;
                case 23: return [3 /*break*/, 25];
                case 24:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 25: return [7 /*endfinally*/];
                case 26: return [4 /*yield*/, blockBlobClient.download(0)];
                case 27:
                    downloadBlockBlobResponse = _k.sent();
                    _h = (_g = console).log;
                    _j = ["Downloaded blob content"];
                    return [4 /*yield*/, streamToString(downloadBlockBlobResponse.readableStreamBody)];
                case 28:
                    _h.apply(_g, _j.concat([_k.sent()]));
                    // Delete container
                    return [4 /*yield*/, containerClient["delete"]()];
                case 29:
                    // Delete container
                    _k.sent();
                    console.log("deleted container");
                    return [2 /*return*/];
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
