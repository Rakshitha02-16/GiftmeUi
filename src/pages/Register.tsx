import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonText,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Register.css';

const RegisterPage: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [referralCode, setReferralCode] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [bio, setBio] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const history = useHistory();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const validateFields = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!mobileNumber.match(/^\d{10}$/)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits.';
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email address.';
    }

    if (!profilePicture) {
      newErrors.profilePicture = 'Profile picture is required.';
    }

    if (!bio.trim()) {
      newErrors.bio = 'Bio is required.';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateFields()) {
      console.log(
        `Registering ${name} with: Mobile Number: ${mobileNumber}, Email: ${email}, Referral Code: ${referralCode}, Profile Picture: ${profilePicture?.name}, Bio: ${bio}, Address: ${address}`
      );
      history.push('/login');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle className="bold-title">Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel style={{ fontSize: '25px', fontWeight: 'lighter' }} position="stacked">
            Name
          </IonLabel>
          <IonInput
            className="Name"
            type="text"
            value={name}
            placeholder="Enter your name"
            onIonChange={(e) => setName(e.detail.value!)}
          />
          {errors.name && <IonText color="danger">{errors.name}</IonText>}
        </IonItem>
        <IonItem>
          <IonLabel style={{ fontSize: '25px', fontWeight: 'lighter' }} position="stacked">
            Mobile Number
          </IonLabel>
          <IonInput
            className="PhoneNumber"
            type="tel"
            value={mobileNumber}
            placeholder="Enter your phone number"
            onIonChange={(e) => setMobileNumber(e.detail.value!)}
          />
          {errors.mobileNumber && <IonText color="danger">{errors.mobileNumber}</IonText>}
        </IonItem>
        <IonItem>
          <IonLabel style={{ fontSize: '25px', fontWeight: 'lighter' }} position="stacked">
            Email
          </IonLabel>
          <IonInput
            className="Email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
          {errors.email && <IonText color="danger">{errors.email}</IonText>}
        </IonItem>
        <IonItem>
          <IonLabel style={{ fontSize: '25px', fontWeight: 'lighter' }} position="stacked">
            Referral Code
          </IonLabel>
          <IonInput
            className="ReferalCode"
            type="text"
            value={referralCode}
            placeholder="Enter referral code (optional)"
            onIonChange={(e) => setReferralCode(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel style={{ fontSize: '25px', fontWeight: 'lighter' }} position="stacked">
            Profile Picture
          </IonLabel>
          <input
            className="inputfields"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {errors.profilePicture && <IonText color="danger">{errors.profilePicture}</IonText>}
        </IonItem>
        <IonItem>
          <IonLabel style={{ fontSize: '25px', fontWeight: 'lighter' }} position="stacked">
            Bio
          </IonLabel>
          <IonInput
            className="Bio"
            type="text"
            value={bio}
            placeholder="Enter a short bio"
            onIonChange={(e) => setBio(e.detail.value!)}
          />
          {errors.bio && <IonText color="danger">{errors.bio}</IonText>}
        </IonItem>
        <IonItem>
          <IonLabel style={{ fontSize: '25px', fontWeight: 'lighter' }} position="stacked">
            Address
          </IonLabel>
          <IonInput
            className="Address"
            type="text"
            value={address}
            placeholder="Enter your address"
            onIonChange={(e) => setAddress(e.detail.value!)}
          />
          {errors.address && <IonText color="danger">{errors.address}</IonText>}
        </IonItem>
        <IonButton className="Register" expand="block" onClick={handleRegister}>
          Register
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;