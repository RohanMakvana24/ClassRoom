import React from "react";
import { Helmet } from "react-helmet";

const SharePage = () => {
  // ✅ Replace this with your real, public QR image URL
  const imageUrl =
    "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJsfGVufDB8fDB8fHww";

  // ✅ The URL of this page — you can use your actual page's public URL here
  const pageUrl = "https://yourdomain.com/share/my-qr";

  return (
    <>
      <Helmet>
        <title>Join My Class</title>

        {/* Open Graph tags for Facebook, LinkedIn, etc. */}
        <meta property="og:title" content="Join My Class" />
        <meta
          property="og:description"
          content="Scan this QR code to join the class."
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Join My Class" />
        <meta
          name="twitter:description"
          content="Scan this QR code to join the class."
        />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      {/* Actual Page Content */}
      <div className="text-center mt-5">
        <h3>Scan QR Code to Join</h3>
        <img src={imageUrl} alt="QR Code" style={{ maxWidth: "300px" }} />
        <p className="mt-3">Share this page link to invite others.</p>
        <code>{pageUrl}</code>
      </div>
    </>
  );
};

export default SharePage;
