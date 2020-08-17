// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name and shared key in main()
*/

import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobDownloadResponseModel
} from "@azure/storage-blob";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  // Enter your storage account name and shared key
  const account = "panshubeistorage";//process.env.ACCOUNT_NAME || "";
  const accountKey = "IHa48xxo+0anyKQ2GzQ2KStN7SrqAgVvf6hC4EB8krlc5UvUnq4MzOo0dPZBxgJ0VotCpGs/PMftkebb9UFqyg==";//process.env.ACCOUNT_KEY || "";

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);

  // ONLY AVAILABLE IN NODE.JS RUNTIME
  // DefaultAzureCredential will first look for Azure Active Directory (AAD)
  // client secret credentials in the following environment variables:
  //
  // - AZURE_TENANT_ID: The ID of your AAD tenant
  // - AZURE_CLIENT_ID: The ID of your AAD app registration (client)
  // - AZURE_CLIENT_SECRET: The client secret for your AAD app registration
  //
  // If those environment variables aren't found and your application is deployed
  // to an Azure VM or App Service instance, the managed service identity endpoint
  // will be used as a fallback authentication source.
  // const defaultAzureCredential = new DefaultAzureCredential();

  // You can find more TokenCredential implementations in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) library
  // to use client secrets, certificates, or managed identities for authentication.

  // Use AnonymousCredential when url already includes a SAS signature
  // const anonymousCredential = new AnonymousCredential();

  const containerName="testcontainer";
  // List containers
  const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `DefaultEndpointsProtocol=https;AccountName=panshubeistorage;AccountKey=IHa48xxo+0anyKQ2GzQ2KStN7SrqAgVvf6hC4EB8krlc5UvUnq4MzOo0dPZBxgJ0VotCpGs/PMftkebb9UFqyg==;EndpointSuffix=core.windows.net`,
    sharedKeyCredential
  );

  // Get a container
  const containerClient = blobServiceClient.getContainerClient(containerName);
  console.log(containerClient)
  if (!containerClient.exists()) {
    console.log("the container does not exit")
    await containerClient.create()
  }
  const client  = containerClient.getBlockBlobClient(this.currentFile.name);

  //name of uploded blob
  console.log(this.currentFile.name)
  //metaata from the blob
  console.log(client)
  
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log('\t', blob.name);
      const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
      const downloadBlockBlobResponse = await blockBlobClient.download(0);
      console.log('\nDownloaded blob content...');
      console.log('\t', await streamToString(downloadBlockBlobResponse.readableStreamBody));
      //end of loop
   }
}
// A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream: NodeJS.ReadableStream) {
  return new Promise((resolve, reject) => {
    const chunks: string[] = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});
