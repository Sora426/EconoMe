const crypto = require("crypto");

const db = require("../config/database");

const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

exports.handleWebhook = (req, res) => {
    try {
        const signature = req.headers["x-signature"];

        if (!signature) {
            return res.status(401).send("Missing signature");
        }

        const hmac = crypto
            .createHmac("sha256", webhookSecret)
            .update(req.body)
            .digest("hex");

        if (hmac !== signature) {
            return res.status(401).send("Invalid signature");
        }

        const eventName = req.headers["x-event-name"];

        const payload = JSON.parse(req.body.toString());

        console.log("Lemon Squeezy event:", eventName);
        console.log("Webhook payload:", payload);

        if (eventName === "order_created") {
            console.log("Payment received!");
        }

        return res.status(200).send("OK");

    } catch (error) {
        console.error("Lemon Squeezy webhook error:", error);
        return res.status(500).send("Webhook error");
    }
};