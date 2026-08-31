// Comprehensive Legal Dictionary Data for Lexi Clear
// Includes 12 law branches, 55+ realistic terms, detailed explanations, real-world examples, key points, and related terms.

export const CATEGORIES = [
  {
    id: "criminal-law",
    slug: "criminal-law",
    name: "Criminal Law",
    iconName: "ShieldAlert",
    description: "Laws dealing with crimes, offences against the state or public, police procedures, and punishments.",
    color: "#B44C43",
    bgLight: "rgba(180, 76, 67, 0.10)",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    termCount: 8
  },
  {
    id: "civil-law",
    slug: "civil-law",
    name: "Civil Law",
    iconName: "Scale",
    description: "Disputes between individuals or organizations, torts, negligence, remedies, and compensation.",
    color: "#4A6E8C",
    bgLight: "rgba(74, 110, 140, 0.10)",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    termCount: 7
  },
  {
    id: "constitutional-law",
    slug: "constitutional-law",
    name: "Constitutional Law",
    iconName: "Landmark",
    description: "Fundamental rights, state powers, judicial review, constitutional writs, and governance frameworks.",
    color: "#7E598B",
    bgLight: "rgba(126, 89, 139, 0.10)",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    termCount: 6
  },
  {
    id: "family-law",
    slug: "family-law",
    name: "Family Law",
    iconName: "Users",
    description: "Legal matters concerning marriage, divorce, child custody, alimony, adoption, and domestic relations.",
    color: "#AD5374",
    bgLight: "rgba(173, 83, 116, 0.10)",
    badgeColor: "bg-pink-50 text-pink-700 border-pink-200",
    termCount: 5
  },
  {
    id: "corporate-law",
    slug: "corporate-law",
    name: "Corporate Law",
    iconName: "Briefcase",
    description: "Rules governing formation, management, mergers, shareholder rights, and governance of corporations.",
    color: "#467A92",
    bgLight: "rgba(70, 122, 146, 0.10)",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    termCount: 5
  },
  {
    id: "contract-law",
    slug: "contract-law",
    name: "Contract Law",
    iconName: "FileCheck2",
    description: "Formation, enforceability, breach, performance, and legal liabilities in agreements.",
    color: "#447F61",
    bgLight: "rgba(68, 127, 97, 0.10)",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    termCount: 7
  },
  {
    id: "property-law",
    slug: "property-law",
    name: "Property Law",
    iconName: "Home",
    description: "Ownership, leases, easements, mortgages, conveyancing, and property disputes.",
    color: "#A8723C",
    bgLight: "rgba(168, 114, 60, 0.10)",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    termCount: 5
  },
  {
    id: "labour-law",
    slug: "labour-law",
    name: "Labour Law",
    iconName: "HardHat",
    description: "Workplace rights, employee welfare, union bargaining, wrongful termination, and severance.",
    color: "#606696",
    bgLight: "rgba(96, 102, 150, 0.10)",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    termCount: 5
  },
  {
    id: "cyber-law",
    slug: "cyber-law",
    name: "Cyber Law",
    iconName: "ShieldCheck",
    description: "Digital offences, data protection, privacy rights, electronic commerce, and cyber fraud regulations.",
    color: "#37828E",
    bgLight: "rgba(55, 130, 142, 0.10)",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    termCount: 5
  },
  {
    id: "tax-law",
    slug: "tax-law",
    name: "Tax Law",
    iconName: "Receipt",
    description: "Direct and indirect taxation, deductions, transfer pricing, audits, and statutory compliance.",
    color: "#3C857B",
    bgLight: "rgba(60, 133, 123, 0.10)",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    termCount: 5
  },
  {
    id: "consumer-law",
    slug: "consumer-law",
    name: "Consumer Law",
    iconName: "ShoppingBag",
    description: "Protection of buyers against misleading ads, defective goods, unfair practices, and service deficiencies.",
    color: "#B4653B",
    bgLight: "rgba(180, 101, 59, 0.10)",
    badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    termCount: 5
  },
  {
    id: "evidence-law",
    slug: "evidence-law",
    name: "Evidence Law",
    iconName: "Search",
    description: "Rules determining what facts, witness statements, and documents can be admitted in judicial proceedings.",
    color: "#72883E",
    bgLight: "rgba(114, 136, 62, 0.10)",
    badgeColor: "bg-lime-50 text-lime-700 border-lime-200",
    termCount: 6
  }
];

export const LEGAL_TERMS = [
  // 1. Criminal Law
  {
    slug: "bail",
    term: "Bail",
    phonetic: "/beɪl/",
    origin: "Old French 'baillier' (to deliver / lease)",
    category: "Criminal Law",
    categorySlug: "criminal-law",
    isPopular: true,
    isTermOfTheDay: true,
    simpleMeaning: "A temporary release of an accused person from custody while their court case is ongoing, usually upon paying money or pledging security.",
    detailedExplanation: "Bail is a fundamental procedural safeguard in criminal jurisprudence based on the presumption of innocence until proven guilty. When granted bail, an accused person is set free from jail on the condition that they attend all upcoming court dates and adhere to specific court-imposed restrictions (such as surrendering their passport or refraining from contacting witnesses).\n\nBail can be classified into regular bail (after arrest), anticipatory bail (before arrest if one fears imminent detention), and interim bail (temporary relief while a formal application is evaluated). In many legal systems, the principle followed is 'Bail is the rule, jail is the exception.'",
    example: "Rohan was arrested following a car accident investigation. His lawyer applied for bail before the Magistrate, offering a financial surety of $5,000 and his passport. The court approved bail, allowing Rohan to live at home while his trial proceeds.",
    keyPoints: [
      "Preserves personal liberty before a final judgment of guilt.",
      "Can be granted with or without monetary sureties.",
      "Failure to appear in court results in immediate forfeiture of the bail bond and issuance of a warrant.",
      "Anticipatory bail protects individuals from malicious arrests."
    ],
    relatedTermSlugs: ["arrest", "fir", "custody", "surety", "warrant"]
  },
  {
    slug: "fir",
    term: "FIR (First Information Report)",
    phonetic: "/ɛf aɪ ɑːr/",
    origin: "Commonwealth statutory criminal procedure",
    category: "Criminal Law",
    categorySlug: "criminal-law",
    isPopular: true,
    simpleMeaning: "A formal written document prepared by police when they first receive information about the commission of a serious (cognizable) crime.",
    detailedExplanation: "A First Information Report (FIR) sets the criminal law machinery in motion. It is the initial record created by the officer in charge of a police station based on victim or informant testimony. Once an FIR is registered, the police are legally authorized and required to commence an official investigation, inspect crime scenes, record witness statements, and make arrests if necessary without needing a prior court order.",
    example: "After returning home and finding her house broken into and valuables stolen, Priya visited the local police station and filed an FIR. The police immediately began collecting fingerprint evidence and checking nearby CCTV feeds.",
    keyPoints: [
      "Mandatory for police to register for cognizable offences.",
      "Any victim, witness, or person with knowledge of the crime can lodge an FIR.",
      "Serves as the foundation of the prosecution's investigation.",
      "A copy of the FIR must be provided to the informant free of cost."
    ],
    relatedTermSlugs: ["cognizable-offence", "arrest", "warrant", "bail"]
  },
  {
    slug: "arrest",
    term: "Arrest",
    phonetic: "/əˈrɛst/",
    origin: "Latin 'arrestare' (to stop or stay)",
    category: "Criminal Law",
    categorySlug: "criminal-law",
    isPopular: false,
    simpleMeaning: "The act of taking a person into legal custody by legal authority to answer a criminal charge or prevent an offence.",
    detailedExplanation: "An arrest deprives a person of their physical liberty by legal mandate. It must follow strict constitutional safeguards, including informing the arrested person of the grounds of arrest, the right to consult a legal counsel, the right to bail where applicable, and mandatory presentation before a judicial magistrate within 24 hours.",
    example: "Police officers detained a suspect fleeing a burglary scene. They read him his rights, noted the grounds of arrest, and notified his family within two hours.",
    keyPoints: [
      "Requires lawful authority or an arrest warrant unless the offence is cognizable.",
      "Arrestee must be produced before a judge within 24 hours.",
      "Right against torture or self-incrimination applies upon arrest."
    ],
    relatedTermSlugs: ["bail", "custody", "warrant", "fir", "cognizable-offence"]
  },
  {
    slug: "cognizable-offence",
    term: "Cognizable Offence",
    phonetic: "/ˈkɒɡnɪzəbəl əˈfɛns/",
    origin: "Middle English / Anglo-Norman law",
    category: "Criminal Law",
    categorySlug: "criminal-law",
    isPopular: false,
    simpleMeaning: "A serious category of crime where police officers have the legal authority to arrest the suspect immediately without an arrest warrant from a court.",
    detailedExplanation: "Offences are broadly split into cognizable and non-cognizable based on gravity. In cognizable offences—such as murder, kidnapping, theft, or armed robbery—the public risk is high, allowing law enforcement officers to arrest suspects instantly, register an FIR, and start an investigation without seeking prior judicial permission.",
    example: "When an armed robber was caught red-handed inside a bank, the police arrested him on the spot because armed robbery is a cognizable offence.",
    keyPoints: [
      "Involves serious crimes posing danger to public order.",
      "No judicial warrant required for police to initiate arrest or probe.",
      "Direct duty of police station to file FIR."
    ],
    relatedTermSlugs: ["non-cognizable-offence", "arrest", "fir", "warrant"]
  },
  {
    slug: "non-cognizable-offence",
    term: "Non-Cognizable Offence",
    phonetic: "/nɒn ˈkɒɡnɪzəbəl əˈfɛns/",
    origin: "Statutory classification",
    category: "Criminal Law",
    categorySlug: "criminal-law",
    isPopular: false,
    simpleMeaning: "A comparatively minor crime where police cannot arrest someone or begin an investigation without an order from a judge or magistrate.",
    detailedExplanation: "Non-cognizable offences are less grave infractions such as simple assault, public nuisance, or defamation. For these matters, police record a Non-Cognizable Report (NCR) and require the complainant to approach a Magistrate or obtain a court order before any investigation or arrest can legally proceed.",
    example: "In a verbal altercation involving non-violent insults, the police logged the complaint as an NCR and directed the parties to the magistrate's court.",
    keyPoints: [
      "Police cannot arrest without a magistrate warrant.",
      "Investigation requires prior judicial authorization.",
      "Usually addresses private wrongs with lesser penalties."
    ],
    relatedTermSlugs: ["cognizable-offence", "defamation", "summons", "warrant"]
  },
  {
    slug: "warrant",
    term: "Warrant",
    phonetic: "/ˈwɒrənt/",
    origin: "Old French 'guarant' (protector / authorization)",
    category: "Criminal Law",
    categorySlug: "criminal-law",
    isPopular: false,
    simpleMeaning: "An official written authorization issued by a judge or court directing police to arrest a person, search a property, or seize evidence.",
    detailedExplanation: "A warrant is a judicial command that authorizes an act that would otherwise violate an individual's personal freedom or privacy. Common types include Arrest Warrants, Search Warrants, and Bench Warrants (issued when someone fails to appear in court). A warrant must clearly state the name of the individual, the alleged offence, and the specific place to be searched.",
    example: "Having established probable cause that stolen goods were stored inside a warehouse, investigators obtained a search warrant from the judge before entering the facility.",
    keyPoints: [
      "Issued exclusively by judicial officers, not police.",
      "Protects citizens against arbitrary search and seizure.",
      "Must be specific regarding place, person, and purpose."
    ],
    relatedTermSlugs: ["summons", "arrest", "bail", "custody"]
  },
  {
    slug: "summons",
    term: "Summons",
    phonetic: "/ˈsʌmənz/",
    origin: "Latin 'summonere' (to warn / remind secretly)",
    category: "Criminal Law",
    categorySlug: "criminal-law",
    isPopular: false,
    simpleMeaning: "An authoritative legal notice ordering a person to appear in court as a defendant, witness, or juror on a specified date.",
    detailedExplanation: "A summons is the gentler alternative to an arrest warrant. It commands the recipient to appear before the court at a fixed time. If an individual ignores a court summons, the court may escalate the matter by issuing a bailable or non-bailable warrant.",
    example: "A witness who saw a highway collision received a judicial summons requiring her to testify at the district court next Thursday.",
    keyPoints: [
      "Standard process to notify defendants or witnesses.",
      "Disobeying a court summons can lead to contempt of court or an arrest warrant.",
      "Must be formally served upon the recipient with proof of delivery."
    ],
    relatedTermSlugs: ["warrant", "arrest", "plaintiff", "defendant"]
  },
  {
    slug: "custody",
    term: "Custody",
    phonetic: "/ˈkʌstədi/",
    origin: "Latin 'custodia' (guarding / watching)",
    category: "Criminal Law",
    categorySlug: "criminal-law",
    isPopular: false,
    simpleMeaning: "The protective care, guardianship, or imprisonment of an individual by law enforcement or judicial authority.",
    detailedExplanation: "In criminal law, custody distinguishes between police custody (where the accused is kept in a police lockup for interrogation) and judicial custody (where the accused is lodged in jail under direct supervision of the court). In family law, custody refers to parental rights and responsibilities over a minor child.",
    example: "The magistrate remanded the financial fraud suspect to 3 days of police custody for questioning, after which he was transferred to judicial custody.",
    keyPoints: [
      "Police custody is strictly limited by statute to prevent abuse.",
      "Judicial custody places the detainee under the court's jurisdiction in prison.",
      "Subject to strict human rights guidelines."
    ],
    relatedTermSlugs: ["arrest", "bail", "habeas-corpus", "surety"]
  },

  // 2. Civil Law
  {
    slug: "tort",
    term: "Tort",
    phonetic: "/tɔːrt/",
    origin: "Latin 'tortum' (wrong / crooked)",
    category: "Civil Law",
    categorySlug: "civil-law",
    isPopular: true,
    simpleMeaning: "A civil wrong (other than a breach of contract) that unfairly causes someone harm or loss, resulting in legal liability.",
    detailedExplanation: "Tort law aims to provide relief to injured parties for harms caused by others and deter future wrongful acts. Unlike criminal law, which punishes offenders with imprisonment on behalf of the state, tort law focuses on compensating the victim with financial damages. Major categories of torts include Negligence, Intentional Torts (such as assault or battery), and Strict Liability.",
    example: "When a shop owner failed to clean an oil spill in an aisle and a customer slipped and broke her wrist, the customer sued the owner under the tort of negligence.",
    keyPoints: [
      "Provides civil remedies, primarily financial compensation (damages).",
      "Does not require a pre-existing contract between parties.",
      "Standard of proof is preponderance of probabilities, not beyond reasonable doubt."
    ],
    relatedTermSlugs: ["negligence", "defamation", "damages", "injunction", "plaintiff"]
  },
  {
    slug: "negligence",
    term: "Negligence",
    phonetic: "/ˈnɛɡlɪdʒəns/",
    origin: "Latin 'negligentia' (carelessness)",
    category: "Civil Law",
    categorySlug: "civil-law",
    isPopular: true,
    simpleMeaning: "A failure to exercise the appropriate level of care that a reasonably prudent person would have exercised in the same circumstances.",
    detailedExplanation: "To prove negligence in court, a claimant must establish four elements:\n1. Duty of care owed by the defendant to the plaintiff.\n2. Breach of that duty.\n3. Causation linking the breach to the harm.\n4. Actual damages or injuries suffered.\nNegligence is the most common ground for motor vehicle, medical malpractice, and workplace injury lawsuits.",
    example: "A surgeon left a surgical sponge inside a patient's abdomen during surgery. The patient experienced severe infections and successfully sued the hospital for medical negligence.",
    keyPoints: [
      "Requires proof of Duty, Breach, Causation, and Damages.",
      "Judged against the objective 'reasonable person' standard.",
      "Defences include contributory negligence and voluntary assumption of risk."
    ],
    relatedTermSlugs: ["tort", "damages", "strict-liability", "plaintiff", "defendant"]
  },
  {
    slug: "defamation",
    term: "Defamation",
    phonetic: "/ˌdɛfəˈmeɪʃən/",
    origin: "Latin 'diffamare' (to spread bad reputation)",
    category: "Civil Law",
    categorySlug: "civil-law",
    isPopular: true,
    simpleMeaning: "The act of making an untrue statement about someone that damages their reputation in the eyes of right-thinking members of society.",
    detailedExplanation: "Defamation is divided into Slander (temporary spoken defamation) and Libel (permanent written, printed, or broadcast defamation). To succeed, the plaintiff must prove that the statement was false, derogatory, published to a third party, and caused tangible harm. Truth and fair comment in public interest are complete legal defences.",
    example: "A blogger falsely published that a local restaurant owner was selling contaminated meat, causing customer numbers to plummet. The restaurateur filed a libel suit for $100,000.",
    keyPoints: [
      "Libel is permanent/written; Slander is spoken/transient.",
      "Truth is an absolute defence against defamation.",
      "Can be pursued as a civil tort or criminal offence in various jurisdictions."
    ],
    relatedTermSlugs: ["tort", "damages", "injunction", "plaintiff"]
  },
  {
    slug: "damages",
    term: "Damages",
    phonetic: "/ˈdæmɪdʒɪz/",
    origin: "Latin 'damnum' (loss / harm)",
    category: "Civil Law",
    categorySlug: "civil-law",
    isPopular: false,
    simpleMeaning: "Monetary compensation awarded by a civil court to a person who suffered loss, injury, or breach of rights.",
    detailedExplanation: "Damages restore the injured party, so far as money can do, to the position they would have been in if the wrong had not occurred. Types include Compensatory Damages (actual losses), Nominal Damages (token acknowledgment of violated rights), and Punitive Damages (awarded to punish egregious or malicious conduct).",
    example: "The court ordered the construction company to pay $45,000 in damages to the homeowner to repair structural cracks caused by unauthorized excavation next door.",
    keyPoints: [
      "Primary remedy in tort and breach of contract disputes.",
      "Compensatory damages cover financial, medical, and psychological losses.",
      "Punitive damages serve as a warning to prevent malicious behavior."
    ],
    relatedTermSlugs: ["tort", "injunction", "breach-of-contract", "liquidated-damages"]
  },
  {
    slug: "injunction",
    term: "Injunction",
    phonetic: "/ɪnˈdʒʌŋkʃən/",
    origin: "Latin 'injungere' (to impose / enjoin)",
    category: "Civil Law",
    categorySlug: "civil-law",
    isPopular: false,
    simpleMeaning: "A court order compelling a party to do or refrain from doing a specific act.",
    detailedExplanation: "An injunction is an equitable remedy used when monetary damages are inadequate to prevent irreversible harm. Injunctions can be Prohibitory (stopping an action like property demolition) or Mandatory (ordering positive action). They can also be temporary/interlocutory (during lawsuit) or permanent (final decree).",
    example: "A publisher obtained an emergency temporary injunction preventing a rival from distributing a book containing pirated chapters.",
    keyPoints: [
      "Used when financial compensation cannot remedy the harm.",
      "Violating an injunction constitutes contempt of court punishable by jail or fines.",
      "Requires showing of irreparable harm and balance of convenience."
    ],
    relatedTermSlugs: ["tort", "specific-performance", "damages", "plaintiff"]
  },
  {
    slug: "plaintiff",
    term: "Plaintiff",
    phonetic: "/ˈpleɪntɪf/",
    origin: "Old French 'plaintif' (grieving / complaining)",
    category: "Civil Law",
    categorySlug: "civil-law",
    isPopular: false,
    simpleMeaning: "The person or entity that initiates a civil lawsuit in court against another party.",
    detailedExplanation: "In civil litigation, the plaintiff carries the initial burden of pleading facts that constitute a viable cause of action. In criminal cases, this role is analogous to the prosecutor acting on behalf of the public or state.",
    example: "As the plaintiff in the lawsuit, Sarah presented evidence showing her landlord failed to return her security deposit without cause.",
    keyPoints: [
      "Files the initial complaint or petition in court.",
      "Bears the burden of proving claims by a preponderance of evidence.",
      "Can seek damages, injunctions, or declaratory judgments."
    ],
    relatedTermSlugs: ["defendant", "tort", "damages", "injunction"]
  },
  {
    slug: "defendant",
    term: "Defendant",
    phonetic: "/dɪˈfɛndənt/",
    origin: "Latin 'defendere' (to ward off / protect)",
    category: "Civil Law",
    categorySlug: "civil-law",
    isPopular: false,
    simpleMeaning: "The individual, company, or institution being sued in a civil lawsuit or accused in a criminal trial.",
    detailedExplanation: "A defendant is entitled to complete procedural fairness, including receiving timely notice of charges or claims, the right to legal representation, and the opportunity to present evidence, cross-examine witnesses, and assert affirmative defences or counterclaims.",
    example: "The corporate defendant filed a written statement refuting allegations of patent infringement, citing prior art.",
    keyPoints: [
      "In civil law: defends against plaintiff's civil suit.",
      "In criminal law: accused person defending against state prosecution.",
      "Enjoys constitutional protections and due process rights."
    ],
    relatedTermSlugs: ["plaintiff", "summons", "arrest", "burden-of-proof"]
  },

  // 3. Constitutional Law
  {
    slug: "habeas-corpus",
    term: "Habeas Corpus",
    phonetic: "/ˌheɪbiəs ˈkɔːrpəs/",
    origin: "Latin ('You shall have the body')",
    category: "Constitutional Law",
    categorySlug: "constitutional-law",
    isPopular: true,
    simpleMeaning: "A fundamental constitutional writ commanding that an imprisoned person be brought before a judge to determine whether their detention is lawful.",
    detailedExplanation: "Known historically as the Great Writ of Liberty, Habeas Corpus protects citizens against illegal, arbitrary, or prolonged detention by police, military, or private entities. When a Habeas Corpus petition is filed, the court directs the detaining authority to produce the prisoner and justify the legal grounds for detention. If the detention lacks valid statutory authority, the court orders immediate release.",
    example: "When an activist was detained in an undisclosed facility for three weeks without formal charges or judicial appearance, his family filed a writ of Habeas Corpus. The High Court ordered his immediate production and freed him within 24 hours.",
    keyPoints: [
      "Supreme safeguard against unlawful or arbitrary state detention.",
      "Can be filed by the detainee or any concerned citizen/relative on their behalf.",
      "Overrides administrative excuses if statutory procedure is breached."
    ],
    relatedTermSlugs: ["mandamus", "judicial-review", "fundamental-rights", "custody", "bail"]
  },
  {
    slug: "mandamus",
    term: "Mandamus",
    phonetic: "/mænˈdeɪməs/",
    origin: "Latin ('We command')",
    category: "Constitutional Law",
    categorySlug: "constitutional-law",
    isPopular: false,
    simpleMeaning: "A court order directing a government official, public authority, or lower court to perform a mandatory statutory duty that they failed to carry out.",
    detailedExplanation: "Writ of Mandamus ensures accountability in public governance. It can be issued only when the petitioner possesses a clear legal right to performance and the public official has an unquestionable statutory obligation. It cannot be issued to enforce discretionary matters or private contracts.",
    example: "After a city municipal corporation refused to issue a death certificate despite receiving verified hospital records, the petitioner secured a writ of mandamus forcing the office to release the certificate.",
    keyPoints: [
      "Commands public officers to execute non-discretionary legal duties.",
      "Cannot be issued against private individuals or non-statutory bodies.",
      "Petitioner must demonstrate a prior demand for performance that was refused."
    ],
    relatedTermSlugs: ["habeas-corpus", "quo-warranto", "judicial-review", "ultra-vires"]
  },
  {
    slug: "judicial-review",
    term: "Judicial Review",
    phonetic: "/dʒuːˈdɪʃəl rɪˈvjuː/",
    origin: "Constitutional jurisprudence (Marbury v. Madison doctrine)",
    category: "Constitutional Law",
    categorySlug: "constitutional-law",
    isPopular: false,
    simpleMeaning: "The power of higher courts to examine legislative acts, executive orders, and administrative actions to ensure they conform to the Constitution.",
    detailedExplanation: "Judicial Review acts as the cornerstone of checks and balances in constitutional democracies. Courts have the authority to strike down laws enacted by parliament or orders issued by the executive if they violate the fundamental rights or exceed constitutional competence.",
    example: "The Supreme Court used judicial review to invalidate an executive order restricting internet freedom, ruling that it violated freedom of speech.",
    keyPoints: [
      "Maintains the supremacy of the Constitution over legislative bodies.",
      "Prevents arbitrary misuse of executive and parliamentary power.",
      "Preserves the separation of powers."
    ],
    relatedTermSlugs: ["ultra-vires", "fundamental-rights", "habeas-corpus", "mandamus"]
  },
  {
    slug: "ultra-vires",
    term: "Ultra Vires",
    phonetic: "/ˌʌltrə ˈvaɪriːz/",
    origin: "Latin ('Beyond the powers')",
    category: "Constitutional Law",
    categorySlug: "constitutional-law",
    isPopular: false,
    simpleMeaning: "Any act, statute, or contract that is beyond the legal authority, scope, or constitutional power of the body enacting it.",
    detailedExplanation: "If a government department, minister, municipal body, or corporation passes a rule that exceeds the powers delegated to it by parent legislation or charter, the action is declared 'ultra vires' and is legally null and void.",
    example: "A local city council attempted to levy an interstate commercial tax. The court declared the levy ultra vires because only the federal legislature held taxation powers over interstate trade.",
    keyPoints: [
      "Renders unauthorized actions legally void ab initio.",
      "Applies in constitutional, administrative, and corporate law.",
      "Ensures institutions operate strictly within their delegated jurisdiction."
    ],
    relatedTermSlugs: ["judicial-review", "void-ab-initio", "mandamus", "fiduciary-duty"]
  },
  {
    slug: "fundamental-rights",
    term: "Fundamental Rights",
    phonetic: "/ˌfʌndəˈmɛntl raɪts/",
    origin: "International declarations and constitutional charters",
    category: "Constitutional Law",
    categorySlug: "constitutional-law",
    isPopular: false,
    simpleMeaning: "A group of essential human and civil freedoms guaranteed to all citizens by the constitution, protected from government infringement.",
    detailedExplanation: "Fundamental rights include the right to equality, freedom of speech and expression, personal liberty, freedom of religion, and constitutional remedies. Any statutory provision that arbitrarily undermines these core protections can be challenged directly before constitutional courts.",
    example: "A citizen challenged a discriminatory public employment policy that favored candidates from specific towns, asserting her fundamental right to equality.",
    keyPoints: [
      "Inalienable rights shielded by constitutional guarantees.",
      "Directly enforceable against the state.",
      "Subject only to reasonable restrictions for public order and national security."
    ],
    relatedTermSlugs: ["habeas-corpus", "judicial-review", "mandamus"]
  },
  {
    slug: "quo-warranto",
    term: "Quo Warranto",
    phonetic: "/kwoʊ wɒˈræntoʊ/",
    origin: "Latin ('By what authority?')",
    category: "Constitutional Law",
    categorySlug: "constitutional-law",
    isPopular: false,
    simpleMeaning: "A constitutional writ used to challenge a person's legal right or qualification to hold a public office.",
    detailedExplanation: "Quo Warranto prevents unlawful usurpation of public offices. If an individual occupies a government post without meeting statutory eligibility criteria, any citizen can request the court to ask 'by what authority' they hold office and order their removal.",
    example: "When an individual was appointed as university vice-chancellor without possessing the mandatory 10 years of professorship, a writ of Quo Warranto ousted him.",
    keyPoints: [
      "Protects public offices from unlawful usurpation.",
      "Can be initiated by any citizen without having direct personal injury.",
      "Requires office to be substantive and public in nature."
    ],
    relatedTermSlugs: ["mandamus", "judicial-review", "ultra-vires"]
  },

  // 4. Family Law
  {
    slug: "alimony",
    term: "Alimony",
    phonetic: "/ˈælɪməni/",
    origin: "Latin 'alimonia' (nourishment / sustenance)",
    category: "Family Law",
    categorySlug: "family-law",
    isPopular: false,
    simpleMeaning: "A court-ordered financial support payment made by one spouse to the other after separation or divorce.",
    detailedExplanation: "Alimony (or spousal support) prevents a financially disadvantaged spouse from suffering an unfair economic drop following divorce. Courts determine amounts based on the marriage duration, earning capacities, standard of living during marriage, age, and health.",
    example: "Following their divorce after 18 years of marriage, the court ordered David to pay $2,200 monthly alimony to Elena while she completed her degree and returned to the workforce.",
    keyPoints: [
      "Can be temporary (during litigation), rehabilitative, or permanent.",
      "Aimed at financial fairness and self-sufficiency.",
      "Can be modified if either party's financial circumstances change significantly."
    ],
    relatedTermSlugs: ["maintenance", "custody-of-child", "annulment"]
  },
  {
    slug: "custody-of-child",
    term: "Child Custody",
    phonetic: "/tʃaɪld ˈkʌstədi/",
    origin: "Family court jurisprudence",
    category: "Family Law",
    categorySlug: "family-law",
    isPopular: false,
    simpleMeaning: "The legal and physical responsibility awarded to a parent or guardian to care for, make decisions for, and live with a minor child.",
    detailedExplanation: "Custody is split into Legal Custody (making major decisions on education, healthcare, and religion) and Physical Custody (where the child lives daily). Courts resolve custody disputes strictly adhering to the principle of 'The Best Interests of the Child'.",
    example: "The court granted joint legal custody to both parents while awarding primary physical custody to the mother, with alternating weekend visitation for the father.",
    keyPoints: [
      "Evaluated purely on the paramount welfare of the minor.",
      "Includes both legal decision-making and physical living arrangements.",
      "Non-custodial parent typically retains visitation rights."
    ],
    relatedTermSlugs: ["alimony", "maintenance", "custody"]
  },
  {
    slug: "annulment",
    term: "Annulment",
    phonetic: "/əˈnʌlmənt/",
    origin: "Latin 'annullare' (to bring to nothing)",
    category: "Family Law",
    categorySlug: "family-law",
    isPopular: false,
    simpleMeaning: "A legal ruling that declares a marriage null and void, establishing that it was never legally valid from the beginning.",
    detailedExplanation: "While divorce terminates a valid marriage, an annulment treats the marriage as though it never legally existed. Grounds include fraud, bigamy, lack of mental capacity, duress, underage marriage without consent, or physical impossibility of consummation.",
    example: "Liam discovered that his spouse was already legally married to someone else in another state, and successfully obtained an annulment.",
    keyPoints: [
      "Treats marriage as void from the inception (ab initio).",
      "Distinct from divorce, which ends a legally valid union.",
      "Requires specific statutory grounds like fraud or bigamy."
    ],
    relatedTermSlugs: ["void-ab-initio", "alimony", "maintenance"]
  },
  {
    slug: "maintenance",
    term: "Maintenance",
    phonetic: "/ˈmeɪntənəns/",
    origin: "Anglo-Norman French",
    category: "Family Law",
    categorySlug: "family-law",
    isPopular: false,
    simpleMeaning: "Ongoing financial support that a person is legally obligated to provide for their spouse, children, or elderly parents.",
    detailedExplanation: "Maintenance encompasses basic living expenses, including shelter, food, healthcare, clothing, and education. It operates as a statutory welfare measure to prevent destitution and abandonment of dependents.",
    example: "The family court directed an estranged husband to pay $1,000 monthly maintenance to his dependent children and elderly mother.",
    keyPoints: [
      "Covers fundamental subsistence and educational needs.",
      "Enforceable against parties having sufficient means who neglect dependents.",
      "Non-payment can lead to attachment of salary or civil imprisonment."
    ],
    relatedTermSlugs: ["alimony", "custody-of-child"]
  },
  {
    slug: "restitution-of-conjugal-rights",
    term: "Restitution of Conjugal Rights",
    phonetic: "/ˌrɛstɪˈtjuːʃən ɒv ˈkɒndʒʊɡəl raɪts/",
    origin: "Common Law matrimonial relief",
    category: "Family Law",
    categorySlug: "family-law",
    isPopular: false,
    simpleMeaning: "A legal petition where a spouse asks the court to order their partner, who has withdrawn without reasonable excuse, to return and live together.",
    detailedExplanation: "This matrimonial remedy seeks to preserve marriage by establishing whether one partner deserted the matrimonial home without just cause. If granted, the court passes a decree for restitution; prolonged failure to comply can subsequently serve as grounds for divorce.",
    example: "After his wife moved out over a domestic misunderstanding, Robert filed a petition for restitution of conjugal rights to seek formal mediation.",
    keyPoints: [
      "Aimed at saving marriage through structured judicial dialogue.",
      "Requires proof that withdrawal from cohabitation was without reasonable excuse.",
      "Cannot physically compel cohabitation."
    ],
    relatedTermSlugs: ["alimony", "annulment"]
  },

  // 5. Corporate Law
  {
    slug: "piercing-the-corporate-veil",
    term: "Piercing the Corporate Veil",
    phonetic: "/ˈpɪərsɪŋ ðə ˈkɔːrpərət veɪl/",
    origin: "Corporate jurisprudence doctrine",
    category: "Corporate Law",
    categorySlug: "corporate-law",
    isPopular: false,
    simpleMeaning: "A legal action where courts hold individual shareholders or directors personally liable for the company’s debts and wrongdoings.",
    detailedExplanation: "Normally, a corporation possesses a separate legal identity, protecting owners from personal liability. However, when owners use the corporate structure as a mere sham to commit fraud, evade taxes, or siphon illicit funds, courts 'lift' or 'pierce' the veil to hold them personally accountable with their private assets.",
    example: "The owner transferred company funds into his personal offshore accounts while stiffing suppliers. The court pierced the corporate veil, forcing him to pay creditors from his personal wealth.",
    keyPoints: [
      "Exception to the rule of limited liability.",
      "Applied in cases of fraud, tax evasion, or sham business setups.",
      "Exposes personal assets of shareholders to corporate creditors."
    ],
    relatedTermSlugs: ["fiduciary-duty", "due-diligence", "ultra-vires", "articles-of-association"]
  },
  {
    slug: "fiduciary-duty",
    term: "Fiduciary Duty",
    phonetic: "/fɪˈdjuːʃiˌɛri ˈdjuːti/",
    origin: "Latin 'fiducia' (trust / confidence)",
    category: "Corporate Law",
    categorySlug: "corporate-law",
    isPopular: false,
    simpleMeaning: "The highest legal standard of care and trust that someone (like a director) owes to act purely in the best interest of another party or company.",
    detailedExplanation: "Corporate directors and officers are fiduciaries of the corporation and its shareholders. They owe duties of loyalty, care, and good faith. This bars them from taking secret profits, exploiting corporate opportunities for private gain, or engaging in conflicts of interest.",
    example: "A director secretly steered a lucrative land purchase opportunity to his brother's private firm instead of his company, breaching his fiduciary duty of loyalty.",
    keyPoints: [
      "Highest ethical and legal duty imposed by common law.",
      "Prohibits self-dealing and undisclosed conflicts of interest.",
      "Breaches result in disgorgement of profits and civil damages."
    ],
    relatedTermSlugs: ["piercing-the-corporate-veil", "due-diligence", "articles-of-association"]
  },
  {
    slug: "articles-of-association",
    term: "Articles of Association",
    phonetic: "/ˈɑːrtɪkəlz ɒv əˌsoʊsiˈeɪʃən/",
    origin: "Company law charters",
    category: "Corporate Law",
    categorySlug: "corporate-law",
    isPopular: false,
    simpleMeaning: "A foundational legal document establishing internal rules, powers of directors, voting rights, and operations of a corporation.",
    detailedExplanation: "The Articles of Association (AoA) serve as the company's internal rulebook. Along with the Memorandum of Association, it forms the company's constitution, detailing how shares are transferred, how board meetings are convened, and how dividends are distributed.",
    example: "A tech startup drafted its Articles of Association specifying that any issuance of new shares requires 75% approval from founder shareholders.",
    keyPoints: [
      "Defines internal managerial procedures and shareholder voting thresholds.",
      "Legally binding contract between company and shareholders.",
      "Public document accessible on company registries."
    ],
    relatedTermSlugs: ["ultra-vires", "fiduciary-duty", "due-diligence"]
  },
  {
    slug: "due-diligence",
    term: "Due Diligence",
    phonetic: "/djuː ˈdɪlɪdʒəns/",
    origin: "Commercial and financial legal practice",
    category: "Corporate Law",
    categorySlug: "corporate-law",
    isPopular: false,
    simpleMeaning: "A comprehensive investigation and audit of a business or asset before signing a contract or completing a corporate acquisition.",
    detailedExplanation: "Due diligence involves reviewing financial statements, existing litigation, intellectual property ownership, tax compliance, and material contracts. It ensures the buyer or investor discovers potential risks before completing a deal.",
    example: "During legal due diligence, the acquiring firm discovered that the target company was facing an unrecorded $2 million environmental penalty, allowing them to renegotiate the purchase price.",
    keyPoints: [
      "Critical prerequisite in mergers, acquisitions, and venture investments.",
      "Uncovers hidden liabilities, pending lawsuits, and tax defaults.",
      "Mitigates buyer risk."
    ],
    relatedTermSlugs: ["fiduciary-duty", "contract", "indemnity"]
  },
  {
    slug: "shareholders-agreement",
    term: "Shareholders Agreement",
    phonetic: "/ˈʃɛərˌhoʊldərz əˈɡriːmənt/",
    origin: "Corporate commercial practice",
    category: "Corporate Law",
    categorySlug: "corporate-law",
    isPopular: false,
    simpleMeaning: "A private contract among company shareholders regulating ownership, dispute resolution, transfer of shares, and minority rights.",
    detailedExplanation: "Unlike public Articles of Association, a Shareholders Agreement is a private agreement that provides specialized protections such as Tag-Along rights, Drag-Along rights, right of first refusal (ROFR), and board seat allocations.",
    example: "The venture capital fund insisted on a Drag-Along clause in the shareholders agreement to ensure minority holders couldn't block a future $50M buyout offer.",
    keyPoints: [
      "Protects minority investors against hostile dilution.",
      "Contains exit clauses, ROFR, and dispute deadlock mechanisms.",
      "Remains confidential between contracting shareholders."
    ],
    relatedTermSlugs: ["articles-of-association", "fiduciary-duty", "contract"]
  },

  // 6. Contract Law
  {
    slug: "contract",
    term: "Contract",
    phonetic: "/ˈkɒntrækt/",
    origin: "Latin 'contractus' (drawn together)",
    category: "Contract Law",
    categorySlug: "contract-law",
    isPopular: true,
    simpleMeaning: "A legally binding agreement made between two or more parties that creates mutual obligations enforceable by law.",
    detailedExplanation: "For an agreement to qualify as a valid, enforceable contract, it must satisfy essential legal elements:\n1. Offer and Unconditional Acceptance.\n2. Lawful Consideration (value exchanged).\n3. Capacity of Parties (adult, sound mind).\n4. Free Consent (no coercion or fraud).\n5. Lawful Object.\nContracts can be written, oral, or implied by conduct, though written contracts offer clear evidentiary weight.",
    example: "Elena agreed in writing to build a custom e-commerce mobile app for TechCorp for $12,000 within 60 days. Both parties signed, creating a binding contract.",
    keyPoints: [
      "Requires Offer, Acceptance, Consideration, and Intention to create legal relations.",
      "Enforceable in civil court through damages or specific performance.",
      "Void if entered into under duress, misrepresentation, or illegality."
    ],
    relatedTermSlugs: ["indemnity", "breach-of-contract", "consideration", "force-majeure", "void-ab-initio"]
  },
  {
    slug: "indemnity",
    term: "Indemnity",
    phonetic: "/ɪnˈdɛmnɪti/",
    origin: "Latin 'indemnis' (unhurt / free from loss)",
    category: "Contract Law",
    categorySlug: "contract-law",
    isPopular: true,
    simpleMeaning: "A contractual obligation where one party promises to compensate and protect another party from future loss, damage, or legal liability.",
    detailedExplanation: "Indemnity clauses are standard in commercial contracts, lease agreements, and insurance policies. Under an indemnity clause, the indemnifier promises to 'hold harmless' the indemnified party against financial claims or liabilities arising from specific events, such as copyright infringement or product defects.",
    example: "A software vendor included an indemnity clause promising to reimburse its enterprise client for any legal costs if third parties sued the client claiming the software infringed their patent.",
    keyPoints: [
      "Shifts financial risk and liability from one party to another.",
      "Foundational basis of commercial insurance contracts.",
      "Can cover direct damages, third-party claims, and legal defence costs."
    ],
    relatedTermSlugs: ["contract", "liquidated-damages", "breach-of-contract", "damages"]
  },
  {
    slug: "breach-of-contract",
    term: "Breach of Contract",
    phonetic: "/briːtʃ ɒv ˈkɒntrækt/",
    origin: "Common Law contract principles",
    category: "Contract Law",
    categorySlug: "contract-law",
    isPopular: false,
    simpleMeaning: "The failure of a party to perform any promise or duty agreed upon in a legally binding contract without lawful excuse.",
    detailedExplanation: "A breach can be Minor (partial failure that doesn't defeat the contract's purpose), Material (substantial failure entitling the other party to cancel and sue for damages), or Anticipatory (announcing in advance that one will not perform).",
    example: "A caterer who took an advance payment failed to show up at a corporate gala on the agreed date, committing a material breach of contract.",
    keyPoints: [
      "Entitles the injured party to compensatory damages.",
      "Material breaches excuse the non-breaching party from future performance.",
      "Remedies include damages, rescission, or specific performance."
    ],
    relatedTermSlugs: ["contract", "damages", "specific-performance", "liquidated-damages"]
  },
  {
    slug: "consideration",
    term: "Consideration",
    phonetic: "/kənˌsɪdəˈreɪʃən/",
    origin: "Doctrine of Consideration (Common Law)",
    category: "Contract Law",
    categorySlug: "contract-law",
    isPopular: false,
    simpleMeaning: "Something of value given by each party to a contract, serving as the price for the other party’s promise.",
    detailedExplanation: "Under Anglo-American contract law, a gratuitous promise is not legally enforceable unless backed by consideration. Consideration can be money, goods, services, or an agreement to refrain from doing something (forbearance). It must have some economic value in the eye of the law.",
    example: "When Mark promised to paint Linda's fence and Linda promised to pay him $150, the $150 and the painting service served as mutual consideration.",
    keyPoints: [
      "Essential requirement for a valid contract (No consideration = No contract).",
      "Need not be financially equal, but must be sufficient and lawful.",
      "Past consideration is not valid in some common law jurisdictions."
    ],
    relatedTermSlugs: ["contract", "void-ab-initio", "breach-of-contract"]
  },
  {
    slug: "force-majeure",
    term: "Force Majeure",
    phonetic: "/ˌfɔːrs məˈʒɜːr/",
    origin: "French ('Superior force')",
    category: "Contract Law",
    categorySlug: "contract-law",
    isPopular: false,
    simpleMeaning: "A contract clause that frees parties from liability or obligation when an extraordinary, unforeseeable event beyond their control (like a natural disaster or war) prevents performance.",
    detailedExplanation: "Force Majeure protects contracting parties when unforeseeable 'Acts of God' (earthquakes, floods, volcanic eruptions) or human crises (war, government lockdowns, widespread strikes) make fulfilling contractual obligations physically or legally impossible.",
    example: "Due to an unexpected volcanic eruption shutting down all international airspace for two weeks, an airline invoked the force majeure clause to avoid paying cancellation penalties.",
    keyPoints: [
      "Must be explicitly drafted into the contract.",
      "Requires showing the event was unforeseeable, unavoidable, and impossible to overcome.",
      "Temporarily suspends or completely discharges contractual obligations."
    ],
    relatedTermSlugs: ["contract", "breach-of-contract", "liquidated-damages"]
  },
  {
    slug: "liquidated-damages",
    term: "Liquidated Damages",
    phonetic: "/ˈlɪkwɪdeɪtɪd ˈdæmɪdʒɪz/",
    origin: "Commercial contract drafting",
    category: "Contract Law",
    categorySlug: "contract-law",
    isPopular: false,
    simpleMeaning: "A pre-agreed fixed amount of money specified in a contract that one party must pay if they breach the contract.",
    detailedExplanation: "Liquidated damages clauses save litigation time by establishing damages in advance where calculating exact future losses would be difficult. To be legally enforceable, the amount must represent a reasonable pre-estimate of loss rather than an excessive penalty designed to intimidate.",
    example: "A commercial building contract stipulated $1,000 per day in liquidated damages for every day the construction delivery was delayed beyond October 1st.",
    keyPoints: [
      "Pre-determined sum specified directly in the agreement.",
      "Must reflect a genuine pre-estimate of potential damages.",
      "Courts strike down clauses that function as punitive penalties."
    ],
    relatedTermSlugs: ["damages", "breach-of-contract", "contract", "indemnity"]
  },
  {
    slug: "void-ab-initio",
    term: "Void Ab Initio",
    phonetic: "/vɔɪd æb ɪˈnɪʃioʊ/",
    origin: "Latin ('Invalid from the beginning')",
    category: "Contract Law",
    categorySlug: "contract-law",
    isPopular: false,
    simpleMeaning: "Having no legal effect or validity from the very moment it was created, as if it never existed in law.",
    detailedExplanation: "An agreement that violates public policy, involves an illegal subject matter (such as smuggling), or is signed by an incompetent party is considered void ab initio. Unlike voidable contracts (which remain valid until repudiated), a void ab initio agreement cannot be ratified or enforced by any court.",
    example: "An agreement to purchase stolen vehicles was declared void ab initio because the subject matter was criminal and unlawful.",
    keyPoints: [
      "Never had any legal force from its inception.",
      "Cannot be cured or ratified by subsequent consent.",
      "No party can claim damages for breach of a void ab initio contract."
    ],
    relatedTermSlugs: ["contract", "annulment", "ultra-vires"]
  },

  // 7. Property Law
  {
    slug: "easement",
    term: "Easement",
    phonetic: "/ˈiːzmənt/",
    origin: "Old French 'aisement' (convenience / comfort)",
    category: "Property Law",
    categorySlug: "property-law",
    isPopular: false,
    simpleMeaning: "A legal right allowing a property owner to use a specific portion of someone else’s land for a particular purpose, such as a driveway or utility line.",
    detailedExplanation: "An easement grants limited non-possessory rights over neighbouring land. Common examples include an Easement of Way (granting access to a landlocked parcel) and utility easements for power grids or municipal water pipes. Easements run with the land and pass to subsequent buyers.",
    example: "Because James's cottage had no direct road access, he held a deeded easement allowing him to drive along a 10-foot gravel driveway across his neighbor's parcel.",
    keyPoints: [
      "Grants a right to use land, not title or ownership.",
      "Can be created by deed, necessity, or long continuous use (prescription).",
      "Transfers automatically when the land is sold."
    ],
    relatedTermSlugs: ["title-deed", "freehold", "leasehold", "adverse-possession"]
  },
  {
    slug: "freehold",
    term: "Freehold",
    phonetic: "/ˈfriːhoʊld/",
    origin: "Feudal English land tenure",
    category: "Property Law",
    categorySlug: "property-law",
    isPopular: false,
    simpleMeaning: "A form of property ownership where the owner owns the land and the buildings on it outright for an indefinite, unlimited duration.",
    detailedExplanation: "Freehold is the most complete form of real estate ownership (Fee Simple). The owner has unrestricted rights to live in, remodel, lease, mortgage, or bequeath the property to heirs, subject only to local zoning and statutory laws.",
    example: "David bought the freehold rights to a residential bungalow, giving him permanent ownership of both the structure and the land underneath forever.",
    keyPoints: [
      "Permanent, perpetual ownership without expiration.",
      "Owner holds maximum legal rights over land and structures.",
      "Contrasts with leasehold ownership which has fixed term limits."
    ],
    relatedTermSlugs: ["leasehold", "title-deed", "easement"]
  },
  {
    slug: "leasehold",
    term: "Leasehold",
    phonetic: "/ˈliːshoʊld/",
    origin: "English property law",
    category: "Property Law",
    categorySlug: "property-law",
    isPopular: false,
    simpleMeaning: "An ownership arrangement where a tenant holds the right to occupy land or a building for a specific period of time set by a lease agreement.",
    detailedExplanation: "In a leasehold, the buyer (lessee) purchases the right to live in or use a property for a fixed number of years (often 99 or 999 years in long leases, or 1-5 years in commercial rentals) from the freeholder/landlord, while paying periodic ground rent or fees.",
    example: "Maria purchased an apartment in central London on a 99-year leasehold, paying an annual ground rent to the building freeholder.",
    keyPoints: [
      "Ownership expires when the lease term concludes.",
      "Subject to landlord conditions, ground rent, and maintenance fees.",
      "Lessee can extend the lease subject to statutory guidelines."
    ],
    relatedTermSlugs: ["freehold", "title-deed", "contract", "easement"]
  },
  {
    slug: "title-deed",
    term: "Title Deed",
    phonetic: "/ˈtaɪtl diːd/",
    origin: "Conveyancing and property documentation",
    category: "Property Law",
    categorySlug: "property-law",
    isPopular: false,
    simpleMeaning: "A formal legal document that serves as registered evidence of a person's legal ownership of a property.",
    detailedExplanation: "A title deed outlines the exact legal chain of ownership, boundary dimensions, mortgages, and encumbrances on a piece of real estate. When real property is bought or sold, conveyancers register a new deed with the municipal land registry.",
    example: "Before granting a home loan, the bank inspected the original title deeds to confirm the seller had a clean, undisputed title with no existing mortgages.",
    keyPoints: [
      "Primary conclusive evidence of real estate ownership.",
      "Details boundaries, prior owners, covenants, and easements.",
      "Must be registered with local land authorities."
    ],
    relatedTermSlugs: ["freehold", "leasehold", "adverse-possession", "easement"]
  },
  {
    slug: "adverse-possession",
    term: "Adverse Possession",
    phonetic: "/ædˈvɜːrs pəˈzɛʃən/",
    origin: "Doctrine of Squatter's Rights (Common Law)",
    category: "Property Law",
    categorySlug: "property-law",
    isPopular: false,
    simpleMeaning: "A legal principle where someone who openly occupies another person’s unused land without permission for a long statutory period can claim legal ownership.",
    detailedExplanation: "Adverse possession requires the occupation to be Open, Hostile (without owner permission), Actual, and Continuous for the full statutory period (often 10 to 20 years depending on jurisdiction). If the true owner takes no action to evict the occupier during this period, their right to reclaim the land is extinguished.",
    example: "A farmer built a fence enclosing an abandoned two-acre strip next to his farm and cultivated it openly for 22 years without objection, winning title via adverse possession.",
    keyPoints: [
      "Occupation must be continuous, open, notorious, and adverse.",
      "Extinguishes the original owner's title if they sleep on their rights.",
      "Aimed at ensuring efficient utilization and boundary certainty of land."
    ],
    relatedTermSlugs: ["title-deed", "freehold", "easement"]
  },

  // 8. Labour Law
  {
    slug: "severance-pay",
    term: "Severance Pay",
    phonetic: "/ˈsɛvərəns peɪ/",
    origin: "Employment & industrial relations law",
    category: "Labour Law",
    categorySlug: "labour-law",
    isPopular: false,
    simpleMeaning: "Compensation and benefits provided by an employer to an employee whose employment is terminated without cause or due to redundancy.",
    detailedExplanation: "Severance pay is usually calculated based on the employee's length of service (such as two weeks of pay per year worked) and may include accrued vacation time, continued medical coverage, and job placement assistance.",
    example: "When the corporate division was restructured, laid-off engineers received 6 months of severance pay and 1 year of extended health insurance.",
    keyPoints: [
      "Helps cushion workers during involuntary layoffs or restructuring.",
      "Calculated based on tenure and employment contract terms.",
      "Often conditioned on signing a liability release waiver."
    ],
    relatedTermSlugs: ["retrenchment", "collective-bargaining", "unfair-labour-practice"]
  },
  {
    slug: "retrenchment",
    term: "Retrenchment",
    phonetic: "/rɪˈtrɛntʃmənt/",
    origin: "Industrial dispute statutory codes",
    category: "Labour Law",
    categorySlug: "labour-law",
    isPopular: false,
    simpleMeaning: "The termination of an employee’s service by an employer due to surplus staff, economic distress, or technological changes rather than disciplinary misconduct.",
    detailedExplanation: "Retrenchment requires compliance with statutory labor laws, such as giving advance written notice, consulting trade unions, following the 'Last In, First Out' (LIFO) seniority rule, and paying statutory retrenchment compensation.",
    example: "After automating factory assembly lines, the automobile plant carried out retrenchment of 80 workers while paying statutory compensation and notice pay.",
    keyPoints: [
      "Arises from economic redundancy, not personal employee fault.",
      "Requires statutory notice and compensation.",
      "Often subject to the Last-In, First-Out (LIFO) principle."
    ],
    relatedTermSlugs: ["severance-pay", "unfair-labour-practice", "collective-bargaining"]
  },
  {
    slug: "collective-bargaining",
    term: "Collective Bargaining",
    phonetic: "/kəˈlɛktɪv ˈbɑːrɡənɪŋ/",
    origin: "Trade union and labour rights movement",
    category: "Labour Law",
    categorySlug: "labour-law",
    isPopular: false,
    simpleMeaning: "A formal negotiation process between an employer and a recognized trade union representing employees to agree upon wages, benefits, and workplace conditions.",
    detailedExplanation: "Collective bargaining results in a Collective Bargaining Agreement (CBA), which governs employment terms for all workers in the bargaining unit. It balances bargaining power between individual workers and large corporations.",
    example: "The transit workers' union engaged in 3 weeks of collective bargaining, successfully securing an 8% wage increase and improved safety protocols.",
    keyPoints: [
      "Empowers workers through organized union representation.",
      "Produces legally binding Collective Bargaining Agreements (CBAs).",
      "Reduces workplace conflict through structured dispute resolution."
    ],
    relatedTermSlugs: ["unfair-labour-practice", "severance-pay", "retrenchment"]
  },
  {
    slug: "unfair-labour-practice",
    term: "Unfair Labour Practice",
    phonetic: "/ʌnˈfɛər ˈleɪbər ˈpræktɪs/",
    origin: "Statutory industrial relations acts",
    category: "Labour Law",
    categorySlug: "labour-law",
    isPopular: false,
    simpleMeaning: "Actions by an employer or union that violate labor laws, such as retaliating against workers for unionizing or refusing to bargain in good faith.",
    detailedExplanation: "Examples include firing employees for participating in lawful union activities, threatening plant closures to discourage organizing, or blacklisting union members.",
    example: "The labour tribunal penalized a warehouse manager who fired three employees for distributing union flyers during their lunch breaks.",
    keyPoints: [
      "Prohibited by national and international labour standards.",
      "Protects workers' right to organize without fear of reprisal.",
      "Tribunals can order reinstatement with full back-pay."
    ],
    relatedTermSlugs: ["collective-bargaining", "retrenchment", "severance-pay"]
  },
  {
    slug: "gratuity",
    term: "Gratuity",
    phonetic: "/ɡrəˈtjuːɪti/",
    origin: "Latin 'gratuitas' (free gift / favor)",
    category: "Labour Law",
    categorySlug: "labour-law",
    isPopular: false,
    simpleMeaning: "A statutory lump-sum financial benefit paid by an employer to an employee as a reward for long-term continuous service upon retirement or resignation.",
    detailedExplanation: "Gratuity is a retirement benefit mandated by statute in several jurisdictions for employees who complete a minimum period of continuous service (such as 5 continuous years).",
    example: "Upon retiring after 25 years of service at the engineering firm, Ramesh received a statutory gratuity payout of $28,000.",
    keyPoints: [
      "Mandated retirement benefit for long-term employees.",
      "Exempt from taxes up to statutory thresholds.",
      "Payable upon retirement, resignation, death, or disablement."
    ],
    relatedTermSlugs: ["severance-pay", "retrenchment"]
  },

  // 9. Cyber Law
  {
    slug: "data-privacy",
    term: "Data Privacy",
    phonetic: "/ˈdeɪtə ˈpraɪvəsi/",
    origin: "Information technology regulations (GDPR / CCPA)",
    category: "Cyber Law",
    categorySlug: "cyber-law",
    isPopular: false,
    simpleMeaning: "The branch of law that governs how individuals' personal information is collected, stored, processed, shared, and protected by organizations.",
    detailedExplanation: "Data privacy regulations (like the EU GDPR and California CCPA) grant individuals rights over their personal data, including the right to access, rectify, and erase their records ('Right to be Forgotten'). Organizations must obtain explicit consent and implement robust cybersecurity safeguards.",
    example: "A social media platform was fined $40 million for tracking users' browsing history without their explicit opt-in consent, violating data privacy regulations.",
    keyPoints: [
      "Governs personal identifiable information (PII).",
      "Grants users rights to consent, access, and deletion.",
      "Imposes hefty fines for unauthorized data leaks or surveillance."
    ],
    relatedTermSlugs: ["intermediary-liability", "phishing", "intellectual-property-infringement"]
  },
  {
    slug: "intermediary-liability",
    term: "Intermediary Liability",
    phonetic: "/ˌɪntərˈmiːdiɛri ˌlaɪəˈbɪlɪti/",
    origin: "Internet safe harbor statutes (Section 230 / DMCA)",
    category: "Cyber Law",
    categorySlug: "cyber-law",
    isPopular: false,
    simpleMeaning: "The legal responsibility that internet platforms and service providers hold for illegal content or copyright violations uploaded by their third-party users.",
    detailedExplanation: "Under 'Safe Harbor' doctrines, internet intermediaries (such as YouTube, Reddit, or cloud hosts) are shielded from liability for user content provided they act as neutral carriers and promptly take down offending material upon receiving verified notice.",
    example: "When a user uploaded a pirated movie clip to a video-sharing site, the platform avoided copyright liability by immediately removing the video after the studio filed a takedown notice.",
    keyPoints: [
      "Provides safe-harbor protections for tech platforms.",
      "Conditional on prompt 'Notice and Takedown' compliance.",
      "Balancing free expression with copyright and safety protections."
    ],
    relatedTermSlugs: ["data-privacy", "intellectual-property-infringement", "safe-harbor"]
  },
  {
    slug: "phishing",
    term: "Phishing",
    phonetic: "/ˈfɪʃɪŋ/",
    origin: "Cybercrime nomenclature",
    category: "Cyber Law",
    categorySlug: "cyber-law",
    isPopular: false,
    simpleMeaning: "A fraudulent cybercrime where attackers pose as legitimate organizations via email or websites to deceive individuals into revealing passwords or financial credentials.",
    detailedExplanation: "Phishing is prosecuted under cybercrime and fraud statutes. Perpetrators face severe criminal charges including wire fraud, unauthorized system access, and identity theft.",
    example: "Cybercriminals sent deceptive emails masquerading as a national bank, tricking 200 customers into entering their banking PINs on a spoofed login page.",
    keyPoints: [
      "Severe criminal offence under computer fraud and cybercrime laws.",
      "Combines social engineering with technological deception.",
      "Carries criminal penalties, asset confiscation, and restitution orders."
    ],
    relatedTermSlugs: ["data-privacy", "safe-harbor", "intermediary-liability"]
  },
  {
    slug: "safe-harbor",
    term: "Safe Harbor",
    phonetic: "/seɪf ˈhɑːrbər/",
    origin: "Statutory immunity provisions",
    category: "Cyber Law",
    categorySlug: "cyber-law",
    isPopular: false,
    simpleMeaning: "A legal provision that provides protection from liability or penalties if specific established rules and compliance standards are followed.",
    detailedExplanation: "In cyber law and securities law, Safe Harbor provisions give companies certainty that they will not be sued if they adhere strictly to established protocols, such as removing infringing content or encrypting medical records.",
    example: "An online marketplace qualified for safe harbor protection against counterfeit seller listings because it maintained an automated reporting and removal system.",
    keyPoints: [
      "Shields qualifying entities from statutory penalties.",
      "Encourages standard compliance and proactive moderation.",
      "Widely utilized across technology, tax, and securities law."
    ],
    relatedTermSlugs: ["intermediary-liability", "data-privacy"]
  },
  {
    slug: "intellectual-property-infringement",
    term: "Intellectual Property Infringement",
    phonetic: "/ˌɪntəˈlɛktʃuəl ˈprɒpərti ɪnˈfrɪndʒmənt/",
    origin: "IP treaties (Berne Convention / TRIPS)",
    category: "Cyber Law",
    categorySlug: "cyber-law",
    isPopular: false,
    simpleMeaning: "The unauthorized use, copying, reproduction, or distribution of copyrighted, patented, or trademarked material without the owner's permission.",
    detailedExplanation: "IP infringement spans online piracy, counterfeiting, illegal software distribution, and trademark cybersquatting. Remedies include statutory damages, court injunctions, and seizure of infringing servers or goods.",
    example: "A mobile game developer copied artwork and characters directly from an indie creator's game, losing a $250,000 copyright infringement lawsuit.",
    keyPoints: [
      "Protects patents, copyrights, trademarks, and trade secrets.",
      "Civil remedies include injunctions and lost profit damages.",
      "Willful digital piracy can also trigger criminal prosecution."
    ],
    relatedTermSlugs: ["injunction", "damages", "intermediary-liability"]
  },

  // 10. Tax Law
  {
    slug: "capital-gains-tax",
    term: "Capital Gains Tax",
    phonetic: "/ˈkæpɪtl ɡeɪnz tæks/",
    origin: "Revenue and taxation statutes",
    category: "Tax Law",
    categorySlug: "tax-law",
    isPopular: false,
    simpleMeaning: "A tax levied on the profit realized from the sale of a non-inventory asset, such as real estate, stocks, or precious metals.",
    detailedExplanation: "Capital gains tax is classified into Short-Term Capital Gains (assets held for a brief period, taxed at standard income brackets) and Long-Term Capital Gains (assets held beyond a statutory threshold, often taxed at preferential lower rates with indexation benefits).",
    example: "Maria bought shares for $10,000 and sold them 3 years later for $25,000, paying capital gains tax on the $15,000 realized profit.",
    keyPoints: [
      "Tax applies only upon the realization (sale) of the asset.",
      "Differentiates between short-term and long-term holding periods.",
      "Capital losses can often offset capital gains to lower tax liability."
    ],
    relatedTermSlugs: ["tax-deductible", "tds", "transfer-pricing"]
  },
  {
    slug: "tax-deductible",
    term: "Tax Deductible",
    phonetic: "/tæks dɪˈdʌktəbəl/",
    origin: "Fiscal revenue legislation",
    category: "Tax Law",
    categorySlug: "tax-law",
    isPopular: false,
    simpleMeaning: "An expense or payment that an individual or company can subtract from their gross income to lower their taxable income and pay less tax.",
    detailedExplanation: "Tax deductions encourage specific social and economic activities, such as charitable donations, retirement savings contributions, business operating expenses, and home loan interest payments.",
    example: "A freelance graphic designer deducted $1,800 spent on software subscriptions and equipment from her gross earnings, reducing her total taxable income.",
    keyPoints: [
      "Directly reduces the gross income subject to tax.",
      "Must be substantiated with receipts and invoices.",
      "Distinguished from tax credits, which reduce the final tax bill dollar-for-dollar."
    ],
    relatedTermSlugs: ["capital-gains-tax", "tds", "transfer-pricing"]
  },
  {
    slug: "tds",
    term: "TDS (Tax Deducted at Source)",
    phonetic: "/tiː diː ɛs/",
    origin: "Withholding tax mechanisms",
    category: "Tax Law",
    categorySlug: "tax-law",
    isPopular: false,
    simpleMeaning: "A system where the person or entity paying a fee, salary, or rent deducts tax before making payment and deposits it directly with the government.",
    detailedExplanation: "TDS operates on the 'pay as you earn' principle. It ensures regular tax collection for the government and curbs tax evasion by withholding tax at the point where income is generated.",
    example: "A corporation paying a consulting fee of $5,000 deducted 10% ($500) TDS and remitted $4,500 to the consultant while submitting $500 to the tax department under the consultant's tax ID.",
    keyPoints: [
      "Collects tax at the exact source of income generation.",
      "The payee receives a tax credit certificate for deducted amounts.",
      "Failure by the payer to deduct or remit TDS attracts penalties and interest."
    ],
    relatedTermSlugs: ["tax-deductible", "capital-gains-tax"]
  },
  {
    slug: "transfer-pricing",
    term: "Transfer Pricing",
    phonetic: "/ˈtrænsfər ˈpraɪsɪŋ/",
    origin: "International corporate tax rules (OECD guidelines)",
    category: "Tax Law",
    categorySlug: "tax-law",
    isPopular: false,
    simpleMeaning: "The pricing rules applied to transactions (goods, services, loans) conducted between related companies or subsidiaries belonging to the same corporate group.",
    detailedExplanation: "To prevent multinational corporations from shifting profits to tax havens, tax authorities require transactions between sister companies to be conducted at 'Arm's Length'—the price that unrelated third parties would negotiate in an open market.",
    example: "A multinational sold electronics from its low-tax subsidiary to its high-tax division at inflated prices. The tax audit adjusted the figures to arm's length value, issuing a back-tax assessment.",
    keyPoints: [
      "Mandates the 'Arm's Length Principle' for inter-company dealings.",
      "Prevents base erosion and profit shifting (BEPS) to low-tax jurisdictions.",
      "Requires detailed economic documentation and benchmarking studies."
    ],
    relatedTermSlugs: ["capital-gains-tax", "tax-deductible"]
  },
  {
    slug: "double-taxation-avoidance",
    term: "Double Taxation Avoidance Agreement (DTAA)",
    phonetic: "/ˈdʌbəl tækˈseɪʃən əˈvɔɪdəns/",
    origin: "Bilateral international tax treaties",
    category: "Tax Law",
    categorySlug: "tax-law",
    isPopular: false,
    simpleMeaning: "A tax treaty signed between two countries to ensure that an individual or business does not get taxed twice on the same earned income.",
    detailedExplanation: "DTAAs clarify which country has the primary right to tax specific income streams (such as royalties, dividends, salaries, or capital gains) and provide tax credits or exemptions to cross-border professionals and global companies.",
    example: "An expat working in Singapore who earned royalties from the UK claimed treaty relief under the UK-Singapore DTAA, avoiding paying full taxes to both governments.",
    keyPoints: [
      "Eliminates double taxation on cross-border income.",
      "Promotes international trade and foreign direct investment.",
      "Provides for exchange of tax information between treaty partners."
    ],
    relatedTermSlugs: ["transfer-pricing", "capital-gains-tax"]
  },

  // 11. Consumer Law
  {
    slug: "unfair-trade-practice",
    term: "Unfair Trade Practice",
    phonetic: "/ʌnˈfɛər treɪd ˈpræktɪs/",
    origin: "Consumer protection legislation",
    category: "Consumer Law",
    categorySlug: "consumer-law",
    isPopular: false,
    simpleMeaning: "Deceptive, fraudulent, or unethical business practices used to trick or mislead consumers into purchasing goods or services.",
    detailedExplanation: "Unfair trade practices include false advertising, bait-and-switch pricing, selling expired or adulterated goods, making misleading claims regarding warranty or origin, and refusing to honor standard return rights.",
    example: "A fitness brand falsely claimed its herbal shake was clinically proven to melt 10kg in one week. The consumer protection court ordered a full refund to all buyers and a $500,000 fine.",
    keyPoints: [
      "Protects buyers from deceptive commercial conduct.",
      "Covers false warranties, counterfeit labeling, and misleading ads.",
      "Consumer courts can order refunds, compensation, and punitive damages."
    ],
    relatedTermSlugs: ["product-liability", "defect-in-goods", "deficiency-of-service"]
  },
  {
    slug: "product-liability",
    term: "Product Liability",
    phonetic: "/ˈprɒdʌkt ˌlaɪəˈbɪlɪti/",
    origin: "Tort & consumer protection statutory regimes",
    category: "Consumer Law",
    categorySlug: "consumer-law",
    isPopular: false,
    simpleMeaning: "The legal responsibility of manufacturers, distributors, and sellers to compensate buyers for injuries or damages caused by defective or dangerous products.",
    detailedExplanation: "Product liability holds companies accountable for Manufacturing Defects, Design Defects, or Failure to Warn (inadequate safety warnings or instructions). In many jurisdictions, this liability is strict, meaning the injured consumer does not need to prove negligence, only that the product was defective and caused injury.",
    example: "When a newly purchased blender exploded due to a faulty blade assembly and caused burns, the manufacturer was held strictly liable for the user's medical bills.",
    keyPoints: [
      "Applies across the manufacturing and retail supply chain.",
      "Covers design defects, manufacturing errors, and warning failures.",
      "Often governed by strict liability standards."
    ],
    relatedTermSlugs: ["unfair-trade-practice", "defect-in-goods", "tort", "negligence"]
  },
  {
    slug: "defect-in-goods",
    term: "Defect in Goods",
    phonetic: "/dɪˈfɛkt ɪn ɡʊdz/",
    origin: "Sale of Goods acts & consumer codes",
    category: "Consumer Law",
    categorySlug: "consumer-law",
    isPopular: false,
    simpleMeaning: "Any fault, imperfection, or shortcoming in the quality, quantity, purity, or standard of a product compared to what was legally promised or required.",
    detailedExplanation: "Goods must be fit for purpose and of merchantable quality. If a product fails to perform as advertised or harbors hidden flaws, the consumer is entitled to replacement, repair, or a full refund under consumer protection laws.",
    example: "A laptop had a malfunctioning motherboard that caused it to shut down every 10 minutes from day one. The consumer forum ordered the retailer to replace the laptop with a brand-new unit.",
    keyPoints: [
      "Breaches implied statutory warranties of merchantability.",
      "Obligates seller/manufacturer to repair, replace, or refund.",
      "Consumer must notify seller within reasonable time of discovery."
    ],
    relatedTermSlugs: ["product-liability", "deficiency-of-service", "unfair-trade-practice"]
  },
  {
    slug: "deficiency-of-service",
    term: "Deficiency of Service",
    phonetic: "/dɪˈfɪʃənsi ɒv ˈsɜːrvɪs/",
    origin: "Consumer dispute resolution statutes",
    category: "Consumer Law",
    categorySlug: "consumer-law",
    isPopular: false,
    simpleMeaning: "Any fault, imperfection, or inadequacy in the quality, nature, and manner of performance of a promised service by a bank, hospital, airline, or professional.",
    detailedExplanation: "Covers failures by service providers—such as airlines losing baggage without explanation, hospitals failing to maintain emergency care protocols, or banks wrongfully bouncing customer cheques.",
    example: "An airline delayed passenger luggage for 6 days during an overseas wedding trip without offering basic amenities, and was ordered by the consumer forum to pay $2,000 compensation.",
    keyPoints: [
      "Applies to hospitality, banking, healthcare, telecommunications, and aviation.",
      "Compensates for mental agony, financial loss, and inconvenience.",
      "Enforceable in consumer commissions."
    ],
    relatedTermSlugs: ["unfair-trade-practice", "defect-in-goods", "damages"]
  },
  {
    slug: "consumer-dispute",
    term: "Consumer Dispute",
    phonetic: "/kənˈsjuːmər dɪˈspjuːt/",
    origin: "Alternative dispute & consumer tribunal rules",
    category: "Consumer Law",
    categorySlug: "consumer-law",
    isPopular: false,
    simpleMeaning: "A formal disagreement where a consumer makes a complaint against a trader or service provider, and the business denies or disputes the allegations.",
    detailedExplanation: "Consumer disputes are resolved in specialized, low-cost Consumer Redressal Forums designed to offer speedy justice without requiring cumbersome formal court procedures or heavy legal fees.",
    example: "When an online store refused to refund money for an item returned within policy, the customer filed a consumer dispute on the national consumer grievance portal.",
    keyPoints: [
      "Adjudicated in specialized consumer protection tribunals.",
      "Fast-track, low-cost procedure accessible without hiring a lawyer.",
      "Enforces consumer rights to safety, information, and redressal."
    ],
    relatedTermSlugs: ["unfair-trade-practice", "deficiency-of-service", "defect-in-goods"]
  },

  // 12. Evidence Law
  {
    slug: "hearsay-evidence",
    term: "Hearsay Evidence",
    phonetic: "/ˈhɪərseɪ ˈɛvɪdəns/",
    origin: "Common Law rule against hearsay",
    category: "Evidence Law",
    categorySlug: "evidence-law",
    isPopular: false,
    simpleMeaning: "Second-hand testimony where a witness repeats in court what someone else told them outside the courtroom, generally not admissible as evidence.",
    detailedExplanation: "Hearsay is generally inadmissible because the person who originally made the statement was not under oath and cannot be cross-examined by the opposing party. Key statutory exceptions include Dying Declarations, business records kept in the normal course of business, and spontaneous statements (Res Gestae).",
    example: "A witness attempted to testify: 'My neighbor told me he saw Mark running from the crime scene.' The judge sustained an objection, ruling the statement inadmissible hearsay.",
    keyPoints: [
      "Generally inadmissible due to lack of cross-examination opportunity.",
      "Prevents unreliable second-hand rumors from tainting verdicts.",
      "Exceptions include dying declarations, admissions, and official records."
    ],
    relatedTermSlugs: ["admissibility", "dying-declaration", "prima-facie", "burden-of-proof"]
  },
  {
    slug: "burden-of-proof",
    term: "Burden of Proof",
    phonetic: "/ˈbɜːrdn ɒv pruːf/",
    origin: "Latin 'onus probandi' (burden of proving)",
    category: "Evidence Law",
    categorySlug: "evidence-law",
    isPopular: false,
    simpleMeaning: "The legal obligation of a party in a trial to present sufficient evidence to prove the claims or charges they have made.",
    detailedExplanation: "In criminal trials, the burden of proof rests on the prosecution and requires proving guilt 'Beyond a Reasonable Doubt'. In civil lawsuits, the plaintiff carries the burden to prove the case on a 'Preponderance of the Probabilities' (more likely true than not).",
    example: "In a theft trial, the defendant does not have to prove his innocence; rather, the state prosecution carries the heavy burden of proof to demonstrate his guilt beyond a reasonable doubt.",
    keyPoints: [
      "Criminal standard: Beyond a reasonable doubt.",
      "Civil standard: Preponderance of probabilities (balance of evidence).",
      "Rests on the party who asserts the affirmative of an issue."
    ],
    relatedTermSlugs: ["prima-facie", "admissibility", "plaintiff", "defendant"]
  },
  {
    slug: "prima-facie",
    term: "Prima Facie",
    phonetic: "/ˌpraɪmə ˈfeɪʃi/",
    origin: "Latin ('At first face / on its face')",
    category: "Evidence Law",
    categorySlug: "evidence-law",
    isPopular: false,
    simpleMeaning: "Sufficient evidence that establishes a fact or case as legally valid at first glance, unless disproved or rebutted by contrary evidence.",
    detailedExplanation: "A prima facie case means that the plaintiff or prosecution has presented enough initial evidence on all essential legal elements so that the judge will not dismiss the case immediately, requiring the defendant to present a defense.",
    example: "The prosecution presented fingerprint matches and security footage placing the suspect at the scene, successfully establishing a prima facie case of burglary.",
    keyPoints: [
      "Establishes a legally sufficient presumption at initial viewing.",
      "Shifts the evidentiary burden to the other side to rebut the evidence.",
      "Necessary threshold to prevent summary dismissal of a case."
    ],
    relatedTermSlugs: ["burden-of-proof", "estoppel", "admissibility"]
  },
  {
    slug: "estoppel",
    term: "Estoppel",
    phonetic: "/ɪˈstɒpəl/",
    origin: "Old French 'estoupail' (bung / stopper)",
    category: "Evidence Law",
    categorySlug: "evidence-law",
    isPopular: false,
    simpleMeaning: "A legal principle that prevents a person from denying or contradicting a previous statement, promise, or representation they made, especially if someone else relied upon it.",
    detailedExplanation: "Estoppel promotes honesty and fair dealing. Under Promissory Estoppel, if Person A makes a clear promise to Person B, and Person B reasonably alters their position to their economic detriment relying on that promise, Person A is 'estopped' from breaking the promise even without formal contract consideration.",
    example: "A landlord told a tenant: 'Don't worry, you can stay for 3 extra months rent-free to finish your project.' When the tenant turned down other housing, the landlord was estopped from evicting him.",
    keyPoints: [
      "Prevents parties from taking contradictory legal stances.",
      "Promissory estoppel protects reasonable, detrimental reliance.",
      "Serves as an equitable shield in civil and evidentiary disputes."
    ],
    relatedTermSlugs: ["contract", "consideration", "admissibility"]
  },
  {
    slug: "admissibility",
    term: "Admissibility",
    phonetic: "/ədˌmɪsəˈbɪlɪti/",
    origin: "Judicial evidence codes",
    category: "Evidence Law",
    categorySlug: "evidence-law",
    isPopular: false,
    simpleMeaning: "The quality of evidence being legally acceptable, relevant, and proper to be received and considered by a judge or jury in a trial.",
    detailedExplanation: "For evidence to be admissible, it must be relevant, material, and obtained through lawful procedures. Evidence obtained through unconstitutional searches, forced confessions, or privileged attorney-client discussions is generally declared inadmissible.",
    example: "The defense lawyer successfully argued that an audio recording made without required judicial wiretap approval was inadmissible in court.",
    keyPoints: [
      "Evidence must be both relevant and lawfully obtained.",
      "Inadmissible evidence is completely excluded from judicial consideration.",
      "Governed by rules against hearsay, prejudice, and unlawful search."
    ],
    relatedTermSlugs: ["hearsay-evidence", "burden-of-proof", "prima-facie"]
  },
  {
    slug: "dying-declaration",
    term: "Dying Declaration",
    phonetic: "/ˈdaɪɪŋ ˌdɛkləˈreɪʃən/",
    origin: "Common Law exception to hearsay rule",
    category: "Evidence Law",
    categorySlug: "evidence-law",
    isPopular: false,
    simpleMeaning: "A statement made by a dying person regarding the cause and circumstances of their impending death, admissible in court because a dying person is presumed to speak the truth.",
    detailedExplanation: "The legal maxim 'Nemo moriturus praesumitur mentiri' (a dying person is not presumed to lie) underpins this rule. Because the declarant genuinely believes death is imminent, the declaration is treated as exceptionally credible and serves as a recognized exception to the hearsay rule.",
    example: "Before passing away in the trauma ward, a gunshot victim named his attacker to the attending doctor and magistrate. The statement was admitted as a dying declaration.",
    keyPoints: [
      "Crucial exception to the hearsay evidence rule.",
      "Requires that the victim believed their death was imminent.",
      "Can serve as the primary basis for convicting an assailant."
    ],
    relatedTermSlugs: ["hearsay-evidence", "admissibility", "burden-of-proof"]
  },
  {
    slug: "surety",
    term: "Surety",
    phonetic: "/ˈʃʊərəti/",
    origin: "Old French 'seurte' (security / pledge)",
    category: "Criminal Law",
    categorySlug: "criminal-law",
    isPopular: false,
    simpleMeaning: "A person who formally assumes legal responsibility for paying someone else's debt or ensuring an accused appears in court.",
    detailedExplanation: "In bail proceedings, a surety signs a bond pledging their own financial assets or property as security. If the accused fails to show up on the trial date, the surety forfeits the pledged bond amount to the state.",
    example: "Rohan's uncle acted as a surety, submitting his property documents to secure Rohan's bail release.",
    keyPoints: [
      "Guarantees the accused's attendance in court.",
      "Subject to forfeiture if bail conditions are breached.",
      "Must be solvent and approved by the court magistrate."
    ],
    relatedTermSlugs: ["bail", "arrest", "custody", "warrant"]
  },
  {
    slug: "specific-performance",
    term: "Specific Performance",
    phonetic: "/spəˈsɪfɪk pərˈfɔːrməns/",
    origin: "Equitable remedy doctrine",
    category: "Contract Law",
    categorySlug: "contract-law",
    isPopular: false,
    simpleMeaning: "An order by a court compelling a breaching party to perform the exact duty or contract agreed upon, rather than simply paying money damages.",
    detailedExplanation: "Specific performance is granted when the subject matter is unique and financial compensation is inadequate, such as in sales of specific land parcels, rare art pieces, or unique patents.",
    example: "The seller tried to cancel a signed sale contract for a historic estate; the court ordered specific performance, forcing him to complete the conveyance.",
    keyPoints: [
      "Equitable discretionary remedy.",
      "Applied when monetary damages are inadequate.",
      "Common in real estate and unique asset transactions."
    ],
    relatedTermSlugs: ["contract", "breach-of-contract", "damages", "injunction"]
  },
  {
    slug: "strict-liability",
    term: "Strict Liability",
    phonetic: "/strɪkt ˌlaɪəˈbɪlɪti/",
    origin: "Rylands v. Fletcher doctrine",
    category: "Civil Law",
    categorySlug: "civil-law",
    isPopular: false,
    simpleMeaning: "Legal responsibility for damages or harm caused by hazardous activities, regardless of whether there was negligence or fault.",
    detailedExplanation: "Under strict liability, a defendant is liable for harm even if they took all reasonable precautions. It commonly applies to hazardous industrial materials, wild animal ownership, and defective consumer manufacturing.",
    example: "A chemical plant stored toxic gas that leaked into a nearby reservoir; the plant was held strictly liable for crop damages without plaintiffs needing to prove fault.",
    keyPoints: [
      "No requirement to prove fault or negligence.",
      "Applies to inherently dangerous or ultra-hazardous activities.",
      "Focuses on victim compensation and enterprise liability."
    ],
    relatedTermSlugs: ["tort", "negligence", "damages", "product-liability"]
  }
];

// Helper functions
export function getTermBySlug(slug) {
  if (!slug) return null;
  return LEGAL_TERMS.find(t => t.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export function getCategoryBySlug(slug) {
  if (!slug) return null;
  return CATEGORIES.find(c => c.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export function getTermsByCategory(categorySlug) {
  if (!categorySlug) return [];
  return LEGAL_TERMS.filter(t => t.categorySlug.toLowerCase() === categorySlug.toLowerCase());
}

export function getPopularTerms() {
  return LEGAL_TERMS.filter(t => t.isPopular);
}

export function getTermOfTheDay() {
  return LEGAL_TERMS.find(t => t.isTermOfTheDay) || LEGAL_TERMS[0];
}

export function searchLegalTerms(query, selectedCategory = "all") {
  if (!query && (!selectedCategory || selectedCategory === "all")) {
    return LEGAL_TERMS;
  }

  const q = (query || "").trim().toLowerCase();

  return LEGAL_TERMS.filter(term => {
    // Category check
    if (selectedCategory && selectedCategory !== "all") {
      if (term.categorySlug.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }

    if (!q) return true;

    // Term name match
    if (term.term.toLowerCase().includes(q)) return true;
    // Simple meaning match
    if (term.simpleMeaning.toLowerCase().includes(q)) return true;
    // Category match
    if (term.category.toLowerCase().includes(q)) return true;
    // Detailed explanation match
    if (term.detailedExplanation.toLowerCase().includes(q)) return true;

    return false;
  });
}
