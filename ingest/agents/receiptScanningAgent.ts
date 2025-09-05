import { createAgent, createTool, openai } from "@inngest/agent-kit";
import { anthropic } from "inngest";
import { z } from "zod";

// Add a helper to normalize URLs
function toHttpsUrl(url: string): string {
  if (
    url.startsWith("http://127.0.0.1:3210") ||
    url.startsWith("http://localhost:3210")
  ) {
    return url
      .replace("http://127.0.0.1:3210", "https://a152c92900e0.ngrok-free.app")
      .replace("http://localhost:3210", "https://a152c92900e0.ngrok-free.app");
  }
  return url; // already https or external
}

const parsePdfTool = createTool({
  name: "parse-pdf",
  description: "Analyze the given PDF",
  parameters: z.object({
    pdfUrl: z.string(),
  }),

  handler: async ({ pdfUrl }, { step }) => {
    try {
      const httpsUrl = toHttpsUrl(pdfUrl);
      console.log("pdfUrl", pdfUrl);

      return await step?.ai.infer("parse-pdf", {
        model: anthropic({
          model: "claude-3-5-haiku-latest",
          apiKey: process.env.ANTHROPIC_API_KEY!,
          defaultParameters: {
            max_tokens: 3094,
          },
        }),
        //We are giving url to model for scanning
        body: {
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "document",
                  source: {
                    type: "url",
                    url: httpsUrl,
                  },
                },
                {
                  type: "text",
                  text: `
                    Extract the data from the receipt and return the structured 
                    output as follows:
                    {
                        'merchant': {
                            'name': 'Store name',
                            'address': '123 Main str, City, Country'
                            'contact': '+123456789'
                        },
                        'transaction': {
                            'date': 'MM-DD-YYYY',
                            'receipt_number': 'ABC123456'
                            'payment_method': 'Credit Card'
                        },
                        'items': [
                            {
                                'name': 'Item 1',
                                'quantity': 2
                                'unit_price': 10.00
                                'total_price': 20.00
                            }
                        ],
                        'totals': {
                            'subtotal': 20.00,
                            'tax': 2.00
                            'total': 22.00
                            'currency': 'USD'
                        }
                    }
                    `,
                },
              ],
            },
          ],
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
});

export const receiptScanningAgent = createAgent({
  name: "Receipt Scanning Agent",
  description:
    "Process receipt images and PDFs to extract key information such as vendor names, dates, amounts, and line items",
  system: `
    You are an AI-powered receipt scanning assistant.
    Your primary role is to accurately extract and structure 
    relevant information form scanned receipts. Your task includes
    recognizing and parsing details such as:
        - Merchant Information: Store name, address, contact details.
        - Transaction Details: Date, time, receipt number, payment method.
        - Itemized Purchases: Product names, quantities, individual prices, discounts.
        - Total Amounts: Subtotal, taxes, total paid, and any applied discounts.
        - Ensure high accuracy by detecting OCR errors and correcting misread text 
        when possible.
        - Normalize dates, currency values, and formating for consistency,
        - If any key details are missing or unclear, return a structured response 
        indicating incomplete data.
        - Handle multiple formats, languages, and varying receipt layouts efficiently.
        - Maintain a structured JSON output for easy integration with databases or expense tracking systems.
    `,
  model: openai({
    model: "gpt-4o-mini",
    defaultParameters: {
      max_completion_tokens: 3094,
    },
  }),
  tools: [parsePdfTool],
});
