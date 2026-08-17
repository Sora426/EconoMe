const crypto = require("crypto");
const db = require("../config/database");

const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

exports.handleWebhook = (req, res) => {

    try {

        const signature = req.headers["x-signature"];

        if (!signature) {
            console.log("Missing Lemon Squeezy signature");
            return res.status(401).send("Missing signature");
        }

        const hmac = crypto
            .createHmac("sha256", webhookSecret)
            .update(req.body)
            .digest("hex");

        if (
            !crypto.timingSafeEqual(
                Buffer.from(hmac),
                Buffer.from(signature)
            )
        ) {
            console.log("Invalid Lemon Squeezy signature");
            return res.status(401).send("Invalid signature");
        }

        const eventName = req.headers["x-event-name"];

        const payload = JSON.parse(req.body.toString());

        console.log("Lemon Squeezy event:", eventName);

        /*
         * SUBSCRIPTION CREATED
         */
        if (eventName === "subscription_created") {

            const userId =
                payload.meta?.custom_data?.user_id;

            if (!userId) {
                console.log("No EconoMe user ID found");
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
                            "Failed to upgrade user:",
                            err
                        );

                        return res.status(500).send("Database error");
                    }

                    console.log(
                        `User ${userId} is now Premium`
                    );

                }
            );
        }

        return res.status(200).send("OK");

    } catch (error) {

        console.error(
            "Lemon Squeezy webhook error:",
            error
        );

        return res.status(500).send("Webhook error");
    }
};