import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as https from 'https';

admin.initializeApp();

interface WebhookVerificationResponse {
  verification_status: 'SUCCESS' | 'FAILURE';
}

export const paypalWebhook = functions.https.onRequest(async (req, res) => {
  const webhookEvent = req.body;
  const headers = req.headers;

  try {
    const verifyUrl = 'https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature';
    const verifyBody = JSON.stringify({
      auth_algo: headers['paypal-auth-algo'],
      cert_url: headers['paypal-cert-url'],
      transmission_id: headers['paypal-transmission-id'],
      transmission_sig: headers['paypal-transmission-sig'],
      transmission_time: headers['paypal-transmission-time'],
      webhook_id: process.env.PAYPAL_WEBHOOK_ID,
      webhook_event: webhookEvent,
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
      },
    };

    const verificationResult = await new Promise<WebhookVerificationResponse>((resolve, reject) => {
      const request = https.request(verifyUrl, options, (resp) => {
        let data = '';
        resp.on('data', (chunk) => (data += chunk));
        resp.on('end', () => resolve(JSON.parse(data)));
      });
      request.on('error', reject);
      request.write(verifyBody);
      request.end();
    });

    if (verificationResult.verification_status !== 'SUCCESS') {
      res.status(400).send('Invalid webhook signature');
      return;
    }

    if (webhookEvent.event_type === 'BILLING.SUBSCRIPTION.ACTIVATED') {
      const userId = webhookEvent.resource.custom_id;
      const planId = webhookEvent.resource.plan_id;

      const planMap: Record<string, { name: string; requests: number }> = {
        'P-123456789': { name: 'Weekly', requests: 1 },   // Replace with actual Plan ID
        'P-987654321': { name: 'Weekly+', requests: 2 },  // Replace with actual Plan ID
        'P-456789123': { name: 'Weekly++', requests: 3 }, // Replace with actual Plan ID
      };

      const plan = planMap[planId] || { name: 'Unknown', requests: 0 };

      await admin.firestore().collection('users').doc(userId).update({
        subscription: {
          plan: plan.name,
          requests: plan.requests,
          active: true,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
      });
    }

    res.status(200).send('Webhook processed');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Webhook processing failed');
  }
});