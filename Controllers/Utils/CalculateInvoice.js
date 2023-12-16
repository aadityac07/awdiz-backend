// utils/calculateInvoice.js
const calculateInvoice = (item) => {
    const totalCost = item.quantity * item.costPrice;
    const totalWithMargin = totalCost + (totalCost * (item.margin / 100));
    const discountedTotal = totalWithMargin - (totalWithMargin * (item.discount / 100));
    return discountedTotal + (discountedTotal * (item.tax / 100));
};

module.exports = calculateInvoice;
