import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DollarSign,
  Download,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';

export default function PaymentReportPage() {
  const payments = [
    {
      id: 'PAY-001',
      date: '2024-01-15',
      amount: '$2,450.00',
      status: 'completed',
      method: 'Bank Transfer',
      description: 'Monthly commission payout',
    },
    {
      id: 'PAY-002',
      date: '2024-02-15',
      amount: '$3,120.00',
      status: 'completed',
      method: 'PayPal',
      description: 'Monthly commission payout',
    },
    {
      id: 'PAY-003',
      date: '2024-03-15',
      amount: '$2,890.00',
      status: 'completed',
      method: 'Bank Transfer',
      description: 'Monthly commission payout',
    },
    {
      id: 'PAY-004',
      date: '2024-04-15',
      amount: '$3,450.00',
      status: 'pending',
      method: 'Bank Transfer',
      description: 'Monthly commission payout',
    },
    {
      id: 'PAY-005',
      date: '2024-05-15',
      amount: '$0.00',
      status: 'scheduled',
      method: 'Bank Transfer',
      description: 'Monthly commission payout',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800">
            <Calendar className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalPaid = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace(/[$,]/g, '')), 0);
  const pendingAmount = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace(/[$,]/g, '')), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-green-500" />
            Payment Reports
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your earnings and payment history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-lg -linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Paid
            </CardTitle>
            <div className="p-2 rounded-lg -linear-to-br from-green-500 to-emerald-600">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ${totalPaid.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Lifetime earnings
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg -linear-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Pending
            </CardTitle>
            <div className="p-2 rounded-lg -linear-to-br from-yellow-500 to-amber-600">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ${pendingAmount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Awaiting payment
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg -linear-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Next Payout
            </CardTitle>
            <div className="p-2 rounded-lg -linear-to-br from-blue-500 to-purple-600">
              <Calendar className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              May 15, 2024
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Scheduled date
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Schedule */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Payment Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Monthly Payouts
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Payments are processed on the 15th of each month. Minimum
                  payout amount is $50.00. Earnings below this threshold will
                  roll over to the next month.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 dark:border-gray-700">
                  <TableHead className="text-gray-600 dark:text-gray-400">
                    Payment ID
                  </TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-400">
                    Date
                  </TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-400">
                    Amount
                  </TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-400">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-400">
                    Method
                  </TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-400">
                    Description
                  </TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-400">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                      {payment.id}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {payment.date}
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900 dark:text-gray-100">
                      {payment.amount}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {payment.method}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {payment.description}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      Bank Transfer
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ****4521
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
                  Primary
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Edit
              </Button>
            </div>

            <div className="p-4 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
              <Button
                variant="ghost"
                className="text-blue-600 dark:text-blue-400"
              >
                + Add Payment Method
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
