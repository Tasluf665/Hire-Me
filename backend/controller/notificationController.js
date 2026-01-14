const axios = require("axios");

//Send a push notification using Expo's API.
module.exports.sendPushNotification = async (
  user,
  statusState,
  statusDetails
) => {
  const pushData = {
    to: user.expoPushToken,
    title: statusState,
    body: statusDetails,
  };

  try {
    // Send the notification using axios.post
    // Source: https://docs.expo.dev/push-notifications/sending-notifications/#http-2-api
    const response = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      pushData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check the response status and handle it as needed
    if (response.status === 200) {
      console.log("Push notification sent successfully.");
    } else {
      console.error("Failed to send push notification.");
    }
  } catch (error) {
    console.error(
      "An error occurred while sending the push notification:",
      error
    );
  }
};
