
import PaymentSuccessClient from "./PaymentSuccessClient";

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function SuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id } = await searchParams;

  return (
    <PaymentSuccessClient sessionId={session_id || ""} />
  );
}
