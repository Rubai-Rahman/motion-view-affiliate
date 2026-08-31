import {
  User,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Percent,
  CreditCard,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AccountData } from '@/types/dashboard.types';

interface AccountProps {
  data: AccountData;
}

const Account = ({ data }: AccountProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
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
        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
          <CheckCircle className="size-3 mr-1" />
          Active
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
        <XCircle className="size-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  const getTypeBadge = (type: number) => {
    return type === 1 ? 'Individual' : 'Business';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-linear-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              {data.profile_picture_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`http://${data.profile_picture_url}`}
                  alt={data.name}
                  className="h-24 w-24 rounded-full object-cover border-4 border-background"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background">
                  <User className="size-12 text-primary" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{data.name}</h2>
                  <p className="text-muted-foreground">{data.email}</p>
                </div>
                <div className="flex gap-2">
                  {getStatusBadge(data.status)}
                  <Badge variant="outline">{getTypeBadge(data.type)}</Badge>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <Badge variant="secondary" className="text-base">
                  {data.affiliate_code}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Details */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Mail className="size-4" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{data.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{data.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="size-4" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{data.address || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">
                {data.description || 'Not provided'}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Percent className="size-4" />
              Commission Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Your Commission</p>
              <p className="font-medium text-lg">{data.commission_rate}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Customer Discount</p>
              <p className="font-medium text-lg">
                {data.customer_discount_rate}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="size-4" />
              Affiliate Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Affiliate Code</p>
              <p className="font-medium text-lg">{data.affiliate_code}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Account Type</p>
              <p className="font-medium">{getTypeBadge(data.type)}</p>
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
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Account Created</p>
              <p className="font-medium">{formatDate(data.created_at)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Account Approved</p>
              <p className="font-medium">
                {data.approved_at ? formatDate(data.approved_at) : 'Pending'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">{formatDate(data.updated_at)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
