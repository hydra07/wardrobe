'use client';
import { PayOSConfig, usePayOS } from 'payos-checkout';
import { useCallback, useEffect, useState } from 'react';

export default function PayOS() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [isCreatingLink, setIsCreatingLink] = useState<boolean>(false);
  const [payOSConfig, setPayOSConfig] = useState<PayOSConfig>({
    RETURN_URL: '', // required
    ELEMENT_ID: 'embedded-payment-container', // required
    CHECKOUT_URL: '', // required
    embedded: true, // Nếu dùng giao diện nhúng
    onSuccess: (event: any) => {
      //TODO: Hành động sau khi người dùng thanh toán đơn hàng thành công
      setIsOpen(false);
      setMessage('Thanh toan thanh cong');
    },
    onCancel: () => {
      console.log('looix');
    },
  });
  const { open, exit } = usePayOS(payOSConfig);

  const handleGetPaymentLink = useCallback(async () => {
    setIsCreatingLink(true);
    exit();
    // const response = await axios.post('/payment');
    const response = await fetch('http://localhost:3000/api/payment', {
      method: 'POST',
    });
    if (!response.ok) {
      console.log("Server doesn't response");
    }

    // const result = await response.data.paymentLinkResponse;
    const result = await response.json();
    console.log(result.paymentLinkResponse);
    console.log(result.checkoutUrl);
    setPayOSConfig((oldConfig) => ({
      ...oldConfig,
      CHECKOUT_URL: result.paymentLinkResponse.checkoutUrl,
      RETURN_URL: window.location.origin,
    }));

    setIsOpen(true);
    setIsCreatingLink(false);
  }, []);

  useEffect(() => {
    if (payOSConfig.CHECKOUT_URL && payOSConfig.CHECKOUT_URL != '') {
      console.log(payOSConfig);
      open();
    }
  }, [payOSConfig]);

  return message ? (
    <Message message={message} />
  ) : (
    <div className="main-box">
      <div>
        <div className="checkout">
          <div className="product">
            <p>
              <strong>Tên sản phẩm:</strong> Mì tôm Hảo Hảo ly
            </p>
            <p>
              <strong>Giá tiền:</strong> 2000 VNĐ
            </p>
            <p>
              <strong>Số lượng:</strong> 1
            </p>
          </div>
          <div className="flex">
            {!isOpen ? (
              <div>
                {isCreatingLink ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '10px',
                      fontWeight: '600',
                    }}
                  >
                    Creating Link...
                  </div>
                ) : (
                  <button
                    id="create-payment-link-btn"
                    onClick={(event) => {
                      event.preventDefault();
                      handleGetPaymentLink();
                    }}
                  >
                    Tạo Link thanh toán Embedded
                  </button>
                )}
              </div>
            ) : (
              <button
                style={{
                  backgroundColor: 'gray',
                  color: 'white',
                  width: '100%',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  marginTop: '5px',
                }}
                onClick={(event) => {
                  event.preventDefault();
                  setIsOpen(false);
                  exit();
                }}
              >
                Đóng Link
              </button>
            )}
          </div>
        </div>
        {isOpen && (
          <div style={{ maxWidth: '400px', padding: '2px' }}>
            Sau khi thực hiện thanh toán thành công, vui lòng đợi từ 5 - 10s để
            hệ thống tự động cập nhật.
          </div>
        )}
        <div
          id="embedded-payment-container"
          style={{
            height: '350px',
          }}
        >
          <div>link thanh toan</div>
        </div>
      </div>
    </div>
  );
}

const Message = ({ message }: any) => (
  <div className="main-box">
    <div className="checkout">
      <div
        className="product"
        style={{ textAlign: 'center', fontWeight: '500' }}
      >
        <p>{message}</p>
      </div>
      <form action="/">
        <button type="submit" id="create-payment-link-btn">
          Quay lại trang thanh toán
        </button>
      </form>
    </div>
  </div>
);
