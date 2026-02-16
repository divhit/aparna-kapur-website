import Link from "next/link";

type Props = {
  type: "buying" | "selling";
};

const buyingSteps = [
  { num: 1, title: "Decide to Buy", desc: "Assess readiness & goals" },
  { num: 2, title: "Get Pre-Approved", desc: "Mortgage & budget" },
  { num: 3, title: "Choose a Realtor", desc: "Expert representation" },
  { num: 4, title: "House Hunt", desc: "Search & open houses" },
  { num: 5, title: "Inspections", desc: "Due diligence & subjects" },
  { num: 6, title: "Close & Move In", desc: "Keys in hand!" },
];

const sellingSteps = [
  { num: 1, title: "Decide to Sell", desc: "Timing & motivation" },
  { num: 2, title: "Price Your Home", desc: "CMA & strategy" },
  { num: 3, title: "Prepare to Sell", desc: "Staging & repairs" },
  { num: 4, title: "Accept Offers", desc: "Negotiate & choose" },
  { num: 5, title: "Inspections", desc: "Buyer due diligence" },
  { num: 6, title: "Close", desc: "Completion day" },
];

export default function BuyerSellerGuide({ type }: Props) {
  const steps = type === "buying" ? buyingSteps : sellingSteps;
  const label = type === "buying" ? "Buying" : "Selling";
  const href = type === "buying" ? "/buying/guide" : "/selling/guide";

  return (
    <div className="bg-white rounded-xl border border-warm-200 shadow-sm my-2 w-full overflow-hidden">
      <div className="bg-teal-800 px-4 py-2.5">
        <h4 className="text-white text-sm font-semibold">
          {label} a Home: 6 Steps
        </h4>
      </div>
      <div className="p-3">
        <div className="space-y-1.5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-warm-50 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0">
                {step.num}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-warm-900 leading-tight">
                  {step.title}
                </div>
                <div className="text-[10px] text-warm-500">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <Link
          href={href}
          className="block text-center text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg py-2 mt-2 transition-colors"
        >
          Read the Full {label} Guide &rarr;
        </Link>
      </div>
    </div>
  );
}
