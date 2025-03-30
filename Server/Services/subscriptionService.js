const Subscription = require('../Models/subscription');
const Notification = require('../Models/notification');

const checkSubscriptions = async () => {
  try {
    const currentDate = new Date();

    // Find all active subscriptions that have expired
    const expiredSubscriptions = await Subscription.find({
      status: 'active',
      endDate: { $lt: currentDate }
    });

    if (expiredSubscriptions.length > 0) {
      for (const subscription of expiredSubscriptions) {
        // Update subscription status
        subscription.status = 'expired';
        await subscription.save();

        // Create notification for the adherent
        await Notification.create({
          user: subscription.user,
          type: 'abonnement_expire',
          
        });
      }

      console.log(`Processed ${expiredSubscriptions.length} expired subscriptions`);
    }
  } catch (error) {
    console.error('Error checking subscriptions:', error);
  }
};

module.exports = checkSubscriptions;