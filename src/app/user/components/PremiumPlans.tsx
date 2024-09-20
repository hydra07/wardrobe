import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, X } from 'lucide-react';

export default function PremiumPlans() {
  const plans = [
    {
      name: 'Free',
      price: '0 đ/month',
      features: [
        { name: 'Basic access', included: true },
        { name: 'Limited storage', included: true },
        { name: 'Community support', included: true },
        { name: 'Advanced features', included: false },
        { name: 'Priority support', included: false },
      ],
    },
    {
      name: 'Premium',
      price: '59.000 đ/month',
      features: [
        { name: 'Full access', included: true },
        { name: 'Unlimited storage', included: true },
        { name: 'Community support', included: true },
        { name: 'Advanced features', included: true },
        { name: 'Priority support', included: true },
      ],
    },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={plan.name === 'Premium' ? 'border-primary' : ''}
        >
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.price}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  {feature.included ? (
                    <Check className="mr-2 h-4 w-4 text-primary" />
                  ) : (
                    <X className="mr-2 h-4 w-4 text-muted-foreground" />
                  )}
                  {feature.name}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={plan.name === 'Premium' ? 'default' : 'outline'}
            >
              {plan.name === 'Free' ? 'Current Plan' : 'Upgrade to Premium'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
