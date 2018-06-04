var HandleValidation = (function() {

    return {
        validirajFakultetski: function (input) {
            if (!Validacija.validirajFakultetski(input)) {
                Poruke.dodajPoruku(0);
            }
            else {
                Poruke.ocistiGresku(0);
            }
            Poruke.ispisiGreske();
        },

        validirajIndex: function (input) {
            if (!Validacija.validirajIndex(input)) {
                Poruke.dodajPoruku(1);
            }
            else {
                Poruke.ocistiGresku(1);
            }
            Poruke.ispisiGreske();
        },

        validirajGrupu: function (input) {
            if (!Validacija.validirajGrupu(input)) {
                Poruke.dodajPoruku(2);
            }
            else {
                Poruke.ocistiGresku(2);
            }
            Poruke.ispisiGreske();
        },

        validirajAkGodinu: function (input) {
            if (!Validacija.validirajAkGodinu(input)) {
                Poruke.dodajPoruku(3);
            }
            else {
                Poruke.ocistiGresku(3);
            }
            Poruke.ispisiGreske();
        },

        validirajPassword: function (input) {
            if (!Validacija.validirajPassword(input)) {
                Poruke.dodajPoruku(4);
            }
            else {
                Poruke.ocistiGresku(4);
            }
            Poruke.ispisiGreske();
        },

        validirajPotvrdu: function (input1, input2) {
            if (!Validacija.validirajPotvrdu(input1, input2)) {
                Poruke.dodajPoruku(5);
            }
            else {
                Poruke.ocistiGresku(5);
            }
            Poruke.ispisiGreske();
        },

        validirajBitbucketURL: function (input) {
            if (!Validacija.validirajBitbucketURL(input)) {
                Poruke.dodajPoruku(6);
            }
            else {
                Poruke.ocistiGresku(6);
            }
            Poruke.ispisiGreske();
        },

        validirajBitbucketSSH: function (input) {
            if (!Validacija.validirajBitbucketSSH(input)) {
                Poruke.dodajPoruku(7);
            }
            else {
                Poruke.ocistiGresku(7);
            }
            Poruke.ispisiGreske();
        },

        validirajNazivRepozitorija: function (regEx, input) {
            if (!Validacija.validirajNazivRepozitorija(regEx, input)) {
                Poruke.dodajPoruku(8);
            }
            else {
                Poruke.ocistiGresku(8);
            }
            Poruke.ispisiGreske();
        },

        validirajImeiPrezime: function (input) {
            if (!Validacija.validirajImeiPrezime(input)) {
                Poruke.dodajPoruku(9);
            }
            else {
                Poruke.ocistiGresku(9);
            }
            Poruke.ispisiGreske();
        }

    }
}());