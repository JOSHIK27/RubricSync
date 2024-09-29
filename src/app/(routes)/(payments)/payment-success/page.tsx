import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="flex justify-center pt-20">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
        </div>
      </div>
    </div>
  );
}
