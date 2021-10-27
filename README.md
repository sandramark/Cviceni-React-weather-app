# Aplikace na zobrazení počasí 
V tomto úkolu si vytvoříme aplikaci, která nám zobrazí aktuální počasí a předpověď na pět dní ve vybraném místě. Finální aplikace bude vypadat takto:  
     
<img src="ReadmeImages/weather_app_result.png"/>

## API
K získání dat o počasí budeme používat API zdarma z [open weather map](https://openweathermap.org/api).
K použití daného API je potřeba se zaregistrovat, a získat tak unikátní ID, které budeš zadávát v URL API. Zaregistruj se tedy na stránce a počkej, až ti přijde e-mail s potvrzením. V emailu uvidíš své API ID a také URL endpoint, který je potřeba použít při získávání dat. API ID si můžeš také zjistit ve svém profilu na stránce OpenWeather, kde si můžeš zakládat i další ID. Měj na paměti, že aktivace klíče po registraci může trvat několik hodin. Mezitím velice doporučuji podívat se na [dokumentaci OpenWeather](https://openweathermap.org/current) a pročíst si v jakém formátu ti data přijdou. 
     
<img src="ReadmeImages/open_weather_api_email.jpg"/>

## Spuštění a struktura aplikace

Udělej si fork tohoto repozitáře a tento fork si naklonuj k sobě. Vše nainstaluješ pomocí spuštění příkazu 
#### `npm install`    
Po nainstalování spusť aplikaci pomocí 
#### `npm start`
Měla bys vidět toto:     
     
<img src="ReadmeImages/weather_app_starter.jpg"/>

Hlavní html a css je pro tebe už připravené. Prohlédni si obsah složky `src`.     
V souboru `index.js` probíhá renderování aplikace, není sem potřeba nic přidávat, ani upravovat. V `index.css` je globální stylování, všimni si, že pro základní barvy a styly jsou vytvořené proměnné, které se pak používají skrz celou aplikaci. Kdybychom třeba chtěli změnit barevnou paletu, stačí upravit barvy tady a není potřeba procházet css celé aplikace.      
V souboru `App.js` je připravený základní obsah aplikace. Nějaký obsah je zakomentovaný, aby se nám aplikace zkompilovala. V `App.css` je pak připravené stylování. 

## Data 

Abychom mohli v aplikaci zobrazovat informace o počasí, potřebujeme nejdřív data stáhnout.   
Jelikož data z OpenWeather jsou v angličtině, a dotazy je potřeba také dělat v angličtině, naše aplikace je také v AJ, aby to nebyl takový mišmaš. 
V `App.js` si napiš fetch funkci, ve které použiješ URL a API ID z emailu, který ti došel. Vyber si nějaké město, jehož data budeš na začátek stahovat, než přidáme možnost město měnit.     
Je možné, že základní teplota, kterou open weather posílá bude v kelvinech, v takovém případě přidej do URL parameter `units=metric`. 
Tvoje API URL by mohlo vypadat nějak takhle:       
`api.openweathermap.org/data/2.5/weather?q=Prague&units=metric&appid={tve unikatni API ID}`     
Funkci potom zavoláš v useEffectu, při prvním vyrenderování komponenty App. `App.js` bude vypadat nějak takto: 
```js
import React, { useEffect } from "react";
import "./App.css";

const App = () => {
  const fetchWeather = () => {
    fetch(
       // TVUJ KOD
    )
  }
  
  useEffect(() => {
    fetchWeather();
  }, []);
  
  return (
    <div className="App">...</div>
    )
  }
```
Získaná data si vypiš do konzole. 
Na zdroje pro tvoření funkce, kde se fetchují data z API se můžeš podívat [tady](https://www.pluralsight.com/guides/fetching-data-updating-state-hooks) a [tady](https://blog.bitsrc.io/fetching-data-in-react-using-hooks-c6fdd71cb24a)


### Nastavení .env 
Pokud si aplikaci v tomto stavu commitneš na github, přijde ti za chvíli e-mail o tom, že je nebezpečné ukládat API ID do github repozitáře, kde je může kdokoli vidět a zneužít. Proto budeme muset zajistit, abys měla ID uložené pouze u sebe. Toto se dělá za použití tzv. [Environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables/).    
1. V základní složce souboru (**ne v src, o jednu složku výš!**) si vytvoř soubor s názvem `.env`
1. V tomto souboru si své ID ulož jako `REACT_APP_MY_API_ID="xxxxxxxxxxx"`, kde xxx je tvé ID. Můžeš si ho pojmenovat jak chceš, ale je vždy potřeba začít REACT_APP. 
1. Dále si tento soubor .env přidej do .gitignore, aby se soubor nenahrál na github.
```js
#api keys
.env
```
4. Kde budeš ID potřebovat, stačí si ho získat pomocí `process.env.REACT_APP_MY_API_ID` a uložit si ho do proměnné, kterou potom použiješ v API URL. 

## State management 

V každé aplikaci je potřeba někde schraňovat data, která se na frontendu zobrazují. Pokud je aplikace větší, používají se na toto složitější nástroje, jako [Redux](https://redux.js.org/introduction/core-concepts), nebo [Recoil](https://recoiljs.org/docs/introduction/core-concepts). Další možností je použití [React Context](https://reactjs.org/docs/context.html). Více informací o možnostech state managementu najdeš [v článku.](https://dev.to/workshub/state-management-battle-in-react-2021-hooks-redux-and-recoil-2am0)      
Jelikož je naše aplikace malá, postačí použití lokálního stavu, tedy použití hooku [useState](https://reactjs.org/docs/hooks-state.html). 
V `App.js` si vytvoř stav, do kterého budeš ukládat data získáná z API. Vhodně si ho nazvi, třeba `weather` a funkci na změnu stavu `setWeather`. Jako defaultní hodnotu použij `null`.
Místo vypisování do konzole teď budeš nastavovat získaná data do stavu za použití funkce `setWeather`. 

## Zobrazení dat 
Při správném postupu kroků bys měla teď mít ve stavu uložený objekt, který má takový formát:     

<img src="ReadmeImages/current_weather_data.jpg"/>     

Na obrázku jsou vyznačené hodnoty, které budeš zobrazovat v elementech uvnitř `div.weather__current`. Jak vidíš, některé hodnoty je potřeba před použitím trochu upravit.     


#### Teplota 
Teplotu získáš s přesností na desetiny stupně. Zaokrouhli ji na celá čísla, můžeš k tomu použít třeba [Math.round](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round).  
#### Ikona 
V klíči icon, vidíš pouze kód ikony (např. `"01d"`), který je potřeba použít v URL z [dokumentace openWeather](https://openweathermap.org/weather-conditions). Toto url potom použij v src ikony stylem     
```js
<img src={`http://openweathermap.org/img/wn/${KOD_IKONY}@2x.png`} />
```
#### Čas východu a západu slunce
Východ a západ slunce je takové zvláštní dlouhé číslo. Je to [Unix Time Stamp](https://www.unixtimestamp.com/), tedy čas ve vteřinách, který uběhl od 1.1.1970. Budeš si muset vytvořit vlastní funkci, která si jako parametr vezme toto číslo a vrátí nám string v potřebném formátu, tedy např `"17:05"` nebo `"8:10"`.           
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
      
### Podmíněné zobrazování 
Pokud se ti správně podařilo hodnoty upravit, nic nebrání tomu je zobrazit v naší aplikaci, že?     
Ale co to? Při spuštění nastane error, který nám říká, že nelze číst hodnoty z našeho stavu!     
Důvod je ten, že se data chtějí vykreslovat při spuštění aplikace, kdy je stav nastaven na `null`. Teprve až po získání dat z API, které chvilku trvá, se stav nastaví na potřebný objekt.     
Chceme tedy zobrazit obsah divu s třídou `weather__current` pouze v případě, že data máme. K tomu můžeme použít ternární operátor. 
Bude v tomto formátu: Pokud stav není `null` nebo `undefined`, zobraz `div.weather__current` a jeho obsah, v opačném případě nezobrazuj nic (`null`).
#### Komponenta
Pro lepší přehlednost přesuň celý `div.weather__current` a jeho obsah do samostatné komponenty (programujeme přece v Reactu ;)). Komponenta bude brát jednu prop, a to objekt s počasím, který pak použiješ na zobrazení dat. Nezapomeň na přesunutí stylů a funkcí, která upravují data.     
Komponentu si naimportuj do `App.js`, použij na správném místě a pošli stav `weather` jako prop.  
Pokud chceš, můžeš si vytvořit i komponentu s obsahem `"Loading..."`, nebo se spinnerem, která se zobrazí před načtením dat.   
#### Změna barvy pozadí 
U divu s třídou `weather__current` přidej podmíněně `třídu weather__current--cold`, pouze pokud je teplota nižší než 10 stupňů. 

## Přidání dalších měst 
Skvělá práce! Podařilo se nám stáhnout informace o počasí v určitém městě a zobrazit je v naší aplikaci nastylované a v určitém formátu!    
Chtělo by to ale přidat více možnosti, že? V tomto kroku si do aplikace přidáme další stav pro změnu města a tlačítka na zobrazení počasí na třech různých místech. 
#### Nový stav 
Vytvoř si nový stav s vhodným názvem (např. `city`) a ulož do něj jako řetězec název svého města, pro které sis teď stahovala data. Tímto stavem potom nahraď ve fetchi v URL město, které máš teď "natvrdo" napsáno     
(např. api.openweathermap.org/data/2.5/weather?q=**Prague**&appid={tve unikatni API ID}).        
Stav `city` si budeš muset poslat jako parametr do funkce, kde probíhá fetch, abys ho mohla v URL použít. 

#### Změna stavu
Stav `city` budeme měnit kliknutím na tlačítka, která pro tento účel máš v HTML připravená a zakomentovaná. Odkomentuj si `div.button-group` s třemi tlačítky. 
Vyber si tři města (anglické názvy, např "Prague", "Reykjavik", "Tenerife"), která napíšeš na tlačítka. Při kliku na tlačítko změň stav na toto město.    
Funkci, která se zavolá na klik si můžeš vytvořit zvlášť a pojmenovat ji `handleButtonClick`. Funkce bude brát jeden parametr, a ten potom nastaví do stavu `city`.
Pozor, abys na onClick funkci pouze předávala a nevolala ji! Předávat funkci s parametrem můžeš pomocí anonymní fuknce:     
`<button onClick={() => handleButtonClick(someValue)}> ... </button>`

             
Teď by se zdálo, že pokud používáme změníme stav, změní se i data, která pomocí stavu získáváme. Zatím se to ale neděje.    
Je to proto, že fetch voláme pouze při spuštění aplikace. Aby se data načetla pokaždé, když změníme stav `city`, musíme tento `city` poslat jako [závislost](https://www.benmvp.com/blog/object-array-dependencies-react-useEffect-hook/) do useEffectu. 

## Předpověď na pět dní 
Už dokážeme získat aktuální počasí na různých místech, teď ještě zobrazíme předpověď na následujících 5 dní.      
Vytvoř si další funkci, kde budeš fetchovat data z OpenWeather. [V dokumentaci najdeš potřebné URL](https://openweathermap.org/forecast5).     
Jako město opět použij `city`, které máš uložené ve stavu. Předej ho do funkce jako parametr.     
Nejdříve si data vypiš do konzole. 
Předpověď na 5 dní je uváděná po 3 hodinách. Každý den 8 předpovědí, 5 x 8 = 40! V datech získáme tedy pole o 40 položkách s údaji o počasí. 

<img src="ReadmeImages/fetch_forecast_object.jpg"/>   

Nám ale stačí pouze jedna předpověď na den, tedy každá osmá. Vytvoř si funkci, která jako parametr bere pole a vrátí nové pole, které bude obsahovat pouze každou 8. položku. Hodit se ti možná bude funkce [filter](https://flexiple.com/javascript-filter-array/). Ale jde to i bez ní :) 
 <details>
          <summary>Zkouším horem dolem a nejde to, chci nápovědu.</summary>
          <br>
               Můžeš filtrovat ne jen podle samotných položek, ale také podle indexu, na kterém se položka nachází. 
               `array.filter((item, index) => ... ); `     
               item se někdy nahrazuje pouze podtržítkem, pokud se nepoužívá.
          <details>
          <summary>Stále netuším :(</summary>
          <br>
          Tak je fajn, že jsi to alespoň zkusila a něco nového se naučila! Pamatuj, že toto je pouze jedno v mnoha možných řešení ;) 
               <pre><code>
     const filterForecast = (array) => {
          return array.filter((_, index) => index % 8 === 0);
     };
               </code></pre>
          </details>
      </details>


#### Komponenta
Přesuň tlačítko do samostatné komponenty, která bude brát dvě prop, název města a funkci, která se vykoná na kliknutí. Prop s názvem města použij při nastavení textu tlačítka, funkci při kliku. (Přesuň i styly z `App.css`).
Pokud bys tápala, jak předat funkci, která mění stav, jako prop, mrkni na [tenhle článek](https://newbedev.com/react-how-to-pass-function-as-props-from-functional-parent-component-to-child).   
Komponentu si naimportuj do `App.js`. Vytvoř si pole o třech položkách (názvy měst) a pole namapuj za použití komponenty. 




    
