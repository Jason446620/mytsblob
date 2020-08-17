"use strict";
/*
 Setup: Enter your storage account name and shared key in main()
*/
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
var storage_blob_1 = require("@azure/storage-blob");
// Load the .env file if it exists
var dotenv = require("dotenv");
dotenv.config();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        function printBlob(result) {
            if (!result.done) {
                console.log("Blob " + index++ + ": " + result.value.name);
                asyncIter.next().then(printBlob);
            }
            else {
                containerClient["delete"]().then(function () { return console.log("deleted container"); });
            }
        }
        var account, accountKey, sharedKeyCredential, containerName, containerClient, createContainerResponse, numberOfBlobs, i, content, blobName, blockBlobClient, uploadBlobResponse, index, asyncIter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    account = process.env.ACCOUNT_NAME || "";
                    accountKey = process.env.ACCOUNT_KEY || "";
                    sharedKeyCredential = new storage_blob_1.StorageSharedKeyCredential(account, accountKey);
                    containerName = "newcontainer" + new Date().getTime();
                    containerClient = new storage_blob_1.ContainerClient("https://" + account + ".blob.core.windows.net/" + containerName, sharedKeyCredential);
                    return [4 /*yield*/, containerClient.create()];
                case 1:
                    createContainerResponse = _a.sent();
                    console.log("Created container " + containerName + " successfully", createContainerResponse.requestId);
                    numberOfBlobs = 7;
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < numberOfBlobs)) return [3 /*break*/, 5];
                    content = "hello";
                    blobName = "newblob" + new Date().getTime();
                    blockBlobClient = containerClient.getBlockBlobClient(blobName);
                    return [4 /*yield*/, blockBlobClient.upload(content, Buffer.byteLength(content))];
                case 3:
                    uploadBlobResponse = _a.sent();
                    console.log("Uploaded block blob " + blobName + " successfully", uploadBlobResponse.requestId);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log("Listing all blobs without await");
                    index = 1;
                    asyncIter = containerClient.listBlobsFlat();
                    asyncIter.next().then(printBlob);
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
main()["catch"](function (err) {
    console.log(err.message);
});
