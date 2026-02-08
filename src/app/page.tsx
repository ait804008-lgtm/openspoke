import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">openSpoke</h1>
        <p className="text-xl text-gray-600 mb-8">Delivery logistics made simple</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">For Drivers</h3>
            <p className="text-gray-600 mb-4">Manage your routes and deliver with ease</p>
            <Link href="/auth/login">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">For Dispatchers</h3>
            <p className="text-gray-600 mb-4">Plan trips and optimize routes</p>
            <Link href="/auth/login">
              <Button className="w-full">Get Started</Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">For Customers</h3>
            <p className="text-gray-600 mb-4">Track your deliveries in real-time</p>
            <Link href="/auth/login">
              <Button variant="outline" className="w-full">Track Order</Button>
            </Link>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Built with Next.js, React, TypeScript, and Tailwind CSS
        </p>
      </div>
    </div>
  );
}
