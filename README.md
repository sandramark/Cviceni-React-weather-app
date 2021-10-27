# Aplikace na zobrazení počasí 
V tomto úkolu si vytvoříme aplikaci, která nám zobrazí aktuální počasí a předpověď na pět dní ve vybraném místě. Finální aplikace bude vypadat nějak takto:  
     
<img src="ReadmeImages/weather_app_result.png"/>

## API
K získání dat o počasí budeme používat API zdarma z [open weather map](https://openweathermap.org/api).
K použití daného API je potřeba se zaregistrovat, a tak získat unikátní id, které budeš zadávát při volání. Zaregistruj se tedy na stránce a vyčkej, až ti přijde e-mail s potvrzením. V emailu uvidíš své API id a také URL endpoint, který je potřeba použít při získávání dat. API id si můžeš také zjistit ve svém profilu na stránce OpenWeather, kde si můžeš zakládat i další id. Měj na paměti, že aktivace klíče po registraci může trvat několik hodin. Mezitím velice doporučuji podívat se na [dokumentaci OpenWeather](https://openweathermap.org/current) a pročíst si v jakém formátu ti data přijdou. 
     
<img src="ReadmeImages/open_weather_api_email.jpg"/>

## Spuštění a struktura aplikace

Udělej si fork tohoto repozitáře a tento fork si naklonuj k sobě. Vše nainstaluješ pomocí spuštění příkazu 
### `npm install`    
Po nainstalování spusť aplikaci pomocí 
### `npm start`
Měla bys vidět toto:     
     
<img src="ReadmeImages/weather_app_starter.jpg"/>

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
Výsledek fetche si vypiš do konzole. 

### Nastavení .env 
Pokud si aplikaci v tomto stavu commitneš na github, přijde ti za chvíli e-mail o tom, že je nebezpečné ukládat API id do github repozitáře, kde je může kdokoli vidět a zneužít. Proto budeme muset zajistit, abys měla id uložené pouze u sebe. Toto se dělá za použití tzv. [Environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables/).    
1. V základní složce souboru (**ne v src, o jednu složku výš!**) si vytvoř soubor s názvem `.env`
1. V tomto souboru si své id ulož jako `REACT_APP_MY_API_ID="xxxxxxxxxxx"`, kde xxx je tvé id. Můžeš si ho pojmenovat jak chceš, ale je vždy potřeba začít REACT_APP. 
1. Dále si tento soubor .env přidej do .gitignore, aby se soubor nenahrál na github.
```
#api keys
.env
```
4. Kde budeš id potřebovat, stačí si ho získat pomocí `process.env.REACT_APP_MY_API_ID` a uložit si ho do proměnné, kterou potom použiješ v API URL. 

## State management 

V každé aplikaci je potřeba někde schraňovat data, která se na frontendu zobrazují. Pokud je aplikace větší, používají se na toto složitější nástroje, jako [Redux](https://redux.js.org/introduction/core-concepts), nebo [Recoil](https://recoiljs.org/docs/introduction/core-concepts). Dalším způsobem je použití [React Context](https://reactjs.org/docs/context.html). Více informací o možnostech state managementu najdeš [v článku.](https://dev.to/workshub/state-management-battle-in-react-2021-hooks-redux-and-recoil-2am0)      
Jelikož je naše aplikace malá, postačí použití lokálního stavu, tedy použití hooku [useState](https://reactjs.org/docs/hooks-state.html). 
V `App.js` si vytvoř stav, do kterého budeš ukládat data získáná z API. Vhodně si ho nazvi, třeba `weather` nebo `currentWeather`. 
Místo vypisování do konzole teď budeš nastavovat získaná data do stavu. K tomu budeš buď muset vytvářet fetch až ve funcki App, abys mohla použít funcki `setState` (`setWeather`, podle toho jak si ji pojmenuješ), a nebo posílat do funkce, kde fetchuješ data jeden parametr, a tím bude právě funkce `setWeather`. Na zavolání fetche při načtení aplikace použij `useEffect` hook. 

## Zobrazení dat 
Při správném postupu kroků bys měla teď mít ve stavu uložený objekt, který má takový formát:     

<img src="ReadmeImages/current_weather_data.jpg"/>     

Na obrázku jsou vyznačené hodnoty, které budeš zobrazovat v daných elementech obsahu `weather__current`. Jak vidíš, ne všechny hodnoty se dají rovnou použít, je potřeba si je muset trochu upravit.     


#### Teplota 
Teplota získáš s přesností na desetiny stupně. Zaokrouhli ji na celá čísla, můžeš k tomu použít třeba [Math.round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round).  
#### Ikona 
V klíči icon, vidíš pouze kód ikony (např. `"01d"`), který je potřeba použít v URL z [dokumentace openWeather](https://openweathermap.org/weather-conditions). Toto url potom použij v src ikony      
#### Čas východu a západu slunce
Východ a západ slunce je takové zvláštní dlouhé číslo. Je to [Unix Time Stamp](https://www.unixtimestamp.com/), tedy čas ve vteřinách, který uběhl od 1.1.1970.           
1. K převedení na hodiny a minuty budeš potřebovat použít javascriptový object [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). Podrobnější návod na převod unix časové značky na čas je třeba v [tomto článku](https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript). 
1. Pro zobrazení minut ve dvouciferném formátu můžeš použít funkci [padStart](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart) - pozor, funguje jen na řetězcích!
          Kdybsis s funkcí vůbec nevěděla rady, tak v dropdownu je jedno z možných řešení. Ale zkus to nejdřív sama! ;) 
          <details>
          <summary>Už jsem to zkusila, chci se podívat.</summary>
          <br>
                    Jsi si určitě jistá, nechceš se na to ještě podívat? A co se inspirovat nějakým [řešením tady](https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript)? 
          <details>
          <summary>Ani tohle nepomohlo.</summary>
          <br>
          Super, že jsi to alespoň zkusila :) Pamatuj, že toto je pouze jedno v mnoha možných řešení ;) 
               <pre><code>
                    const getTimefromUnix = (unix) => {
                         const hours = new Date(unix * 1000).getHours();
                         const minutes = new Date(unix * 1000).getMinutes();
                         const twoDigitMinutes = minutes.toString().padStart(2, "0");
                           return `${hours}:${twoDigitMinutes}`;
                        };
               </code></pre>
          </details>
      </details>
          
    
