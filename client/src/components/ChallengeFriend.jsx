"use client";

import { useState, useRef } from "react";
import Button from "./Button";
import { FaWhatsapp } from "react-icons/fa";
import bgImage from "../assets/bg.jpg";
import { Spinner } from "./Spinner";
import { referFriend } from "../api/api";
import html2canvas from "html2canvas";
import { uploadImage } from "../api/api";

const ChallengeFriend = ({
  user,
  score,
  setChallengeFriend,
  challengeFriend,
}) => {
  const [friendName, setFriendName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef(null);

  const generateInviteImage = async () => {
    const canvas = await html2canvas(cardRef.current);

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to generate blob"));
        } else {
          resolve(blob);
        }
      }, "image/png");
    });
  };

  const handleReferral = async () => {
    if (!friendName.trim()) {
      alert("Please enter your friend's name");
      return;
    }

    setIsLoading(true);
    try {
      // Generate invite image
      const imageBlob = await generateInviteImage();

      // Create form data
      const formData = new FormData();
      formData.append("image", imageBlob, "invite.png"); // Ensure the field name is "image"

      // Upload to server
      const imageUrl = await uploadImage(formData);

      if (!imageUrl) {
        throw new Error("Failed to upload image");
      }

      const res = await referFriend(friendName);
      if (!res._id) {
        alert("Some error occurred!");
        throw new Error("Failed to refer friend");
      }

      // Trigger WhatsApp share
      handleShare(imageUrl, res._id);

      setFriendName("");
      setChallengeFriend((prev) => !prev);
    } catch (error) {
      console.error("Error in referral process:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = (imageUrl, id) => {
    const inviteUrl = `${window.location.origin}/invite?friendId=${id}`;
    const message = `${user.name} challenges you to beat their score of ${score.correct}! Play now: ${inviteUrl} \n\nCheck out the invite image: ${imageUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md mx-auto overflow-hidden shadow-xl border-0 bg-white backdrop-blur-sm rounded-lg p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Challenge a Friend
          </h2>
          <p className="text-gray-600">Invite a friend to beat your score!</p>
        </div>
        <div
          ref={cardRef}
          style={{
            background: "linear-gradient(to right, #4F46E5, #9333EA)", // Indigo to Purple
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "24px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            {user.name} challenges you!
          </h3>
          <p style={{ fontSize: "1.125rem", marginBottom: "8px" }}>
            They scored {score.correct} points
          </p>
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Can you beat their score?
          </p>
          <p style={{ fontSize: "0.875rem" }}>
            {friendName
              ? `${friendName}, are you up for the challenge?`
              : "Enter your friend's name below"}
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <input
            className="w-full border border-gray-300 rounded-md text-lg p-3"
            placeholder="Enter Friend's Name"
            maxLength={35}
            type="text"
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
          />
          <Button
            className="w-full text-xl flex items-center justify-center gap-2"
            variant="normal"
            onClick={handleReferral}
            disabled={isLoading || !friendName.trim()}
          >
            {isLoading ? (
              <Spinner className="w-5 h-5" />
            ) : (
              <>
                <FaWhatsapp />
                Share on WhatsApp
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeFriend;
