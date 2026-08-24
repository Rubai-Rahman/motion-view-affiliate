import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  Book,
  Search,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How do I get my affiliate link?',
      answer:
        'You can generate your unique affiliate link by visiting the "Affiliate Link" section in your dashboard. Each link is unique to your account and tracks all referrals.',
      category: 'Getting Started',
    },
    {
      question: 'What is the commission rate?',
      answer:
        'Our standard commission rate is 20% on all qualifying sales. Premium affiliates may qualify for higher rates based on performance.',
      category: 'Commissions',
    },
    {
      question: 'When do I get paid?',
      answer:
        "Payments are processed on the 15th of each month for the previous month's earnings. The minimum payout amount is $50.",
      category: 'Payments',
    },
    {
      question: 'How long do cookies last?',
      answer:
        "Our affiliate tracking cookies remain valid for 30 days from the initial click. This means if a customer makes a purchase within 30 days, you'll receive commission.",
      category: 'Tracking',
    },
    {
      question: 'Can I promote on social media?',
      answer:
        "Yes! Social media promotion is encouraged. However, please ensure your promotions comply with our terms and the platform's guidelines.",
      category: 'Marketing',
    },
    {
      question: 'What payment methods are available?',
      answer:
        'We currently support bank transfers and PayPal for commission payouts. You can set your preferred payment method in your account settings.',
      category: 'Payments',
    },
    {
      question: 'How do I track my performance?',
      answer:
        'Visit the "Reports" section in your dashboard to view detailed analytics including clicks, conversions, revenue, and conversion rates.',
      category: 'Analytics',
    },
    {
      question: 'What happens if a customer refunds?',
      answer:
        'If a customer requests a refund, the corresponding commission will be deducted from your account in the next payment period.',
      category: 'Commissions',
    },
  ];

  const supportResources = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of affiliate marketing with Motion View',
      icon: Book,
      link: '#',
    },
    {
      title: 'Marketing Best Practices',
      description: 'Tips and strategies to maximize your affiliate earnings',
      icon: MessageSquare,
      link: '#',
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common tasks',
      icon: ExternalLink,
      link: '#',
    },
    {
      title: 'API Documentation',
      description: 'Technical documentation for advanced integrations',
      icon: Book,
      link: '#',
    },
  ];

  const contactMethods = [
    {
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      icon: Mail,
      value: 'affiliates@motionview.com',
      action: 'Send Email',
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      icon: MessageSquare,
      value: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat',
    },
    {
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      icon: Phone,
      value: '+1 (555) 123-4567',
      action: 'Call Now',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <HelpCircle className="h-8 w-8 text-blue-500" />
          Help & Support
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Find answers to common questions or get in touch with our support team
        </p>
      </div>

      {/* Search Bar */}
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help articles, FAQs, and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Contact Options */}
      <div className="grid gap-4 md:grid-cols-3">
        {contactMethods.map((method) => (
          <Card
            key={method.title}
            className="border-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-3 rounded-full bg-linear-to-br from-blue-500 to-purple-600">
                  <method.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {method.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {method.description}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {method.value}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  {method.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Content Tabs */}
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {faq.category}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {faq.question}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {faq.answer}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No FAQs found matching your search. Try a different query
                      or browse our categories.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Support Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {supportResources.map((resource) => (
                  <div
                    key={resource.title}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <resource.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {resource.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {resource.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 dark:text-blue-400 p-0 h-auto"
                        >
                          View Resource
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Book className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    Need more help?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Check out our comprehensive knowledge base for detailed
                    guides and tutorials.
                  </p>
                </div>
                <Button variant="outline">
                  Visit Knowledge Base
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Subject
                </label>
                <Input placeholder="How can we help you?" className="h-11" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Message
                </label>
                <textarea
                  placeholder="Describe your issue or question in detail..."
                  className="w-full h-32 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Category
                </label>
                <select className="w-full h-11 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select a category</option>
                  <option value="technical">Technical Issue</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="account">Account Management</option>
                  <option value="marketing">Marketing & Promotion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <Button className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Email Support
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    24/7
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Live Chat
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    9 AM - 6 PM EST
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Phone Support
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    9 AM - 5 PM EST
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
