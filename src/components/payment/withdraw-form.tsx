'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '../ui/form-field';

import { WithdrawPayload } from '@/types/payment.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { paymentMethods } from '@/constants/withdraw.constant';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';

const createWithdrawSchema = (balance: number) =>
  z
    .object({
      paymentMethod: z.number().min(1, 'Payment method is required'),

      amount: z
        .number()
        .min(1, 'Amount is required')
        .max(balance, `Amount cannot exceed your balance of ${balance}`),

      accountNo: z.string().min(1, 'Account number is required'),

      accountDetails: z.string().optional(),

      affiliateNote: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.paymentMethod === 4 && !data.accountDetails?.trim()) {
        ctx.addIssue({
          code: 'custom',
          path: ['accountDetails'],
          message:
            'Account details are required for Bank Payment Method. Please add account details',
        });
      }
    });

type WithdrawFormValues = z.infer<ReturnType<typeof createWithdrawSchema>>;

type WithdrawFormProps = {
  onSubmit: (data: WithdrawPayload) => void;
  isPending?: boolean;
  balance: number | null;
};

const WithdrawForm = ({
  onSubmit,
  isPending = false,
  balance,
}: WithdrawFormProps) => {
  const [open, setOpen] = useState(false);
  const withdrawSchema = createWithdrawSchema(balance ?? 0);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      paymentMethod: 1,
      amount: 0,
      accountNo: '',
      accountDetails: '',
      affiliateNote: '',
    },
  });

  const onSubmitHandler = async (formData: WithdrawFormValues) => {
    console.log('formData', formData);
    const payload: WithdrawPayload = {
      payment_method: formData.paymentMethod,
      amount: formData.amount,
      payment_account:
        formData.accountNo +
        (formData.accountDetails ? ` - ${formData.accountDetails}` : ''),
      affiliate_note: formData.affiliateNote,
    };
    onSubmit(payload);
    setOpen(false);
  };

  const submitting = isSubmitting || isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Request Withdraw</Button>} />
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Withdraw Funds
          </DialogTitle>

          <DialogDescription>
            Enter your payment details and the amount you want to withdraw.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitHandler)} className="mt-2">
          <FieldGroup>
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 grid w-full grid-cols-2 gap-5">
                <FormField
                  control={control}
                  name="amount"
                  label="Withdraw Amount"
                  labelExtra={
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="ml-2 size-4 text-destructive cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{`Maximum withdrawal amount can not be more than ${balance} BDT`}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  }
                  render={(field) => (
                    <Input
                      {...field}
                      id="amount"
                      type="number"
                      min={1}
                      max={balance ?? 0}
                      placeholder="Enter withdrawal amount"
                      autoComplete="off"
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    />
                  )}
                />

                <div className="mt-6 flex h-8 items-center justify-between rounded-lg border p-2 bg-background">
                  <span className="text-sm text-muted-foreground">
                    Available balance
                  </span>

                  <span className="text-sm font-semibold">
                    ৳{(balance ?? 0).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-x-4">
                {/* Payment Method */}
                <FormField
                  control={control}
                  name="paymentMethod"
                  label="Payment Method"
                  render={(field) => (
                    <Select
                      value={String(field.value)}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger id="paymentMethod" className="h-10 w-full">
                        <SelectValue placeholder="Select payment method">
                          {
                            paymentMethods.find(
                              (method) => method.value === field.value,
                            )?.label
                          }
                        </SelectValue>
                      </SelectTrigger>

                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            {method.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {/* Account Number */}
                <FormField
                  control={control}
                  name="accountNo"
                  label="Account Number"
                  render={(field) => (
                    <Input
                      {...field}
                      id="accountNo"
                      type="text"
                      placeholder="Enter account number"
                      autoComplete="off"
                    />
                  )}
                />
              </div>
              {/* Account Details */}
              <div className="md:col-span-2">
                <FormField
                  control={control}
                  name="accountDetails"
                  label="Account Details"
                  render={(field) => (
                    <Textarea
                      {...field}
                      id="accountDetails"
                      placeholder="Enter bank, mobile banking, or other account details"
                      className="min-h-24 resize-none"
                    />
                  )}
                />
              </div>

              {/* Affiliate Note */}
              <div className="md:col-span-2">
                <FormField
                  control={control}
                  name="affiliateNote"
                  label="Affiliate Note"
                  render={(field) => (
                    <Textarea
                      {...field}
                      id="affiliateNote"
                      placeholder="Add a note for your withdrawal request (optional)"
                      className="min-h-20 resize-none"
                    />
                  )}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t pt-5">
              <DialogClose
                render={<Button variant="outline" disabled={submitting} />}
              >
                Cancel
              </DialogClose>

              <Button
                type="submit"
                disabled={submitting}
                isLoading={submitting}
                className="min-w-32"
              >
                {submitting ? 'Processing...' : 'Submit Withdrawal'}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawForm;
