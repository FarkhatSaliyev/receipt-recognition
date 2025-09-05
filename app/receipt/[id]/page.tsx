"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useSchematicFlag } from "@schematichq/schematic-react";
import { useQuery } from "convex/react";
import { ChevronLeft, FileText } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Receipt() {
  const params = useParams<{ id: string }>();
  const [receiptId, setReceiptId] = useState<Id<"receipts"> | null>(null);
  const router = useRouter();
  const isSummariesEnabled = useSchematicFlag("summary");

  //Fetch receipt data
  const receipt = useQuery(
    api.receipts.getReceiptById,
    receiptId ? { id: receiptId } : "skip",
  );

  console.log("receipt", receipt);
  console.log("isSummariesEnabled", isSummariesEnabled);

  //Get file download url
  const fileId = receipt?.fileId;
  const downloadUrl = useQuery(
    api.receipts.getReceiptDownloadUrl,
    fileId ? { fileId } : "skip",
  );

  useEffect(() => {
    try {
      const id = params.id as Id<"receipts">;
      setReceiptId(id);
    } catch (error) {
      console.error("Ivalid receipt ID", error);
      router.push("/");
    }
  }, [params.id, router]);

  //Loading
  if (receipt === undefined) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"></div>
        </div>
      </div>
    );
  }

  if (receipt === null) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Receipt Not Found</h1>
          <p className="mb-6">
            The receipt you are looking for does not exist or has been removed
          </p>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const uploadDate = new Date(receipt.uploadedAt).toLocaleString();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link href="/receipts" className="text-blue-500 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1"></ChevronLeft>
            Back to Receipts
          </Link>
        </nav>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {receipt.fileDisplayName || receipt.fileName}
              </h1>

              <div className="flex items-center">
                {/* {receipt.status === "pending" ? (
                  <div className="mr-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2"></div>
                  </div>
                ) : null} */}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    receipt.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : receipt.status === "processed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {receipt.status.charAt(0).toUpperCase() +
                    receipt.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    File information
                  </h3>
                  <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Uploaded</p>
                        <p className="font-medium">{uploadDate}</p>
                      </div>

                      <div>
                        <p className="text-gray-500">Type</p>
                        <p className="font-medium">{receipt.mimeType}</p>
                      </div>

                      <div>
                        <p className="text-gray-500">ID</p>
                        <p className="font-medium">
                          {receipt._id.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download */}
              <div className="flex items-center justify-center p-8 rounded-lg bg-gray-50">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-blue-500 mx-auto"></FileText>
                  <p className="mt-4 text-sm text-gray-500">PDF Preview</p>
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded inline-block"
                    >
                      View PDF
                    </a>
                  )}
                </div>
              </div>

              {/* Extracted data */}
              {receipt.receiptSummary && (
                <>
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Receipt Details
                    </h3>

                    <div className="grid grid-cols-1 gap-6">
                      <h4 className="font-semibold text-blue-400">
                        AI Summary
                      </h4>

                      <div className="bg-white bg-opacity-60 rouned-lg p-4 border border-blue-100">
                        <p className="text-sm whitespace-pre-line leading-relaxed text-gray-700">
                          {isSummariesEnabled
                            ? receipt.receiptSummary
                            : "Upgrade to Unlock"}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
