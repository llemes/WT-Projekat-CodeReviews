var BitBucketApi = (function () {
    return {
        dohvatiAccessToken: function(key, secret, fnCallback) {

            var ajax = new XMLHttpRequest();

            if(key !== null && secret !== null) {

                ajax.onreadystatechange = function () {

                    if(ajax.readyState === 4 && ajax.status === 200) {
                        fnCallback(null, JSON.parse(ajax.responseText).access_token);
                    }
                    else if(ajax.readyState === 4) {
                        fnCallback(ajax.status, null);
                    }

                };

                ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
                ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                ajax.setRequestHeader("Authorization", 'Basic ' + btoa(key + ':' + secret));
                ajax.send("grant_type="+encodeURIComponent("client_credentials"));

            }

            else {
                fnCallback(-1, "Key ili secret nisu pravilno proslijedeni!");
            }

        },
        dohvatiRepozitorije: function(token, godina, naziv, branch, fnCallback) {

            var ajax = new XMLHttpRequest();

            ajax.onreadystatechange = function() {
                if (ajax.readyState === 4 && ajax.status === 200){
                    var branchArray = JSON.parse(ajax.responseText).values;
                    var returnArray = [];
                    branchArray.forEach(function (t) {
                        returnArray.push(t.links.clone[0].href)
                    });
                    fnCallback(null, returnArray);
                }
                else if (ajax.readyState === 4)
                    fnCallback(ajax.status, null);
            };

            ajax.open("GET","https://api.bitbucket.org/2.0/repositories/?after=" + godina + "-01-01&role=member&before=" +
                Number(godina)+1 + "-01-01&pagelen=150");
            ajax.setRequestHeader("Authorization", 'Bearer ' + token);
            ajax.send();

        },
        dohvatiBranch: function(token, url, naziv, fnCallback){
            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange();
            var pronadjen = false;
            if(ajax.readyState === 4 && ajax.status === 200)
            {
                var response = JSON.parse(ajax.responseText);
                var k = 0;
                while(response[i].value != undefined)
                {
                    if(response[i].value === naziv)
                    {
                        pronadjen = true;
                        break;
                    }
                    i++;
                }
                fnCallback(null, pronadjen);
            }
            else if(ajax.readyState === 4)
                fnCallback(ajax.status, pronadjen);

            ajax.open("GET", url);
            ajax.setRequestHeader("Authorization", "Bearer" + token);
            ajax.send();
        }
    }

})();