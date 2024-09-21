# APKdash

## Inhoudsopgave

- [Inleiding](#item-one)
- [Benodigdheden](#item-two)
- [De applicatie draaien](#item-three)
- [Testaccount](#item-four)

<a id="item-one"></a>

## Inleiding

Met APKdash kan je voortaan op een snelle en overzichtelijke manier jouw voertuigadministratie bijhouden. Het rijden met
een verlopen APK levert een boete op van 169 euro. Met deze applicatie heb je de uiterlijke keurdata van jouw wagenpark
overal beschikbaar en zijn boetes verleden tijd. Als ingelogde gebruiker kan je op basis van het ingevoerde kenteken de
volgende
voertuiggegevens ophalen: merk, model, bouwjaar en APK-vervaldatum. De gegevens kan je makkelijk in een tabel weergeven.
De voertuiggegevens zijn betrouwbaar omdat ze afkomstig zijn van de RDW (Rijksdienst voor het Wegverkeer).

![screenshot](src/assets/screenshot.png)

<a id="item-two"></a>

## Benodigdheden
APKdash draait op React versie 18 en voor het runnen van npm-commando's moet Node.js geinstalleerd zijn, npm is de standaard pakketbeheerder voor de JavaScript-runtime-omgeving Node.js,
daarnaast maakt de applicatie gebruik van een aantal 'dependencies' zoals Axios, voor het binnenhalen van API-data. De jwt-decode is een handige tool voor het ontcijferen van de JWT-token. De applicatie draait
op drie externe informatiebronnen. De eerste informatiebron is de database met gebruikers, de tweede informatiebron is
de database met voertuiggegevens van Nederland en de derde informatiebron is de database met voertuigfoto's. 
Voor het werkend krijgen van de applicatie moet er een env. bestand aangemaakt worden en dit bestand moet gevuld worden 
met de variabel-namen zoals beschreven in de env.dist. map. Na het aanmaken van de API keys moet er een build gedraaid 
worden door de commando npm run build in de terminal te runnen. 



<a id="item-three"></a>
## De applicatie draaien

https://github.com/AyoubNL/Eindopdracht-Frontend

1. Clone bovenstaande Github-project op eigen computer
2. Installeer eerst de `node_modules` door commando `npm install` te runnen in de terminal
3. Applicatie starten door `npm run dev` te runnen in de terminal
4. Klik op de [http://localhost:xxxx](http://localhost:xxxx/) link om de pagina in de browser te bekijken

<a id="item-four"></a>
## Testaccount

Garage Speedy   
Welkom2024!



