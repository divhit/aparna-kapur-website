type Props = {
  purchasePrice: number;
  isFirstTimeBuyer: boolean;
  isNewlyBuilt?: boolean;
};

function calculatePTT(price: number) {
  let tax = 0;
  if (price <= 200000) {
    tax = price * 0.01;
  } else if (price <= 2000000) {
    tax = 200000 * 0.01 + (price - 200000) * 0.02;
  } else {
    tax = 200000 * 0.01 + 1800000 * 0.02 + (price - 2000000) * 0.03;
  }
  return Math.round(tax);
}

function calculateExemption(
  price: number,
  isNewlyBuilt: boolean
) {
  const threshold = isNewlyBuilt ? 1100000 : 835000;
  const fadeout = isNewlyBuilt ? 1150000 : 860000;

  if (price <= threshold) {
    return calculatePTT(price); // full exemption
  } else if (price < fadeout) {
    const full = calculatePTT(price);
    const ratio = (fadeout - price) / (fadeout - threshold);
    return Math.round(full * ratio);
  }
  return 0;
}

export default function PropertyTaxBreakdown({
  purchasePrice,
  isFirstTimeBuyer,
  isNewlyBuilt = false,
}: Props) {
  const totalTax = calculatePTT(purchasePrice);
  const exemption = isFirstTimeBuyer
    ? calculateExemption(purchasePrice, isNewlyBuilt)
    : 0;
  const netTax = totalTax - exemption;

  const tiers = [
    {
      range: "First $200,000",
      rate: "1%",
      amount: Math.min(purchasePrice, 200000) * 0.01,
    },
    {
      range: "$200,001 – $2,000,000",
      rate: "2%",
      amount:
        purchasePrice > 200000
          ? Math.min(purchasePrice - 200000, 1800000) * 0.02
          : 0,
    },
  ];

  if (purchasePrice > 2000000) {
    tiers.push({
      range: "Above $2,000,000",
      rate: "3%",
      amount: (purchasePrice - 2000000) * 0.03,
    });
  }

  return (
    <div className="bg-white rounded-xl border border-warm-200 shadow-sm my-2 w-full overflow-hidden">
      <div className="bg-teal-800 px-4 py-2.5">
        <h4 className="text-white text-sm font-semibold">
          BC Property Transfer Tax
        </h4>
        <p className="text-teal-200 text-[10px]">
          On ${purchasePrice.toLocaleString()} purchase
        </p>
      </div>
      <div className="p-3">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-warm-500">
              <th className="text-left py-1 font-medium">Tier</th>
              <th className="text-center py-1 font-medium">Rate</th>
              <th className="text-right py-1 font-medium">Tax</th>
            </tr>
          </thead>
          <tbody>
            {tiers
              .filter((t) => t.amount > 0)
              .map((tier) => (
                <tr key={tier.range} className="border-t border-warm-100">
                  <td className="py-1.5 text-warm-700">{tier.range}</td>
                  <td className="py-1.5 text-center text-warm-600">
                    {tier.rate}
                  </td>
                  <td className="py-1.5 text-right font-medium text-warm-900">
                    ${Math.round(tier.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-warm-200">
              <td colSpan={2} className="py-1.5 font-semibold text-warm-900">
                Total PTT
              </td>
              <td className="py-1.5 text-right font-bold text-warm-900">
                ${totalTax.toLocaleString()}
              </td>
            </tr>
            {isFirstTimeBuyer && exemption > 0 && (
              <tr className="text-emerald-700">
                <td colSpan={2} className="py-1 font-medium">
                  First-time buyer exemption
                </td>
                <td className="py-1 text-right font-bold">
                  -${exemption.toLocaleString()}
                </td>
              </tr>
            )}
            {isFirstTimeBuyer && (
              <tr className="border-t border-warm-200 bg-teal-50">
                <td colSpan={2} className="py-2 font-bold text-teal-900">
                  You Pay
                </td>
                <td className="py-2 text-right font-bold text-teal-900 text-sm">
                  ${netTax.toLocaleString()}
                </td>
              </tr>
            )}
          </tfoot>
        </table>
        {isFirstTimeBuyer && exemption > 0 && (
          <div className="mt-2 text-[10px] text-emerald-700 bg-emerald-50 rounded-md px-2 py-1.5 text-center">
            You save ${exemption.toLocaleString()} with the first-time buyer
            exemption!
          </div>
        )}
      </div>
    </div>
  );
}
