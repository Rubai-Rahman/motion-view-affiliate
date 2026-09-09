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

const withdrawSchema = z.object({
  paymentMethod: z.number().min(1, 'Payment method is required'),
  amount: z.number().min(1, 'Amount is required'),
  accountNo: z.string().min(1, 'Account number is required'),
  accountDetails: z.string().optional(),
  affiliateNote: z.string().optional(),
});

type WithdrawFormValues = z.infer<typeof withdrawSchema>;

type WithdrawFormProps = {
  onSubmit: (data: WithdrawPayload) => void;
  isPending?: boolean;
};

const WithdrawForm = ({ onSubmit, isPending = false }: WithdrawFormProps) => {
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
  };

  const submitting = isSubmitting || isPending;

  return (
    <Dialog>
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
            <div className="grid grid-cols-1 gap-5">
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

              {/* Amount */}
              <FormField
                control={control}
                name="amount"
                label="Withdraw Amount"
                render={(field) => (
                  <Input
                    {...field}
                    id="amount"
                    type="number"
                    min={1}
                    placeholder="Enter withdrawal amount"
                    autoComplete="off"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
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
