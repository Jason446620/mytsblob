"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
  You can create your own policy and inject it into the default pipeline, or create your own Pipeline.
  A request policy is a filter triggered before and after a HTTP request. With a filter, we can tweak HTTP requests and responses.
  For example, add a customized header, update URL or create logs. A HTTP pipeline is a group of policy factories.

  Here we provide a sample to demonstrate how to customize the x-ms-client-request-id header for all outgoing HTTP requests.
  This sample is just to demo the feature. Feel free to move the classes into one file in your code.

  Setup: Enter your storage account name and shared key in main()
*/
var storage_blob_1 = require("@azure/storage-blob");
// Load the .env file if it exists
var dotenv = require("dotenv");
dotenv.config();
// Create a policy factory with create() method provided
var RequestIDPolicyFactory = /** @class */ (function () {
    // Constructor to accept parameters
    function RequestIDPolicyFactory(prefix) {
        this.prefix = prefix;
    }
    // create() method needs to create a new RequestIDPolicy object
    RequestIDPolicyFactory.prototype.create = function (nextPolicy, options) {
        return new RequestIDPolicy(nextPolicy, options, this.prefix);
    };
    return RequestIDPolicyFactory;
}());
// Create a policy by extending from BaseRequestPolicy
var RequestIDPolicy = /** @class */ (function (_super) {
    __extends(RequestIDPolicy, _super);
    function RequestIDPolicy(nextPolicy, options, prefix) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.prefix = prefix;
        return _this;
    }
    // Customize HTTP requests and responses by overriding sendRequest
    // Parameter request is WebResource type
    RequestIDPolicy.prototype.sendRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Customize client request ID header
                        request.headers.set("x-ms-client-request-id", this.prefix + "_SOME_PATTERN_" + new Date().getTime());
                        return [4 /*yield*/, this._nextPolicy.sendRequest(request)];
                    case 1:
                        response = _a.sent();
                        // Modify response here if needed
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return RequestIDPolicy;
}(storage_blob_1.BaseRequestPolicy));
// Main function
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var account, accountSas, pipeline, blobServiceClient, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    account = process.env.ACCOUNT_NAME || "";
                    accountSas = process.env.ACCOUNT_SAS || "";
                    pipeline = storage_blob_1.newPipeline(new storage_blob_1.AnonymousCredential());
                    // Inject customized factory into default pipeline
                    pipeline.factories.unshift(new RequestIDPolicyFactory("Prefix"));
                    blobServiceClient = new storage_blob_1.BlobServiceClient("https://" + account + ".blob.core.windows.net" + accountSas, pipeline);
                    return [4 /*yield*/, blobServiceClient
                            .listContainers()
                            .byPage()
                            .next()];
                case 1:
                    response = (_a.sent()).value;
                    // Check customized client request ID
                    console.log(response._response.request.headers.get("x-ms-client-request-id"));
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
main()["catch"](function (err) {
    console.error("Error running sample:", err.message);
});
