import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonLabel, IonItem, IonHeader, IonToolbar, IonTitle, IonImg, IonText, IonRouterLink, IonNote } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { sendOtp } from "../services/LoginService";
import "./Login.css";
import GiftmeLogo from "../assets/giftme-removebg-preview.png";

const LoginPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const history = useHistory();

  const handleLogin = async () => {
    setErrorMessage(''); 

    const trimmedPhone = phoneNumber.trim(); 

    if (!/^\d{10}$/.test(trimmedPhone)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await sendOtp(trimmedPhone);
      console.log('OTP sent successfully:', response);
      history.push('/ConfirmOTP', { phoneNumber: trimmedPhone });
    } catch (error) {
      console.error('Error sending OTP:', error);
      if (error.message === "User not found. Please register first.") {
        setErrorMessage("User not found. Please register first.");
      } else {
        setErrorMessage("Failed to send OTP. Please try again later.");
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form>
          <IonImg
            className="Giftmelogo"
            src={GiftmeLogo}
            alt="GiftMe logo"
            style={{ margin: "auto", display: "block", width: "150px", marginTop: '70px' }}
          />

          <IonItem>
            <IonLabel style={{ fontSize: '20px', fontWeight: 'lighter', marginTop: '30px' }}>
              <IonInput
                className="InputFields"
                type="tel"
                inputmode="numeric"
                pattern="[0-9]*"
                maxlength={10}
                value={phoneNumber}
                placeholder="Enter your mobile number"
                onIonChange={(e) => setPhoneNumber(e.detail.value?.replace(/\D/g, '') || '')} // Allow only numbers
              />
            </IonLabel>
          </IonItem>

          {errorMessage && (
            <IonNote color="danger" style={{ display: 'block', marginTop: '10px', textAlign: 'center' }}>
              {errorMessage}
            </IonNote>
          )}

          <IonButton className='Login' expand="full" onClick={handleLogin}>Login</IonButton>

          <center>
            <IonText>
              <p>or</p>
            </IonText>
          </center>
          <center>
            <IonText>
              <IonRouterLink href="/register">
                Sign Up
              </IonRouterLink>
            </IonText>
          </center>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
