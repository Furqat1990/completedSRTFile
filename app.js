let arr = [
    '1',
    '00:00:00,330 --> 00:00:01,163',
    'Narrator: All right.',
    '2',
    '00:00:01,163 --> 00:00:02,940',
    "So, we've talked quite a bit about filters.",
    "Vafosizda hayo yo'q hayosizda vafo yo'q, harkidaki ikki yo'q iymoni yo'q.",
    "Ondin yaxshilik kutib bo'lmas, chunkim imkoni yo'q.",
    '3',
    '00:00:02,940 --> 00:00:04,530',
    'in the context of our data model'
]

function parsingByRowStr(arr) {
    let isExtant = false;

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].match(/[A-Za-z]/g) && arr[i + 1].match(/[A-Za-z]/g)) {
            arr[i] = arr[i] + " " + arr[i + 1];
            arr.splice(i + 1, 1);
            isExtant = true;
        }
    }

    if (isExtant) return parsingByRowStr(arr);
    return arr;
}

console.log(parsingByRowStr(arr));