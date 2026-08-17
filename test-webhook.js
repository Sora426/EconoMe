// require("dotenv").config();

// const crypto = require("crypto");

// const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

// if (!secret) {
//     console.error("LEMON_SQUEEZY_WEBHOOK_SECRET is missing");
//     process.exit(1);
// }

// const payload = JSON.stringify({
//     meta: {
//         event_name: "subscription_created",
//         custom_data: {
//             user_id: "2"
//         }
//     }
// });

// const signature = crypto
//     .createHmac("sha256", secret)
//     .update(payload)
//     .digest("hex");

// console.log("Test payload:");
// console.log(payload);

// console.log("\nSignature:");
// console.log(signature);

// console.log("\nSend this request to your webhook:");
// console.log("POST /webhook/lemons");