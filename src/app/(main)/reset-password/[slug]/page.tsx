import { ResetPasswordForm } from "@/components";

export const metadata = {
  title: "Reset Your Password",
};

const ResetPasswordPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || "";

  return <ResetPasswordForm slug={slug} />;
};

export default ResetPasswordPage;
