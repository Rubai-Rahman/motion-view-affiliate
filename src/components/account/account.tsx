import Link from 'next/link';
import {
  User,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Percent,
  CreditCard,
  Phone,
  CalendarDays,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { AccountData } from '@/types/dashboard.types';
import Image from 'next/image';

interface AccountProps {
  data: AccountData;
}

const Account = ({ data }: AccountProps) => {
  console.log('data===', data);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Not available';

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return 'Not available';
    }

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: number) => {
    if (status === 1) {
      return (
        <Badge className="border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400">
          <CheckCircle className="mr-1 size-3" />
          Active
        </Badge>
      );
    }

    return (
      <Badge className="border-red-500/20 bg-red-500/10 text-red-600 dark:text-red-400">
        <XCircle className="mr-1 size-3" />
        Inactive
      </Badge>
    );
  };

  const getTypeBadge = (type: number) => {
    return type === 1 ? 'Individual' : 'Business';
  };

  const profileImageUrl = data.profile_picture_url
    ? data.profile_picture_url.startsWith('http')
      ? data.profile_picture_url
      : `http://${data.profile_picture_url}`
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Account Settings
          </h1>

          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <Button variant="link" className="">
          <Link
            href="/change-password"
            className="flex items-center bg-foreground/10 shadow-sm p-1 rounded-sm"
          >
            <KeyRound className="mr-2 size-4" />
            Change Password
          </Link>
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="overflow-hidden border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-background">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Profile Image */}
            <div className="shrink-0">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={data.name}
                  className="size-24 rounded-full border-4 border-background object-cover shadow-md"
                  width={96}
                  height={96}
                />
              ) : (
                <div className="flex size-24 items-center justify-center rounded-full border-4 border-background bg-primary/10">
                  <User className="size-12 text-primary" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h2 className="truncate text-2xl font-bold">{data.name}</h2>

                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="size-4 shrink-0" />
                    {data.email}
                  </p>

                  {data.phone && (
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="size-4 shrink-0" />
                      {data.phone}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(data.status)}

                  <Badge variant="outline">{getTypeBadge(data.type)}</Badge>
                </div>
              </div>

              {/* Affiliate Code */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-sm font-semibold"
                >
                  {data.affiliate_code}
                </Badge>

                <span className="text-sm text-muted-foreground">
                  Affiliate Code
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Details */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Mail className="size-4" />
              Contact Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex gap-3">
              <div className="mt-0.5 rounded-md bg-primary/10 p-2">
                <Mail className="size-4 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="break-all font-medium">{data.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-0.5 rounded-md bg-primary/10 p-2">
                <Phone className="size-4 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{data.phone || 'Not provided'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="size-4" />
              Location & Description
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex gap-3">
              <div className="mt-0.5 rounded-md bg-primary/10 p-2">
                <MapPin className="size-4 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{data.address || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="mt-0.5 rounded-md bg-primary/10 p-2">
                <User className="size-4 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">
                  {data.description || 'Not provided'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission Rates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Percent className="size-4" />
              Commission Rates
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">Your Commission</p>

                <p className="mt-1 text-2xl font-bold text-primary">
                  {data.commission_rate}%
                </p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm text-muted-foreground">
                  Customer Discount
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {data.customer_discount_rate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Affiliate Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="size-4" />
              Affiliate Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Affiliate Code</p>

                <p className="mt-1 font-semibold">{data.affiliate_code}</p>
              </div>

              <Badge variant="secondary">{getTypeBadge(data.type)}</Badge>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-md bg-primary/10 p-2">
                <ShieldCheck className="size-4 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>

                <p className="font-medium">
                  {data.status === 1 ? 'Active Account' : 'Inactive Account'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5" />
            Account Timeline
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Created */}
            <div className="flex gap-3">
              <div className="mt-0.5 rounded-md bg-primary/10 p-2">
                <CalendarDays className="size-4 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Account Created</p>

                <p className="mt-1 font-medium">
                  {formatDate(data.created_at)}
                </p>
              </div>
            </div>

            {/* Approved */}
            <div className="flex gap-3">
              <div className="mt-0.5 rounded-md bg-green-500/10 p-2">
                <CheckCircle className="size-4 text-green-600 dark:text-green-400" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Account Approved
                </p>

                <p className="mt-1 font-medium">
                  {data.approved_at ? formatDate(data.approved_at) : 'Pending'}
                </p>
              </div>
            </div>

            {/* Updated */}
            <div className="flex gap-3">
              <div className="mt-0.5 rounded-md bg-primary/10 p-2">
                <Clock className="size-4 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>

                <p className="mt-1 font-medium">
                  {formatDate(data.updated_at)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
