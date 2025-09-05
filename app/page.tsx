import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart,
  Check,
  Search,
  Shield,
  Upload,
} from "lucide-react";
import Link from "next/link";
import PDFDropZone from "@/components/PDFDropZone";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Info */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50 to gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm: text-4xl">
                Smart Receipt Scanning
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Scan and analyze any of your receipts with AI-powered precision.
                Save time and gain insight form your expenses.
              </p>
            </div>

            <div className="space-x-4">
              <Link href="/receipts">
                <Button className="bg-blue-500 hover:bg-blue-700">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Receipt PDF drop */}
        <div className="mt-12 flex justify-center m-4">
          <div className="relative w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden dark:border-gray-800 dark:bg-gray-900">
            <div className=" p-6 md:p-8 relative">
              <PDFDropZone />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Powerfull Features
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                AI powered platform transforms how you handle receipts and track
                expesnes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6 dark:border-gray-800">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                  <Upload className="h-6 w-6 text-blue-600 dark:text-blue-400"></Upload>
                </div>
                <h3 className="text-xl font-bold">Easy Uploads</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Drag and drop your PDF receipts for instant scanning and
                  analyzing
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6 dark:border-gray-800">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                  <Search className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Automatically extract and categorize expense data with AI
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 border border-gray-200 rounded-lg p-6 dark:border-gray-800">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                  <BarChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold">Expense Insight</h3>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Generate reports and gain valuable insight from your spending
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Simple Pricing
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Choose the plan that works best for your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto ">
              {/* Free */}
              <div className="flex flex-col p-6 bg-white-border border border-gray-200 rounded-lg shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Free plan to try it out!
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">$0.00</p>
                  <p className="text-gray-500 dark:text-gray-400">/month</p>
                </div>

                <ul className="mt-6 space-y-2 flex-1">
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span>5 Scans per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span>Basic data extraction</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span className="text-center">7-day history</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <Link href="/manage-plan">
                    <Button className="w-full" variant="outline">
                      Sign Up Free
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Standard */}
              <div className="flex flex-col p-6 bg-white-border border border-gray-200 rounded-lg shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Standard</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Standard plan to try it out!
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">$3.99</p>
                  <p className="text-gray-500 dark:text-gray-400">/month</p>
                </div>

                <ul className="mt-6 space-y-2 flex-1">
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span>100 Scans per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span>Enhanced data extraction</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span className="text-center">30-day history</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span className="text-center">Basic export options</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <Link href="/manage-plan">
                    <Button className="w-full" variant="outline">
                      Choose plan
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Premium */}
              <div className="flex flex-col p-6 bg-blue-50 border border-blue-200 rounded-lg relative dark:border-blue-800 dark:bg-blue-900/20">
                <div className="absolute -top-3 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Popular
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Premium plan to max of this
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">$9.99</p>
                  <p className="text-gray-500 dark:text-gray-400">/month</p>
                </div>

                <ul className="mt-6 space-y-2 flex-1">
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span>500 Scans per month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span>Advanced data extraction</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span>AI Summaries</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span className="text-center">Unlimited history</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="text-green-500 h-5 w-5 mr-2"></Check>
                    <span className="text-center">Advanced export options</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <Link href="/manage-plan">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      variant="outline"
                    >
                      Get started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Start Scanning Today
              </h2>
              <p className=" text-gray-500 md:text-xl dark:text-gray-400">
                Save time and gain insight form your receipts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="container px-4 md:px-6 py-8 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1">
              <Shield className="h-6 w-6 text-blue-600"></Shield>
              <span>Receipt Recognition by Farkhat Sali</span>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Smart way to track your money
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
