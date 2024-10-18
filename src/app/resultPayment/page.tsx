'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { axiosWithAuth } from '@/libs/axios';
import useAuth from '@/libs/hooks/useAuth';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
// import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function ResultPayment() {
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showContent, setShowContent] = useState(false);
  const query = useSearchParams();
  const { user } = useAuth();
  // const { data: session, update } = useSession();

  const validPayment = useCallback(
    async (orderCode: number, paymentId: string, status: string) => {
      const token = user?.accessToken;
      if (!token) {
        throw new Error('User not logged in or session information missing');
      }
      const data = {
        orderCode: orderCode,
        status: status,
        paymentLinkId: paymentId,
      };
      const response = await axiosWithAuth(token).post('/payment/valid', data);
      if (response.status === 200) {
        return true;
      }
    },
    [user],
  );

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowContent(true);
    }
  }, [countdown]);

  const [toastDisplayed, setToastDisplayed] = useState(false); // Thêm biến trạng thái

  useEffect(() => {
    const code = query.get('code');
    const paymentId = query.get('id');
    const cancel = query.get('cancel');
    const status = query.get('status');
    const orderCode = query.get('orderCode');

    if (code === '00') {
      if (status === 'PAID') {
        if (orderCode && paymentId) {
          validPayment(Number(orderCode), paymentId, status as string)
            .then(async (result) => {
              if (result) {
                setMessage(
                  'Payment successful. You have been upgraded to Premium!',
                );
                setIsSuccess(true);
                // Chỉ hiển thị toast sau khi thành công và chưa hiển thị toast trước đó
                // if (!toastDisplayed) {
                //   setToastDisplayed(true);
                //   setTimeout(() => {
                //     toast.success(
                //       '🎉 Congratulations! You have successfully upgraded to Premium!',
                //     );
                //     setToastDisplayed(false); // Đặt lại trạng thái sau khi hiển thị
                //   }, 1000); // Hiển thị sau 1 giây
                // }
              } else {
                setMessage('An error occurred while upgrading to Premium.');
              }
            })
            .catch((error) => {
              console.error('Error updating premium:', error);
              setMessage('An error occurred while upgrading to Premium.');
            });
        } else {
          setMessage('Insufficient information for verification.');
        }
      } else if (status === 'CANCELLED') {
        setMessage('Payment has been cancelled.');
      } else if (status === 'PENDING') {
        setMessage('Payment is pending. Please check back later.');
      } else if (status === 'FAILED') {
        setMessage('Payment failed. Please try again.');
      } else if (status === 'EXPIRED') {
        setMessage('Payment link has expired. Please create a new order.');
      } else {
        setMessage('Unknown payment status.');
      }
    } else if (code === '01') {
      setMessage('Error: Payment unsuccessful.');
    } else if (code === '02') {
      setMessage('Error: Invalid information.');
    } else if (code === '03') {
      setMessage('Error: System is busy.');
    } else if (code) {
      setMessage(`Unknown error: ${code}`);
    }

    if (cancel === 'true') {
      setMessage('Payment was cancelled by user.');
    }
  }, [query, user, validPayment, toastDisplayed]);

  // useEffect(() => {
  //   if (isSuccess && session) {
  //     const newRole = session.user.role.push('premium');
  //     update({
  //       ...session,
  //       user: { ...session.user, role: newRole },
  //     });
  //   }
  // }, [isSuccess, session, update]);

  const handleBackHome = () => {
    window.location.href = '/';
  };

  const getStatusIcon = () => {
    if (isSuccess) return <CheckCircle2 className="w-20 h-20 text-green-500" />;
    if (message.includes('cancelled'))
      return <XCircle className="w-20 h-20 text-yellow-500" />;
    return <AlertCircle className="w-20 h-20 text-red-500" />;
  };

  if (!showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
              <div className="w-20 h-20 border-4 border-primary rounded-full absolute top-0 left-0 animate-spin border-t-transparent"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-primary">
                {countdown}
              </div>
            </div>
            <p className="text-gray-600 mt-8">Processing your payment...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4 transform hover:scale-105 transition-transform duration-300">
            {getStatusIcon()}
          </div>
          <CardTitle className="text-2xl font-bold">Payment Result</CardTitle>
        </CardHeader>
        <CardContent className="text-center pt-4">
          <p className="text-gray-600 mb-6 text-lg">{message}</p>
          {isSuccess && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 hover:bg-yellow-100 transition-colors duration-300">
              <p className="text-yellow-800 text-sm">
                Please log in again to activate your Premium features
              </p>
            </div>
          )}
          <Button
            onClick={handleBackHome}
            className="w-full bg-primary hover:bg-primary/90 transition-colors duration-300"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
