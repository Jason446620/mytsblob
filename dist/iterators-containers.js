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
        var account, accountKey, sharedKeyCredential, blobServiceClient, i, iter, iter_1, iter_1_1, container, e_1_1, _e, _f, container, e_2_1, containerItem, _g, _h, response_1, _i, _j, container, e_3_1, _k, _l, response_2, _m, _o, container, e_4_1, iterator, response, _p, _q, container, _r, _s, container, marker, _t, _u, container;
        return __generator(this, function (_v) {
            switch (_v.label) {
                case 0:
                    account = process.env.ACCOUNT_NAME || "";
                    accountKey = process.env.ACCOUNT_KEY || "";
                    sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(account, accountKey);
                    blobServiceClient = new storage_blob_1.BlobServiceClient("https://" + account + ".blob.core.windows.net", sharedKeyCredential);
                    i = 1;
                    iter = blobServiceClient.listContainers();
                    _v.label = 1;
                case 1:
                    _v.trys.push([1, 6, 7, 12]);
                    iter_1 = __asyncValues(iter);
                    _v.label = 2;
                case 2: return [4 /*yield*/, iter_1.next()];
                case 3:
                    if (!(iter_1_1 = _v.sent(), !iter_1_1.done)) return [3 /*break*/, 5];
                    container = iter_1_1.value;
                    console.log("Container " + i++ + ": " + container.name);
                    _v.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _v.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _v.trys.push([7, , 10, 11]);
                    if (!(iter_1_1 && !iter_1_1.done && (_a = iter_1["return"]))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(iter_1)];
                case 8:
                    _v.sent();
                    _v.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    // 2. Same as the previous example
                    i = 1;
                    _v.label = 13;
                case 13:
                    _v.trys.push([13, 18, 19, 24]);
                    _e = __asyncValues(blobServiceClient.listContainers());
                    _v.label = 14;
                case 14: return [4 /*yield*/, _e.next()];
                case 15:
                    if (!(_f = _v.sent(), !_f.done)) return [3 /*break*/, 17];
                    container = _f.value;
                    console.log("Container " + i++ + ": " + container.name);
                    _v.label = 16;
                case 16: return [3 /*break*/, 14];
                case 17: return [3 /*break*/, 24];
                case 18:
                    e_2_1 = _v.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 24];
                case 19:
                    _v.trys.push([19, , 22, 23]);
                    if (!(_f && !_f.done && (_b = _e["return"]))) return [3 /*break*/, 21];
                    return [4 /*yield*/, _b.call(_e)];
                case 20:
                    _v.sent();
                    _v.label = 21;
                case 21: return [3 /*break*/, 23];
                case 22:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 23: return [7 /*endfinally*/];
                case 24:
                    // 3. Generator syntax .next()
                    i = 1;
                    iter = blobServiceClient.listContainers();
                    return [4 /*yield*/, iter.next()];
                case 25:
                    containerItem = _v.sent();
                    _v.label = 26;
                case 26:
                    if (!!containerItem.done) return [3 /*break*/, 28];
                    console.log("Container " + i++ + ": " + containerItem.value.name);
                    return [4 /*yield*/, iter.next()];
                case 27:
                    containerItem = _v.sent();
                    return [3 /*break*/, 26];
                case 28:
                    ////////////////////////////////////////////////////////
                    ///////////////  Examples for .byPage()  ///////////////
                    ////////////////////////////////////////////////////////
                    // 4. list containers by page
                    i = 1;
                    _v.label = 29;
                case 29:
                    _v.trys.push([29, 34, 35, 40]);
                    _g = __asyncValues(blobServiceClient.listContainers().byPage());
                    _v.label = 30;
                case 30: return [4 /*yield*/, _g.next()];
                case 31:
                    if (!(_h = _v.sent(), !_h.done)) return [3 /*break*/, 33];
                    response_1 = _h.value;
                    if (response_1.containerItems) {
                        for (_i = 0, _j = response_1.containerItems; _i < _j.length; _i++) {
                            container = _j[_i];
                            console.log("Container " + i++ + ": " + container.name);
                        }
                    }
                    _v.label = 32;
                case 32: return [3 /*break*/, 30];
                case 33: return [3 /*break*/, 40];
                case 34:
                    e_3_1 = _v.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 40];
                case 35:
                    _v.trys.push([35, , 38, 39]);
                    if (!(_h && !_h.done && (_c = _g["return"]))) return [3 /*break*/, 37];
                    return [4 /*yield*/, _c.call(_g)];
                case 36:
                    _v.sent();
                    _v.label = 37;
                case 37: return [3 /*break*/, 39];
                case 38:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 39: return [7 /*endfinally*/];
                case 40:
                    // 5. Same as the previous example - passing maxPageSize in the page settings
                    i = 1;
                    _v.label = 41;
                case 41:
                    _v.trys.push([41, 46, 47, 52]);
                    _k = __asyncValues(blobServiceClient.listContainers().byPage({ maxPageSize: 20 }));
                    _v.label = 42;
                case 42: return [4 /*yield*/, _k.next()];
                case 43:
                    if (!(_l = _v.sent(), !_l.done)) return [3 /*break*/, 45];
                    response_2 = _l.value;
                    if (response_2.containerItems) {
                        for (_m = 0, _o = response_2.containerItems; _m < _o.length; _m++) {
                            container = _o[_m];
                            console.log("Container " + i++ + ": " + container.name);
                        }
                    }
                    _v.label = 44;
                case 44: return [3 /*break*/, 42];
                case 45: return [3 /*break*/, 52];
                case 46:
                    e_4_1 = _v.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 52];
                case 47:
                    _v.trys.push([47, , 50, 51]);
                    if (!(_l && !_l.done && (_d = _k["return"]))) return [3 /*break*/, 49];
                    return [4 /*yield*/, _d.call(_k)];
                case 48:
                    _v.sent();
                    _v.label = 49;
                case 49: return [3 /*break*/, 51];
                case 50:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 51: return [7 /*endfinally*/];
                case 52:
                    // 6. Generator syntax .next()
                    i = 1;
                    iterator = blobServiceClient.listContainers().byPage({ maxPageSize: 20 });
                    return [4 /*yield*/, iterator.next()];
                case 53:
                    response = _v.sent();
                    _v.label = 54;
                case 54:
                    if (!!response.done) return [3 /*break*/, 56];
                    if (response.value.containerItems) {
                        for (_p = 0, _q = response.value.containerItems; _p < _q.length; _p++) {
                            container = _q[_p];
                            console.log("Container " + i++ + ": " + container.name);
                        }
                    }
                    return [4 /*yield*/, iterator.next()];
                case 55:
                    response = _v.sent();
                    return [3 /*break*/, 54];
                case 56:
                    // 7. Passing marker as an argument (similar to the previous example)
                    i = 1;
                    iterator = blobServiceClient.listContainers().byPage({ maxPageSize: 2 });
                    return [4 /*yield*/, iterator.next()];
                case 57:
                    response = _v.sent();
                    // Prints 2 container names
                    if (response.value.containerItems) {
                        for (_r = 0, _s = response.value.containerItems; _r < _s.length; _r++) {
                            container = _s[_r];
                            console.log("Container " + i++ + ": " + container.name);
                        }
                    }
                    marker = response.value.continuationToken;
                    // Passing next marker as continuationToken
                    iterator = blobServiceClient
                        .listContainers()
                        .byPage({ continuationToken: marker, maxPageSize: 10 });
                    return [4 /*yield*/, iterator.next()];
                case 58:
                    response = _v.sent();
                    // Prints 10 container names
                    if (response.value.containerItems) {
                        for (_t = 0, _u = response.value.containerItems; _t < _u.length; _t++) {
                            container = _u[_t];
                            console.log("Container " + i++ + ": " + container.name);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
main()["catch"](function (err) {
    console.error("Error running sample:", err.message);
});
