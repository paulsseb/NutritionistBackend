const { Expo } = require('expo-server-sdk'); // to handle registering and sending push notifications

const expo = new Expo();

const handlePushTokens = (message, title, datetimepicker, token) => {
  const notifications = [];
  if (!Expo.isExpoPushToken(token)) {
    console.error(`Push token ${token} is not a valid Expo push token`);
  }
  notifications.push({
    to: token,
    sound: 'default',
    title,
    body: message,
    data: { message, datetimepicker }
  });

  const chunks = expo.chunkPushNotifications(notifications);
  (async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const chunk of chunks) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};
module.exports = handlePushTokens;
