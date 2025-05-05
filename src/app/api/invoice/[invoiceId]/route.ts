import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jsPDF from "jspdf"
import { format } from "date-fns";
import { CurrencyFormat } from "@/hooks/currency";

export async function GET(req: NextRequest, { params }: { params: { invoiceId: string } }) {

    const data = await prisma.invoice.findUnique({
        where: {
            id: params.invoiceId
        },
        select: {
            invoiceName: true,
            invoiceNumber: true,
            currency: true,
            fromName: true,
            fromAddress: true,
            fromEmail: true,
            toName: true,
            toAddress: true,
            toEmail: true,
            date: true,
            dueDate: true,
            invoiceDescription: true,
            invoiceItemQuantity: true,
            invoiceItemrate: true,
            invoiceItemTotalAmount: true,
            note: true,
        }
    })

    if (!data) {
        return new NextResponse("Invoice not found", { status: 404 })
    }

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    // set font
    pdf.setFont("helvetica");

    // setheader
    pdf.setFontSize(24)
    pdf.text(data.invoiceName, 20, 20);

    // From section
    pdf.setFontSize(12)
    pdf.text("From", 20, 40)
    pdf.setFontSize(10)
    pdf.text([data.fromName, data.fromEmail, data.fromAddress], 20, 45);

    // Client section
    pdf.setFontSize(12)
    pdf.text("Bill to", 20, 70)
    pdf.setFontSize(10)
    pdf.text([data.toName, data.toEmail, data.toAddress], 20, 75);

    // Invoice details
    pdf.setFontSize(10)
    pdf.text(`Invoice Number: #${data.invoiceNumber}`, 120, 40)
    pdf.text(`date: ${format(data.date, "dd-MM-yyyy")}`, 120, 45)
    pdf.text(`dueDate: Net ${data.dueDate}`, 120, 50)

    // Item table header
    pdf.setFontSize(10)
    pdf.setFont("helvetica", "bold")
    pdf.text("Description", 20, 100)
    pdf.text("Quantity", 100, 100)
    pdf.text("Rate", 130, 100)
    pdf.text("Total", 160, 100)

    // draw header line
    pdf.line(20, 102, 190, 102)

    // Items details
    pdf.setFont("helvetica", "normal")
    pdf.text(data.invoiceDescription, 20, 110)
    pdf.text(data.invoiceItemQuantity.toString(), 100, 110)
    pdf.text(CurrencyFormat({ amount: data.invoiceItemrate, currency: data.currency as any }), 130, 110)
    pdf.text(CurrencyFormat({ amount: data.invoiceItemTotalAmount, currency: data.currency as any }), 160, 110)


    // Additional note
    if (data.note) {
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(10);
        pdf.text(`Note: `, 20, 150)
        pdf.text(`${data.note}`, 20, 155)

    }

    // generate pdf as buffer
    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"))

    return new NextResponse(pdfBuffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline"
        }
    })

}