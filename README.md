# TetkoApp

Tetkó időpont foglalós webapp
Ha valami probléma vagy kérdés lenne akkor dc-n tudsz elérni: Archer#2718

## Funkciók

* Regiszrálás sima userként vagy művészként. Ha művészként regisztrálsz akkor lehetőség van arra hogy képeket tölts fel a saját profilodhoz. Annyit kell csak tenni hogy rákattintasz a saját profilodon lévő kép "blokkokra". (Légyszi képeket only mert nincs lekezelve a file formátum típusa :c)

* Sima userként időpontfoglalás különböző művészeknél. Művészként pedig időpont hirdetés.

* A gyenge frontend skilljeim miatt nem biztos hogy logikus de a navbárban ha rákattintasz a nevedre ott jelennek meg az adatok illetve az időpontok. Illetve művészként az Edit details-ben tudod a saját profilodhoz a leírást megadni.


## Localhost-fix

Ha leklónozod a repót és megpróbálod ng serve-l futtatni akkor először hibát fog dobni az interfaces.ts-re. Az interfaces-fix.txt tartalmát kell csak kicserélni rá és akkor lefog futni hiba mentesen remélhetőleg. Valamint lokálisan nyílván nem fog működni a cucc mert kiszedtem az enviroments.ts-ből a firebases cuccokkat szóval csak az url-tudod tesztelni. 
