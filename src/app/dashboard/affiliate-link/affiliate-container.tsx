'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Link2,
  Copy,
  CheckCircle,
  Plus,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import useLocalStorage from '@/hooks/useSyncExterna';
import { toast } from '@/components/ui/toast';

interface AffiliateLink {
  id: number;
  name: string;
  url: string;
  created: string;
}

// Path segments we never want to keep in the final affiliate link.
// Add more here if you find other tracking-only segments (e.g. "promo").
const STRIPPED_PATH_SEGMENTS = ['campaign'];

// Query params we never want to keep in the final affiliate link.
const STRIPPED_QUERY_PARAMS = ['campaign_id', 'campaign'];

/**
 * Takes a raw destination URL (e.g. a product page the user pasted) and:
 *  1. Removes tracking-only path segments like "/campaign/"
 *  2. Removes tracking-only query params like "?campaign_id=67"
 *  3. Appends/overwrites a "ref" query param with the affiliate code
 *
 * Example:
 *  in:  https://motionview.com.bd/product/campaign/foneng-combo-bl138-earbuds-px150-powerbank?campaign_id=67
 *  out: https://motionview.com.bd/product/foneng-combo-bl138-earbuds-px150-powerbank?ref=johndoe
 */
function buildAffiliateLink(
  rawUrl: string,
  affiliateCode: string,
): string | null {
  try {
    const trimmed = rawUrl.trim();
    const url = new URL(trimmed);

    const cleanedSegments = url.pathname
      .split('/')
      .filter(Boolean)
      .filter(
        (segment) => !STRIPPED_PATH_SEGMENTS.includes(segment.toLowerCase()),
      );

    url.pathname = '/' + cleanedSegments.join('/');

    STRIPPED_QUERY_PARAMS.forEach((param) => url.searchParams.delete(param));
    url.searchParams.set('ref', affiliateCode);

    return url.toString();
  } catch {
    // Not a valid absolute URL (missing https://, malformed, etc.)
    return null;
  }
}

export default function AffiliateLinkContainer() {
  const [newLinkName, setNewLinkName] = useState('');
  const [destinationUrl, setDestinationUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [links, setLinks] = useState<AffiliateLink[]>([]);

  // Adjust this destructure if your useLocalStorage hook has a different
  // return shape. Common shapes are `const [value, setValue] = useLocalStorage(...)`
  // or `const value = useLocalStorage(...)`.
  const affiliateCode = useLocalStorage('affiliateCode');

  const previewLink = destinationUrl
    ? buildAffiliateLink(destinationUrl, affiliateCode)
    : null;

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.add({
        title: 'Link copied to clipboard',
        description: 'The affiliate link has been copied to your clipboard.',
        type: 'success',
      });
    } catch {
      toast.add({
        title: 'Could not copy link',
        description: 'Please copy it manually.',
        type: 'error',
      });
    }
  };

  const handleCreateLink = () => {
    if (!destinationUrl.trim()) return;

    const generatedUrl = buildAffiliateLink(destinationUrl, affiliateCode);

    if (!generatedUrl) {
      const message =
        "That doesn't look like a valid URL. Include https:// and try again.";
      setUrlError(message);
      toast.add({
        title: 'Invalid URL',
        description: message,
        type: 'error',
      });
      return;
    }

    const name = newLinkName.trim() || `Link ${links.length + 1}`;

    const newLink: AffiliateLink = {
      id: Date.now(),
      name,
      url: generatedUrl,
      created: new Date().toISOString().split('T')[0],
    };

    setLinks((prev) => [newLink, ...prev]);
    setNewLinkName('');
    setDestinationUrl('');
    setUrlError('');
    toast.add({
      title: 'Link created',
      description: `Affiliate link "${name}" created`,
      type: 'success',
    });
  };

  const handleRemoveLink = (id: number, name: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
    toast.add({
      title: 'Link removed',
      description: `Removed "${name}"`,
      type: 'success',
    });
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

      {/* Create Link */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Create Custom Affiliate Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Destination URL
            </label>
            <Input
              placeholder="Paste a product or page link, e.g. https://motionview.com.bd/product/..."
              value={destinationUrl}
              onChange={(e) => {
                setDestinationUrl(e.target.value);
                setUrlError('');
              }}
              className="h-11"
            />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Paste any Motionview link. Tracking segments like /campaign/ and
              campaign_id are stripped automatically, then your ref code is
              appended.
            </p>
          </div>

          {urlError && (
            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{urlError}</span>
            </div>
          )}

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Preview:</strong> Your link will look like:
            </p>
            <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mt-1 break-all">
              {previewLink ||
                `https://your-pasted-link.com?ref=${affiliateCode}`}
            </p>
          </div>

          <Button
            onClick={handleCreateLink}
            disabled={!destinationUrl.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Affiliate Link
          </Button>
        </CardContent>
      </Card>

      {/* Best Practices */}
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

      {/* Created Links */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Your Affiliate Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {links.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-400 py-6 text-center">
              No links yet. Create one above to see it here.
            </p>
          ) : (
            links.map((link) => (
              <div
                key={link.id}
                className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {link.name}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                    {link.created}
                  </span>
                </div>
                <p className="text-sm font-mono text-blue-600 dark:text-blue-400 break-all">
                  {link.url}
                </p>
                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(link.url)}
                  >
                    <Copy className="h-3.5 w-3.5 mr-2" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => handleRemoveLink(link.id, link.name)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
