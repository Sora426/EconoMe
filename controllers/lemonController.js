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

        if (eventName === "subscription_created") {

            const userId =
                payload.meta?.custom_data?.user_id;

            console.log("EconoMe user ID:", userId);

            if (!userId) {
                return res.status(400).send("Missing user ID");
            }

            db.run(
                `UPDATE users
                 SET isPremium = 1
                 WHERE id = ?`,
                [userId],
                function (err) {

                    if (err) {

                        console.error(
                            "Premium update error:",
                            err
                        );

                        return res.status(500).send("Database error");
                    }

                    console.log(
                        `User ${userId} upgraded to Premium`
                    );

                    return res.status(200).send("OK");
                }
            );

            return;
        }

        return res.status(200).send("OK");

    } catch (error) {

        console.error(
            "Webhook error:",
            error
        );

        return res.status(500).send("Webhook error");
    }
};