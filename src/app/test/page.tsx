// 'use client';
// import { axiosWithAuth } from '@/libs/axios';
// import useAuth from '@/libs/hooks/useAuth';
// import { useState } from 'react';
// const Test = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { user } = useAuth();
//   const handlePayment = async () => {
//     setIsLoading(true);
//     try {
//       const token = user?.accessToken;
//       if (!token) {
//         throw new Error(
//           'Người dùng chưa đăng nhập hoặc không có thông tin phiên',
//         );
//       }
//       const response = await axiosWithAuth(token).post('/payment', {
//         responseType: 'text',
//         maxRedirects: 0,
//       });

//       if (response.data !== 'error') {
//         window.location.href = response.data;
//       } else {
//         alert('Payment initiation failed. Please try again.');
//       }
//     } catch (error: any) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <>
//       <button
//         onClick={handlePayment}
//         disabled={isLoading}
//         className={`px-4 py-2 rounded ${
//           isLoading ? 'bg-gray-400' : 'bg-blue-500'
//         } text-white`}
//       >
//         {isLoading ? 'Processing...' : 'Proceed to Payment'}
//       </button>
//     </>
//   );
// };


const Test = () => {
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};
export default Test;
