import React, { useState, useRef } from "react";
import {
  IonApp,
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonNote,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { validateOtp, sendOtp } from "../services/LoginService"; 
import "./Confirmotp.css";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const inputRefs = useRef<(HTMLIonInputElement | null)[]>([]);
  const history = useHistory();
  const location = useLocation<{ phoneNumber: string }>();
  const phoneNumber = location.state?.phoneNumber || "";

  const handleInputChange = (value: string, index: number) => {
    const otpArray = [...otp];
    otpArray[index] = value;
    setOtp(otpArray);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.setFocus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      try {
        const response = await validateOtp(phoneNumber, otpCode);
        console.log("OTP verification success:", response);
        setMessageType("success");
        setMessage("OTP verified successfully!");
        setTimeout(() => history.push("/"), 2000); 
      } catch (error: any) {
        console.error("Error verifying OTP:", error);
        setMessageType("error");
        setMessage(
          error.response?.data?.message || "Invalid OTP. Please try again."
        );
      }
    } else {
      setMessageType("error");
      setMessage("Please enter the complete OTP.");
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setMessage(null);
    try {
      const response = await sendOtp(phoneNumber);
      console.log("Resend OTP success:", response);
      setMessageType("success");
      setMessage("OTP has been resent successfully!");
    } catch (error: any) {
      console.error("Error resending OTP:", error);
      setMessageType("error");
      setMessage(
        error.response?.data?.message || "Failed to resend OTP. Please try again later."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/login" />
            </IonButtons>
            <IonTitle><b>Confirm OTP</b></IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <center>
            <IonText>
              <h6>Verify with OTP</h6>
              <h6>Sent via SMS to {phoneNumber}</h6>
            </IonText>
            <IonGrid>
              <IonRow>
                {otp.map((value, index) => (
                  <IonCol key={index} size="2">
                    <IonInput
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxlength={1}
                      value={value}
                      onIonInput={(e) =>
                        handleInputChange(e.detail.value as string, index)
                      }
                      style={{
                        textAlign: "center",
                        fontSize: "24px",
                        borderBottom: "1px solid #ccc",
                      }}
                    />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
            {message && (
              <IonNote
                color={messageType === "success" ? "success" : "danger"}
                style={{ display: "block", marginTop: "10px" }}
              >
                {message}
              </IonNote>
            )}
            <IonButton className="otp-submit-button" expand="block" onClick={handleSubmit}>
              Submit
            </IonButton>
            <IonText>
              <IonText>
                <p className="Resend">
                  Did not receive OTP?{" "}
                  <span className="Resend" onClick={handleResend} style={{ cursor: "pointer", color: "#970808" }}>
                    {isResending ? "Resending..." : "Resend OTP"}
                  </span>
                </p>
              </IonText>
            </IonText>
          </center>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default OTPVerification;
