function onBodyLoad() {
    document.getElementById('testDate').value = new Date().toDateInputValue();

}


Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});


function onSocketClose() {
    console.log("WS client: Websocket closed.");
}

function startRecording() {
    var params = {
        topic: "startRecording"
    };
    console.log("startRecording done, showing patientIdentification");
    document.getElementById("numbersRepeating").style.display = 'block';
    document.getElementById("instructions").style.display = 'none';
    do_recognize();
    
}

function patientIdentificationFcn() {
if(document.getElementById("fname").value == "" || document.getElementById("lname").value == "" || document.getElementById("residence").value == ""){
    document.getElementById("upper_log2").style.visibility = 'visible';    

}
else{


    var params = {
        topic: "patientIdentification",
        testDate: document.getElementById("testDate").value,
        place: document.getElementById("place").value,
        patientCategory: document.getElementById("patientCategory").value,
        patientId: document.getElementById("patientId").value,
        session: "session",
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        dateOfBirth: document.getElementById("dateOfBirth").value,
        residence: document.getElementById("residence").value,
        abadeco: document.getElementById("abadeco").value,
        ALBA_type: document.getElementById("ALBA_type").value,
        sentenceRepeating: document.getElementById("sentenceRepeating").value,
        sentenceRemembering: document.getElementById("sentenceRemembering").value,
        gesturesExecuting: document.getElementById("gesturesExecuting").value,
        gesturesRemembering: document.getElementById("gesturesRemembering").value,
        namingMistakes: document.getElementById("namingMistakes").value,
        picturesRemembered: document.getElementById("picturesRemembered").value,
        FAQ: document.getElementById("FAQ").value

    };
    console.log("Sending ID data to DM: ", params);
    console.log("patientIdentification done, showing numbersRepeating");
    document.getElementById("patientIdentification").style.display = 'none';
    document.getElementById("instructions").style.display = 'block';
    speechCloud.dm_send_message({data: JSON.stringify(params)});
    //do_recognize();
}
}



function numbersRepeatingFcn() {
    var params = {
        topic: "numbersRepeating"
    };
    console.log("numbersRepeating done, showing lakePicture");
    document.getElementById("numbersRepeating").style.display = 'none';
    document.getElementById("lakePicture").style.display = 'block';
    
}

function lakePictureFcn() {
    var params = {
        topic: "lakePicture"
    };
    console.log("lakePicture done, showing animalsRemembering");

    document.getElementById("lakePicture").style.display = 'none';
    document.getElementById("animalsRemembering").style.display = 'block';

    
    
}

function animalsRememberingFcn() {
    var params = {
        topic: "animalsRemembering",
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        animals_understood: animals_understood,
        animals_already_understood: animals_already_understood
    };
    console.log("animalsRemembering done, showing end");

    document.getElementById("animalsRemembering").style.display = 'none';
    document.getElementById("end").style.display = 'block';
    console.log("Sending animals data to DM: ", params);
    speechCloud.dm_send_message({data: JSON.stringify(params)});
    setTimeout(function() { appResetFcn(); }, 10000);

}

function appResetFcn() {
    test_idx = -1;
    numbers = ["941", "726", "583"]

    var image = document.getElementById('breh');
    if(image && image.style) {
        image.style.height = '600px';
        image.style.width = '900px';
        image.style.top = '50%'
        
        }

    document.getElementById('log').style.display='none';

    var params = {
        topic: "appReset",
        animals_understood: animals_understood,
        animals_already_understood: animals_already_understood
    };
    console.log("appReset done, showing patientIdentification");

    document.getElementById("end").style.display = 'none';
    document.getElementById("patientIdentification").style.display = 'block';

    document.getElementById('testDate').value = new Date().toDateInputValue();
    document.getElementById("place").value = "FKNV";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("dateOfBirth").value = "1970-01-01";
    document.getElementById("residence").value = "";
    document.getElementById("abadeco").value = "";
    document.getElementById("sentenceRepeating").value = "NA";
    document.getElementById("sentenceRemembering").value = "NA";
    document.getElementById("gesturesExecuting").value = "NA";
    document.getElementById("gesturesRemembering").value = "NA";
    document.getElementById("namingMistakes").value = "NA";
    document.getElementById("picturesRemembered").value = "NA";
    document.getElementById("FAQ").value = "0";
    //speechCloud.dm_send_message({data: JSON.stringify(params)});
}


/* Logovací funkce - nevyuzito */
function hlog(text) {
    $("#log").append("<div><b>"+text+"<b><br/></div>");
}

/* Stredova logovací funkce */
function log(text) {
    $("#log").html("<b>" + text + "</b>");
}

/* Stredova logovací funkce */
function log2(text) {
    $("#log2").html("<b>" + text + "</b>");
}

/* Horni logovací funkce */
function upper_log(text) {
    $("#upper_log").html("<b>" + text + "</b>");
}

    var test_idx = -1; //mel by byt od 0, zatim nechat na -1
    /* Stavová proměnná a funkce pro spuštění/pozastavení rozpoznávání */
    let numbers = ["941", "726", "583"]
    //let numbers = ["941"]
    var recognizing = false;

    var animals_understood = 0;
    const animals_already_understood = [];
    const animals = ["mamut", "kráva","aberdeen","aberdín","aberdýn","adax","chrt","afrička","agama","agapornis","aguti", "erdelteriér","teriér","akita","akita inu","akita_inu","alexandr","aligátor","malamut","alka","alkoun","brakýř","alter real","amazoňan","jestřáb","los","prase","kobylka","kozlíček","vodomil","amazónek","babirusa","plochuska", "makadlovka", "amejva","buldok","kůň","pony","poník","klusák","kokršpaněl","stafordšírský teriér","amroksky","voláč","anakonda","anatolský pastevecký pes","anatol","pes","andulka","beran","plnokrevník","setr","špringršpaněl","toy teriér","holub","angloarab","koza","králík","slepice","anoa","anolis","anténovec","antilopa","vousáči","vousáč","vousáč","appaloosa","salašnický pes","salaš","ara","arara","arasari","aratinga","araukany","argali","doga","baset","slepice","australky","kelpie","ohař","axis","axolotl","aymara","ajmara","skot","azavak","azteca","azteka","babočka","bahnivec","kočka","bandikut","bantamky","banteng","barbet","boloňáček","baribal černý","baribal","barnard","barneveldky","basenži","baset","batolec","bavlnice","barvář","teplokrevník","bazilišek","bázlivec","bažant","bearded kolie","bírdid kolie","kolie","beauceron","bejlomorka","bekasína","bekyně","belásek","belgické modrobílé","grifonek","belgický obr","ovčák","bělokaz","bělokur","bělopásek","bělořit","bělozubka","běluha","bércoun","bernardýn","bublák","berneška","salašnický pes","salaš","varan","beruška","běžník","bičochvost","bičovka","bígl","bichir","binturong","birma","bišonek","bizon","blatnice","blecha","bloodhound","bladhaund","blýskáček","bobr","bobruška","bobtail","bobtejl","bodalka","bodlín","bodlok","bojga","bojovnice","bolen","boloňský psík","boloň","bonobo","doga","border kolie","bordérka","bourovčík","bourovec","lýkožrout","alexandr","psohlavec","korela","delfín","mrož","kavka","chroust","brabantík","brahmánky","bramborníček","bráněnka","fila","brhlík","briard","brkoslav","brumby","grifonek","bruslařka","břehouě","břehule","budníček","bukač","bukáček","bulbul","bulmastif","chladnokrevník","bulteriér","burunduk","buřňáček","buřňák","buvol","buvolec","bzikavka","bzučivka","bzunka jecna","cairn","candát","cejn","cejnek","cikáda","cistovník","hnšdák","coton de tuléar","criollo","retrívr","cvrček","cvrčilka","chachalaka","chaluha","chameleon","chápan","charmozín","charolais","charza","chesapeake bay","chluponožka","chobotnice","chocholatka","chocholouš","chrobák","chrostík","chroust","chrouster","chřástal","chřestýš","chvostan","křeček","džungar","liška","kobylka","kozlíček","čalounice","čáp","čau čau","čečetka","čejka","čelistnatka","čepcol","černopáska","černoproužka","červenka","červotoč","bagdeta","vlčák","albín","holub","stavák","skot","čichavec","činčila","čipmank","čírka","čivava","čížek","čmelák","čolek","čukvala","ďábel","dalmatín","daman","damascén","daněk","datel","datlík","deerhound","dírhaund","delfínec","delfínovec","dhoul","dikdik","dikobraz","dingo","diviznáček","dlask","dlouhohlávka","dlouhokrčka","dlouhoretka","dlouhošíjka","dlouhozobka","dobrman","donsky kun","drabčík","dragoun","drakoun velky","drápatečka","drápatka","drop","eklektus","elo","emu","eurasier","falabella","faraón","faverolky","felsuma","felzuma","fenek","field španěl","španěl","chladnokrevník","špic","flanderský bouvier","flander","bouvier","forverky","fosa","foxhound","foxteriér","buldoček","klusák","honič","frček","frederiksborg","fret","fryna","furioso","galiceňo","galloway","gaur","gaviál","gazela","gekon","gekončík","gepard","gibon lar","gidran","gigant","glosofága","gordonsetr","gorila","gottingen","grizon","guan","gueréza","hackney","hakny","hafling","halančík","hamburčanka","barvář","psík","havran","hedvábnička","hempšírky","hereford","hlavatka","hlavec","hlodoun","hnedopáska","hnojník","hohol","hoholka","hoko","koza","králík","pudl","holokrčky","holoubek","racek","holub","hořavka duhova","hovawart","hrabáč","hrabalka","hrabatka","hraboš","hrabošík","hrachovka ricni","hrbáč","hrdlička","hrobařík","hroch","hrošík","hrotař","hrotnokřídlec","hrouzek","hroznýš","hroznýšek","hroznýšovec","hryzec","hřbetozubec","hřbenule","hucul","hudánky","hulman","husa","myš","plymutka","lori","ovce","hyl","zákeřnice","zlatoočka","husice","hutia konga","hutia","hvízdák","hyena","hyenka","hýl","ibis","ibizský podengo","podengo","impala","indián","indicky běžec","indri","irbis","irena","setr","hunter","vlkodav","chrtík","spinone","jack russell teriér","jaguár","jaguarundi","jak","japonky čabo","čabo","bobtail","čin","špic","jasoň","jazyk","jehlanka","jehlice","jehlozobka","jelec","jelen","jelenec","jepice","skot","jeřáb","jeřábek","jeseter","jespak","ještěrka","jěštěrkovec","jetelovka","jezevčík","jezevec","ježdík","ježek","ježura","jiřička","kabar","kahau","kachna","kachnička","kajka","kajman","kajmánek","kajmanka","kakadu","katalanka","krecek dzungarsky","liska obecna","varan ostnoocasy","jestrab kratkoprsty","los evropsky","vietnamske prase","vietnamske prase","kobylka zelena","kozlicek dazule","kakadu","kakapo","kakariki","kalandra","kaloň","kalous","kameňáček","kamzík","kančík","kančil","káně","kanic","kapr","kapustňák","kapybara","karakal","karas obecny","karetka","kariér","kastorex","katalánka","kavče","kavka","keporkak","kerry","king","kladivoun","klešťanka","katalanka","klikoroh","klínatka","klíněnka","klístě","klokan","klokánek","klokanomyš","klopuška","kněžice","knírač","koala","kobra","skřivan","kobylka","kočinky","kočkodan","kodulka","kogie","kogna","kohoutek","kojot","kokrháč","kolie","koliha","koljuška","kolpík","komár","komba","komondor","konipas","konopka","kooikerhondje","kopřivka","korálovka","korat","korela","kormorán","kornyška","koroptev","korovnice","katalanka","grifon","kos","kosatka","kosman","kotul","kovařík","kovolesklec","koza","kozlíček","kozorožec","kozojed","krahujec","krajník","krajta","krakatice","králíček","králík","krasec","kraska","krátkonožka","krevkérka","krkavec","krocan","krokodýl","kromforländer","kromforlander","krtek","krtonožka","kruhochvost","krunýřovec","krůta","krutihlav","krysa","krytonosec","kreček","křečík","křepelka","křísek","křivka","křižák","ksukol","kuandu","kubalaje","kudlanka","kudrnáč","kudu","kukačka","kuklice","kulík","kulíšek","kulohlavec","kuna","kuňka","kunovec","kuska","kuskus","kusu","kutilka","kuvas","kvakoš","květilka","květolib","květomil","kyjatka","kynkažu","","labrador","labuť","laflešky","lachtan","lakeland","lejklend","lakenfeldky","lejkenfeltky","lalokonosec","lama","landseer","lendsír","langšanka","langur","lasice","latam","ledňáček","ledňák","leghornka","leguán","leguánek","lejsek","lelek","lemur","lenec","lenochod","leonberger","lepoještěr","leskoptev","lesoň","létavec","létavka","letoun","letucha","lev","levhart","lhasa apso","lín","linduška","linsang","lipan","lipicán","listokaz","listonos","listopas","listovnice","lišaj","liška","loděnka","lodivod","lopatonos","lori","loríček","lorikul","los","losos","lovčík","lumčík","lumek","lumík","luňák","luněc","luptouš","lusitano","luskoun","bojovnice","lvíček","lýkohub","lýkožrout","lyska","lyskonoh","lžičák","máčka","mada","maikong","majka","makak","mak","mákovka","makrela","malajka","maločlenec","malpa","psík","mandelík","mandelinka","mandril","mangabej","mangalarga","mangusta","mantela","mara","maransky","maremmano","martináč","masařka","mastif","matamata","mečoun","mečovka","medojed","medosavka","medovnice","medvěd","megaderma","mera","naháč","mihule","bulteriér","minorky","mirikina","missouri fox trotter","mločík","mlok","mlynařík","mník","mníšek","mnohonožka","mnohopilák","modena","modenka","modrásek","baset","gaskoň","moloch","molovka","momot","monden","mops","morčák","morče","morgan","moták","motýlice","motýl","moudivláček","moucha","mravencojed","mravenec","mravenečník","mravkolev","mrchožrout","mrož","mršník","mřenka","mšice","mudi","muflon","muchnice","muntžak","můřice","mustang","myš","myšák","myšice","myšivka","myška","mýval","nahur","nandej","nandu","nártoun","narval","mastin","boxer","křepelák","pinc","špic","neoféma","neonka","nestor","nesytka","netopýr","netopýrek","new forest pony","ňů forest pouny","nilgau","noháč","nonius","norek","kob","norník","lundehund","nosál","nosatčík","nosatec","nosorožec","nosorožík","novozélandský červený","nutrie","nyala","obaleč","ocelot","octomilka","okáč","okapi","okenáč","okoun","okounek","oliheň","olingo","ondatra","opice","opičí pinč","pinč","orangutan","oravky","orcela","orebice","orel","oribi","orlík","orlosup","orlovec","orlovky","klusák","orpingtonky","ořešník","osel","osenice","osmák","ostralka","ostroretka","ostruháček","ostruhák","ostruhovník","ostrucha","ostříž","otakárek","ouhorlík","ouklej","ouklejka","outloň","ovád","ovce","ovíječ","pablatnice nosata","pačolek","paduánky","pagekon","páchník","paint horse","pejnt hors","paještěrka","paježura","paka","pakudlanka","pakůň","paličatka","pancéřníček","panda","paovce","papillon a phaléne","papoušek","papoušíček","papuchalk","parma","parosnička","parukář","paso fino","pásovec","páteříček","páv","pavián","peja","pekari","pelikán","pěnice","pěnkava","penkavák","pěnodějka","perepel","perleťovec","perleťovka","perlička","perlín","perlorodka","perlovka","arab","péřovka","pestrokrovečník","pestrokřídlec","pestruška","pestřenec","pestřenka","pěvec","pěvuška","píďalka","pika","pilatka","pilořitka","pilous","pipa","pisík","pisila","pískomil","pískorypka","piskoř pruhovany","pišťucha","pižmoň","plameňák","plamenoskvrnka","plejtvák","plejtvákovec","plch","plískavice","plodomorka","plochojester","plochuška","makadlovka","ploskohřbetka","ploskorep","ploskoroh","ploskoroh","plotice obecna","plšík","plymutka","podoustev nosák","podoustev","nosák","pointer","pokoutník","polák","poletucha","poletuška","polník","zelenonožky","ogar","podengo","possum","poštolka","pošvatka","potápka","potáplice","potápník","potemníček","potemník","potkan","poto","pottok","pouzdrovníček","pralesnička","prase","divočák","rejdič","promyka","prskavec","přástevník","předivka","přímorožec","psohlavec","psoun","pstruh","pštros","ptakopysk","pták","pudl","pudlpointer","puchýřník","puklice","puli","puma","pumi","puštík","mastin","pyrura","pytlonoš","racek","ragdoll","rájovec","rak","rákosníček","rákosnička","rákosník","raroh","ratufa","redkap","rehek","rejnok","rejsec","rejsek","rejskovec","ridgeback","rocky mountain","rodajlendka","roháč","roháček","rohatka","ropucha","rorýs","rosela","rosnice","rosnička","rosomák","rotvajler","ruměnice","rus","rušník","rybák","rybenka","rýhonosec","rypoš","rypouš","rys","říman","sajga","salerno","sambar","sametka","samojed","saranče","sasexky","satyr","scink","sebritky","sedmihlásek","sekáč","sekavec","sekavka","sépie","serval","shiba","schi tzu","siamang","husky","sifaka maly","síh","sitatunga","síťnatka","siven","skalára","skalník","skálolez","sklípkan","skokan","skorec","skřivan","skrivánek","skunk","skvrnopasník","slavík","slepec","slepýš","slíďák","slípka","slizoun","slon","sloughi","čuvač","kopov","slučka","sluka","slunéčko","slunečnice","slunka","smolák","smrtník","smrtonoš","sněhule","sněžnice","sob","sobol","sojka","sojkovec","sokol","sorraia","sosnokaz","soumračník","sova","sovice","splešťule","srnec","srpice","srpokřídlec","srstín","sršeň","bulterier","stehlík","stepnice","stepník","stepokur","stonožka","straka","strakáč","strakapoud","strnad","stromovnice","střechatka","střevle","střevlíček","střevlík","střízlík","stužkonoska","sulmtálky","sultánky","sumec","sumeček","sup","surikata","svštluška","svinka","sviňucha","svišť","svižník","sýc","sýček","sýkora","sýkořice","sysel","šakal","šarpej","šeltie","šídélko","šídlo","šimpanz","šiperka","širokohlavec","škeble","škvor","barevnohlávek","šoupalek","špaček","galgo","štětconoš","štětinatec","štětkoun","štika","štír","štírek","štítenka","štítonoš","štítovec","brakýř","šumavanky","šváb","tadarida","tahr","tamarín","kalimiko","tana","tangalunga","tangara","tapír","tarbík","tarbíkomyš","taricha","tarpan","teju","tenkozobec","mimochodník","terej","tesařík","tetra","tetřev","tetřívek","tchoř","tchořík","tilikva","tiplice","tirika","titi","tlamovec","tmavoskvrnáč","toko","tomistoma","travařka","tricha","trnorep","kropenka","truběnka","třásněnka","ťuhýk","tui","tukan","tuleň","tuňák","tuponosec","turako","banánovec","angora","turpan","tygr","uakari","úhoř","upír","urzon","ústřičník","úžovka","vačice","vačínek","vakokrt","vakomyš","vakonoš","vakoplch","vakoplšík","vakorejsek","vakovec","vakoveverka","varan","vaza","vážka","včela","včelojed","vejcožrout","vějířovka","velbloud","veleštír","velevrub","velryba","velsumky","velškorgi cardigan","velškorgi kardigan","velššpringršpaněl","velšteriér","veš","veverka","rejdič","vidloroh","víkonos","vini","vipet","vírník","viskača","činčila","vlaška","vlaštovka","vlček","vlha","vlk","vlnatka","vodomil","vodouch","vodouš","voduška","bublák","volavka","vombat","vorvaň","vorvaňovec","vosa","vosík","vousák","vrabec","vrána","vranka","vranohlávky","vrápenec","vrbař","vroubenka","vrtalka","vrubozubec","vřešťan","vřetenuška","všenka","vydra","vydrař","vychuchol","výr","výreček","vyza","vztyčnořitka","wäller","veler","pembroke","pembrouk","wyandotka","zajíc","zákeřnice","beran","lajka","zavíječ","závojnatka","zdobenec","zdobnatka","zebra","zedníček","zelenuška","zlatěnka","zlatohlávek","zlatokrt","zlatoočka","retrívr","zmije","znakoplavka","zobec","zoborožec","zorila","zrnokaz","zrzohlávka","zubr","zvonek","zvonohlík","žahalka","žako","žebrovník","želva","ženetka","žerzejstí obři","žirafa","živorodka","žlabatka","žluna","žluťásek","žluva","žralok"];
    
    function do_recognize() {
        /*if(!recognizing){
            console.log("starting ASR for test: ", test_idx);
            speechCloud.asr_recognize();
            recognizing = true;
        }*/
        
        switch(test_idx){
            case -1:
                
                handled_recog_min_1 = false;
                
                text_to_say = "Abyste se seznámili s fungováním aplikace a zároveň si ověřili Váš sluch, začneme jednoduchou instrukcí. Budete opakovat tato trojciferná čísla.";
                do_tts(text_to_say);

                //text_to_log = "Nejdříve si vyzkoušíme Váš sluch. Opakujte tato tři trojciferná čísla";
                //upper_log(text_to_log); //TODO struktura stranky kvuli textu a obrazku -> SOLVED text misto countdownu, pote text none a countdown block
                speechCloud.on('tts_done', function (msg) {
                    if(!handled_recog_min_1){
                        
                        handled_recog_min_1 = true;

                        handle_numbers();

                    }
                })
                break;
            case 0:
                handled_recog_0 = false;
                
                document.getElementById('breh').style.display='block';
                document.getElementById('upper_log').style.display='block';
                
                text_to_say = "Nyní vidíte před sebou obrázek na břehu rybníka. Na obrázku je několik osob a děje se tam celá řada činností. Zkuste je nyní prosím co nejvíce popsat.";
                do_tts(text_to_say);

                text_to_log = "Nyní vidíte před sebou obrázek na břehu rybníka. <br> Na obrázku je několik osob a děje se tam celá řada činností. <br> Zkuste je nyní prosím co nejvíce popsat.";
                upper_log(text_to_log); //TODO struktura stranky kvuli textu a obrazku -> SOLVED text misto countdownu, pote text none a countdown block
                speechCloud.on('tts_done', function (msg) {
                    
                    if(!handled_recog_0){
                        // zapnuti asr_recognize()
                        speechCloud.asr_recognize();
                        recognizing = true;
                        document.getElementById('upper_log').style.display='none';
                        document.getElementById('countdown_0').style.display='block';
                        var image = document.getElementById('breh');
                        if(image && image.style) {
                            image.style.height = '680px';
                            image.style.width = '1100px';
                            image.style.top = '50%';
                        }

                        var countdown_position = document.getElementById('countdown_0');
                        if(countdown_position && countdown_position.style) {
                            countdown_position.style.left = '35px';
                        }
                        startTimer();

                        handled_recog_0 = true;
                    }
                                        
                    
                })
                break;
            case 1:
                handled_recog_1 = false;
                
                //document.getElementById('log2').style.display='block';

                text_to_say = "Nyní budete mít za úkol vyjmenovat co NEJRYCHLEJI co NEJVÍCE ZVÍŘAT, tedy živočichů, kteří žijí na souši, ve vodě, ve vzduchu nebo i hmyz. Prostě jakékoliv zvíře, které Vás napadne. Zkouška je na čas, buďte tedy co nejrychlejší. Máte na to půl minuty. Připravte se a začínáme. Teď!";
                do_tts(text_to_say);
                text_to_log = "Nyní budete mít za úkol vyjmenovat co NEJRYCHLEJI co NEJVÍCE ZVÍŘAT, <br> tedy živočichů, kteří žijí na souši, ve vodě, ve vzduchu nebo i hmyz. <br> Prostě jakékoliv zvíře, které Vás napadne. <br> Zkouška je na čas, buďte tedy co nejrychlejší. Máte na to půl minuty. Připravte se a začínáme. <br> Teď!";
                log2(text_to_log);

                speechCloud.on('tts_done', function (msg) {

                    if(!handled_recog_1){
                        speechCloud.asr_recognize();
                        recognizing = true;
                        document.getElementById('countdown_1').style.display='block';
                        document.getElementById('log2').style.display='none';

                        startTimer();
                        
                        handled_recog_1 = true;
                    }
                    
                    
                })
                break;        
    }
}

    function proceed_to_next_test() {
        console.log("stopping ASR for test: ", test_idx);
            do_pause();
        switch(test_idx){
                
            case 1:
                //last test - animalsRemembering
                    
                handled_proceed_0 = false;
                    
                text_to_say = "Děkujeme, to jsou všechny úkoly, které jsme pro vás měli připravené. Dobrá práce.";
                    
                do_tts(text_to_say);
                    
                speechCloud.on('tts_done', function msg() {
                    if(!handled_proceed_0){
                        //speechCloud.asr_pause(); //could be do_pause()
                        //do_pause();
                            
                        animalsRememberingFcn();
                            
                        handled_proceed_0 = true;
                        }
                        
                    })
                break;
                
            case -1:
                //numbersRepeating
                handled_proceed_min_1 = false;
                text_to_say = "Děkujeme, teď budeme pokračovat dalším úkolem.";
                do_tts(text_to_say);
    
                speechCloud.on('tts_done', function () {
                    if(!handled_proceed_min_1){
                            
                        document.getElementById('log').style.display='none';
                        document.getElementById('next_test').style.display='block';
    
                        handled_proceed_min_1 = true;
                        }
                    })
    
                break;

            case 0:
                //lakePicture
                handled_proceed_1 = false;
                text_to_say = "Děkujeme, teď budeme pokračovat dalším úkolem.";
                do_tts(text_to_say);

                    
                speechCloud.on('tts_done', function () {
                    if(!handled_proceed_1){
                            
                        document.getElementById('breh').style.display='none';
                        document.getElementById('countdown_0').style.display='none';
                        document.getElementById('next_test2').style.display = 'block';
                        handled_proceed_1 = true;

                    }
                })
                break;

                    
                    
            }
            
    }
     /* Obsluha tlačítka Pokracovat */
    function nextTestFcn() {
        document.getElementById('next_test').style.display='none';
        switch (test_idx) {
            case -1:
                numbersRepeatingFcn();
                document.getElementById('next_test').style.display='none';
                break;
        
            case 0:
                document.getElementById('next_test2').style.display='none';
                lakePictureFcn();

                break;
            //case 1:
                //animalsRememberingFcn();
                //console.log("animalsRemeberingFcn")
                //break;
        }
        test_idx = test_idx + 1;
        
        do_recognize();                
        
    };

    /* Obsluha tlačítka Další číslo */
    function nextNumberFcn() {
        speechCloud.asr_pause();
        recognizing = false;
        document.getElementById('next_number').style.display='none';
        
        //numbers.pop();
        
        handle_numbers();
        
    };

    function do_pause() {
            if(recognizing){
                speechCloud.asr_pause();
                recognizing = false;
            }
            
    }
    function handle_numbers(){
        if(numbers.length != 0){
            do_tts(numbers[numbers.length - 1])

            speechCloud.on('tts_done', function () {
                document.getElementById('log').style.display='block';
                log("Opakujte právě slyšené číslo")
                if(!recognizing){
                    speechCloud.asr_recognize();
                    recognizing = true;
                }
        })
        }
        else{
            document.getElementById('log').style.display='none';
            proceed_to_next_test();
        }
    }
    /* Syntéza řeči */
    function do_tts(text, voice) {
        speechCloud.tts_synthesize({
            text: text,
            voice: voice
        });
    }


    function startTimer() {
        switch (test_idx){
            case 0:
                duration = 60;
                countdown_name = 'countdown_0';
                break;
            case 1:
                duration = 30;
                countdown_name = 'countdown_1';
                break;
        }
                
        display = document.querySelector('#'+ countdown_name);
        var timer = duration, seconds;

    var countdown = setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        //seconds = seconds < 10 ? "0" + seconds : seconds;
        timer = timer < 10 ? "0" + timer : timer;
        //display.textContent = seconds + "s";
        display.textContent = timer + "s";

        if (--timer < 0) {
            proceed_to_next_test();
            clearInterval(countdown);
             
        }
    }, 1000);
}
    