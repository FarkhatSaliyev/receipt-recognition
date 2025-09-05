"use server";

import { currentUser } from "@clerk/nextjs/server";
import convex from "@/lib/convexClient";
import { api } from "@/convex/_generated/api";
import { getFileDownloadUrl } from "./getFileDownloadUrl";
import { inngest } from "@/ingest/client";
import Events from "@/ingest/constants";

//Srver action to upload PDF to Convex storage
export default async function uploadPDF(formData: FormData) {
  const user = await currentUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    //Get the file from formData
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "No file provided" };
    }

    //Validate the file type
    if (
      !file.type.includes(".pdf") &&
      !file.name.toLocaleLowerCase().endsWith(".pdf")
    ) {
      return { success: false, error: "Only PDF files are allowed" };
    }

    //Get upload URL from Convex
    const uploadUrl = await convex.mutation(api.receipts.generateUploadUrl, {});

    //Convert file to array buffer for fetch API
    const arrayBuffer = await file.arrayBuffer();

    //Upload file to convex storage
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: new Uint8Array(arrayBuffer),
    });

    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
    }

    //Get storage ID from the repsonse
    const { storageId } = await uploadResponse.json();

    //Add receipt to databse
    const receiptId = await convex.mutation(api.receipts.storeReceipt, {
      userId: user.id,
      fileId: storageId,
      fileName: file.name,
      size: file.size,
      mimeType: file.type,
    });

    //Generate file url
    const fileUrl = await getFileDownloadUrl(storageId);

    //Trigger ingest agent flow
    await inngest.send({
      name: Events.EXTRACT_DATA_FROM_PDF_AND_SAVE_TO_DATABASE,
      data: {
        url: fileUrl.downloadUrl,
        receiptId,
      },
    });

    return {
      success: true,
      data: {
        receiptId,
        fileName: file.name,
      },
    };
  } catch (error) {
    console.log("Server action upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error",
    };
  }
}
