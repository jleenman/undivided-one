export type ScriptureLocale = 'nl' | 'en'

const SCRIPTURE_TEXTS: Record<ScriptureLocale, Record<string, string>> = {
  nl: {
    '1 john 5:7': '7. Want Drie zijn er, Die getuigen in den hemel, de Vader, het Woord en de Heilige Geest; en deze Drie zijn Een.',
    '1 john 5:7-8': '7. Want Drie zijn er, Die getuigen in den hemel, de Vader, het Woord en de Heilige Geest; en deze Drie zijn Een. 8. En drie zijn er, die getuigen op de aarde, de Geest, en het water, en het bloed; en die drie zijn tot een.',
    '1 kings 8:29': '29. Dat Uw ogen open zijn, nacht en dag, over dit huis, over deze plaats, van dewelke Gij gezegd hebt: Mijn Naam zal daar zijn; om te horen naar het gebed, hetwelk Uw knecht bidden zal in deze plaats.',
    '1 timothy 2:5': '5. Want er is een God, er is ook een Middelaar Gods en der mensen, de Mens Christus Jezus;',
    '2 corinthians 11:4': '4. Want indien degene, die komt, een anderen Jezus predikte, dien wij niet gepredikt hebben, of indien gij een anderen geest ontvingt, dien gij niet hebt ontvangen, of een ander Evangelie, dat gij niet hebt aangenomen, zo verdroegt gij hem met recht.',
    '2 corinthians 5:19': '19. Want God was in Christus de wereld met Zichzelven verzoenende, hun zonden hun niet toerekenende; en heeft het woord der verzoening in ons gelegd.',
    'colossians 1:27': '27. Aan wie God heeft willen bekend maken, welke zij de rijkdom der heerlijkheid dezer verborgenheid onder de heidenen, welke is Christus onder u, de Hoop der heerlijkheid;',
    'deuteronomy 6:4': '4. Hoor, Israel! de HEERE, onze God, is een enig HEERE!',
    'exodus 23:21': '21. Hoedt u voor Zijn aangezicht, en weest Zijner stem gehoorzaam, en verbittert Hem niet; want Hij zal ulieder overtredingen niet vergeven; want Mijn Naam is in het binnenste van Hem.',
    'exodus 24:10': '10. En zij zagen den God van Israel, en onder Zijn voeten als een werk van saffierstenen, en als de gestaltenis des hemels in Zijn klaarheid.',
    'exodus 33:20': '20. Hij zeide verder: Gij zoudt Mijn aangezicht niet kunnen zien; want Mij zal geen mens zien, en leven.',
    'exodus 3:14': '14. En God zeide tot Mozes: Ik ZAL ZIJN,, Die Ik ZIJN ZAL! Ook zeide Hij: Alzo zult gij tot de kinderen Israels zeggen: Ik ZAL ZIJN heeft mij tot ulieden gezonden!',
    'galatians 5:16-25': '16. En ik zeg: Wandelt door den Geest en volbrengt de begeerlijkheden des vleses niet. 17. Want het vlees begeert tegen den Geest, en de Geest tegen het vlees; en deze staan tegen elkander, alzo dat gij niet doet, hetgeen gij wildet. 18. Maar indien gij door den Geest geleid wordt, zo zijt gij niet onder de wet. 19. De werken des vleses nu zijn openbaar; welke zijn overspel, hoererij, onreinigheid, ontuchtigheid, 20. Afgoderij, venijngeving, vijandschappen, twisten, afgunstigheden, toorn, gekijf, tweedracht, ketterijen, 21. Nijd, moord, dronkenschappen, brasserijen, en dergelijke; van dewelke ik u te voren zeg, gelijk ik ook te voren gezegd heb, dat die zulke dingen doen, het Koninkrijk Gods niet zullen beerven. 22. Maar de vrucht des Geestes is liefde, blijdschap, vrede, lankmoedigheid, goedertierenheid, goedheid, geloof, zachtmoedigheid, matigheid. 23. Tegen de zodanigen is de wet niet. 24. Maar die van Christus zijn, hebben het vlees gekruist met de bewegingen en begeerlijkheden. 25. Indien wij door den Geest leven, zo laat ons ook door den Geest wandelen.',
    'genesis 32:30': '30. En Jakob noemde den naam dier plaats Pniel: Want, zeide hij, ik heb God gezien van aangezicht tot aangezicht, en mijn ziel is gered geweest.',
    'genesis 6:6': '6. Toen berouwde het de HEERE, dat Hij den mens op de aarde gemaakt had, en het smartte Hem aan Zijn hart.',
    'hebrews 12:24': '24. En tot den Middelaar des nieuwen testaments, Jezus, en het bloed der besprenging, dat betere dingen spreekt dan Abel.',
    'hebrews 2:14-17': '14. Overmits dan de kinderen des vleses en bloeds deelachtig zijn, zo is Hij ook desgelijks derzelve deelachtig geworden, opdat Hij door den dood te niet doen zou dengene, die het geweld des doods had, dat is, den duivel; 15. En verlossen zou al degenen, die met vreze des doods, door al hun leven, der dienstbaarheid onderworpen waren. 16. Want waarlijk, Hij neemt de engelen niet aan, maar Hij neemt het zaad Abrahams aan. 17. Waarom Hij in alles den broederen moest gelijk worden, opdat Hij een barmhartig en een getrouw Hogepriester zou zijn, in de dingen, die bij God te doen waren, om de zonden des volks te verzoenen.',
    'hebrews 4:15': '15. Want wij hebben geen hogepriester, die niet kan medelijden hebben met onze zwakheden, maar Die in alle dingen, gelijk als wij, is verzocht geweest, doch zonder zonde.',
    'hebrews 5:8': '8. Hoewel Hij de Zoon was, nochtans gehoorzaamheid geleerd heeft, uit hetgeen Hij heeft geleden.',
    'hebrews 8:6': '6. En nu heeft Hij zoveel uitnemender bediening gekregen, als Hij ook eens beteren verbonds Middelaar is, hetwelk in betere beloftenissen bevestigd is.',
    'hebrews 9:15': '15. En daarom is Hij de Middelaar des nieuwen testaments, opdat, de dood daartussen gekomen zijnde, tot verzoening der overtredingen, die onder het eerste testament waren, degenen, die geroepen zijn, de beloftenis der eeuwige erve ontvangen zouden.',
    'isaiah 43:10': '10. Gijlieden zijt Mijn getuigen, spreekt de HEERE, en Mijn knecht, dien Ik uitverkoren heb; opdat gij het weet, en Mij gelooft, en verstaat, dat Ik Dezelve ben, dat voor Mij geen God geformeerd is, en na Mij geen zijn zal.',
    'isaiah 46:4': '4. En tot de ouderdom toe zal Ik Dezelfde zijn, ja, tot de grijsheid toe zal Ik ulieden dragen; Ik heb het gedaan, en Ik zal u opnemen, en Ik zal dragen en redden.',
    'john 10:30': '30. Ik en de Vader zijn een.',
    'john 10:33': '33. De Joden antwoordden Hem, zeggende: Wij stenigen U niet over enig goed werk, maar over gods lastering, en omdat Gij, een Mens zijnde, Uzelven God maakt.',
    'john 14:8': '8. Filippus zeide tot Hem: Heere, toon ons den Vader, en het is ons genoeg.',
    'john 14:9': '9. Jezus zeide tot hem: Ben Ik zo langen tijd met ulieden, en hebt gij Mij niet gekend, Filippus? Die Mij gezien heeft, die heeft den Vader gezien; en hoe zegt gij: Toon ons den Vader?',
    'john 17:3': '3. En dit is het eeuwige leven, dat zij U kennen, den enigen waarachtigen God, en Jezus Christus, Dien Gij gezonden hebt.',
    'john 1:1': '1. In den beginne was het Woord, en het Woord was bij God, en het Woord was God.',
    'john 1:14': '14. En het Woord is vlees geworden, en heeft onder ons gewoond (en wij hebben Zijn heerlijkheid aanschouwd, een heerlijkheid als des Eniggeborenen van den Vader), vol van genade en waarheid.',
    'john 8:58': '58. Jezus zeide tot hen: Voorwaar, voorwaar zeg Ik u: Eer Abraham was, ben Ik.',
    'jude 1:5': '5. Maar ik wil u indachtig maken, als die dit eenmaal weet, dat de Heere, het volk uit Egypteland verlost hebbende, wederom degenen, die niet geloofden, verdorven heeft.',
    'malachi 3:6': '6. Want Ik, de HEERE, word niet veranderd; daarom zijt gij, o kinderen Jakobs! niet verteerd.',
    'mark 2:28': '28. Zo is dan de Zoon des mensen een Heere ook van den sabbat.',
    'mark 2:5-7': '5. En Jezus, hun geloof ziende, zeide tot den geraakte: Zoon, uw zonden zijn u vergeven. 6. En sommigen van de Schriftgeleerden zaten aldaar, en overdachten in hun harten: 7. Wat spreekt Deze aldus gods lasteringen? Wie kan de zonden vergeven, dan alleen God?',
    'matthew 16:21': '21. Van toen aan begon Jezus Zijn discipelen te vertonen, dat Hij moest heengaan naar Jeruzalem, en veel lijden van de ouderlingen, en overpriesters, en Schriftgeleerden, en gedood worden, en ten derden dage opgewekt worden.',
    'matthew 17:22-23': '22. En als zij in Galilea verkeerden, zeide Jezus tot hen: De Zoon des mensen zal overgeleverd worden in de handen der mensen; 23. En zij zullen Hem doden, en ten derden dage zal Hij opgewekt worden. En zij werden zeer bedroefd.',
    'matthew 20:18-19': '18. Ziet, wij gaan op naar Jeruzalem, en de Zoon des mensen zal den overpriesteren en Schriftgeleerden overgeleverd worden, en zij zullen Hem ter dood veroordelen; 19. En zij zullen Hem den heidenen overleveren, om Hem te bespotten en te geselen, en te kruisigen; en ten derden dage zal Hij weder opstaan.',
    'numbers 6:27': '27. Alzo zullen zij Mijn Naam op de kinderen Israels leggen; en Ik zal hen zegenen.',
    'philippians 2:13': '13. Want het is God, Die in u werkt beide het willen en het werken, naar Zijn welbehagen.',
    'psalms 107:29': '29. Hij doet de storm stilstaan, zodat hun golven stilzwijgen.',
    'revelation 1:1': '1. De openbaring van Jezus Christus, die God hem gegeven heeft, om Zijn dienstknechten te tonen de dingen, die haast geschieden moeten; en die Hij door Zijn engel gezonden, en Zijn dienstknecht Johannes te kennen gegeven heeft;',
    'revelation 22:3-4': '3. En geen vervloeking zal er meer tegen iemand zijn; en de troon Gods en des Lams zal daarin zijn, en Zijn dienstknechten zullen Hem dienen; 4. En zullen Zijn aangezicht zien, en Zijn Naam zal op hun voorhoofden zijn.',
    'revelation 4:2': '2. En terstond werd ik in den geest; en ziet, er was een troon gezet in den hemel, en er zat Een op den troon.',
    'revelation 5:13': '13. En alle schepsel, dat in den hemel is, en op de aarde, en onder de aarde, en die in de zee zijn, en alles, wat in dezelve is, hoorde ik zeggen: Hem, Die op den troon zit, en het Lam, zij de dankzegging, en de eer, en de heerlijkheid, en de kracht in alle eeuwigheid.',
    'revelation 5:6': '6. En ik zag, en ziet, in het midden van den troon, en van de vier dieren, en in het midden van de ouderlingen, een Lam, staande als geslacht, hebbende zeven hoornen, en zeven ogen; dewelke zijn de zeven geesten Gods, die uitgezonden zijn in alle landen.',
    'romans 8:9': '9. Doch gijlieden zijt niet in het vlees, maar in den Geest, zo anders de Geest Gods in u woont. Maar zo iemand den Geest van Christus niet heeft, die komt Hem niet toe.',
    'romans 8:9-11': '9. Doch gijlieden zijt niet in het vlees, maar in den Geest, zo anders de Geest Gods in u woont. Maar zo iemand den Geest van Christus niet heeft, die komt Hem niet toe. 10. En indien Christus in ulieden is, zo is wel het lichaam dood om der zonden wil; maar de geest is leven om der gerechtigheid wil. 11. En indien de Geest Desgenen, Die Jezus uit de doden opgewekt heeft, in u woont, zo zal Hij, Die Christus uit de doden opgewekt heeft, ook uw sterfelijke lichamen levend maken, door Zijn Geest, Die in u woont.',
  },
  en: {
    '1 john 5:7': '7. For there are three that bear record in heaven, the Father, the Word, and the Holy Ghost: and these three are one.',
    '1 john 5:7-8': '7. For there are three that bear record in heaven, the Father, the Word, and the Holy Ghost: and these three are one. 8. And there are three that bear witness in earth, the spirit, and the water, and the blood: and these three agree in one.',
    '1 kings 8:29': '29. That thine eyes may be open toward this house night and day, even toward the place of which thou hast said, My name shall be there: that thou mayest hearken unto the prayer which thy servant shall make toward this place.',
    '1 timothy 2:5': '5. For there is one God, and one mediator between God and men, the man Christ Jesus;',
    '2 corinthians 11:4': '4. For if he that cometh preacheth another Jesus, whom we have not preached, or if ye receive another spirit, which ye have not received, or another gospel, which ye have not accepted, ye might well bear with him.',
    '2 corinthians 5:19': '19. To wit, that God was in Christ, reconciling the world unto himself, not imputing their trespasses unto them; and hath committed unto us the word of reconciliation.',
    'colossians 1:27': '27. To whom God would make known what is the riches of the glory of this mystery among the Gentiles; which is Christ in you, the hope of glory:',
    'deuteronomy 6:4': '4. Hear, O Israel: The Lord our God is one Lord:',
    'exodus 23:21': '21. Beware of him, and obey his voice, provoke him not; for he will not pardon your transgressions: for my name is in him.',
    'exodus 24:10': '10. And they saw the God of Israel: and there was under his feet as it were a paved work of a sapphire stone, and as it were the body of heaven in his clearness.',
    'exodus 33:20': '20. And he said, Thou canst not see my face: for there shall no man see me, and live.',
    'exodus 3:14': '14. And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you.',
    'galatians 5:16-25': '16. This I say then, Walk in the Spirit, and ye shall not fulfil the lust of the flesh. 17. For the flesh lusteth against the Spirit, and the Spirit against the flesh: and these are contrary the one to the other: so that ye cannot do the things that ye would. 18. But if ye be led of the Spirit, ye are not under the law. 19. Now the works of the flesh are manifest, which are these; Adultery, fornication, uncleanness, lasciviousness, 20. Idolatry, witchcraft, hatred, variance, emulations, wrath, strife, seditions, heresies, 21. Envyings, murders, drunkenness, revellings, and such like: of the which I tell you before, as I have also told you in time past, that they which do such things shall not inherit the kingdom of God. 22. But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, 23. Meekness, temperance: against such there is no law. 24. And they that are Christ’s have crucified the flesh with the affections and lusts. 25. If we live in the Spirit, let us also walk in the Spirit.',
    'genesis 32:30': '30. And Jacob called the name of the place Peniel: for I have seen God face to face, and my life is preserved.',
    'genesis 6:6': '6. And it repented the Lord that he had made man on the earth, and it grieved him at his heart.',
    'hebrews 12:24': '24. And to Jesus the mediator of the new covenant, and to the blood of sprinkling, that speaketh better things than that of Abel.',
    'hebrews 2:14-17': '14. Forasmuch then as the children are partakers of flesh and blood, he also himself likewise took part of the same; that through death he might destroy him that had the power of death, that is, the devil; 15. And deliver them who through fear of death were all their lifetime subject to bondage. 16. For verily he took not on him the nature of angels; but he took on him the seed of Abraham. 17. Wherefore in all things it behoved him to be made like unto his brethren, that he might be a merciful and faithful high priest in things pertaining to God, to make reconciliation for the sins of the people.',
    'hebrews 4:15': '15. For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin.',
    'hebrews 5:8': '8. Though he were a Son, yet learned he obedience by the things which he suffered;',
    'hebrews 8:6': '6. But now hath he obtained a more excellent ministry, by how much also he is the mediator of a better covenant, which was established upon better promises.',
    'hebrews 9:15': '15. And for this cause he is the mediator of the new testament, that by means of death, for the redemption of the transgressions that were under the first testament, they which are called might receive the promise of eternal inheritance.',
    'isaiah 43:10': '10. Ye are my witnesses, saith the Lord, and my servant whom I have chosen: that ye may know and believe me, and understand that I am he: before me there was no God formed, neither shall there be after me.',
    'isaiah 46:4': '4. And even to your old age I am he; and even to hoar hairs will I carry you: I have made, and I will bear; even I will carry, and will deliver you.',
    'john 10:30': '30. I and my Father are one.',
    'john 10:33': '33. The Jews answered him, saying, For a good work we stone thee not; but for blasphemy; and because that thou, being a man, makest thyself God.',
    'john 14:8': '8. Philip saith unto him, Lord, shew us the Father, and it sufficeth us.',
    'john 14:9': '9. Jesus saith unto him, Have I been so long time with you, and yet hast thou not known me, Philip? he that hath seen me hath seen the Father; and how sayest thou then, Shew us the Father?',
    'john 17:3': '3. And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent.',
    'john 1:1': '1. In the beginning was the Word, and the Word was with God, and the Word was God.',
    'john 1:14': '14. And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.',
    'john 8:58': '58. Jesus said unto them, Verily, verily, I say unto you, Before Abraham was, I am.',
    'jude 1:5': '5. I will therefore put you in remembrance, though ye once knew this, how that the Lord, having saved the people out of the land of Egypt, afterward destroyed them that believed not.',
    'malachi 3:6': '6. For I am the Lord, I change not; therefore ye sons of Jacob are not consumed.',
    'mark 2:28': '28. Therefore the Son of man is Lord also of the sabbath.',
    'mark 2:5-7': '5. When Jesus saw their faith, he said unto the sick of the palsy, Son, thy sins be forgiven thee. 6. But there were certain of the scribes sitting there, and reasoning in their hearts, 7. Why doth this man thus speak blasphemies? who can forgive sins but God only?',
    'matthew 16:21': '21. From that time forth began Jesus to shew unto his disciples, how that he must go unto Jerusalem, and suffer many things of the elders and chief priests and scribes, and be killed, and be raised again the third day.',
    'matthew 17:22-23': '22. And while they abode in Galilee, Jesus said unto them, The Son of man shall be betrayed into the hands of men: 23. And they shall kill him, and the third day he shall be raised again. And they were exceeding sorry.',
    'matthew 20:18-19': '18. Behold, we go up to Jerusalem; and the Son of man shall be betrayed unto the chief priests and unto the scribes, and they shall condemn him to death, 19. And shall deliver him to the Gentiles to mock, and to scourge, and to crucify him: and the third day he shall rise again.',
    'numbers 6:27': '27. And they shall put my name upon the children of Israel; and I will bless them.',
    'philippians 2:13': '13. For it is God which worketh in you both to will and to do of his good pleasure.',
    'psalms 107:29': '29. He maketh the storm a calm, so that the waves thereof are still.',
    'revelation 1:1': '1. The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things which must shortly come to pass; and he sent and signified it by his angel unto his servant John:',
    'revelation 22:3-4': '3. And there shall be no more curse: but the throne of God and of the Lamb shall be in it; and his servants shall serve him: 4. And they shall see his face; and his name shall be in their foreheads.',
    'revelation 4:2': '2. And immediately I was in the spirit: and, behold, a throne was set in heaven, and one sat on the throne.',
    'revelation 5:13': '13. And every creature which is in heaven, and on the earth, and under the earth, and such as are in the sea, and all that are in them, heard I saying, Blessing, and honour, and glory, and power, be unto him that sitteth upon the throne, and unto the Lamb for ever and ever.',
    'revelation 5:6': '6. And I beheld, and, lo, in the midst of the throne and of the four beasts, and in the midst of the elders, stood a Lamb as it had been slain, having seven horns and seven eyes, which are the seven Spirits of God sent forth into all the earth.',
    'romans 8:9': '9. But ye are not in the flesh, but in the Spirit, if so be that the Spirit of God dwell in you. Now if any man have not the Spirit of Christ, he is none of his.',
    'romans 8:9-11': '9. But ye are not in the flesh, but in the Spirit, if so be that the Spirit of God dwell in you. Now if any man have not the Spirit of Christ, he is none of his. 10. And if Christ be in you, the body is dead because of sin; but the Spirit is life because of righteousness. 11. But if the Spirit of him that raised up Jesus from the dead dwell in you, he that raised up Christ from the dead shall also quicken your mortal bodies by his Spirit that dwelleth in you.',
  },
}

const BOOK_ALIASES: Array<[string, string]> = [
  ['1 Johannes', '1 john'],
  ['1 John', '1 john'],
  ['1 Joh.', '1 john'],
  ['1 Joh', '1 john'],
  ['1 Tim.', '1 timothy'],
  ['1 Tim', '1 timothy'],
  ['2 Kor.', '2 corinthians'],
  ['2 Kor', '2 corinthians'],
  ['2 Cor.', '2 corinthians'],
  ['2 Cor', '2 corinthians'],
  ['1 Kor.', '1 corinthians'],
  ['1 Kor', '1 corinthians'],
  ['1 Cor.', '1 corinthians'],
  ['1 Cor', '1 corinthians'],
  ['Johannes', 'john'],
  ['Joh.', 'john'],
  ['JOH.', 'john'],
  ['JOH', 'john'],
  ['John', 'john'],
  ['Exodus', 'exodus'],
  ['Ex.', 'exodus'],
  ['EX.', 'exodus'],
  ['Ex', 'exodus'],
  ['EX', 'exodus'],
  ['Deut.', 'deuteronomy'],
  ['DEUT.', 'deuteronomy'],
  ['Jes.', 'isaiah'],
  ['Isa.', 'isaiah'],
  ['Mark.', 'mark'],
  ['Mark', 'mark'],
  ['Matt.', 'matthew'],
  ['Rom.', 'romans'],
  ['Kol.', 'colossians'],
  ['Col.', 'colossians'],
  ['Fil.', 'philippians'],
  ['FIL.', 'philippians'],
  ['Phil.', 'philippians'],
  ['PHIL.', 'philippians'],
  ['Gal.', 'galatians'],
  ['Openbaring', 'revelation'],
  ['OPENBARING', 'revelation'],
  ['Openb.', 'revelation'],
  ['Revelation', 'revelation'],
  ['Rev.', 'revelation'],
  ['REV.', 'revelation'],
  ['Hebr.', 'hebrews'],
  ['Heb.', 'hebrews'],
  ['Judas', 'jude'],
  ['Jude', 'jude'],
  ['Num.', 'numbers'],
  ['1 Kon.', '1 kings'],
  ['1 Kings', '1 kings'],
  ['Kon.', '1 kings'],
  ['Kings', '1 kings'],
  ['Ps.', 'psalms'],
  ['Mal.', 'malachi'],
  ['Gen.', 'genesis'],
]

const aliasPattern = BOOK_ALIASES
  .map(([alias]) => escapeRegExp(alias).replace(/\\\./g, '\\.?').replace(/\s+/g, '\\s+'))
  .sort((a, b) => b.length - a.length)
  .join('|')

const scripturePattern = new RegExp(
  `\\b(${aliasPattern})\\s+(\\d{1,3}:\\d{1,3}(?:[–-]\\d{1,3})?(?:\\s*,\\s*\\d{1,3}(?:[–-]\\d{1,3})?)*(?:\\s*;\\s*\\d{1,3}:\\d{1,3}(?:[–-]\\d{1,3})?)*)`,
  'gi',
)

export function renderScriptureReferences(html: string, locale: ScriptureLocale) {
  return html
    .split(/(<[^>]+>)/g)
    .map((part) => part.startsWith('<') ? part : renderScriptureTextPart(part, locale))
    .join('')
}

function renderScriptureTextPart(value: string, locale: ScriptureLocale) {
  return value.replace(scripturePattern, (match: string, rawBook: string, rawPassage: string) => {
    const references = parseReferences(rawBook, rawPassage)
    const verses = references
      .map((reference) => ({ reference, text: SCRIPTURE_TEXTS[locale][reference] }))
      .filter((item) => item.text)

    if (!verses.length) return match

    const source = locale === 'nl' ? 'SV' : 'KJV'
    const tooltip = verses
      .map((item) => `<span class="scripture-popover-ref">${escapeHtml(item.reference)}</span><span>${escapeHtml(item.text)}</span>`)
      .join('<span class="scripture-popover-divider"></span>')

    return `<span class="scripture-ref" tabindex="0"><span class="scripture-ref-label">${match}</span><span class="scripture-popover" role="tooltip"><button type="button" class="popover-close scripture-popover-close" data-popover-close aria-label="Close scripture text">&times;</button><span class="scripture-version">${source}</span>${tooltip}</span></span>`
  })
}

function parseReferences(rawBook: string, rawPassage: string) {
  const book = normalizeBook(rawBook)
  if (!book) return []

  const references: string[] = []
  let chapter = 0

  for (const part of rawPassage.split(/\s*;\s*/)) {
    const match = /^(?:(\d{1,3}):)?(\d{1,3})(?:[–-](\d{1,3}))?(?:\s*,\s*(.+))?$/.exec(part.trim())
    if (!match) continue
    if (match[1]) chapter = Number(match[1])
    if (!chapter) continue

    references.push(referenceKey(book, chapter, Number(match[2]), Number(match[3] || match[2])))

    if (match[4]) {
      for (const continuation of match[4].split(/\s*,\s*/)) {
        const verse = /^(\d{1,3})(?:[–-](\d{1,3}))?$/.exec(continuation)
        if (verse) references.push(referenceKey(book, chapter, Number(verse[1]), Number(verse[2] || verse[1])))
      }
    }
  }

  return references
}

function referenceKey(book: string, chapter: number, start: number, end: number) {
  return `${book} ${chapter}:${start}${end === start ? '' : `-${end}`}`
}

function normalizeBook(rawBook: string) {
  const normalized = rawBook.toLowerCase().replaceAll('.', '').replace(/\s+/g, ' ').trim()
  return BOOK_ALIASES.find(([alias]) => alias.toLowerCase().replaceAll('.', '').replace(/\s+/g, ' ').trim() === normalized)?.[1]
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
