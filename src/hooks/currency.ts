interface CurrencyFormatProps {
    amount: number;
    currency: "USD" | "INR"
}

export function CurrencyFormat({ amount, currency }: CurrencyFormatProps) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency
    }).format(amount)
}