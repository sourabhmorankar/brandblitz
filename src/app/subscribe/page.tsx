'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthWrapper';
import { PayPalScriptProvider, PayPalButtons, PayPalButtonsComponentProps } from '@paypal/react-paypal-js';
import Link from 'next/link';
import { toast } from 'react-toastify';

const subscriptionPlans = [
  { name: 'Weekly', price: 999, requests: 1, planId: 'P-123456789' },
  { name: 'Weekly+', price: 1899, requests: 2, planId: 'P-987654321' },
  { name: 'Weekly++', price: 2699, requests: 3, planId: 'P-456789123' },
];

const SubscribePage = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0]);

  if (!user) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="card text-center">
          <p className="text-gray-400 mb-4">Please log in to subscribe.</p>
          <Link href="/auth" className="btn-primary">Go to Login</Link>
        </div>
      </div>
    );
  }

  const createSubscription: PayPalButtonsComponentProps['createSubscription'] = (_data, actions) => {
    return actions.subscription.create({
      plan_id: selectedPlan.planId,
      custom_id: user.uid,
    });
  };

  const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data) => {
    console.log('Subscription approved:', data);
    toast.success('Subscription activated!');
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">Choose Your Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.name}
              className={`card cursor-pointer transition-all duration-200 ${selectedPlan.name === plan.name ? 'border-indigo-400' : ''}`}
              onClick={() => setSelectedPlan(plan)}
            >
              <h2 className="text-xl font-medium text-gray-200 mb-2">{plan.name}</h2>
              <p className="text-2xl text-indigo-400 mb-2">${plan.price}/week</p>
              <p className="text-gray-400">{plan.requests} concurrent request{plan.requests > 1 ? 's' : ''}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test' }}>
            <PayPalButtons
              style={{ layout: 'vertical', color: 'blue' }}
              createSubscription={createSubscription}
              onApprove={onApprove}
            />
          </PayPalScriptProvider>
          <p className="text-gray-400 text-sm mt-4">
            Selected: {selectedPlan.name} - ${selectedPlan.price}/week
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;