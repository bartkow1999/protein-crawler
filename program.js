const request = require("request-promise");
const cheerio = require("cheerio");

(async () => {
    let offers = [];
    const response = await request({
        uri: "https://sklep.sfd.pl/Koncentraty_-_WPC-k162.html",
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7"
        },
        gzip: true,
    });

    let $ = cheerio.load(response);

    let parent = $('div[class="product-tile__price-box"] > a');
    for (child of parent) {
        let element = child.attribs.href;
        offers.push("https://" + element.substring(2));
    };
    // console.log(offers);


    let result = [];
    const regex = /[0-9]+g/;

    for (let offer of offers) {
        const response = await request({
            uri: encodeURI(offer),
            headers: {
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7"
            },
            gzip: true,
        });

        let $ = cheerio.load(response);

        let name = $('span[class="product-name__name"]').text().trim();

        let price = $('span[class="product-aside__price"]').text().slice(0, -2);
        price = price.replace(",",".");
        price = parseFloat(price)

        let weight = $('span[class="product-name__package"]').text();
        if (weight.length === 0) {
            let res = name.match(regex);
            weight = res[0];
        }

        let costPer30Gram = 30 * price / parseFloat(weight.slice(0, -1));
        costPer30Gram = Math.round(costPer30Gram * 100) / 100;
        
        result.push([name, price, weight, costPer30Gram]);
    }

    result.sort((a, b) => a[3] - b[3]); // For ascending sort
    console.log(result)
})();
