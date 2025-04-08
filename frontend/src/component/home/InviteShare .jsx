import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const InviteShare = ({ classId }) => {
  const shareUrl = `${window.location.origin}/invite/${classId}.html`;
  const shareTitle = "Join our class!";

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <FacebookShareButton url={shareUrl} quote={shareTitle}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={shareTitle}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} title={shareTitle}>
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
    </div>
  );
};

export default InviteShare;
