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
  If you use BlobClient.download() to download an append blob which is being actively appended,
  you may get a 412 HTTP error, just like this issue: https://github.com/Azure/azure-storage-js/issues/51

  Recommend solution is to snapshot the append blob, and read from the snapshot blob.

  Reason
  - blobClient.download() will try to download a blob with a HTTP Get request into a stream.
  - When a stream unexpectedly ends because of an unreliable network, retry will resume the stream read
    from that broken point with a new HTTP Get request.
  - The second HTTP request will use conditional header `IfMatch` with the blob's `ETag`
    returned in first request to make sure the blob doesn't change when the 2nd retry happens.
    Otherwise, a 412 conditional header doesn't match error will be returned.
  - This strict strategy is used to avoid data integrity issues, such as the blob maybe totally over written by someone others.
    However, this strategy seems avoiding reading from reading a constantly updated log file when a retry happens.


  Setup: Enter your storage account name and shared key in main()
*/
var storage_blob_1 = require("@azure/storage-blob");
// Load the .env file if it exists
var dotenv = require("dotenv");
dotenv.config();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var account, accountKey, sharedKeyCredential, containerName, containerClient, createContainerResponse, content, blobName, blockBlobClient, uploadBlobResponse, snapshotResponse, blobSnapshotClient, response, _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    account = process.env.ACCOUNT_NAME || "";
                    accountKey = process.env.ACCOUNT_KEY || "";
                    sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(account, accountKey);
                    containerName = "newcontainer" + new Date().getTime();
                    containerClient = new storage_blob_1.ContainerClient("https://" + account + ".blob.core.windows.net/" + containerName, sharedKeyCredential);
                    return [4 /*yield*/, containerClient.create()];
                case 1:
                    createContainerResponse = _g.sent();
                    console.log("Create container " + containerName + " successfully", createContainerResponse.requestId);
                    content = "hello";
                    blobName = "newblob" + new Date().getTime();
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(content, Buffer.byteLength(content))];
                case 2:
                    uploadBlobResponse = _g.sent();
                    console.log("Uploaded block blob " + blobName + " successfully", uploadBlobResponse.requestId);
                    // Downloading blob from the snapshot
                    console.log("Downloading blob...");
                    return [4 /*yield*/, blockBlobClient.createSnapshot()];
                case 3:
                    snapshotResponse = _g.sent();
                    blobSnapshotClient = blockBlobClient.withSnapshot(snapshotResponse.snapshot);
                    return [4 /*yield*/, blobSnapshotClient.download(0)];
                case 4:
                    response = _g.sent();
                    _b = (_a = console).log;
                    _c = ["Reading response to string..."];
                    return [4 /*yield*/, blobSnapshotClient.getProperties()];
                case 5:
                    _b.apply(_a, _c.concat([(_g.sent()).contentLength]));
                    _e = (_d = console).log;
                    _f = ["Downloaded blob content"];
                    return [4 /*yield*/, streamToString(response.readableStreamBody)];
                case 6:
                    _e.apply(_d, _f.concat([_g.sent()]));
                    // Delete container
                    return [4 /*yield*/, containerClient["delete"]()];
                case 7:
                    // Delete container
                    _g.sent();
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
