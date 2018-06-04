var Validacija = (function() {
    var maxGrupa = 7;
    var trenutniSemestar = 1; // 0 za zimski, 1 za ljetni

    return {
        validirajFakultetski: function (input) {
            var regEx = /^[a-zA-Z0-9]+@etf.unsa.ba$/;
            return regEx.test(input);
        },

        validirajIndex: function (input) {
            var regEx = /^1\d{4}$/;
            return regEx.test(input);
        },

        validirajGrupu: function (input) {
            return (0 < input && input < maxGrupa);
        },

        validirajAkGodinu: function (input) {
            var regEx = /^20\d{2}\/20\d{2}$/;
            var today = new Date();

            if(regEx.test(input)) {
                var godine = input.split('/');
                if((Number(godine[0]) + 1) === Number(godine[1])) {

                    return ((trenutniSemestar === 0 && Number(godine[0]) === today.getFullYear()) ||
                        (trenutniSemestar === 1 && Number(godine[1]) === today.getFullYear()));

                }
            }

            return false;

        },

        validirajPassword: function (input) {
            var regEx = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[A-Za-z\d]{7,20}$/;
            return regEx.test(input);
        },

        validirajPotvrdu: function (input1, input2) {
            return input1 === input2;//((input1 === input2) && this.validirajPassword(input1) && this.validirajPassword(input2));
        },

        validirajBitbucketURL: function (input) {
            var regEx = /^https:\/{2}[a-zA-Z0-9]+@bitbucket\.org\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+\.git$/;
            return regEx.test(input);
        },

        validirajBitbucketSSH: function (input) {
            var regEx = /^git@bitbucket\.org:[a-zA-Z0-9]+\/[a-zA-Z0-9]+\.git$/;
            return regEx.test(input);
        },
        
        validirajNazivRepozitorija: function (regEx, input) {
            if(regEx === null) {
                var regExMy = /^wt(p|P)rojekat\d{5}$/;
                return regExMy.test(input);
            }
            return regEx.test(input);
        },

        validirajImeiPrezime: function (input) {
            var regEx = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,11}(([ '-])?[A-ZČĆŽŠĐ][a-zčćžšđ]{2,11})*$/;
            return regEx.test(input);
        },

        postaviMaxGrupa: function (input) {
            maxGrupa = input;
        },

        postaviTrenutniSemestar: function (input) {
            trenutniSemestar = input;
        }

    }

}());