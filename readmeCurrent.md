#Readme fil för MS DOS

## För att lägga upp filer på git

Tror man kan göra detta på hemsidan direkt och bara dra in filerna

Annars om du tex har filen på dit skrivbord med namn __file1.txt__
Om du vill att denna filen ska upp på repot gör du följande:
Viktigt där de stpr ... ä rom det är en map inne i mappen som man vill lägga in i så skriver ni in namnet på den mapen.
```
cd ~/Desktop
cp file1.txt ~/IdeaProjects/MSDOS/...

git add .
git commit -m "Commitmessage (skriv in vad ni vill)"
git push
```
Skriv sedan ert git-användarnamn och git lösenord så som terminalen ber er att göra
Efter det så finns filen på repot

### Skaffa git
* Gör ett konto
* Installera git på din dator
	* Om du har mac eller linux har det från början? Testa med commandot i terminalen
			
			git --version
			
	* Windows har jag fan ingen aning(kolla up)

### För att få hem repot på din dator
Kolla i ditt hembiblotek hur ni har de uppbyggt. Vanligast är att man har en mapp __IdeaProjects__ i sitt hembiblotek. Om inte så skapa en sådan mapp.

```
cd ~/
mkdir IdeaProjects
```
Gå till denna mappen

```
cd ~/IdeaProjects
```
Ta sedan hem repot genom att klistra in detta

```
git clone https://github.com/0x3D/MSDOS.git
```
Nu ska ni ha repot i denna mappen


### [ Länk för att förstå hur det fungerar](https://learngitbranching.js.org/ )

___

# Installera allt som behövs

* VSCode : [Länk til nedladdningssida](https://code.visualstudio.com/download)

* Installera node.js : [Länk till nedaddningssida av Node](https://nodejs.org/en/i)

___

Nu ska det bara vara att öppna vs-code och kunna använda npm i terminalen

