function delaySend2([ref_1, ...refs], {
    announce,
    intervalTime
} = {
    intervalTime: 500
}) {
    console.log('start')

    if (ref_1 === undefined) {
        console.log("end")
    } else {
        try {
            console.log(ref_1.conversation._id);
            setTimeout(() => delaySend2(refs, announce), intervalTime);
        } catch (err) {
            console.log(err)
            console.log('err')
        }
    }
}

const refs = [{
    conversation: {
        _id: "1"
    }
}, {
    conversation: {
        _id: "2"
    }
}, {
    conversation: {
        _id: "3"
    }
}, {
    conversation: {
        _id: "4"
    }
}, {
    conversation: {
        _id: "5"
    }
},
{
    conversation: {
        _id: "6"
    }
}, {
    conversation: {
        _id: "7"
    }
}, {
    conversation: {
        _id: "8"
    }
}, {
    conversation: {
        _id: "9"
    }
}, {
    conversation: {
        _id: "10"
    }
},
{
    conversation: {
        _id: "11"
    }
}, {
    conversation: {
        _id: "12"
    }
}, {
    conversation: {
        _id: "13"
    }
}, {
    conversation: {
        _id: "14"
    }
}, {
    conversation: {
        _id: "15"
    }
},
{
    conversation: {
        _id: "16"
    }
}, {
    conversation: {
        _id: "17"
    }
}, {
    conversation: {
        _id: "18"
    }
}, {
    conversation: {
        _id: "19"
    }
}, {
    conversation: {
        _id: "20"
    }
},
{
    conversation: {
        _id: "21"
    }
}, {
    conversation: {
        _id: "22"
    }
}, {
    conversation: {
        _id: "23"
    }
}, {
    conversation: {
        _id: "24"
    }
}, {
    conversation: {
        _id: "25"
    }
},
{
    conversation: {
        _id: "26"
    }
}, {
    conversation: {
        _id: "27"
    }
}, {
    conversation: {
        _id: "28"
    }
}, {
    conversation: {
        _id: "29"
    }
}, {
    conversation: {
        _id: "30"
    }
},
{
    conversation: {
        _id: "31"
    }
}, {
    conversation: {
        _id: "32"
    }
}, {
    conversation: {
        _id: "33"
    }
}, {
    conversation: {
        _id: "34"
    }
}, {
    conversation: {
        _id: "35"
    }
},
{
    conversation: {
        _id: "36"
    }
}, {
    conversation: {
        _id: "37"
    }
}, {
    conversation: {
        _id: "38"
    }
}, {
    conversation: {
        _id: "39"
    }
}, {
    conversation: {
        _id: "40"
    }
},
{
    conversation: {
        _id: "41"
    }
}, {
    conversation: {
        _id: "42"
    }
}, {
    conversation: {
        _id: "43"
    }
}, {
    conversation: {
        _id: "44"
    }
}, {
    conversation: {
        _id: "45"
    }
},
{
    conversation: {
        _id: "46"
    }
}, {
    conversation: {
        _id: "47"
    }
}, {
    conversation: {
        _id: "48"
    }
}, {
    conversation: {
        _id: "49"
    }
}, {
    conversation: {
        _id: "50"
    }
},
{
    conversation: {
        _id: "51"
    }
}, {
    conversation: {
        _id: "52"
    }
}, {
    conversation: {
        _id: "53"
    }
}, {
    conversation: {
        _id: "54"
    }
}, {
    conversation: {
        _id: "55"
    }
},
{
    conversation: {
        _id: "56"
    }
}, {
    conversation: {
        _id: "57"
    }
}, {
    conversation: {
        _id: "58"
    }
}, {
    conversation: {
        _id: "59"
    }
}, {
    conversation: {
        _id: "60"
    }
},
{
    conversation: {
        _id: "61"
    }
}, {
    conversation: {
        _id: "62"
    }
}, {
    conversation: {
        _id: "63"
    }
}, {
    conversation: {
        _id: "64"
    }
}, {
    conversation: {
        _id: "65"
    }
},
{
    conversation: {
        _id: "66"
    }
}, {
    conversation: {
        _id: "67"
    }
}, {
    conversation: {
        _id: "68"
    }
}, {
    conversation: {
        _id: "69"
    }
}, {
    conversation: {
        _id: "70"
    }
},
{
    conversation: {
        _id: "71"
    }
}, {
    conversation: {
        _id: "72"
    }
}, {
    conversation: {
        _id: "73"
    }
}, {
    conversation: {
        _id: "74"
    }
}, {
    conversation: {
        _id: "75"
    }
},
{
    conversation: {
        _id: "76"
    }
}, {
    conversation: {
        _id: "77"
    }
}, {
    conversation: {
        _id: "78"
    }
}, {
    conversation: {
        _id: "79"
    }
}, {
    conversation: {
        _id: "80"
    }
},
]

delaySend2(refs);