import { notFound } from "next/navigation";
import { requireDashboardAdmin } from "@/lib/admin-dashboard-auth-server";
import {
  loadOrBuildCalculatorSeo,
  isAdminCalculatorId,
  getCalculatorById,
} from "@/lib/calculator-seo";
import { getCanonicalUrl } from "@/lib/url-utils";
import { CalculatorSeoForm } from "@/components/admin/calculator-seo-form";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Edit Calculator SEO",
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ calculatorId: string }>;
};

export default async function EditCalculatorSeoPage({ params }: Props) {
  await requireDashboardAdmin();
  const { calculatorId } = await params;

  if (!isAdminCalculatorId(calculatorId)) {
    notFound();
  }

  const calc = getCalculatorById(calculatorId);
  const data = await loadOrBuildCalculatorSeo(calculatorId, "en");
  if (!data || !calc) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <CalculatorSeoForm
          calculatorId={calculatorId}
          calculatorLabel={calc.name}
          publicPath={getCanonicalUrl(calculatorId, "en")}
          initial={data}
        />
      </div>
    </div>
  );
}
