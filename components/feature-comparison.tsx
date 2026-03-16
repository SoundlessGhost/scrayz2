// components/FeatureComparison.jsx

const Check = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`h-5 w-5 ${className || ""}`}
  >
    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
  </svg>
);

const Cross = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`h-5 w-5 ${className || ""}`}
  >
    <path
      fill="currentColor"
      d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z"
    />
  </svg>
);

interface FeatureComparisonProps {
  ourName?: string;
  competitorName?: string;
  highlight?: "ours" | "theirs" | null;
  features?: Array<{ label: string; ours: string | boolean; theirs: string | boolean }>;
  note?: string;
}

export default function FeatureComparison({
  ourName = "Our Service",
  competitorName = "Competitor",
  highlight = "ours",
  features = [
    { label: "Monthly API calls", ours: "1,000", theirs: "10,000" },
    { label: "Overage pricing", ours: "$0.05/call", theirs: "$0.03/call" },
    { label: "Data retention", ours: "7 days", theirs: "30 days" },
    { label: "Webhook delivery", ours: false, theirs: true },
    { label: "Bulk operations", ours: false, theirs: true },
    { label: "Phone support", ours: false, theirs: false },
  ],
  note = "Compare all features across our service and the competitor",
}: FeatureComparisonProps) {
  return (
    <section className="bg-white py-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow border overflow-hidden">
        <div className="text-center py-6 border-b">
          <h2 className="text-xl font-semibold">Feature Comparison</h2>
          <p className="text-gray-600 text-sm mt-1">{note}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 font-semibold">Feature</th>
                <th
                  className={`px-6 py-4 font-semibold ${
                    highlight === "ours" ? "bg-blue-50 text-blue-700" : ""
                  }`}
                >
                  {ourName}
                </th>
                <th
                  className={`px-6 py-4 font-semibold ${
                    highlight === "theirs" ? "bg-blue-50 text-blue-700" : ""
                  }`}
                >
                  {competitorName}
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i} className="border-t">
                  <td className="px-6 py-4">{f.label}</td>
                  <td
                    className={`px-6 py-4 ${
                      highlight === "ours" ? "bg-blue-50" : ""
                    }`}
                  >
                    {typeof f.ours === "boolean" ? (
                      f.ours ? (
                        <Check className="text-green-600" />
                      ) : (
                        <Cross className="text-red-500" />
                      )
                    ) : (
                      f.ours
                    )}
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      highlight === "theirs" ? "bg-blue-50" : ""
                    }`}
                  >
                    {typeof f.theirs === "boolean" ? (
                      f.theirs ? (
                        <Check className="text-green-600" />
                      ) : (
                        <Cross className="text-red-500" />
                      )
                    ) : (
                      f.theirs
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
