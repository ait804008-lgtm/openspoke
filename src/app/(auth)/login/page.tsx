'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Truck, Users, ShoppingBag } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'driver' | 'dispatcher' | 'customer' | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    try {
      await login(email, password, selectedRole);
      // Redirect based on role
      if (selectedRole === 'driver') {
        router.push('/driver/dashboard');
      } else if (selectedRole === 'dispatcher') {
        router.push('/dispatcher/dashboard');
      } else {
        router.push('/customer/tracking');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">openSpoke</h1>
          <p className="text-gray-600">Delivery logistics made simple</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-center">Sign In</h2>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardBody className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select your role</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('driver')}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                      selectedRole === 'driver'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Truck className={`h-6 w-6 mb-1 ${selectedRole === 'driver' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Driver</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('dispatcher')}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                      selectedRole === 'dispatcher'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Users className={`h-6 w-6 mb-1 ${selectedRole === 'dispatcher' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Dispatcher</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('customer')}
                    className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                      selectedRole === 'customer'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <ShoppingBag className={`h-6 w-6 mb-1 ${selectedRole === 'customer' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs font-medium">Customer</span>
                  </button>
                </div>
              </div>

              <Input
                type="email"
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </CardBody>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={!selectedRole || isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
