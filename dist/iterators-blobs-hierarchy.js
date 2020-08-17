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
    var e_1, _a, e_2, _b, e_3, _c;
    return __awaiter(this, void 0, void 0, function () {
        var account, accountKey, sharedKeyCredential, containerName, containerClient, createContainerResponse, content, contentByteLength, blobName, blockBlobClient, uploadBlobResponse, iter, iter_1, iter_1_1, item, e_1_1, entity, item, _d, _e, response, segment, _i, _f, prefix, _g, _h, blob, e_2_1, i, _j, _k, response, segment, _l, _m, prefix, _o, _p, blob, e_3_1;
        return __generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    account = process.env.ACCOUNT_NAME || "";
                    accountKey = process.env.ACCOUNT_KEY || "";
                    sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(account, accountKey);
                    containerName = "newcontainer" + new Date().getTime();
                    containerClient = new storage_blob_1.ContainerClient("https://" + account + ".blob.core.windows.net/" + containerName, sharedKeyCredential);
                    return [4 /*yield*/, containerClient.create()];
                case 1:
                    createContainerResponse = _q.sent();
                    console.log("Created container " + containerName + " successfully", createContainerResponse.requestId);
                    content = "hello";
                    contentByteLength = Buffer.byteLength(content);
                    blobName = "a1";
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(content, contentByteLength)];
                case 2:
                    uploadBlobResponse = _q.sent();
                    console.log("Uploaded block blob " + blobName + " successfully", uploadBlobResponse.requestId);
                    blobName = "a2";
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(content, contentByteLength)];
                case 3:
                    uploadBlobResponse = _q.sent();
                    console.log("Uploaded block blob " + blobName + " successfully", uploadBlobResponse.requestId);
                    blobName = "prefix1/b1";
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(content, contentByteLength)];
                case 4:
                    uploadBlobResponse = _q.sent();
                    console.log("Uploaded block blob " + blobName + " successfully", uploadBlobResponse.requestId);
                    blobName = "prefix1/b2";
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(content, contentByteLength)];
                case 5:
                    uploadBlobResponse = _q.sent();
                    console.log("Uploaded block blob " + blobName + " successfully", uploadBlobResponse.requestId);
                    blobName = "prefix2/sub1/c";
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(content, contentByteLength)];
                case 6:
                    uploadBlobResponse = _q.sent();
                    console.log("Uploaded block blob " + blobName + " successfully", uploadBlobResponse.requestId);
                    blobName = "prefix2/sub1/d";
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(content, contentByteLength)];
                case 7:
                    uploadBlobResponse = _q.sent();
                    console.log("Uploaded block blob " + blobName + " successfully", uploadBlobResponse.requestId);
                    blobName = "prefix2/sub1/e";
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(content, contentByteLength)];
                case 8:
                    uploadBlobResponse = _q.sent();
                    console.log("Uploaded block blob " + blobName + " successfully", uploadBlobResponse.requestId);
                    // 1. List blobs by hierarchy
                    console.log("Listing blobs by hierarchy");
                    iter = containerClient.listBlobsByHierarchy("/");
                    _q.label = 9;
                case 9:
                    _q.trys.push([9, 14, 15, 20]);
                    iter_1 = __asyncValues(iter);
                    _q.label = 10;
                case 10: return [4 /*yield*/, iter_1.next()];
                case 11:
                    if (!(iter_1_1 = _q.sent(), !iter_1_1.done)) return [3 /*break*/, 13];
                    item = iter_1_1.value;
                    if (item.kind === "prefix") {
                        console.log("\tBlobPrefix: " + item.name);
                    }
                    else {
                        console.log("\tBlobItem: name - " + item.name + ", last modified - " + item.properties.lastModified);
                    }
                    _q.label = 12;
                case 12: return [3 /*break*/, 10];
                case 13: return [3 /*break*/, 20];
                case 14:
                    e_1_1 = _q.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 20];
                case 15:
                    _q.trys.push([15, , 18, 19]);
                    if (!(iter_1_1 && !iter_1_1.done && (_a = iter_1["return"]))) return [3 /*break*/, 17];
                    return [4 /*yield*/, _a.call(iter_1)];
                case 16:
                    _q.sent();
                    _q.label = 17;
                case 17: return [3 /*break*/, 19];
                case 18:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 19: return [7 /*endfinally*/];
                case 20:
                    // 2. Generator syntax .next() and passing a prefix
                    console.log("Listing blobs by hierarchy, specifying a prefix");
                    iter = containerClient.listBlobsByHierarchy("/", { prefix: "prefix1/" });
                    return [4 /*yield*/, iter.next()];
                case 21:
                    entity = _q.sent();
                    _q.label = 22;
                case 22:
                    if (!!entity.done) return [3 /*break*/, 24];
                    item = entity.value;
                    if (item.kind === "prefix") {
                        console.log("\tBlobPrefix: " + item.name);
                    }
                    else {
                        console.log("\tBlobItem: name - " + item.name + ", last modified - " + item.properties.lastModified);
                    }
                    return [4 /*yield*/, iter.next()];
                case 23:
                    entity = _q.sent();
                    return [3 /*break*/, 22];
                case 24:
                    // 3. byPage()
                    console.log("Listing blobs by hierarchy by page");
                    _q.label = 25;
                case 25:
                    _q.trys.push([25, 30, 31, 36]);
                    _d = __asyncValues(containerClient.listBlobsByHierarchy("/").byPage());
                    _q.label = 26;
                case 26: return [4 /*yield*/, _d.next()];
                case 27:
                    if (!(_e = _q.sent(), !_e.done)) return [3 /*break*/, 29];
                    response = _e.value;
                    segment = response.segment;
                    if (segment.blobPrefixes) {
                        for (_i = 0, _f = segment.blobPrefixes; _i < _f.length; _i++) {
                            prefix = _f[_i];
                            console.log("\tBlobPrefix: " + prefix.name);
                        }
                    }
                    for (_g = 0, _h = response.segment.blobItems; _g < _h.length; _g++) {
                        blob = _h[_g];
                        console.log("\tBlobItem: name - " + blob.name + ", last modified - " + blob.properties.lastModified);
                    }
                    _q.label = 28;
                case 28: return [3 /*break*/, 26];
                case 29: return [3 /*break*/, 36];
                case 30:
                    e_2_1 = _q.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 36];
                case 31:
                    _q.trys.push([31, , 34, 35]);
                    if (!(_e && !_e.done && (_b = _d["return"]))) return [3 /*break*/, 33];
                    return [4 /*yield*/, _b.call(_d)];
                case 32:
                    _q.sent();
                    _q.label = 33;
                case 33: return [3 /*break*/, 35];
                case 34:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 35: return [7 /*endfinally*/];
                case 36:
                    // 4. byPage() and passing a prefix and max page size
                    console.log("Listing blobs by hierarchy by page, specifying a prefix and a max page size");
                    i = 1;
                    _q.label = 37;
                case 37:
                    _q.trys.push([37, 42, 43, 48]);
                    _j = __asyncValues(containerClient
                        .listBlobsByHierarchy("/", { prefix: "prefix2/sub1/" })
                        .byPage({ maxPageSize: 2 }));
                    _q.label = 38;
                case 38: return [4 /*yield*/, _j.next()];
                case 39:
                    if (!(_k = _q.sent(), !_k.done)) return [3 /*break*/, 41];
                    response = _k.value;
                    console.log("Page " + i++);
                    segment = response.segment;
                    if (segment.blobPrefixes) {
                        for (_l = 0, _m = segment.blobPrefixes; _l < _m.length; _l++) {
                            prefix = _m[_l];
                            console.log("\tBlobPrefix: " + prefix.name);
                        }
                    }
                    for (_o = 0, _p = response.segment.blobItems; _o < _p.length; _o++) {
                        blob = _p[_o];
                        console.log("\tBlobItem: name - " + blob.name + ", last modified - " + blob.properties.lastModified);
                    }
                    _q.label = 40;
                case 40: return [3 /*break*/, 38];
                case 41: return [3 /*break*/, 48];
                case 42:
                    e_3_1 = _q.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 48];
                case 43:
                    _q.trys.push([43, , 46, 47]);
                    if (!(_k && !_k.done && (_c = _j["return"]))) return [3 /*break*/, 45];
                    return [4 /*yield*/, _c.call(_j)];
                case 44:
                    _q.sent();
                    _q.label = 45;
                case 45: return [3 /*break*/, 47];
                case 46:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 47: return [7 /*endfinally*/];
                case 48: return [4 /*yield*/, containerClient["delete"]()];
                case 49:
                    _q.sent();
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
