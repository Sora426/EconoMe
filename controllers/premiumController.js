exports.index = (req, res) => {
    res.render("premium");
};

exports.checkout = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const userId = req.session.user.id;

    const checkoutUrl =
        "https://ruhsora.lemonsqueezy.com/checkout/buy/6adcf4de-42fb-4621-83d4-2775cc02f93e" +
        `?checkout[custom][user_id]=${encodeURIComponent(userId)}`;

    res.redirect(checkoutUrl);
};