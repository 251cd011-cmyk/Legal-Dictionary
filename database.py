"""
Database initialization and data access layer for Lexi Clear Legal Dictionary.
Uses SQLite for persistent, reliable, zero-dependency storage.
"""

import sqlite3
import json
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "lexi_clear.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Create Categories table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        term_count INTEGER DEFAULT 0
    );
    """)

    # Create Legal Terms table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS terms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL UNIQUE,
        simple_meaning TEXT NOT NULL,
        detailed_explanation TEXT NOT NULL,
        example TEXT NOT NULL,
        key_points TEXT NOT NULL, -- JSON array
        related_term_slugs TEXT NOT NULL, -- JSON array
        is_popular INTEGER DEFAULT 0,
        view_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    );
    """)

    # Create Recent Views table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS recent_views (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        term_id INTEGER NOT NULL UNIQUE,
        viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (term_id) REFERENCES terms(id) ON DELETE CASCADE
    );
    """)

    # Create Bookmarks table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS bookmarks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        term_id INTEGER NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (term_id) REFERENCES terms(id) ON DELETE CASCADE
    );
    """)

    # Create Search Queries log for trending suggestions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS search_queries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        query TEXT NOT NULL UNIQUE,
        count INTEGER DEFAULT 1,
        last_searched TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    conn.commit()
    seed_data_if_empty(conn)
    conn.close()

def seed_data_if_empty(conn):
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM categories")
    if cursor.fetchone()[0] > 0:
        return  # Already seeded

    # Seed 12 legal categories
    categories_data = [
        {
            "name": "Criminal Law",
            "slug": "criminal-law",
            "description": "Rules and statutes governing crimes, police investigations, trials, and state punishments.",
            "icon": "shield-alert"
        },
        {
            "name": "Civil Law",
            "slug": "civil-law",
            "description": "Resolving non-criminal disputes between individuals, private parties, or organizations.",
            "icon": "scale"
        },
        {
            "name": "Constitutional Law",
            "slug": "constitutional-law",
            "description": "Fundamental rights, government powers, judicial reviews, and constitutional guarantees.",
            "icon": "landmark"
        },
        {
            "name": "Family Law",
            "slug": "family-law",
            "description": "Matrimonial matters, divorce, child custody, alimony, succession, and guardianship.",
            "icon": "users"
        },
        {
            "name": "Corporate Law",
            "slug": "corporate-law",
            "description": "Corporate governance, shareholder rights, company formations, mergers, and securities.",
            "icon": "building-2"
        },
        {
            "name": "Contract Law",
            "slug": "contract-law",
            "description": "Enforceability of legal agreements, consideration, breach of covenants, and indemnities.",
            "icon": "file-signature"
        },
        {
            "name": "Property Law",
            "slug": "property-law",
            "description": "Ownership, leasing, conveyancing, easements, and property transaction disputes.",
            "icon": "home"
        },
        {
            "name": "Labour Law",
            "slug": "labour-law",
            "description": "Workplace conditions, employee rights, trade unions, layoffs, and compensation.",
            "icon": "briefcase"
        },
        {
            "name": "Cyber Law",
            "slug": "cyber-law",
            "description": "Digital privacy, data protection, computer fraud, online defamation, and cybercrime.",
            "icon": "laptop"
        },
        {
            "name": "Tax Law",
            "slug": "tax-law",
            "description": "Direct and indirect taxation, tax liabilities, assessment procedures, and compliance.",
            "icon": "receipt"
        },
        {
            "name": "Consumer Law",
            "slug": "consumer-law",
            "description": "Protection against unfair trade practices, defective goods, and deficiency in services.",
            "icon": "shopping-bag"
        },
        {
            "name": "Evidence Law",
            "slug": "evidence-law",
            "description": "Standards of proof, admissibility of documents and testimony, and witness cross-examination.",
            "icon": "search"
        }
    ]

    for cat in categories_data:
        cursor.execute(
            "INSERT INTO categories (name, slug, description, icon) VALUES (?, ?, ?, ?)",
            (cat["name"], cat["slug"], cat["description"], cat["icon"])
        )

    # Dictionary of comprehensive legal terms
    terms_data = [
        # --- Criminal Law ---
        {
            "category_slug": "criminal-law",
            "name": "Bail",
            "slug": "bail",
            "is_popular": 1,
            "simple_meaning": "A temporary release of an accused person from custody while their legal case or trial is still ongoing.",
            "detailed_explanation": "Bail is a fundamental safeguard in criminal jurisprudence ensuring an accused person is not unnecessarily detained before being convicted. To secure bail, the court or police authority often requires financial security (a bond or surety) and strict conditions, such as surrendering travel documents and attending all scheduled hearings.",
            "example": "After being charged with alleged financial misconduct, Sarah applied for bail. The court granted bail upon a personal bond of $5,000 and the condition that she report to the local station weekly.",
            "key_points": [
                "Preserves the presumption of innocence until proven guilty.",
                "Can be granted as regular bail, anticipatory bail, or interim bail.",
                "Failure to abide by bail conditions can lead to immediate revocation and arrest."
            ],
            "related_term_slugs": ["arrest", "fir", "surety", "warrant", "anticipatory-bail"]
        },
        {
            "category_slug": "criminal-law",
            "name": "FIR (First Information Report)",
            "slug": "fir",
            "is_popular": 1,
            "simple_meaning": "The first formal written complaint prepared by the police when they receive information about a cognizable crime.",
            "detailed_explanation": "A First Information Report (FIR) sets the criminal law process in motion. It is an official document recorded by the police after an aggrieved person or informant reports the commission of a cognizable offense (crimes where police can arrest without a prior warrant). Once an FIR is registered, the investigating officer is authorized to begin gathering evidence and statements.",
            "example": "When Marcus returned home to find his apartment burglarized, he went directly to the neighborhood station to file an FIR, giving details of the stolen electronics.",
            "key_points": [
                "Mandatory for police to register an FIR when information discloses a cognizable offense.",
                "Serves as the foundation for the police investigation and subsequent charge sheet.",
                "The complainant is entitled to receive a free copy of the registered FIR immediately."
            ],
            "related_term_slugs": ["cognizable-offence", "bail", "charge-sheet", "warrant"]
        },
        {
            "category_slug": "criminal-law",
            "name": "Cognizable Offence",
            "slug": "cognizable-offence",
            "is_popular": 0,
            "simple_meaning": "A serious crime where the police officer has the legal authority to arrest the suspect without an arrest warrant from a magistrate.",
            "detailed_explanation": "Offenses classified as cognizable involve serious public harm, such as murder, kidnapping, armed robbery, or serious assault. Because of the immediate danger to society or risk of suspect flight, law enforcement is empowered to initiate an investigation and make arrests immediately without awaiting a magistrate's formal warrant.",
            "example": "Since daylight robbery with a deadly weapon is a cognizable offense, the responding police officers apprehended the suspect at the scene without needing court authorization.",
            "key_points": [
                "Police can arrest without a court-issued warrant.",
                "Investigation begins immediately upon filing the initial report.",
                "Contrasted with non-cognizable offenses, which require prior judicial permission."
            ],
            "related_term_slugs": ["non-cognizable-offence", "fir", "arrest", "warrant"]
        },
        {
            "category_slug": "criminal-law",
            "name": "Non-Cognizable Offence",
            "slug": "non-cognizable-offence",
            "is_popular": 0,
            "simple_meaning": "A less severe offense where the police cannot arrest a suspect or begin an investigation without an express order from a magistrate.",
            "detailed_explanation": "Non-cognizable offenses generally involve private wrongs, minor public nuisances, petty cheating, or simple assault. In these cases, police cannot arrest an accused person without a warrant issued by a judicial magistrate, nor can they initiate an investigation without the court's sanction.",
            "example": "A minor verbal quarrel between neighbors over parking space was recorded as a non-cognizable complaint, requiring the parties to approach the magistrate for further directives.",
            "key_points": [
                "Requires a judicial warrant before police can make an arrest.",
                "Police must record the complaint and advise the complainant to approach the magistrate.",
                "Designed to prevent arbitrary police detention in minor disputes."
            ],
            "related_term_slugs": ["cognizable-offence", "warrant", "summons"]
        },
        {
            "category_slug": "criminal-law",
            "name": "Warrant",
            "slug": "warrant",
            "is_popular": 0,
            "simple_meaning": "An official written order signed by a judge or magistrate authorizing law enforcement to carry out an arrest, search, or seizure.",
            "detailed_explanation": "A warrant represents judicial oversight balancing public safety against individual civil liberties. It directs a police officer to apprehend an individual named or search a specified premises for specific contraband or evidence, based upon probable cause established before the court.",
            "example": "The magistrate issued a search warrant allowing forensic investigators to inspect the suspect's computer servers for illicit records.",
            "key_points": [
                "Must be issued and signed by a presiding judicial officer.",
                "Specifies the person to be apprehended or property to be searched.",
                "Remains valid until executed or officially cancelled by the court."
            ],
            "related_term_slugs": ["arrest", "summons", "bail", "fir"]
        },
        {
            "category_slug": "criminal-law",
            "name": "Anticipatory Bail",
            "slug": "anticipatory-bail",
            "is_popular": 0,
            "simple_meaning": "A pre-arrest bail granted by a higher court to protect an innocent person who reasonably expects they might be falsely arrested.",
            "detailed_explanation": "Anticipatory bail provides proactive protection against motivated or malicious criminal charges. An individual who has genuine apprehension of being arrested for a non-bailable accusation can approach the Sessions Court or High Court requesting a directive that if arrested, they be released on bail immediately.",
            "example": "Fearing that a political rival was preparing to lodge fabricated corruption charges against him, the councilman petitioned the High Court for anticipatory bail.",
            "key_points": [
                "Granted before any arrest actually takes place.",
                "Requires convincing the court of potential harassment or false implication.",
                "The applicant must cooperate fully with police questioning when summoned."
            ],
            "related_term_slugs": ["bail", "arrest", "fir"]
        },
        {
            "category_slug": "criminal-law",
            "name": "Charge Sheet",
            "slug": "charge-sheet",
            "is_popular": 0,
            "simple_meaning": "The final formal report submitted by the police to the court containing all the evidence gathered and specific charges against the accused.",
            "detailed_explanation": "Upon concluding an investigation, the police compile all witness depositions, forensic results, seized materials, and factual findings into a formal document known as the charge sheet (or final report). If the magistrate finds sufficient grounds in the charge sheet, the court formally takes cognizance and begins the trial.",
            "example": "Six months after registering the robbery complaint, the police filed a 200-page charge sheet naming three suspects and listing thirty witness statements.",
            "key_points": [
                "Marks the official conclusion of police investigation and the start of judicial trial.",
                "Lists the exact statutory sections under which the accused will be prosecuted.",
                "If no evidence is found, a closure report is filed instead of a charge sheet."
            ],
            "related_term_slugs": ["fir", "bail", "remand"]
        },
        {
            "category_slug": "criminal-law",
            "name": "Arrest",
            "slug": "arrest",
            "is_popular": 0,
            "simple_meaning": "The lawful restraint and deprivation of a person's physical liberty by authorized officers to answer an alleged crime.",
            "detailed_explanation": "An arrest occurs when law enforcement physically takes custody of a person pursuant to a warrant or under statutory authority in cognizable crimes. Arrested individuals enjoy constitutional protections, including the right to know grounds of arrest, access to legal counsel, and the requirement to be presented before a magistrate within 24 hours.",
            "example": "Detectives placed the fraud suspect under arrest outside his hotel, informing him immediately of his constitutional right to speak with a lawyer.",
            "key_points": [
                "Must be accompanied by clear communication of the grounds for arrest.",
                "Mandatory presentation before a judicial magistrate within 24 hours.",
                "Right to consult a legal practitioner of one's choice."
            ],
            "related_term_slugs": ["bail", "warrant", "remand"]
        },
        {
            "category_slug": "criminal-law",
            "name": "Remand",
            "slug": "remand",
            "is_popular": 0,
            "simple_meaning": "A judicial order sending an accused person back into custody (either police or judicial) while the investigation or trial continues.",
            "detailed_explanation": "When the police cannot complete an investigation within the statutory 24 hours of arrest, they must produce the accused before a magistrate to seek 'remand'. Remand can be police custody (for interrogation and evidence recovery) or judicial custody (jail pending trial).",
            "example": "The magistrate remanded the cyber-crime suspect to police custody for three days to facilitate recovery of the compromised hard drives.",
            "key_points": [
                "Prevents unlawful prolonged police detention without judicial oversight.",
                "Police remand is strictly restricted to limited statutory periods.",
                "Judicial custody places the accused in prison under court jurisdiction."
            ],
            "related_term_slugs": ["arrest", "bail", "charge-sheet"]
        },

        # --- Civil Law ---
        {
            "category_slug": "civil-law",
            "name": "Negligence",
            "slug": "negligence",
            "is_popular": 1,
            "simple_meaning": "A failure to take reasonable care to avoid causing foreseeable harm, injury, or loss to another person.",
            "detailed_explanation": "In civil law and tort, negligence is established when a defendant owes a legal duty of care to the plaintiff, breaches that duty by failing to act as a prudent person would, and directly causes actual damage or loss. It does not require malicious intent; unreasonable carelessness is sufficient.",
            "example": "A supermarket left a wet floor without warning signs for over an hour. A customer slipped and fractured their wrist; the store was held liable for negligence.",
            "key_points": [
                "Requires proving: Duty of care, Breach of duty, Causation, and Damages.",
                "Intent to harm is not required; careless omission is enough.",
                "Forms the foundation of most personal injury and medical malpractice suits."
            ],
            "related_term_slugs": ["tort", "damages", "injunction"]
        },
        {
            "category_slug": "civil-law",
            "name": "Defamation",
            "slug": "defamation",
            "is_popular": 1,
            "simple_meaning": "Making a false statement about someone that unfairly damages their reputation in the eyes of right-thinking members of society.",
            "detailed_explanation": "Defamation protects an individual's or entity's good reputation. It comes in two primary forms: 'libel' (permanent, written, published, or broadcast statements) and 'slander' (transitory, spoken statements). Truth is a complete defense against a civil claim for defamation.",
            "example": "A blogger published an unsubstantiated article alleging that a local baker was deliberately poisoning customers. The baker sued for defamation and was awarded compensatory damages.",
            "key_points": [
                "Statement must be false, defamatory, and published/communicated to a third party.",
                "Libel refers to written or recorded media; slander refers to spoken words.",
                "Truth, fair comment, and absolute privilege serve as legal defenses."
            ],
            "related_term_slugs": ["damages", "injunction", "tort"]
        },
        {
            "category_slug": "civil-law",
            "name": "Tort",
            "slug": "tort",
            "is_popular": 1,
            "simple_meaning": "A civil wrong (other than a breach of contract) that causes harm to someone and entitles them to seek legal compensation.",
            "detailed_explanation": "Tort law is designed to compensate victims for injuries or losses caused by the wrongful civil acts of others. Common torts include negligence, nuisance, trespass, defamation, and strict liability for dangerous activities.",
            "example": "When a construction crew accidentally damaged the underground water pipe supplying an adjacent bakery, the owner filed a tort claim for lost business.",
            "key_points": [
                "Provides monetary compensation (damages) rather than criminal penalties.",
                "Operates independently of contractual agreements.",
                "Includes both intentional torts (battery, assault) and unintentional torts (negligence)."
            ],
            "related_term_slugs": ["negligence", "damages", "defamation"]
        },
        {
            "category_slug": "civil-law",
            "name": "Injunction",
            "slug": "injunction",
            "is_popular": 0,
            "simple_meaning": "A court order requiring a person to immediately stop doing something harmful or compelling them to perform a specific act.",
            "detailed_explanation": "An injunction is an equitable remedy awarded when monetary damages alone would be inadequate to undo or compensate for an ongoing or imminent harm. Injunctions can be temporary (interlocutory, maintaining status quo pending trial) or permanent (final decree).",
            "example": "The historic society obtained an urgent temporary injunction preventing a developer from demolishing a 150-year-old landmark building.",
            "key_points": [
                "Prohibitory injunctions stop an action; mandatory injunctions compel an action.",
                "Granted when irreparable injury would occur without urgent court intervention.",
                "Disobeying an injunction constitutes contempt of court."
            ],
            "related_term_slugs": ["damages", "specific-performance", "res-judicata"]
        },
        {
            "category_slug": "civil-law",
            "name": "Damages",
            "slug": "damages",
            "is_popular": 0,
            "simple_meaning": "Monetary compensation awarded by a civil court to a claimant who suffered injury, loss, or violation of legal rights.",
            "detailed_explanation": "Damages in civil litigation are primarily compensatory, aiming to restore the injured party to the position they would have been in had the civil wrong or breach of contract not occurred. In cases of egregious misconduct, courts may also award punitive damages.",
            "example": "The court ordered the logistics firm to pay $12,000 in compensatory damages to cover the cost of cargo ruined during transit.",
            "key_points": [
                "Compensatory damages reimburse actual financial or physical harm.",
                "Punitive or exemplary damages penalize malicious misconduct.",
                "Nominal damages recognize a technical violation of rights where no financial loss occurred."
            ],
            "related_term_slugs": ["negligence", "tort", "contract"]
        },
        {
            "category_slug": "civil-law",
            "name": "Res Judicata",
            "slug": "res-judicata",
            "is_popular": 0,
            "simple_meaning": "A legal principle stating that a matter once finally decided by a competent court cannot be litigated again between the same parties.",
            "detailed_explanation": "Latin for 'a matter judged', Res Judicata prevents endless litigation, judicial resource depletion, and unnecessary harassment of defendants. Once all appeals are exhausted or the deadline has passed, neither party may file a new suit on the exact same cause of action.",
            "example": "When Mr. Henderson attempted to file a second lawsuit claiming ownership over the boundary fence after losing his appeal last year, the court dismissed it under res judicata.",
            "key_points": [
                "Brings finality to judicial proceedings.",
                "Applies when the parties, subject matter, and title in dispute are identical.",
                "Upholds judicial efficiency and prevents contradictory rulings."
            ],
            "related_term_slugs": ["injunction", "damages"]
        },

        # --- Constitutional Law ---
        {
            "category_slug": "constitutional-law",
            "name": "Habeas Corpus",
            "slug": "habeas-corpus",
            "is_popular": 1,
            "simple_meaning": "A powerful constitutional order issued by a high court directing that a detained person be physically produced to determine if their detention is legal.",
            "detailed_explanation": "Latin for 'you shall have the body', Habeas Corpus is one of the most revered constitutional writs protecting individual freedom against arbitrary state arrest. If a person is detained by police or private parties without valid legal authority, an urgent petition can be filed asking the court to inspect the grounds and release the detainee immediately.",
            "example": "When an investigative journalist was held without charges for four days in an undisclosed location, his attorney filed an urgent Habeas Corpus petition; the court ordered his immediate release.",
            "key_points": [
                "Can be filed by the detainee or by any family member, friend, or advocate on their behalf.",
                "The state must prove lawful justification for holding the individual.",
                "Acts as the paramount shield against secret or unlawful detention."
            ],
            "related_term_slugs": ["mandamus", "judicial-review", "fundamental-rights"]
        },
        {
            "category_slug": "constitutional-law",
            "name": "Mandamus",
            "slug": "mandamus",
            "is_popular": 0,
            "simple_meaning": "A writ issued by a superior court commanding a public authority, official, or tribunal to perform a mandatory legal duty they neglected.",
            "detailed_explanation": "Latin for 'we command', Mandamus ensures public accountability. When an official or government body possesses a clear statutory obligation to act or deliver a service but arbitrarily refuses or stalls, the High Court or Supreme Court issues Mandamus compelling performance.",
            "example": "A municipal corporation refused for three years to issue property birth certificates without legal reason; the High Court issued a writ of Mandamus ordering compliance within 14 days.",
            "key_points": [
                "Directs a public official or body to discharge a mandatory statutory duty.",
                "Cannot be issued against private individuals or private companies.",
                "The petitioner must establish that they demanded performance and were wrongfully refused."
            ],
            "related_term_slugs": ["habeas-corpus", "quo-warranto", "judicial-review"]
        },
        {
            "category_slug": "constitutional-law",
            "name": "Judicial Review",
            "slug": "judicial-review",
            "is_popular": 0,
            "simple_meaning": "The power of higher courts to examine legislative acts and government decisions to verify their conformity with the Constitution.",
            "detailed_explanation": "Judicial Review is the cornerstone of constitutional supremacy and the separation of powers. Higher courts examine whether a statute enacted by Parliament or an executive order violates constitutional provisions or fundamental human rights. If it does, the court declares the law null and void.",
            "example": "The Supreme Court struck down a new censorship regulation under judicial review because it violated constitutional guarantees of free speech.",
            "key_points": [
                "Ensures constitutional supremacy over legislative and executive decisions.",
                "Protects fundamental rights from arbitrary state overreach.",
                "Laws contrary to constitutional text or basic structure can be invalidated."
            ],
            "related_term_slugs": ["fundamental-rights", "habeas-corpus", "mandamus"]
        },
        {
            "category_slug": "constitutional-law",
            "name": "Fundamental Rights",
            "slug": "fundamental-rights",
            "is_popular": 0,
            "simple_meaning": "Basic human and constitutional rights guaranteed to all citizens that cannot be arbitrarily stripped away by the government.",
            "detailed_explanation": "Fundamental Rights represent guaranteed civil liberties essential for dignity and democracy, including the right to equality, freedom of speech, personal liberty, protection against discrimination, and freedom of religion. Any state law infringing upon them is subject to constitutional challenge.",
            "example": "When a state ordinance attempted to restrict women from working night shifts in modern IT parks, the court invalidated it as a violation of the fundamental right to equal livelihood.",
            "key_points": [
                "Directly enforceable against the state through constitutional writs.",
                "Subject only to reasonable restrictions defined by law for public order and safety.",
                "Constitutes the basic core of democratic constitutionalism."
            ],
            "related_term_slugs": ["habeas-corpus", "judicial-review", "mandamus"]
        },

        # --- Family Law ---
        {
            "category_slug": "family-law",
            "name": "Alimony",
            "slug": "alimony",
            "is_popular": 0,
            "simple_meaning": "Court-ordered financial support paid by one spouse to another during separation or following a divorce.",
            "detailed_explanation": "Alimony (also known as spousal support or maintenance) aims to prevent one spouse from suffering severe economic hardship as a result of marital breakdown. Courts determine alimony based on the duration of marriage, individual earning capacities, standard of living enjoyed during the marriage, and child custody arrangements.",
            "example": "Following the dissolution of their 20-year marriage, the court ordered David to pay $1,500 monthly alimony to support Emily while she completed vocational retraining.",
            "key_points": [
                "Can be granted as interim maintenance (during litigation) or permanent alimony.",
                "Calculated based on income disparity, lifestyle, and financial requirements.",
                "Can be modified if there is a substantial change in material circumstances."
            ],
            "related_term_slugs": ["maintenance", "child-custody", "annulment"]
        },
        {
            "category_slug": "family-law",
            "name": "Child Custody",
            "slug": "child-custody",
            "is_popular": 0,
            "simple_meaning": "The legal right and responsibility to make decisions for and care for a child after parents separate or divorce.",
            "detailed_explanation": "In determining child custody, family courts operate strictly under the paramount doctrine of 'the best interests of the child'. Custody can be legal (decision-making for schooling, health, religion) and physical (where the child resides), often shared or granted with generous visitation rights.",
            "example": "The family court awarded joint legal custody to both parents while granting primary physical custody to the mother with alternate weekend visitation for the father.",
            "key_points": [
                "The welfare and best interest of the child overrides parental preferences.",
                "Differentiates between physical custody (residence) and legal custody (decisions).",
                "Non-custodial parents typically retain visitation rights unless child safety is at risk."
            ],
            "related_term_slugs": ["alimony", "maintenance"]
        },
        {
            "category_slug": "family-law",
            "name": "Maintenance",
            "slug": "maintenance",
            "is_popular": 0,
            "simple_meaning": "The statutory duty to provide necessities (food, shelter, healthcare, education) to dependent family members such as a spouse, minor children, or elderly parents.",
            "detailed_explanation": "Maintenance is broader than divorce alimony; it embodies a legal obligation ensuring that vulnerable or dependent family members are not driven to destitution or vagrancy. Provisions exist across penal and civil codes allowing dependents to seek court orders for financial allowance.",
            "example": "An elderly father who had transferred all ancestral land to his son successfully claimed monthly maintenance after the son neglected his basic medical care.",
            "key_points": [
                "Ensures basic sustenance, food, medical care, and shelter for dependents.",
                "Applies to dependent spouses, minor children, and aging parents.",
                "Summary proceedings allow urgent interim maintenance within weeks."
            ],
            "related_term_slugs": ["alimony", "child-custody"]
        },

        # --- Corporate Law ---
        {
            "category_slug": "corporate-law",
            "name": "Articles of Association",
            "slug": "articles-of-association",
            "is_popular": 0,
            "simple_meaning": "The official document that outlines the internal rules, regulations, and management operations of a registered company.",
            "detailed_explanation": "Along with the Memorandum of Association, the Articles of Association (AoA) serve as a company's internal constitution. It specifies how directors are appointed, voting rights of shareholders, procedures for conducting annual general meetings, dividend payouts, and transfer of shares.",
            "example": "Before the startup issued equity to seed investors, the founders amended their Articles of Association to introduce special board seat nomination rights.",
            "key_points": [
                "Defines internal administrative rules and governance mechanisms.",
                "Binds the company and its shareholders like a statutory contract.",
                "Can be altered by passing a special resolution in a general meeting."
            ],
            "related_term_slugs": ["ultra-vires", "fiduciary-duty", "piercing-corporate-veil"]
        },
        {
            "category_slug": "corporate-law",
            "name": "Ultra Vires",
            "slug": "ultra-vires",
            "is_popular": 0,
            "simple_meaning": "An act done by a company or official that exceeds the scope of their legal powers or object clause.",
            "detailed_explanation": "Latin for 'beyond the powers', the doctrine of Ultra Vires applies when a company enters into a transaction or takes an action outside the authorized objects outlined in its charter. Such acts are considered void ab initio (void from the beginning) and cannot be ratified even by unanimous shareholder approval.",
            "example": "A software development firm took out a multi-million-dollar speculative mining lease; the transaction was contested as ultra vires because it lay outside their corporate charter.",
            "key_points": [
                "Acts beyond corporate powers are legally void and unenforceable.",
                "Protects company investors and creditors against reckless diversion of funds.",
                "Directors acting ultra vires can be held personally liable for company losses."
            ],
            "related_term_slugs": ["articles-of-association", "fiduciary-duty"]
        },
        {
            "category_slug": "corporate-law",
            "name": "Piercing Corporate Veil",
            "slug": "piercing-corporate-veil",
            "is_popular": 0,
            "simple_meaning": "A legal decision by a court to disregard a company's separate legal personality and hold owners or directors personally liable.",
            "detailed_explanation": "Normally, a corporation enjoys a separate legal identity, shielding shareholders from personal liability. However, when owners use the corporate structure as a cloak for fraud, tax evasion, or criminal concealment, the court 'pierces the corporate veil' to attach personal assets.",
            "example": "The promoter siphoned company funds into offshore shell entities to cheat creditors; the bankruptcy court pierced the corporate veil, freezing his personal mansions.",
            "key_points": [
                "Overrides the standard limited liability protection of shareholders.",
                "Invoked in instances of fraud, tax evasion, or sham entity creation.",
                "Ensures bad actors cannot hide personal illegality behind corporate paperwork."
            ],
            "related_term_slugs": ["articles-of-association", "fiduciary-duty"]
        },
        {
            "category_slug": "corporate-law",
            "name": "Fiduciary Duty",
            "slug": "fiduciary-duty",
            "is_popular": 0,
            "simple_meaning": "A strict legal obligation of utmost trust and loyalty requiring a director or trustee to act exclusively in the best interests of another party.",
            "detailed_explanation": "Directors, trustees, and attorneys hold fiduciary positions. They must exercise reasonable care, avoid self-dealing or undisclosed conflicts of interest, and never exploit confidential inside information for personal enrichment at the expense of shareholders or beneficiaries.",
            "example": "A corporate director learned of an impending acquisition and bought land adjacent to the target site through a family trust; he was sued for breaching his fiduciary duty.",
            "key_points": [
                "Demands undivided loyalty, honesty, and good faith.",
                "Prohibits secret profits and undisclosed personal conflicts.",
                "Breach results in disgorgement of profits and civil damage liability."
            ],
            "related_term_slugs": ["articles-of-association", "ultra-vires"]
        },

        # --- Contract Law ---
        {
            "category_slug": "contract-law",
            "name": "Contract",
            "slug": "contract",
            "is_popular": 1,
            "simple_meaning": "A legally binding agreement between two or more parties that is enforceable by law.",
            "detailed_explanation": "For an agreement to become a valid contract, it requires an offer, unconditional acceptance, lawful consideration (value exchanged), competent parties with legal capacity, genuine consent, and a lawful objective. Once executed, contracts create enforceable rights and obligations.",
            "example": "Elena signed a contract agreeing to redesign the client's marketing portal for $4,000 within thirty days.",
            "key_points": [
                "Requires offer, acceptance, lawful consideration, and intention to create legal relations.",
                "Breach of terms empowers the injured party to seek damages or specific performance.",
                "Agreements made under coercion or fraudulent misrepresentation are voidable."
            ],
            "related_term_slugs": ["consideration", "indemnity", "breach-of-contract", "voidable-contract"]
        },
        {
            "category_slug": "contract-law",
            "name": "Indemnity",
            "slug": "indemnity",
            "is_popular": 1,
            "simple_meaning": "A contractual commitment where one party promises to compensate or protect another from loss or damage.",
            "detailed_explanation": "An indemnity clause allocates risk between contracting parties. The indemnifier promises to make good any financial loss, expense, or third-party liability suffered by the indemnified party arising from a specific event, omission, or operational breach.",
            "example": "The software vendor included an indemnity clause promising to cover all legal defense fees if a third party sued the client for copyright infringement regarding their code.",
            "key_points": [
                "Provides direct financial reimbursement for covered risks or third-party claims.",
                "Commonly used in vendor agreements, commercial leases, and insurance contracts.",
                "The obligation is triggered when actual loss or legal demand arises."
            ],
            "related_term_slugs": ["contract", "breach-of-contract", "guarantee"]
        },
        {
            "category_slug": "contract-law",
            "name": "Consideration",
            "slug": "consideration",
            "is_popular": 0,
            "simple_meaning": "The price, value, or benefit that each party gives and receives in return for entering into a contract.",
            "detailed_explanation": "Consideration is the vital quid pro quo ('something for something') that distinguishes a binding contract from a mere gratuitous gift or promise. Consideration can be money, goods, services, or a promise to refrain from doing something lawful.",
            "example": "In a home lease, the tenant's monthly rent of $1,200 is the consideration paid in exchange for the landlord granting occupancy rights.",
            "key_points": [
                "An agreement without valid consideration is generally void in law.",
                "Need not be of equal financial market value, but must be of some real value in law.",
                "Cannot be an obligation the person was already legally bound to perform."
            ],
            "related_term_slugs": ["contract", "breach-of-contract"]
        },
        {
            "category_slug": "contract-law",
            "name": "Breach of Contract",
            "slug": "breach-of-contract",
            "is_popular": 0,
            "simple_meaning": "A failure, without legal excuse, to fulfill any promise or obligation set out in a contract.",
            "detailed_explanation": "When a contracting party repudiates an agreement or fails to deliver goods, services, or payments according to contractual terms, they commit a breach. The non-breaching party can sue for compensatory damages, rescission of the contract, or specific performance.",
            "example": "The contractor abandoned the kitchen renovation halfway through despite receiving full upfront payment, committing a material breach of contract.",
            "key_points": [
                "Can be a minor breach or a material breach that goes to the root of the contract.",
                "Entitles the non-breaching party to claim financial damages.",
                "Anticipatory breach occurs when a party announces in advance that they will not perform."
            ],
            "related_term_slugs": ["contract", "indemnity", "damages"]
        },
        {
            "category_slug": "contract-law",
            "name": "Voidable Contract",
            "slug": "voidable-contract",
            "is_popular": 0,
            "simple_meaning": "A valid contract that can be cancelled or affirmed at the option of one of the parties because their consent was improperly obtained.",
            "detailed_explanation": "Unlike a void contract (which has zero legal effect from the beginning), a voidable contract remains legally enforceable until the aggrieved party chooses to cancel (rescind) it. This arises when consent was obtained through fraud, undue influence, misrepresentation, or coercion.",
            "example": "A buyer purchased a vintage sports car after the seller fraudulently altered the odometer; upon discovering the fraud, the buyer exercised their right to void the contract.",
            "key_points": [
                "Valid until affirmatively challenged and rescinded by the victimized party.",
                "The innocent party may alternatively choose to confirm and ratify the agreement.",
                "Arises in situations involving coercion, fraud, or undue influence."
            ],
            "related_term_slugs": ["contract", "consideration"]
        },

        # --- Property Law ---
        {
            "category_slug": "property-law",
            "name": "Easement",
            "slug": "easement",
            "is_popular": 0,
            "simple_meaning": "A legal right allowing someone to use a specific portion of someone else's land for a particular purpose.",
            "detailed_explanation": "An easement grants limited usage rights without transferring actual ownership. The most common example is a right-of-way easement, allowing an owner of a landlocked parcel to cross a neighbor's driveway to reach a public road, or utility easements for laying pipes or power cables.",
            "example": "The utility company possesses an underground easement across the corner of the lawn to maintain municipal fiber-optic cables.",
            "key_points": [
                "Grants access or usage rights without conferring property title.",
                "Tied to the property (runs with the land) and survives sales to new owners.",
                "Can be acquired by express grant, necessity, or continuous prescription."
            ],
            "related_term_slugs": ["conveyance", "encumbrance", "adverse-possession"]
        },
        {
            "category_slug": "property-law",
            "name": "Conveyance",
            "slug": "conveyance",
            "is_popular": 0,
            "simple_meaning": "The formal legal transfer of property ownership and title from one party to another through a written deed.",
            "detailed_explanation": "Conveyancing encompasses the preparation, verification, and execution of legal documents required to transfer legal title in real estate. It involves conducting title searches to ensure no encumbrances exist, drafting deed instruments, and registering the transfer with governmental registries.",
            "example": "After all title searches confirmed the seller had unencumbered ownership, the deed of conveyance was signed and submitted to the land registry.",
            "key_points": [
                "Requires a valid written instrument (sale deed, gift deed, or lease).",
                "Includes verifying clean title and settling existing encumbrances.",
                "Must be stamped and officially registered to take full legal effect."
            ],
            "related_term_slugs": ["easement", "encumbrance"]
        },
        {
            "category_slug": "property-law",
            "name": "Encumbrance",
            "slug": "encumbrance",
            "is_popular": 0,
            "simple_meaning": "A claim, charge, or liability attached to a property (such as an unpaid mortgage or tax lien) that affects its title.",
            "detailed_explanation": "An encumbrance limits the property owner's absolute freedom or marketability. Common encumbrances include bank mortgages, municipal tax liens, unpaid mechanic charges, or restrictive easements. Before buying real estate, buyers obtain an 'encumbrance certificate' to verify clear title.",
            "example": "The prospective home buyer discovered an unpaid municipal tax encumbrance of $3,500 on the townhouse, which had to be cleared before closing.",
            "key_points": [
                "Burden or third-party claim attached to real property.",
                "Can decrease property valuation or prevent clean sale until cleared.",
                "An Encumbrance Certificate verifies whether property has existing registered claims."
            ],
            "related_term_slugs": ["conveyance", "easement"]
        },

        # --- Labour Law ---
        {
            "category_slug": "labour-law",
            "name": "Retrenchment",
            "slug": "retrenchment",
            "is_popular": 0,
            "simple_meaning": "The lawful termination of an employee's services by an employer due to downsizing, redundancy, or economic surplus.",
            "detailed_explanation": "Under industrial and labour codes, retrenchment refers to laying off surplus staff not due to disciplinary punishment, but because of business reorganization or technological change. Labour laws mandate notice periods, statutory compensation formulas, and the 'last come, first go' seniority rule.",
            "example": "Following automation of the packaging line, the manufacturing plant announced the retrenchment of twenty staff members, paying each three months of severance compensation.",
            "key_points": [
                "Termination due to surplus manpower, not personal employee misconduct.",
                "Requires mandatory advance notice and statutory severance payouts.",
                "Subject to regulatory approvals in large factories or enterprises."
            ],
            "related_term_slugs": ["collective-bargaining", "workmen-compensation"]
        },
        {
            "category_slug": "labour-law",
            "name": "Collective Bargaining",
            "slug": "collective-bargaining",
            "is_popular": 0,
            "simple_meaning": "Negotiations between an employer and a recognized union representing workers to agree on wages, benefits, and working conditions.",
            "detailed_explanation": "Collective bargaining balances the power disparity between individual employees and corporate employers. When concluded successfully, the parties sign a legally binding collective bargaining agreement governing terms of employment for the workplace.",
            "example": "After two weeks of structured collective bargaining, the automotive workers union and management ratified a four-year contract with annual cost-of-living pay raises.",
            "key_points": [
                "Negotiated between management and elected employee trade unions.",
                "Establishes binding terms regarding wage rates, working hours, and safety.",
                "Promotes industrial peace and minimizes strikes and lockouts."
            ],
            "related_term_slugs": ["retrenchment", "workmen-compensation"]
        },
        {
            "category_slug": "labour-law",
            "name": "Workmen Compensation",
            "slug": "workmen-compensation",
            "is_popular": 0,
            "simple_meaning": "Statutory financial compensation that employers must pay to workers who suffer injury or occupational disease during employment.",
            "detailed_explanation": "Workmen Compensation laws provide a no-fault system of social security. If a laborer suffers injury, permanent disability, or death in an accident arising out of and in the course of employment, the employer or their insurer must pay prescribed statutory compensation irrespective of whose fault caused the incident.",
            "example": "A warehouse worker whose leg was injured when a forklift malfunctioned was awarded workmen compensation covering medical expenses and disability rehabilitation.",
            "key_points": [
                "Operates on a no-fault liability basis for workplace-related accidents.",
                "Covers medical costs, temporary disability, and loss of earning capacity.",
                "Mandatory statutory protection in industrial and hazardous occupations."
            ],
            "related_term_slugs": ["collective-bargaining", "retrenchment"]
        },

        # --- Cyber Law ---
        {
            "category_slug": "cyber-law",
            "name": "Phishing",
            "slug": "phishing",
            "is_popular": 0,
            "simple_meaning": "A fraudulent digital attempt to trick individuals into revealing sensitive personal data, such as passwords or bank details.",
            "detailed_explanation": "Phishing is an offense under cyber law where attackers impersonate trustworthy entities (banks, government agencies, popular web services) via deceptive emails, spoofed SMS, or fake websites to steal credentials, commit identity theft, or siphon money.",
            "example": "An employee received a deceptive email appearing to come from their IT department asking for an emergency password reset, which led to a company-wide phishing investigation.",
            "key_points": [
                "Criminalized as identity fraud and cyber deception.",
                "Involves social engineering, forged headers, or duplicate websites.",
                "Carries severe criminal penalties and civil restitution under IT laws."
            ],
            "related_term_slugs": ["data-breach", "identity-theft", "intermediary-liability"]
        },
        {
            "category_slug": "cyber-law",
            "name": "Data Breach",
            "slug": "data-breach",
            "is_popular": 0,
            "simple_meaning": "An unauthorized security incident where sensitive, confidential, or protected personal data is accessed, copied, or exposed.",
            "detailed_explanation": "Data protection laws impose strict compliance on companies handling consumer data. In the event of a breach, organizations are legally mandated to report the incident to cybersecurity authorities and affected individuals within prescribed timeframes, facing severe regulatory fines for negligence.",
            "example": "After an unencrypted server was accessed by hackers exposing 50,000 credit card records, the payment processor suffered an audit and substantial regulatory fines for the data breach.",
            "key_points": [
                "Triggers statutory notification requirements under data privacy laws.",
                "Entities failing to maintain reasonable security safeguards face heavy penalties.",
                "Affected consumers can pursue compensation for resulting financial fraud or distress."
            ],
            "related_term_slugs": ["phishing", "intermediary-liability"]
        },
        {
            "category_slug": "cyber-law",
            "name": "Intermediary Liability",
            "slug": "intermediary-liability",
            "is_popular": 0,
            "simple_meaning": "The legal accountability of digital platforms (like social media or search engines) for content posted by their users.",
            "detailed_explanation": "Cyber law often grants 'safe harbour' protection to intermediaries (e.g., cloud hosts, social networks), shielding them from liability for third-party user posts, provided they act merely as conduits and comply with statutory 'take-down' notices upon being notified of illegal content.",
            "example": "A video platform was granted safe-harbor immunity after it promptly removed an infringing pirated film within 24 hours of receiving a formal notice from the studio.",
            "key_points": [
                "Provides safe-harbor protection if platforms adhere to due diligence rules.",
                "Platforms must maintain designated grievance officers and swift take-down mechanisms.",
                "Failure to act on court or agency orders revokes safe-harbor immunity."
            ],
            "related_term_slugs": ["data-breach", "phishing"]
        },

        # --- Tax Law ---
        {
            "category_slug": "tax-law",
            "name": "Capital Gains Tax",
            "slug": "capital-gains-tax",
            "is_popular": 0,
            "simple_meaning": "A tax levied on the profit earned when you sell a capital asset (such as real estate, shares, or artwork) for more than you paid for it.",
            "detailed_explanation": "Capital gains are split into short-term and long-term gains based on how long the asset was held. The tax applies only to the net gain (sale price minus purchase price and indexed cost of improvements), not to the gross transaction amount.",
            "example": "David bought shares for $10,000 and sold them four years later for $25,000, paying capital gains tax on the $15,000 profit.",
            "key_points": [
                "Applies to profits derived from capital assets, not regular income or salaries.",
                "Differentiated into Short-Term Capital Gains (STCG) and Long-Term Capital Gains (LTCG).",
                "Exemptions or deductions are available when reinvesting into qualifying property or bonds."
            ],
            "related_term_slugs": ["tax-evasion", "tax-avoidance"]
        },
        {
            "category_slug": "tax-law",
            "name": "Tax Evasion",
            "slug": "tax-evasion",
            "is_popular": 0,
            "simple_meaning": "The illegal act of deliberately not paying taxes owed by concealing income, inflating expenses, or hiding assets.",
            "detailed_explanation": "Tax evasion is a serious criminal offense involving deliberate fraud, falsification of account books, and concealment of taxable transactions. Convicted individuals face heavy financial penalties and imprisonment. It is strictly distinguished from tax avoidance, which uses legal provisions to reduce liability.",
            "example": "A business owner maintained two sets of accounting ledgers and understated his revenue by 60%; he was prosecuted and jailed for criminal tax evasion.",
            "key_points": [
                "Illegal and fraudulent manipulation of taxable income.",
                "Attracts criminal prosecution, heavy financial penalties, and jail terms.",
                "Contrasted with legal tax planning and tax avoidance."
            ],
            "related_term_slugs": ["capital-gains-tax", "tax-avoidance"]
        },
        {
            "category_slug": "tax-law",
            "name": "Tax Avoidance",
            "slug": "tax-avoidance",
            "is_popular": 0,
            "simple_meaning": "The legal practice of organizing your financial affairs within the letter of the law to minimize tax liability.",
            "detailed_explanation": "Tax avoidance utilizes legitimate statutory deductions, exemptions, allowances, and tax credits explicitly provided in the tax code (e.g., retirement fund contributions, health insurance deductions). While legal, abusive or artificial schemes may be scrutinized under General Anti-Avoidance Rules (GAAR).",
            "example": "Investing in tax-exempt government bonds to reduce one's annual taxable bracket is a recognized method of legal tax avoidance.",
            "key_points": [
                "Operates strictly within the provisions of tax statutes.",
                "Involves claiming allowable credits, exemptions, and deductions.",
                "Anti-avoidance statutes empower tax authorities to look through artificial structures."
            ],
            "related_term_slugs": ["capital-gains-tax", "tax-evasion"]
        },

        # --- Consumer Law ---
        {
            "category_slug": "consumer-law",
            "name": "Unfair Trade Practice",
            "slug": "unfair-trade-practice",
            "is_popular": 0,
            "simple_meaning": "Any deceptive, fraudulent, or misleading business practice used to promote or sell goods and services.",
            "detailed_explanation": "Consumer protection acts prohibit deceptive conduct such as false advertising, misleading price comparisons, bait-and-switch tactics, supplying refurbished items as brand new, or refusing to honor statutory warranties. Consumer tribunals can order product recalls, refunds, and punitive damages.",
            "example": "A skincare company falsely advertised that its cream could eliminate 100% of wrinkles in three days without clinical backing, and was penalized for unfair trade practices.",
            "key_points": [
                "Includes misleading advertisements and false representations about product quality.",
                "Aggrieved consumers can seek refunds, compensation, and corrective disclosures.",
                "Enforceable before consumer dispute redressal commissions."
            ],
            "related_term_slugs": ["deficiency-of-service", "product-liability"]
        },
        {
            "category_slug": "consumer-law",
            "name": "Deficiency of Service",
            "slug": "deficiency-of-service",
            "is_popular": 0,
            "simple_meaning": "Any fault, imperfection, or inadequacy in the quality, standard, or performance of a service agreed to be provided.",
            "detailed_explanation": "Whether in banking, healthcare, hospitality, airlines, or telecommunications, when a service provider fails to deliver what was promised or exhibits gross negligence in execution, the consumer can file a complaint for deficiency of service to claim refunds and compensation for mental agony.",
            "example": "An airline delayed a passenger's checked baggage containing vital medications for five days without explanation; the consumer commission awarded compensation for deficiency of service.",
            "key_points": [
                "Covers banking, insurance, transportation, healthcare, and telecommunications.",
                "Requires proof of contract or paid consideration for service.",
                "Provides relief for both monetary loss and mental distress."
            ],
            "related_term_slugs": ["unfair-trade-practice", "product-liability"]
        },
        {
            "category_slug": "consumer-law",
            "name": "Product Liability",
            "slug": "product-liability",
            "is_popular": 0,
            "simple_meaning": "The legal responsibility of manufacturers, distributors, and sellers to compensate consumers for injury or harm caused by defective products.",
            "detailed_explanation": "Product liability holds supply chain participants accountable if a defective design, manufacturing flaw, or inadequate safety warning causes physical injury, property damage, or death. Consumers do not necessarily need to prove manufacturer negligence if strict liability applies.",
            "example": "A pressure cooker exploded due to a defective safety release valve, causing burns to the cook; the manufacturer was held liable under product liability laws.",
            "key_points": [
                "Applies to manufacturing defects, design flaws, or failure to provide adequate warnings.",
                "Can hold both manufacturer and seller jointly and severally liable.",
                "Strict liability standard focuses on product defect rather than proving fault."
            ],
            "related_term_slugs": ["unfair-trade-practice", "deficiency-of-service"]
        },

        # --- Evidence Law ---
        {
            "category_slug": "evidence-law",
            "name": "Hearsay",
            "slug": "hearsay",
            "is_popular": 0,
            "simple_meaning": "Secondhand evidence where a witness testifies about what someone else said, rather than what they personally witnessed.",
            "detailed_explanation": "Hearsay evidence is generally inadmissible in judicial proceedings because the original speaker is not in court under oath, cannot be cross-examined, and cannot have their demeanor evaluated. Strict exceptions exist, however, such as dying declarations and statements against interest.",
            "example": "When a witness testified, 'My neighbor told me he saw someone in a black jacket jump the wall,' the defense successfully objected to the testimony as inadmissible hearsay.",
            "key_points": [
                "Generally inadmissible because the original declarant cannot be cross-examined.",
                "Subject to narrow legal exceptions such as dying declarations.",
                "Protects the integrity and reliability of trial verdicts."
            ],
            "related_term_slugs": ["burden-of-proof", "dying-declaration", "estoppel"]
        },
        {
            "category_slug": "evidence-law",
            "name": "Burden of Proof",
            "slug": "burden-of-proof",
            "is_popular": 0,
            "simple_meaning": "The legal obligation of a party to present sufficient evidence to prove the claims or allegations they make in court.",
            "detailed_explanation": "In criminal cases, the burden of proof rests entirely upon the prosecution to prove the defendant's guilt 'beyond a reasonable doubt'. In civil litigation, the standard is lighter: the plaintiff must prove their claim on the 'preponderance of probabilities' (more likely true than not).",
            "example": "Because the prosecution could not establish beyond reasonable doubt that the accused was at the scene, the court acquitted him.",
            "key_points": [
                "Criminal standard: Beyond a reasonable doubt.",
                "Civil standard: Preponderance of probabilities.",
                "The person asserting a positive factual claim bears the primary duty to substantiate it."
            ],
            "related_term_slugs": ["hearsay", "estoppel", "dying-declaration"]
        },
        {
            "category_slug": "evidence-law",
            "name": "Estoppel",
            "slug": "estoppel",
            "is_popular": 0,
            "simple_meaning": "A legal rule preventing someone from denying or contradicting a truth they previously stated or led another person to believe.",
            "detailed_explanation": "Estoppel prevents unfairness and deception. If Party A by their statement, deed, or conduct leads Party B to believe a fact and act upon it to Party B's detriment, Party A cannot subsequently alter their position or deny that representation in court.",
            "example": "A landlord repeatedly accepted late rent on the 15th without objection for two years; he was estopped from suddenly claiming eviction based on rent not being paid on the 1st.",
            "key_points": [
                "Prevents a person from taking inconsistent legal stances that disadvantage another.",
                "Rooted in equity, good conscience, and fair dealing.",
                "Can arise by representation, contract, silence, or statutory record."
            ],
            "related_term_slugs": ["burden-of-proof", "hearsay"]
        },
        {
            "category_slug": "evidence-law",
            "name": "Dying Declaration",
            "slug": "dying-declaration",
            "is_popular": 0,
            "simple_meaning": "A statement made by a dying person explaining the cause or circumstances that led to their impending death.",
            "detailed_explanation": "As a premier exception to the rule against hearsay, dying declarations are admissible because legal tradition presumes that a person facing imminent death and meeting their maker is unlikely to utter falsehoods. If recorded properly, it carries immense evidentiary weight in murder or homicide prosecutions.",
            "example": "Before succumbing to severe stab injuries in the ICU, the victim clearly identified his assailant to the magistrate, creating a vital dying declaration.",
            "key_points": [
                "Recognized exception to the strict hearsay rule.",
                "The declarant must be in a fit mental state and conscious of impending death.",
                "Can serve as the sole foundation for conviction if found credible and voluntary."
            ],
            "related_term_slugs": ["hearsay", "burden-of-proof"]
        }
    ]

    # Map category slugs to IDs
    cursor.execute("SELECT id, slug FROM categories")
    cat_map = {row["slug"]: row["id"] for row in cursor.fetchall()}

    for t in terms_data:
        cat_id = cat_map.get(t["category_slug"])
        if not cat_id:
            continue
        cursor.execute(
            """
            INSERT INTO terms (
                category_id, name, slug, simple_meaning, detailed_explanation,
                example, key_points, related_term_slugs, is_popular
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                cat_id,
                t["name"],
                t["slug"],
                t["simple_meaning"],
                t["detailed_explanation"],
                t["example"],
                json.dumps(t["key_points"]),
                json.dumps(t["related_term_slugs"]),
                t["is_popular"]
            )
        )

    # Update term counts on categories
    cursor.execute("""
    UPDATE categories
    SET term_count = (
        SELECT COUNT(*) FROM terms WHERE terms.category_id = categories.id
    )
    """)

    # Seed initial recent views and bookmarks for instant rich UI demonstration
    cursor.execute("SELECT id FROM terms WHERE slug IN ('bail', 'negligence', 'fir', 'contract')")
    sample_ids = [row[0] for row in cursor.fetchall()]
    for tid in sample_ids[:3]:
        cursor.execute("INSERT OR IGNORE INTO recent_views (term_id) VALUES (?)", (tid,))
    if sample_ids:
        cursor.execute("INSERT OR IGNORE INTO bookmarks (term_id) VALUES (?)", (sample_ids[0],))
        if len(sample_ids) > 1:
            cursor.execute("INSERT OR IGNORE INTO bookmarks (term_id) VALUES (?)", (sample_ids[1],))

    conn.commit()

if __name__ == "__main__":
    init_db()
    print("Database initialized and populated successfully.")
