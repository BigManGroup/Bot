function convertRoasts() {
    let roasts = require('./resources/roasts.json').list;

    let converted = [];

    for (let i = 0; i !== roasts.length; i++) {
        converted.push(JSON.stringify({
            roast: roasts[i],
            guild: "264032838712688640",
            message: null,
            user: "135497451539922944",
            submittedTimestamp: new Date(),
            updatedTimestamp: new Date(),
            accepted: true,
            pending: false
        }));
    }

    console.log("[")
    for (let i = 0; i !== converted.length; i++) {
        console.log(converted[i] + ",")
    }
    console.log("]")
}

function convertLenny(){
    let lennys = require('./resources/lenny.json').accepted;

    let converted = [];

    for (let i = 0; i !== lennys.length; i++) {
        converted.push(JSON.stringify({
            guild: "264032838712688640",
            lenny: lennys[i],
            user: "135497451539922944",
            submittedTimestamp: new Date(),
            updatedTimestamp : new Date(),
            message: null,
            accepted: true,
            pending: false
        }));
    }

    console.log("[")
    for (let i = 0; i !== converted.length; i++) {
        console.log(converted[i] + ",")
    }
    console.log("]")
}

convertLenny();