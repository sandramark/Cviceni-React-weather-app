# Aplikace na zobrazení počasí 
V tomto úkolu si vytvoříme aplikaci, která nám zobrazí aktuální počasí a předpověď na pět dní ve vybraném místě. Finální aplikace bude vypadat nějak takto:  
     
<img src="ReadmeImages/weather_app_result.png" height="600px"/>

## API
K získání dat o počasí budeme používat API zdarma z [open weather map](https://openweathermap.org/api).
K použití daného API je potřeba se zaregistrovat, a tak získat unikátní id, které budeš zadávát při volání. Zaregistruj se tedy na stránce a vyčkej, až ti přijde e-mail s potvrzením. V emailu uvidíš své API id a také URL endpoint, který je potřeba použít při získávání dat. API id si můžeš také zjistit ve svém profilu na stránce OpenWeather, kde si můžeš zakládat i další id. Měj na paměti, že aktivace klíče po registraci může trvat několik hodin. Mezitím velice doporučuji podívat se na [dokumentaci OpenWeather](https://openweathermap.org/current) a pročíst si v jakém formátu ti data přijdou. 
     
<img src="ReadmeImages/open_weather_api_email.jpg" height="700px"/>

## Spuštění a struktura aplikace

Udělej si fork tohoto repozitáře a tento fork si naklonuj k sobě. Vše nainstaluješ pomocí spuštění příkazu 
### `npm install`    
Po nainstalování spusť aplikaci pomocí 
### `npm start`
Měla bys vidět toto:     
     
<img src="ReadmeImages/weather_app_starter.jpg" height="500px"/>

Hlavní html a css je pro tebe už připravené. Prohlédni si obsah složky `src`.     
V souboru `index.js` probíhá renderování aplikace. V `index.css` je globální stylování, všimni si, že pro základní barvy a styly jsou vytvořené proměnné, které se pak používají skrz celou aplikaci. Toto je dobrý způsob, protože kdybychom třeba chtěli změnit barevnou paletu, stačí upravit barvy tady a není potřeba procházet css celé aplikace.      
V souboru `App.js` je připravený základní obsah aplikace. Nějaký obsah je zakomentovaný, aby se nám aplikace zkompilovala. V `App.css` je pak připravené stylování pro celou aplikaci. 

## Data 

Abychom mohli v aplikaci zobrazovat data o počasí, potřebujeme nejdřív data stáhnout.   
Jelikož data z OpenWeather jsou v angličtině, a dotazy je potřeba také dělat v angličtině, naše aplikace je také v AJ, aby to nebyl takový mišmaš. 
V App.js si napiš fetch funkci, ve které použiješ URL a API ID z emailu, který ti došel. Vyber si nějaké město, jehož data budeš na začátek stahovat, než přidáme možnost město měnit.     
Je možné, že základní teplota, kterou open weather posílá bude v kelvinech, v takovém případě přidej do URL parameter `units=metric`. 
Tvoje API url by mohlo vypadat nějak takhle: 
`api.openweathermap.org/data/2.5/weather?q=Prague&units=metric&appid={tve unikatni API ID}`
