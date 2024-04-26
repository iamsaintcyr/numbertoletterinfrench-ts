class NumberToLetterInFrench {
    private readonly frenchNumberWords: Record<number, string> = {
        0: "zéro", 1: "un", 2: "deux", 3: "trois", 4: "quatre", 5: "cinq", 6: "six", 7: "sept",
        8: "huit", 9: "neuf", 10: "dix", 11: "onze", 12: "douze", 13: "treize", 14: "quatorze",
        15: "quinze", 16: "seize", 17: "dix-sept", 18: "dix-huit", 19: "dix-neuf", 20: "vingt",
        30: "trente", 40: "quarante", 50: "cinquante", 60: "soixante", 70: "soixante-dix",
        80: "quatre-vingt", 90: "quatre-vingt-dix", 100: "cent", 1000: "mille", 1000000: "million",
        1000000000: "milliard"
    };

    convert(nb: number) {
        if (typeof nb !== "number" || nb < 0 || !Number.isInteger(nb)) {
            throw new TypeError("Please, provide a valid number. Integer only !")
        }
        let result = '';

        if (nb <= 20) {
            result = this.numberToLetterUnderTwenty(nb);
        } else if(nb < 100) {
            result = this.numberToLetterBetweenTwentyAndHundred(nb);
        } else if(nb < 1000) {
            result = this.numberToLetterBetweenHundredAndThousand(nb);
        } else if(nb < 1000000) {
            result = this.numberToLetterBetweenThousandAndMillion(nb);
        } else if(nb < 1000000000) {
            result = this.numberToLetterBetweenMillionAndBillion(nb);
        } else {
            result = this.numberToLetterAboveBillion(nb);
        }

        return result;
    }

    private numberToLetterUnderTwenty(nb: number): string {
        return this.frenchNumberWords[nb];
    }
    private numberToLetterBetweenTwentyAndHundred(nb: number): string {
        const base = 10 * Math.floor(nb / 10);
        let remainder = nb % 10;
        if (remainder === 0) {
            return this.frenchNumberWords[base];
        }
        return `${this.frenchNumberWords[base]} - ${this.convert(remainder)}`;
    }
    private numberToLetterBetweenHundredAndThousand(nb: number): string {
        const hundreds = Math.floor(nb / 100);
        const remainder = nb % 100;
        const hundredText = (hundreds === 1.0) ? "cent" : this.frenchNumberWords[hundreds]+ ' '+ this.frenchNumberWords[100];
        if (remainder === 0) {
            return hundredText;
        }
        return hundredText+ ' '+this.convert(remainder);
    }
    private numberToLetterBetweenThousandAndMillion(nb: number): string {
        const thousands = Math.floor(nb / 1000);
        const remainder = nb % 1000;
        const thousandText = (thousands === 1.0 ? '' : this.convert(thousands)) + ' ' + this.frenchNumberWords[1000];
        if (remainder === 0) {
            return thousandText;
        }
        return thousandText + ' ' + this.convert(remainder);
    }
    private numberToLetterBetweenMillionAndBillion(nb: number): string {
        const millions = Math.floor(nb / 1000000);
        const remainder = nb % 1000000;
        const millionText = this.convert(millions) + ' ' + this.frenchNumberWords[1000000];
        if (remainder === 0) {
            return millionText;
        }
        return millionText + ' ' + this.convert(remainder);
    }
    private numberToLetterAboveBillion(nb: number): string {
        const billions = Math.floor(nb / 1000000000);
        const remainder = nb % 1000000000;
        const billionText = this.convert(billions) + ' ' + this.frenchNumberWords[1000000000];
        if (remainder === 0) {
            return billionText;
        }
        return billionText + ' ' + this.convert(remainder);
    }


}
