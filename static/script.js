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


/* Logovac?? funkce - nevyuzito */
function hlog(text) {
    $("#log").append("<div><b>"+text+"<b><br/></div>");
}

/* Stredova logovac?? funkce */
function log(text) {
    $("#log").html("<b>" + text + "</b>");
}

/* Stredova logovac?? funkce */
function log2(text) {
    $("#log2").html("<b>" + text + "</b>");
}

/* Horni logovac?? funkce */
function upper_log(text) {
    $("#upper_log").html("<b>" + text + "</b>");
}

    var test_idx = -1; //mel by byt od 0, zatim nechat na -1
    /* Stavov?? prom??nn?? a funkce pro spu??t??n??/pozastaven?? rozpozn??v??n?? */
    let numbers = ["941", "726", "583"]
    //let numbers = ["941"]
    var recognizing = false;

    var animals_understood = 0;
    const animals_already_understood = [];
    const animals = ["mamut", "kr??va","aberdeen","aberd??n","aberd??n","adax","chrt","afri??ka","agama","agapornis","aguti", "erdelteri??r","teri??r","akita","akita inu","akita_inu","alexandr","alig??tor","malamut","alka","alkoun","brak????","alter real","amazo??an","jest????b","los","prase","kobylka","kozl????ek","vodomil","amaz??nek","babirusa","plochuska", "makadlovka", "amejva","buldok","k????","pony","pon??k","klus??k","kokr??pan??l","staford????rsk?? teri??r","amroksky","vol????","anakonda","anatolsk?? pasteveck?? pes","anatol","pes","andulka","beran","plnokrevn??k","setr","??pringr??pan??l","toy teri??r","holub","angloarab","koza","kr??l??k","slepice","anoa","anolis","ant??novec","antilopa","vous????i","vous????","vous????","appaloosa","sala??nick?? pes","sala??","ara","arara","arasari","aratinga","araukany","argali","doga","baset","slepice","australky","kelpie","oha??","axis","axolotl","aymara","ajmara","skot","azavak","azteca","azteka","babo??ka","bahnivec","ko??ka","bandikut","bantamky","banteng","barbet","bolo??????ek","baribal ??ern??","baribal","barnard","barneveldky","basen??i","baset","batolec","bavlnice","barv????","teplokrevn??k","bazili??ek","b??zlivec","ba??ant","bearded kolie","b??rdid kolie","kolie","beauceron","bejlomorka","bekas??na","bekyn??","bel??sek","belgick?? modrob??l??","grifonek","belgick?? obr","ov????k","b??lokaz","b??lokur","b??lop??sek","b??lo??it","b??lozubka","b??luha","b??rcoun","bernard??n","bubl??k","berne??ka","sala??nick?? pes","sala??","varan","beru??ka","b????n??k","bi??ochvost","bi??ovka","b??gl","bichir","binturong","birma","bi??onek","bizon","blatnice","blecha","bloodhound","bladhaund","bl??sk????ek","bobr","bobru??ka","bobtail","bobtejl","bodalka","bodl??n","bodlok","bojga","bojovnice","bolen","bolo??sk?? ps??k","bolo??","bonobo","doga","border kolie","bord??rka","bourov????k","bourovec","l??ko??rout","alexandr","psohlavec","korela","delf??n","mro??","kavka","chroust","brabant??k","brahm??nky","bramborn????ek","br??n??nka","fila","brhl??k","briard","brkoslav","brumby","grifonek","brusla??ka","b??ehou??","b??ehule","budn????ek","buka??","buk????ek","bulbul","bulmastif","chladnokrevn??k","bulteri??r","burunduk","bu????????ek","bu??????k","buvol","buvolec","bzikavka","bzu??ivka","bzunka jecna","cairn","cand??t","cejn","cejnek","cik??da","cistovn??k","hn??d??k","coton de tul??ar","criollo","retr??vr","cvr??ek","cvr??ilka","chachalaka","chaluha","chameleon","ch??pan","charmoz??n","charolais","charza","chesapeake bay","chlupono??ka","chobotnice","chocholatka","chocholou??","chrob??k","chrost??k","chroust","chrouster","ch????stal","ch??est????","chvostan","k??e??ek","d??ungar","li??ka","kobylka","kozl????ek","??alounice","????p","??au ??au","??e??etka","??ejka","??elistnatka","??epcol","??ernop??ska","??ernoprou??ka","??ervenka","??ervoto??","bagdeta","vl????k","alb??n","holub","stav??k","skot","??ichavec","??in??ila","??ipmank","????rka","??ivava","??????ek","??mel??k","??olek","??ukvala","????bel","dalmat??n","daman","damasc??n","dan??k","datel","datl??k","deerhound","d??rhaund","delf??nec","delf??novec","dhoul","dikdik","dikobraz","dingo","divizn????ek","dlask","dlouhohl??vka","dlouhokr??ka","dlouhoretka","dlouho????jka","dlouhozobka","dobrman","donsky kun","drab????k","dragoun","drakoun velky","dr??pate??ka","dr??patka","drop","eklektus","elo","emu","eurasier","falabella","fara??n","faverolky","felsuma","felzuma","fenek","field ??pan??l","??pan??l","chladnokrevn??k","??pic","flandersk?? bouvier","flander","bouvier","forverky","fosa","foxhound","foxteri??r","buldo??ek","klus??k","honi??","fr??ek","frederiksborg","fret","fryna","furioso","galice??o","galloway","gaur","gavi??l","gazela","gekon","gekon????k","gepard","gibon lar","gidran","gigant","glosof??ga","gordonsetr","gorila","gottingen","grizon","guan","guer??za","hackney","hakny","hafling","halan????k","hambur??anka","barv????","ps??k","havran","hedv??bni??ka","hemp????rky","hereford","hlavatka","hlavec","hlodoun","hnedop??ska","hnojn??k","hohol","hoholka","hoko","koza","kr??l??k","pudl","holokr??ky","holoubek","racek","holub","ho??avka duhova","hovawart","hrab????","hrabalka","hrabatka","hrabo??","hrabo????k","hrachovka ricni","hrb????","hrdli??ka","hroba????k","hroch","hro????k","hrota??","hrotnok????dlec","hrouzek","hrozn????","hrozn????ek","hrozn????ovec","hryzec","h??betozubec","h??benule","hucul","hud??nky","hulman","husa","my??","plymutka","lori","ovce","hyl","z??ke??nice","zlatoo??ka","husice","hutia konga","hutia","hv??zd??k","hyena","hyenka","h??l","ibis","ibizsk?? podengo","podengo","impala","indi??n","indicky b????ec","indri","irbis","irena","setr","hunter","vlkodav","chrt??k","spinone","jack russell teri??r","jagu??r","jaguarundi","jak","japonky ??abo","??abo","bobtail","??in","??pic","jaso??","jazyk","jehlanka","jehlice","jehlozobka","jelec","jelen","jelenec","jepice","skot","je????b","je????bek","jeseter","jespak","je??t??rka","j????t??rkovec","jetelovka","jezev????k","jezevec","je??d??k","je??ek","je??ura","ji??i??ka","kabar","kahau","kachna","kachni??ka","kajka","kajman","kajm??nek","kajmanka","kakadu","katalanka","krecek dzungarsky","liska obecna","varan ostnoocasy","jestrab kratkoprsty","los evropsky","vietnamske prase","vietnamske prase","kobylka zelena","kozlicek dazule","kakadu","kakapo","kakariki","kalandra","kalo??","kalous","kame??????ek","kamz??k","kan????k","kan??il","k??n??","kanic","kapr","kapust????k","kapybara","karakal","karas obecny","karetka","kari??r","kastorex","katal??nka","kav??e","kavka","keporkak","kerry","king","kladivoun","kle????anka","katalanka","klikoroh","kl??natka","kl??n??nka","kl??st??","klokan","klok??nek","klokanomy??","klopu??ka","kn????ice","kn??ra??","koala","kobra","sk??ivan","kobylka","ko??inky","ko??kodan","kodulka","kogie","kogna","kohoutek","kojot","kokrh????","kolie","koliha","kolju??ka","kolp??k","kom??r","komba","komondor","konipas","konopka","kooikerhondje","kop??ivka","kor??lovka","korat","korela","kormor??n","korny??ka","koroptev","korovnice","katalanka","grifon","kos","kosatka","kosman","kotul","kova????k","kovolesklec","koza","kozl????ek","kozoro??ec","kozojed","krahujec","krajn??k","krajta","krakatice","kr??l????ek","kr??l??k","krasec","kraska","kr??tkono??ka","krevk??rka","krkavec","krocan","krokod??l","kromforl??nder","kromforlander","krtek","krtono??ka","kruhochvost","krun????ovec","kr??ta","krutihlav","krysa","krytonosec","kre??ek","k??e????k","k??epelka","k????sek","k??ivka","k??i????k","ksukol","kuandu","kubalaje","kudlanka","kudrn????","kudu","kuka??ka","kuklice","kul??k","kul????ek","kulohlavec","kuna","ku??ka","kunovec","kuska","kuskus","kusu","kutilka","kuvas","kvako??","kv??tilka","kv??tolib","kv??tomil","kyjatka","kynka??u","","labrador","labu??","lafle??ky","lachtan","lakeland","lejklend","lakenfeldky","lejkenfeltky","lalokonosec","lama","landseer","lends??r","lang??anka","langur","lasice","latam","led??????ek","led????k","leghornka","legu??n","legu??nek","lejsek","lelek","lemur","lenec","lenochod","leonberger","lepoje??t??r","leskoptev","leso??","l??tavec","l??tavka","letoun","letucha","lev","levhart","lhasa apso","l??n","lindu??ka","linsang","lipan","lipic??n","listokaz","listonos","listopas","listovnice","li??aj","li??ka","lod??nka","lodivod","lopatonos","lori","lor????ek","lorikul","los","losos","lov????k","lum????k","lumek","lum??k","lu????k","lun??c","luptou??","lusitano","luskoun","bojovnice","lv????ek","l??kohub","l??ko??rout","lyska","lyskonoh","l??i????k","m????ka","mada","maikong","majka","makak","mak","m??kovka","makrela","malajka","malo??lenec","malpa","ps??k","mandel??k","mandelinka","mandril","mangabej","mangalarga","mangusta","mantela","mara","maransky","maremmano","martin????","masa??ka","mastif","matamata","me??oun","me??ovka","medojed","medosavka","medovnice","medv??d","megaderma","mera","nah????","mihule","bulteri??r","minorky","mirikina","missouri fox trotter","mlo????k","mlok","mlyna????k","mn??k","mn????ek","mnohono??ka","mnohopil??k","modena","modenka","modr??sek","baset","gasko??","moloch","molovka","momot","monden","mops","mor????k","mor??e","morgan","mot??k","mot??lice","mot??l","moudivl????ek","moucha","mravencojed","mravenec","mravene??n??k","mravkolev","mrcho??rout","mro??","mr??n??k","m??enka","m??ice","mudi","muflon","muchnice","munt??ak","m????ice","mustang","my??","my????k","my??ice","my??ivka","my??ka","m??val","nahur","nandej","nandu","n??rtoun","narval","mastin","boxer","k??epel??k","pinc","??pic","neof??ma","neonka","nestor","nesytka","netop??r","netop??rek","new forest pony","???? forest pouny","nilgau","noh????","nonius","norek","kob","norn??k","lundehund","nos??l","nosat????k","nosatec","nosoro??ec","nosoro????k","novoz??landsk?? ??erven??","nutrie","nyala","obale??","ocelot","octomilka","ok????","okapi","oken????","okoun","okounek","olihe??","olingo","ondatra","opice","opi???? pin??","pin??","orangutan","oravky","orcela","orebice","orel","oribi","orl??k","orlosup","orlovec","orlovky","klus??k","orpingtonky","o??e??n??k","osel","osenice","osm??k","ostralka","ostroretka","ostruh????ek","ostruh??k","ostruhovn??k","ostrucha","ost??????","otak??rek","ouhorl??k","ouklej","ouklejka","outlo??","ov??d","ovce","ov??je??","pablatnice nosata","pa??olek","padu??nky","pagekon","p??chn??k","paint horse","pejnt hors","paje??t??rka","paje??ura","paka","pakudlanka","pak????","pali??atka","panc????n????ek","panda","paovce","papillon a phal??ne","papou??ek","papou??????ek","papuchalk","parma","parosni??ka","paruk????","paso fino","p??sovec","p??te??????ek","p??v","pavi??n","peja","pekari","pelik??n","p??nice","p??nkava","penkav??k","p??nod??jka","perepel","perle??ovec","perle??ovka","perli??ka","perl??n","perlorodka","perlovka","arab","p????ovka","pestrokrove??n??k","pestrok????dlec","pestru??ka","pest??enec","pest??enka","p??vec","p??vu??ka","p????alka","pika","pilatka","pilo??itka","pilous","pipa","pis??k","pisila","p??skomil","p??skorypka","pisko?? pruhovany","pi????ucha","pi??mo??","plame????k","plamenoskvrnka","plejtv??k","plejtv??kovec","plch","pl??skavice","plodomorka","plochojester","plochu??ka","makadlovka","ploskoh??betka","ploskorep","ploskoroh","ploskoroh","plotice obecna","pl????k","plymutka","podoustev nos??k","podoustev","nos??k","pointer","pokoutn??k","pol??k","poletucha","poletu??ka","poln??k","zelenono??ky","ogar","podengo","possum","po??tolka","po??vatka","pot??pka","pot??plice","pot??pn??k","potemn????ek","potemn??k","potkan","poto","pottok","pouzdrovn????ek","pralesni??ka","prase","divo????k","rejdi??","promyka","prskavec","p????stevn??k","p??edivka","p????moro??ec","psohlavec","psoun","pstruh","p??tros","ptakopysk","pt??k","pudl","pudlpointer","puch????n??k","puklice","puli","puma","pumi","pu??t??k","mastin","pyrura","pytlono??","racek","ragdoll","r??jovec","rak","r??kosn????ek","r??kosni??ka","r??kosn??k","raroh","ratufa","redkap","rehek","rejnok","rejsec","rejsek","rejskovec","ridgeback","rocky mountain","rodajlendka","roh????","roh????ek","rohatka","ropucha","ror??s","rosela","rosnice","rosni??ka","rosom??k","rotvajler","rum??nice","rus","ru??n??k","ryb??k","rybenka","r??honosec","rypo??","rypou??","rys","????man","sajga","salerno","sambar","sametka","samojed","saran??e","sasexky","satyr","scink","sebritky","sedmihl??sek","sek????","sekavec","sekavka","s??pie","serval","shiba","schi tzu","siamang","husky","sifaka maly","s??h","sitatunga","s????natka","siven","skal??ra","skaln??k","sk??lolez","skl??pkan","skokan","skorec","sk??ivan","skriv??nek","skunk","skvrnopasn??k","slav??k","slepec","slep????","sl??????k","sl??pka","slizoun","slon","sloughi","??uva??","kopov","slu??ka","sluka","slun????ko","slune??nice","slunka","smol??k","smrtn??k","smrtono??","sn??hule","sn????nice","sob","sobol","sojka","sojkovec","sokol","sorraia","sosnokaz","soumra??n??k","sova","sovice","sple????ule","srnec","srpice","srpok????dlec","srst??n","sr??e??","bulterier","stehl??k","stepnice","stepn??k","stepokur","stono??ka","straka","strak????","strakapoud","strnad","stromovnice","st??echatka","st??evle","st??evl????ek","st??evl??k","st????zl??k","stu??konoska","sulmt??lky","sult??nky","sumec","sume??ek","sup","surikata","sv??tlu??ka","svinka","svi??ucha","svi????","svi??n??k","s??c","s????ek","s??kora","s??ko??ice","sysel","??akal","??arpej","??eltie","????d??lko","????dlo","??impanz","??iperka","??irokohlavec","??keble","??kvor","barevnohl??vek","??oupalek","??pa??ek","galgo","??t??tcono??","??t??tinatec","??t??tkoun","??tika","??t??r","??t??rek","??t??tenka","??t??tono??","??t??tovec","brak????","??umavanky","??v??b","tadarida","tahr","tamar??n","kalimiko","tana","tangalunga","tangara","tap??r","tarb??k","tarb??komy??","taricha","tarpan","teju","tenkozobec","mimochodn??k","terej","tesa????k","tetra","tet??ev","tet????vek","tcho??","tcho????k","tilikva","tiplice","tirika","titi","tlamovec","tmavoskvrn????","toko","tomistoma","trava??ka","tricha","trnorep","kropenka","trub??nka","t????sn??nka","??uh??k","tui","tukan","tule??","tu????k","tuponosec","turako","ban??novec","angora","turpan","tygr","uakari","??ho??","up??r","urzon","??st??i??n??k","????ovka","va??ice","va????nek","vakokrt","vakomy??","vakono??","vakoplch","vakopl????k","vakorejsek","vakovec","vakoveverka","varan","vaza","v????ka","v??ela","v??elojed","vejco??rout","v??j????ovka","velbloud","vele??t??r","velevrub","velryba","velsumky","vel??korgi cardigan","vel??korgi kardigan","vel????pringr??pan??l","vel??teri??r","ve??","veverka","rejdi??","vidloroh","v??konos","vini","vipet","v??rn??k","viska??a","??in??ila","vla??ka","vla??tovka","vl??ek","vlha","vlk","vlnatka","vodomil","vodouch","vodou??","vodu??ka","bubl??k","volavka","vombat","vorva??","vorva??ovec","vosa","vos??k","vous??k","vrabec","vr??na","vranka","vranohl??vky","vr??penec","vrba??","vroubenka","vrtalka","vrubozubec","v??e????an","v??etenu??ka","v??enka","vydra","vydra??","vychuchol","v??r","v??re??ek","vyza","vzty??no??itka","w??ller","veler","pembroke","pembrouk","wyandotka","zaj??c","z??ke??nice","beran","lajka","zav??je??","z??vojnatka","zdobenec","zdobnatka","zebra","zedn????ek","zelenu??ka","zlat??nka","zlatohl??vek","zlatokrt","zlatoo??ka","retr??vr","zmije","znakoplavka","zobec","zoboro??ec","zorila","zrnokaz","zrzohl??vka","zubr","zvonek","zvonohl??k","??ahalka","??ako","??ebrovn??k","??elva","??enetka","??erzejst?? ob??i","??irafa","??ivorodka","??labatka","??luna","??lu????sek","??luva","??ralok"];
    
    function do_recognize() {
        /*if(!recognizing){
            console.log("starting ASR for test: ", test_idx);
            speechCloud.asr_recognize();
            recognizing = true;
        }*/
        
        switch(test_idx){
            case -1:
                
                handled_recog_min_1 = false;
                
                text_to_say = "Abyste se sezn??mili s fungov??n??m aplikace a z??rove?? si ov????ili V???? sluch, za??neme jednoduchou instrukc??. Budete opakovat tato trojcifern?? ????sla.";
                do_tts(text_to_say);

                //text_to_log = "Nejd????ve si vyzkou????me V???? sluch. Opakujte tato t??i trojcifern?? ????sla";
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
                
                text_to_say = "Nyn?? vid??te p??ed sebou obr??zek na b??ehu rybn??ka. Na obr??zku je n??kolik osob a d??je se tam cel?? ??ada ??innost??. Zkuste je nyn?? pros??m co nejv??ce popsat.";
                do_tts(text_to_say);

                text_to_log = "Nyn?? vid??te p??ed sebou obr??zek na b??ehu rybn??ka. <br> Na obr??zku je n??kolik osob a d??je se tam cel?? ??ada ??innost??. <br> Zkuste je nyn?? pros??m co nejv??ce popsat.";
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

                text_to_say = "Nyn?? budete m??t za ??kol vyjmenovat co NEJRYCHLEJI co NEJV??CE ZV????AT, tedy ??ivo??ich??, kte???? ??ij?? na sou??i, ve vod??, ve vzduchu nebo i hmyz. Prost?? jak??koliv zv????e, kter?? V??s napadne. Zkou??ka je na ??as, bu??te tedy co nejrychlej????. M??te na to p??l minuty. P??ipravte se a za????n??me. Te??!";
                do_tts(text_to_say);
                text_to_log = "Nyn?? budete m??t za ??kol vyjmenovat co NEJRYCHLEJI co NEJV??CE ZV????AT, <br> tedy ??ivo??ich??, kte???? ??ij?? na sou??i, ve vod??, ve vzduchu nebo i hmyz. <br> Prost?? jak??koliv zv????e, kter?? V??s napadne. <br> Zkou??ka je na ??as, bu??te tedy co nejrychlej????. M??te na to p??l minuty. P??ipravte se a za????n??me. <br> Te??!";
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
                    
                text_to_say = "D??kujeme, to jsou v??echny ??koly, kter?? jsme pro v??s m??li p??ipraven??. Dobr?? pr??ce.";
                    
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
                text_to_say = "D??kujeme, te?? budeme pokra??ovat dal????m ??kolem.";
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
                text_to_say = "D??kujeme, te?? budeme pokra??ovat dal????m ??kolem.";
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
     /* Obsluha tla????tka Pokracovat */
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

    /* Obsluha tla????tka Dal???? ????slo */
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
                log("Opakujte pr??v?? sly??en?? ????slo")
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
    /* Synt??za ??e??i */
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
    