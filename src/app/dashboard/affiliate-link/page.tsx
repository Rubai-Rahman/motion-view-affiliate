'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Link2,
  Copy,
  CheckCircle,
  BarChart2,
  Share2,
  Plus,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';

export default function AffiliateLinkPage() {
  const [copied, setCopied] = useState(false);
  const [links, setLinks] = useState([
    {
      id: 1,
      name: 'Homepage Link',
      url: 'https://motionview.com?ref=johndoe',
      clicks: 1234,
      conversions: 45,
      conversionRate: '3.6%',
      created: '2024-01-15',
    },
    {
      id: 2,
      name: 'Product Page Link',
      url: 'https://motionview.com/products?ref=johndoe',
      clicks: 856,
      conversions: 38,
      conversionRate: '4.4%',
      created: '2024-02-20',
    },
    {
      id: 3,
      name: 'Special Offer Link',
      url: 'https://motionview.com/special?ref=johndoe',
      clicks: 2341,
      conversions: 89,
      conversionRate: '3.8%',
      created: '2024-03-10',
    },
  ]);

  const [newLinkName, setNewLinkName] = useState('');

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateLink = () => {
    if (!newLinkName.trim()) return;

    const newLink = {
      id: links.length + 1,
      name: newLinkName,
      url: `https://motionview.com?ref=johndoe&campaign=${newLinkName.toLowerCase().replace(/\s+/g, '-')}`,
      clicks: 0,
      conversions: 0,
      conversionRate: '0%',
      created: new Date().toISOString().split('T')[0],
    };

    setLinks([...links, newLink]);
    setNewLinkName('');
  };

  const handleDeleteLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
          <Link2 className="h-8 w-8 text-blue-500" />
          Affiliate Links
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Generate and manage your affiliate tracking links
        </p>
      </div>

      {/* Main Affiliate Link Card */}
      <Card className="border-0 shadow-lg -linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Your Main Affiliate Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg -linear-to-br from-blue-500 to-purple-600">
                <Link2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Default Affiliate Link
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  https://motionview.com?ref=johndoe
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleCopy('https://motionview.com?ref=johndoe')}
                className="flex-1 -linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Total Clicks
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {links
                  .reduce((sum, link) => sum + link.clicks, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Total Conversions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {links.reduce((sum, link) => sum + link.conversions, 0)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Avg. Conversion Rate
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                3.9%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Link Management Tabs */}
      <Tabs defaultValue="manage" className="space-y-4">
        <TabsList className="bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="manage">Manage Links</TabsTrigger>
          <TabsTrigger value="create">Create New Link</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Your Affiliate Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                            {link.name}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {link.created}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {link.url}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(link.url)}
                            className="h-6 px-2"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <BarChart2 className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {link.clicks.toLocaleString()} clicks
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {link.conversions} conversions
                            </span>
                          </div>
                          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                            {link.conversionRate}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteLink(link.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Create Custom Affiliate Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Link Name
                </label>
                <Input
                  placeholder="e.g., Summer Campaign, Newsletter Link"
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                  className="h-11"
                />
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Give your link a descriptive name to track its performance
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Destination URL
                </label>
                <select className="w-full h-11 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="homepage">
                    Homepage (https://motionview.com)
                  </option>
                  <option value="products">
                    Products Page (https://motionview.com/products)
                  </option>
                  <option value="pricing">
                    Pricing Page (https://motionview.com/pricing)
                  </option>
                  <option value="special">
                    Special Offers (https://motionview.com/special)
                  </option>
                  <option value="custom">Custom URL</option>
                </select>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Preview:</strong> Your link will look like:
                </p>
                <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mt-1 break-all">
                  {newLinkName
                    ? `https://motionview.com?ref=johndoe&campaign=${newLinkName.toLowerCase().replace(/\s+/g, '-')}`
                    : 'https://motionview.com?ref=johndoe&campaign=your-campaign-name'}
                </p>
              </div>

              <Button
                onClick={handleCreateLink}
                disabled={!newLinkName.trim()}
                className="w-full -linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Affiliate Link
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Use descriptive names to easily identify different campaigns
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Create separate links for different marketing channels
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Test different destination URLs to optimize conversions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Regularly review link performance in the analytics tab
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Link Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {links.map((link) => (
                  <div key={link.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {link.name}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {link.clicks.toLocaleString()} clicks
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full -linear-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min((link.clicks / Math.max(...links.map((l) => l.clicks))) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Top Performing Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {links
                  .sort((a, b) => b.conversions - a.conversions)
                  .slice(0, 3)
                  .map((link, index) => (
                    <div
                      key={link.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full -linear-to-br from-blue-500 to-purple-600 text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {link.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {link.clicks.toLocaleString()} clicks
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600 dark:text-green-400">
                          {link.conversions} conversions
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {link.conversionRate}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
