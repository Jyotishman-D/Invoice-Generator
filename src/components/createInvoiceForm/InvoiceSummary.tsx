import { CurrencyFormat } from "@/hooks/currency";

interface InvoiceSummaryProps {
    form: any;
}

export const InvoiceSummary = ({ form }: InvoiceSummaryProps) => (
    <div className="flex justify-end">
        <div className="w-1/3">
            <div className="flex justify-between items-center py-2">
                <span>Subtotal</span>
                <span>
                    {CurrencyFormat({ 
                        amount: form.watch("invoiceItemTotalAmount"), 
                        currency: form.watch("currency") 
                    })}
                </span>
            </div>
        </div>
    </div>
); 