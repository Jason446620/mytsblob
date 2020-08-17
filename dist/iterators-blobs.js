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
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
    return __awaiter(this, void 0, void 0, function () {
        var account, accountKey, sharedKeyCredential, containerName, containerClient, createContainerResponse, index, content, blobName, blockBlobClient, uploadBlobResponse, i, iter, iter_1, iter_1_1, blob, e_1_1, _e, _f, blob, e_2_1, blobItem, _g, _h, response_1, _i, _j, blob, e_3_1, _k, _l, response_2, _m, _o, blob, e_4_1, iterator, response, segment_1, _p, _q, blob, segment, _r, _s, blob, marker, _t, _u, blob;
        return __generator(this, function (_v) {
            switch (_v.label) {
                case 0:
                    account = process.env.ACCOUNT_NAME || "";
                    accountKey = process.env.ACCOUNT_KEY || "";
                    sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(account, accountKey);
                    containerName = "newcontainer" + new Date().getTime();
                    containerClient = new storage_blob_1.ContainerClient("https://" + account + ".blob.core.windows.net/" + containerName, sharedKeyCredential);
                    return [4 /*yield*/, containerClient.create()];
                case 1:
                    createContainerResponse = _v.sent();
                    console.log("Created container " + containerName + " successfully", createContainerResponse.requestId);
                    index = 0;
                    _v.label = 2;
                case 2:
                    if (!(index < 7)) return [3 /*break*/, 5];
                    content = "hello";
                    blobName = "newblob" + new Date().getTime();
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(content, Buffer.byteLength(content))];
                case 3:
                    uploadBlobResponse = _v.sent();
                    console.log("Uploaded block blob " + blobName + " successfully", uploadBlobResponse.requestId);
                    _v.label = 4;
                case 4:
                    index++;
                    return [3 /*break*/, 2];
                case 5:
                    // 1. List blobs
                    console.log("Listing all blobs using iter");
                    i = 1;
                    iter = containerClient.listBlobsFlat();
                    _v.label = 6;
                case 6:
                    _v.trys.push([6, 11, 12, 17]);
                    iter_1 = __asyncValues(iter);
                    _v.label = 7;
                case 7: return [4 /*yield*/, iter_1.next()];
                case 8:
                    if (!(iter_1_1 = _v.sent(), !iter_1_1.done)) return [3 /*break*/, 10];
                    blob = iter_1_1.value;
                    console.log("Blob " + i++ + ": " + blob.name);
                    _v.label = 9;
                case 9: return [3 /*break*/, 7];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_1_1 = _v.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _v.trys.push([12, , 15, 16]);
                    if (!(iter_1_1 && !iter_1_1.done && (_a = iter_1["return"]))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _a.call(iter_1)];
                case 13:
                    _v.sent();
                    _v.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17:
                    // 2. Same as the previous example
                    console.log("Listing all blobs");
                    i = 1;
                    _v.label = 18;
                case 18:
                    _v.trys.push([18, 23, 24, 29]);
                    _e = __asyncValues(containerClient.listBlobsFlat());
                    _v.label = 19;
                case 19: return [4 /*yield*/, _e.next()];
                case 20:
                    if (!(_f = _v.sent(), !_f.done)) return [3 /*break*/, 22];
                    blob = _f.value;
                    console.log("Blob " + i++ + ": " + blob.name);
                    _v.label = 21;
                case 21: return [3 /*break*/, 19];
                case 22: return [3 /*break*/, 29];
                case 23:
                    e_2_1 = _v.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 29];
                case 24:
                    _v.trys.push([24, , 27, 28]);
                    if (!(_f && !_f.done && (_b = _e["return"]))) return [3 /*break*/, 26];
                    return [4 /*yield*/, _b.call(_e)];
                case 25:
                    _v.sent();
                    _v.label = 26;
                case 26: return [3 /*break*/, 28];
                case 27:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 28: return [7 /*endfinally*/];
                case 29:
                    // 3. Generator syntax .next()
                    console.log("Listing all blobs using iter.next()");
                    i = 1;
                    iter = containerClient.listBlobsFlat();
                    return [4 /*yield*/, iter.next()];
                case 30:
                    blobItem = _v.sent();
                    _v.label = 31;
                case 31:
                    if (!!blobItem.done) return [3 /*break*/, 33];
                    console.log("Blob " + i++ + ": " + blobItem.value.name);
                    return [4 /*yield*/, iter.next()];
                case 32:
                    blobItem = _v.sent();
                    return [3 /*break*/, 31];
                case 33:
                    ////////////////////////////////////////////////////////
                    ///////////////  Examples for .byPage()  ///////////////
                    ////////////////////////////////////////////////////////
                    // 4. list containers by page
                    console.log("Listing all blobs by page");
                    i = 1;
                    _v.label = 34;
                case 34:
                    _v.trys.push([34, 39, 40, 45]);
                    _g = __asyncValues(containerClient.listBlobsFlat().byPage());
                    _v.label = 35;
                case 35: return [4 /*yield*/, _g.next()];
                case 36:
                    if (!(_h = _v.sent(), !_h.done)) return [3 /*break*/, 38];
                    response_1 = _h.value;
                    for (_i = 0, _j = response_1.segment.blobItems; _i < _j.length; _i++) {
                        blob = _j[_i];
                        console.log("Blob " + i++ + ": " + blob.name);
                    }
                    _v.label = 37;
                case 37: return [3 /*break*/, 35];
                case 38: return [3 /*break*/, 45];
                case 39:
                    e_3_1 = _v.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 45];
                case 40:
                    _v.trys.push([40, , 43, 44]);
                    if (!(_h && !_h.done && (_c = _g["return"]))) return [3 /*break*/, 42];
                    return [4 /*yield*/, _c.call(_g)];
                case 41:
                    _v.sent();
                    _v.label = 42;
                case 42: return [3 /*break*/, 44];
                case 43:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 44: return [7 /*endfinally*/];
                case 45:
                    // 5. Same as the previous example - passing maxPageSize in the page settings
                    console.log("Listing all blobs by page, passing maxPageSize in the page settings");
                    i = 1;
                    _v.label = 46;
                case 46:
                    _v.trys.push([46, 51, 52, 57]);
                    _k = __asyncValues(containerClient.listBlobsFlat().byPage({ maxPageSize: 20 }));
                    _v.label = 47;
                case 47: return [4 /*yield*/, _k.next()];
                case 48:
                    if (!(_l = _v.sent(), !_l.done)) return [3 /*break*/, 50];
                    response_2 = _l.value;
                    for (_m = 0, _o = response_2.segment.blobItems; _m < _o.length; _m++) {
                        blob = _o[_m];
                        console.log("Blob " + i++ + ": " + blob.name);
                    }
                    _v.label = 49;
                case 49: return [3 /*break*/, 47];
                case 50: return [3 /*break*/, 57];
                case 51:
                    e_4_1 = _v.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 57];
                case 52:
                    _v.trys.push([52, , 55, 56]);
                    if (!(_l && !_l.done && (_d = _k["return"]))) return [3 /*break*/, 54];
                    return [4 /*yield*/, _d.call(_k)];
                case 53:
                    _v.sent();
                    _v.label = 54;
                case 54: return [3 /*break*/, 56];
                case 55:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 56: return [7 /*endfinally*/];
                case 57:
                    // 6. Generator syntax .next()
                    console.log("Listing all blobs by page using iterator.next()");
                    i = 1;
                    iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 20 });
                    return [4 /*yield*/, iterator.next()];
                case 58:
                    response = _v.sent();
                    _v.label = 59;
                case 59:
                    if (!!response.done) return [3 /*break*/, 61];
                    segment_1 = response.value.segment;
                    for (_p = 0, _q = segment_1.blobItems; _p < _q.length; _p++) {
                        blob = _q[_p];
                        console.log("Blob " + i++ + ": " + blob.name);
                    }
                    return [4 /*yield*/, iterator.next()];
                case 60:
                    response = _v.sent();
                    return [3 /*break*/, 59];
                case 61:
                    // 7. Passing marker as an argument (similar to the previous example)
                    console.log("Listing all blobs by page, using iterator.next() and continuation token");
                    i = 1;
                    iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 2 });
                    return [4 /*yield*/, iterator.next()];
                case 62:
                    response = _v.sent();
                    segment = response.value.segment;
                    // Prints 2 blob names
                    for (_r = 0, _s = segment.blobItems; _r < _s.length; _r++) {
                        blob = _s[_r];
                        console.log("Blob " + i++ + ": " + blob.name);
                    }
                    // Gets next marker
                    console.log("\tContinuation");
                    marker = response.value.continuationToken;
                    // Passing next marker as continuationToken
                    iterator = containerClient.listBlobsFlat().byPage({ continuationToken: marker, maxPageSize: 10 });
                    return [4 /*yield*/, iterator.next()];
                case 63:
                    response = _v.sent();
                    // Prints 5 blob names
                    if (!response.done) {
                        for (_t = 0, _u = response.value.segment.blobItems; _t < _u.length; _t++) {
                            blob = _u[_t];
                            console.log("Blob " + i++ + ": " + blob.name);
                        }
                    }
                    return [4 /*yield*/, containerClient["delete"]()];
                case 64:
                    _v.sent();
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
