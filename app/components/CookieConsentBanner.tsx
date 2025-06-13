'use client';

import CookieConsent from "react-cookie-consent";

export default function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Got it!"
      cookieName="sitecoreSofiaCookieConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{ 
        background: "#E42325",
        color: "white", 
        fontSize: "15px",
        borderRadius: "4px",
        padding: "10px 20px"
      }}
      expires={365}
    >
      We use cookies to make this site work better. By continuing to use our site, you agree to our use of cookies.
    </CookieConsent>
  );
} 