import jsPDF from 'jspdf';

export const generateInvoice = (orderData, orderItems) => {
    const doc = new jsPDF();

    // Company Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('MTEL', 20, 20);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Walk & Talk Pvt Ltd', 20, 28);
    doc.text('Premium Mobile Devices', 20, 33);

    // Invoice Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 150, 20);

    // Invoice Details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice #: ${orderData.id}`, 150, 28);
    doc.text(`Date: ${new Date(orderData.created_at).toLocaleDateString()}`, 150, 33);
    doc.text(`Status: ${orderData.status.toUpperCase()}`, 150, 38);

    // Line separator
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);

    // Customer Information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 20, 55);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(orderData.customer_name, 20, 62);
    doc.text(orderData.email, 20, 67);
    doc.text(orderData.phone, 20, 72);
    doc.text(orderData.address, 20, 77);

    // Payment Method
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Method:', 120, 55);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(orderData.payment_method, 120, 62);

    // Items Table Header
    let yPos = 95;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Item', 20, yPos);
    doc.text('Qty', 120, yPos);
    doc.text('Price', 145, yPos);
    doc.text('Total', 170, yPos);

    // Line under header
    yPos += 3;
    doc.setLineWidth(0.3);
    doc.line(20, yPos, 190, yPos);

    // Items
    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    orderItems.forEach((item) => {
        const itemTotal = item.quantity * item.price;

        doc.text(item.product_name, 20, yPos);
        doc.text(item.quantity.toString(), 120, yPos);
        doc.text(`LKR ${item.price.toLocaleString()}`, 145, yPos);
        doc.text(`LKR ${itemTotal.toLocaleString()}`, 170, yPos);

        yPos += 7;
    });

    // Line before totals
    yPos += 5;
    doc.setLineWidth(0.3);
    doc.line(120, yPos, 190, yPos);

    // Totals
    yPos += 8;
    doc.setFont('helvetica', 'bold');
    doc.text('Subtotal:', 120, yPos);
    doc.text(`LKR ${orderData.total_amount.toLocaleString()}`, 170, yPos);

    yPos += 7;
    doc.text('Shipping:', 120, yPos);
    doc.text('Free', 170, yPos);

    yPos += 10;
    doc.setFontSize(12);
    doc.text('TOTAL:', 120, yPos);
    doc.text(`LKR ${orderData.total_amount.toLocaleString()}`, 170, yPos);

    // Footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for your business!', 105, 280, { align: 'center' });
    doc.text('For any queries, please contact us at support@mtel.lk', 105, 285, { align: 'center' });

    // Save the PDF
    doc.save(`MTEL-Invoice-${orderData.id}.pdf`);
};
