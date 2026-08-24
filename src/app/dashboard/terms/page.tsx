import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Shield, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <FileText className="h-8 w-8 text-blue-500" />
          Terms & Conditions
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Please read and accept our affiliate program terms
        </p>
      </div>

      {/* Last Updated */}
      <Card className="border-0 shadow-lg bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Last Updated: January 15, 2024
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Version 2.1
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Terms Content */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Motion View Affiliate Program Terms & Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Introduction */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              1. Introduction
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Welcome to the Motion View Affiliate Program. By participating in our program, you agree to abide by these Terms & Conditions. 
              This document outlines the rules, responsibilities, and expectations for all affiliates in our program.
            </p>
          </section>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Affiliate Responsibilities */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              2. Affiliate Responsibilities
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Promote Motion View products and services through legitimate marketing channels</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Ensure all promotional content is accurate, truthful, and complies with applicable laws</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Maintain the reputation and integrity of the Motion View brand</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Respond promptly to communications from the Motion View team</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Keep your account information and payment details up to date</span>
              </li>
            </ul>
          </section>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Commission Structure */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-500" />
              3. Commission Structure
            </h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Commission Rate:</strong> Affiliates earn a 20% commission on all qualifying sales generated through their unique affiliate links.
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Cookie Duration:</strong> Affiliate tracking cookies remain valid for 30 days from the initial click.
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Minimum Payout:</strong> Minimum payout amount is $50.00. Earnings below this threshold will roll over to the next payment period.
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Payment Schedule:</strong> Payments are processed on the 15th of each month for the previous month's earnings.
              </p>
              <p>
                <strong className="text-gray-900 dark:text-gray-100">Payment Methods:</strong> We support bank transfers and PayPal for commission payouts.
              </p>
            </div>
          </section>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Prohibited Activities */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              4. Prohibited Activities
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Using fraudulent or deceptive marketing practices</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Spamming or sending unsolicited promotional emails</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Misrepresenting Motion View products or services</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Using spyware, adware, or other malicious software</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Bidding on trademarked terms in paid search campaigns</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>Creating fake accounts or generating fraudulent referrals</span>
              </li>
            </ul>
          </section>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Termination */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-500" />
              5. Termination
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Motion View reserves the right to terminate any affiliate account at our sole discretion, with or without cause, 
              and with or without notice. Termination may occur for violations of these terms, fraudulent activity, or any other reason 
              deemed necessary by Motion View. Upon termination, all unpaid commissions will be forfeited.
            </p>
          </section>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Limitation of Liability */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-purple-500" />
              6. Limitation of Liability
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Motion View shall not be liable for any indirect, incidental, special, or consequential damages arising from your 
              participation in the affiliate program, including but not limited to lost profits, business interruption, or loss of data. 
              Our total liability to you shall not exceed the total commissions paid to you under this agreement.
            </p>
          </section>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Modifications */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              7. Modifications
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Motion View reserves the right to modify these terms at any time, with or without notice. 
              Continued participation in the affiliate program after modifications constitutes acceptance of the updated terms. 
              Affiliates will be notified of significant changes via email.
            </p>
          </section>

          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Contact */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              8. Contact Information
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you have any questions about these Terms & Conditions, please contact our affiliate support team at 
              <a href="mailto:affiliates@motionview.com" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                affiliates@motionview.com
              </a>
            </p>
          </section>
        </CardContent>
      </Card>

      {/* Acceptance Notice */}
      <Card className="border-0 shadow-lg bg-green-50 dark:bg-green-900/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                By participating in our affiliate program, you acknowledge that you have read, understood, and agree to these Terms & Conditions.
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Continued use of your affiliate account constitutes acceptance of any future modifications.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}