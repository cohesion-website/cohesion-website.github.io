businessSaasPricing = [{
    user_count: 10,
    usd: 29,
    gbp: 19,
    eur: 26,
    aud: 39
}, {
    user_count: 25,
    usd: 24,
    gbp: 15.5,
    eur: 22,
    aud: 33
}, {
    user_count: 50,
    usd: 19,
    gbp: 12,
    eur: 17.5,
    aud: 26
}, {
    user_count: 100,
    usd: 14,
    gbp: 9,
    eur: 13,
    aud: 19
}, {
    user_count: 250,
    usd: 9,
    gbp: 6,
    eur: 8,
    aud: 12.5
}, {
    user_count: 500,
    usd: 5,
    gbp: 3.2,
    eur: 4.5,
    aud: 7
}, {
    user_count: 1000,
    usd: 5,
    gbp: 3.2,
    eur: 4.5,
    aud: 7
}, {
    user_count: 2500,
    usd: 5,
    gbp: 3.2,
    eur: 4.5,
    aud: 7
}];
educationSaasPricing = [{
    user_count: 10,
    usd: 25,
    gbp: 16,
    eur: 23,
    aud: 35
}, {
    user_count: 25,
    usd: 20,
    gbp: 13,
    eur: 18,
    aud: 27
}, {
    user_count: 50,
    usd: 15,
    gbp: 10,
    eur: 13.5,
    aud: 21
}, {
    user_count: 100,
    usd: 9.50,
    gbp: 6,
    eur: 8.6,
    aud: 13
}, {
    user_count: 250,
    usd: 7,
    gbp: 4.5,
    eur: 6,
    aud: 10
}, {
    user_count: 500,
    usd: 5,
    gbp: 3.2,
    eur: 4.5,
    aud: 6.9
}, {
    user_count: 1000,
    usd: 5,
    gbp: 3.2,
    eur: 4.5,
    aud: 6.9
}, {
    user_count: 2500,
    usd: 5,
    gbp: 3.2,
    eur: 4.5,
    aud: 6.9
}];
baseSelfHostedPrice = {
    usd: 50000,
    gbp: 32000,
    eur: 45000,
    aud: 69000
};
baseSelfHostedUsers = 1500;
additionalSelfHostedPerUser = {
    usd: 12,
    gbp: 8,
    eur: 11,
    aud: 17
};
businessSaaSPriceIndex = {};
for (var i = 0, len = businessSaasPricing.length; i < len; i++) {
    businessSaaSPriceIndex[businessSaasPricing[i].user_count] = businessSaasPricing[i];
}
educationSaaSPriceIndex = {};
for (var i = 0, len = educationSaasPricing.length; i < len; i++) {
    educationSaaSPriceIndex[educationSaasPricing[i].user_count] = educationSaasPricing[i];
}
var priceBook = {
    saas: {
        business: businessSaaSPriceIndex,
        education: educationSaaSPriceIndex
    }
};
var userCurrency = "usd";
eurCountries = ['AL', 'AD', 'AM', 'AT', 'BY', 'BE', 'BA', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FO', 'FI', 'FR', 'GE', 'GI', 'GR', 'HU', 'HR', 'IE', 'IS', 'IT', 'LT', 'LU', 'LV', 'MC', 'MK', 'MT', 'NO', 'NL', 'PL', 'PT', 'RO', 'RU', 'SE', 'SI', 'SK', 'SM', 'TR', 'UA', 'VA']
var req = $.ajax({
    url: "http://ipinfo.io",
    dataType: "jsonp",
    timeout: 5000
});
req.success(function() {
    console.log('Yes! Success!');
});
req.error(function() {
    console.log('Oh noes!');
});
$.get("http://ipinfo.io", function(response) {
    if ($.inArray(response.country, eurCountries) > -1) {
        userCurrency = "eur";
    } else if (response.country == "GB") {
        userCurrency = "gbp";
    } else if (response.country == "AU") {
        userCurrency = "aud";
    }
    $("#currency").val(userCurrency);
    $("#self-hosted-currency").val(userCurrency);
    updatePricing();
}, "jsonp");
Number.prototype.formatMoney = function(c, curr) {
    var n = this
      , c = isNaN(c = Math.abs(c)) ? 2 : c
      , d = d == undefined ? "." : d
      , t = t == undefined ? "," : t
      , s = n < 0 ? "-" : ""
      , i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + ""
      , j = (j = i.length) > 3 ? j % 3 : 0;
    sym = "$";
    switch (curr) {
    case "eur":
        d = ",";
        t = ".";
        sym = "€";
        break;
    case "gbp":
        sym = "£";
        break;
    }
    return sym + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
function updatePricing() {
    console.log('update pricing called');
    var pricingModel = $("#pricing-model").val();
    var userCount = $("#user-count").val();
    var currency = $("#currency").val();
    if (userCount > 2500) {
        alert("please contact us");
        $("#user-count").val("2500");
        updatePricing();
    }
    var costPerUserPerMonth = priceBook.saas[pricingModel][userCount][currency];
    var totalCostPerMonth = costPerUserPerMonth * userCount;
    var totalCostPerYear = totalCostPerMonth * 12;
    $("#pricing-form .user-total").html(userCount);
    $("#pricing-form .monthly-cost-per-user").html(costPerUserPerMonth.formatMoney(2, currency));
    $("#pricing-form .total-cost-per-month").html(totalCostPerMonth.formatMoney(2, currency));
    $("#pricing-form .annual-cost").html(totalCostPerYear.formatMoney(2, currency));
    $("#pricing-form .currency").html(currency.toUpperCase());
    sfUserCount = $('#self-hosted-user-count').val();
    sfCurrency = $('#self-hosted-currency').val();
    sfTotalCost = baseSelfHostedPrice[sfCurrency] + additionalSelfHostedPerUser[sfCurrency] * (sfUserCount - baseSelfHostedUsers);
    sfCostPerUserPerMonth = (sfTotalCost / 12) / sfUserCount;
    sfCostPerMonth = sfTotalCost / 12;
    $('#self-hosted .base-monthly-cost-per-user').html((baseSelfHostedPrice[sfCurrency] / (12 * baseSelfHostedUsers)).formatMoney(2, sfCurrency));
    $('#self-hosted .user-total').html(sfUserCount);
    $("#self-hosted .monthly-cost-per-user").html(sfCostPerUserPerMonth.formatMoney(2, sfCurrency));
    $("#self-hosted .total-cost-per-month").html(sfCostPerMonth.formatMoney(2, sfCurrency));
    $("#self-hosted .annual-cost").html(sfTotalCost.formatMoney(2, sfCurrency));
    $("#self-hosted .currency").html(sfCurrency.toUpperCase());
}