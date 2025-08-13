export interface VaccineInfo {
  id: string
  name: string
  shortName: string
  description: string
  category: string
  ageGroup: string
  importanceInfo: string
  howItWorks: string
  sideEffects: {
    common: string[]
    rare: string[]
    serious: string[]
  }
  contraindications: string[]
  precautions: string[]
  administrationInfo: {
    route: string
    doses: number
    schedule: string
    storage: string
  }
  efficacy: string
  duration: string
  ingredients: string[]
  manufacturerInfo: string[]
  clinicalTrials: string
  myths: Array<{
    myth: string
    fact: string
  }>
  resources: Array<{
    title: string
    url: string
    type: "article" | "video" | "pdf"
  }>
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

// Comprehensive vaccine information database
export const vaccineInfoDatabase: VaccineInfo[] = [
  {
    id: "bcg",
    name: "Bacillus Calmette-Guérin",
    shortName: "BCG",
    description: "A vaccine against tuberculosis (TB)",
    category: "Bacterial",
    ageGroup: "Birth to 1 year",
    importanceInfo:
      "BCG vaccine protects against tuberculosis, especially severe forms like TB meningitis in children. It's particularly important in countries with high TB burden like India.",
    howItWorks:
      "BCG contains live, weakened bacteria related to TB. When given, it helps the immune system recognize and fight TB bacteria if exposed in the future.",
    sideEffects: {
      common: ["Small red bump at injection site", "Mild swelling", "Small scar formation (normal)", "Low-grade fever"],
      rare: ["Swollen lymph nodes", "Abscess at injection site", "Keloid scar formation"],
      serious: [
        "Severe allergic reaction (very rare)",
        "Disseminated BCG infection (extremely rare in healthy children)",
      ],
    },
    contraindications: [
      "Immunocompromised children",
      "Active TB infection",
      "Severe illness with fever",
      "Previous severe reaction to BCG",
    ],
    precautions: [
      "Should not be given to premature babies weighing less than 2kg",
      "Avoid in children with skin conditions at injection site",
      "Delay if child has fever or illness",
    ],
    administrationInfo: {
      route: "Intradermal injection in left upper arm",
      doses: 1,
      schedule: "At birth or as soon as possible after birth",
      storage: "2-8°C, protect from light",
    },
    efficacy: "70-80% effective against severe forms of TB in children",
    duration: "Protection may last 10-15 years, varies by individual",
    ingredients: ["Live attenuated Mycobacterium bovis", "Sodium chloride", "Water for injection"],
    manufacturerInfo: ["Serum Institute of India", "Green Signal Bio Pharma", "Bharat Biotech"],
    clinicalTrials:
      "Extensively studied since 1921. Multiple large-scale trials have demonstrated safety and efficacy in preventing severe TB in children.",
    myths: [
      {
        myth: "BCG vaccine causes tuberculosis",
        fact: "BCG contains weakened bacteria that cannot cause TB disease. It actually protects against TB.",
      },
      {
        myth: "The BCG scar means the vaccine didn't work",
        fact: "The small scar is normal and expected. It shows the immune system responded to the vaccine.",
      },
    ],
    resources: [
      {
        title: "WHO BCG Vaccine Information",
        url: "https://www.who.int/news-room/fact-sheets/detail/tuberculosis",
        type: "article",
      },
      {
        title: "Understanding BCG Vaccination",
        url: "#",
        type: "pdf",
      },
    ],
  },
  {
    id: "hepatitis-b",
    name: "Hepatitis B Vaccine",
    shortName: "Hep B",
    description: "Protects against Hepatitis B virus infection",
    category: "Viral",
    ageGroup: "Birth to adult",
    importanceInfo:
      "Hepatitis B vaccine prevents a serious liver infection that can become chronic and lead to liver cancer or cirrhosis. Early vaccination provides lifelong protection.",
    howItWorks:
      "The vaccine contains proteins from the hepatitis B virus that stimulate the immune system to produce antibodies without causing the disease.",
    sideEffects: {
      common: ["Soreness at injection site", "Mild fever", "Fatigue", "Headache"],
      rare: ["Allergic reaction", "Joint pain", "Muscle aches"],
      serious: ["Severe allergic reaction (anaphylaxis) - extremely rare"],
    },
    contraindications: [
      "Severe allergic reaction to previous dose",
      "Allergy to vaccine components",
      "Severe illness with fever",
    ],
    precautions: ["Moderate illness - may delay vaccination", "Bleeding disorders - use smaller needle"],
    administrationInfo: {
      route: "Intramuscular injection",
      doses: 3,
      schedule: "Birth, 1-2 months, 6-18 months",
      storage: "2-8°C, do not freeze",
    },
    efficacy: "95% effective in preventing hepatitis B infection",
    duration: "Lifelong protection in most people",
    ingredients: ["Hepatitis B surface antigen", "Aluminum hydroxide", "Thimerosal (in some formulations)"],
    manufacturerInfo: ["Bharat Biotech", "Serum Institute of India", "Biological E"],
    clinicalTrials:
      "Proven safe and effective through decades of use. Clinical trials involved over 10,000 participants.",
    myths: [
      {
        myth: "Hepatitis B vaccine causes autism",
        fact: "Multiple large studies have found no link between hepatitis B vaccine and autism.",
      },
      {
        myth: "Newborns don't need hepatitis B vaccine",
        fact: "Early vaccination is crucial as babies can get infected during birth and develop chronic infection.",
      },
    ],
    resources: [
      {
        title: "CDC Hepatitis B Information",
        url: "#",
        type: "article",
      },
    ],
  },
  {
    id: "dpt",
    name: "Diphtheria, Pertussis, Tetanus",
    shortName: "DPT",
    description: "Combination vaccine protecting against three serious bacterial diseases",
    category: "Bacterial",
    ageGroup: "2 months to adult",
    importanceInfo:
      "DPT vaccine protects against three potentially fatal diseases: diphtheria (throat infection), pertussis (whooping cough), and tetanus (lockjaw). These diseases can cause severe complications or death, especially in young children.",
    howItWorks:
      "Contains inactivated toxins from diphtheria and tetanus bacteria, plus components of pertussis bacteria. This helps the immune system recognize and fight these diseases.",
    sideEffects: {
      common: ["Redness and swelling at injection site", "Mild fever", "Fussiness or crying", "Loss of appetite"],
      rare: ["High fever (over 105°F)", "Excessive crying for 3+ hours", "Seizures due to fever"],
      serious: ["Severe allergic reaction", "Brain damage (extremely rare)"],
    },
    contraindications: [
      "Severe allergic reaction to previous dose",
      "Brain disease or seizures after previous dose",
      "Severe illness with fever",
    ],
    precautions: ["History of seizures", "Previous severe reaction", "Moderate illness"],
    administrationInfo: {
      route: "Intramuscular injection",
      doses: 5,
      schedule: "2, 4, 6 months, 15-18 months, 4-6 years",
      storage: "2-8°C, do not freeze",
    },
    efficacy: "95% effective against diphtheria and tetanus, 80-90% against pertussis",
    duration: "10 years for tetanus/diphtheria, 5-10 years for pertussis",
    ingredients: ["Diphtheria toxoid", "Tetanus toxoid", "Pertussis antigens", "Aluminum phosphate", "Formaldehyde"],
    manufacturerInfo: ["Serum Institute of India", "Bharat Biotech", "Biological E"],
    clinicalTrials: "Used safely for over 70 years. Extensive clinical trials have proven safety and efficacy.",
    myths: [
      {
        myth: "DPT vaccine causes SIDS (Sudden Infant Death Syndrome)",
        fact: "Studies have shown no causal relationship between DPT vaccine and SIDS.",
      },
      {
        myth: "Natural immunity is better than vaccine immunity",
        fact: "These diseases can be fatal. Vaccine provides safe immunity without the risks of disease.",
      },
    ],
    resources: [
      {
        title: "Understanding DPT Vaccination",
        url: "#",
        type: "pdf",
      },
    ],
  },
]

export const faqDatabase: FAQ[] = [
  {
    id: "1",
    question: "Are vaccines safe for my child?",
    answer:
      "Yes, vaccines are very safe. They undergo rigorous testing before approval and are continuously monitored for safety. Serious side effects are extremely rare, while the diseases vaccines prevent can be life-threatening.",
    category: "Safety",
    tags: ["safety", "side effects", "testing"],
  },
  {
    id: "2",
    question: "Can vaccines cause autism?",
    answer:
      "No, vaccines do not cause autism. This has been thoroughly studied in multiple large-scale research studies involving millions of children. The original study suggesting a link was fraudulent and has been retracted.",
    category: "Safety",
    tags: ["autism", "myths", "research"],
  },
  {
    id: "3",
    question: "Why does my baby need so many vaccines?",
    answer:
      "Babies receive multiple vaccines because their immune systems are still developing and they're vulnerable to many serious diseases. The vaccine schedule is carefully designed to provide protection when children need it most.",
    category: "Schedule",
    tags: ["schedule", "babies", "immune system"],
  },
  {
    id: "4",
    question: "What should I do if my child has a fever after vaccination?",
    answer:
      "Mild fever is a normal response to vaccination and shows the immune system is working. You can give age-appropriate doses of paracetamol or ibuprofen. Contact your doctor if fever is high (over 102°F) or lasts more than 2 days.",
    category: "Side Effects",
    tags: ["fever", "side effects", "treatment"],
  },
  {
    id: "5",
    question: "Can I delay or spread out my child's vaccines?",
    answer:
      "It's not recommended to delay vaccines. The schedule is designed to protect children when they're most vulnerable. Delaying vaccines leaves children unprotected against serious diseases for longer periods.",
    category: "Schedule",
    tags: ["delay", "schedule", "timing"],
  },
  {
    id: "6",
    question: "What if my child misses a vaccine dose?",
    answer:
      "If your child misses a dose, contact your healthcare provider to catch up as soon as possible. You don't need to restart the series - just continue from where you left off.",
    category: "Schedule",
    tags: ["missed dose", "catch up", "schedule"],
  },
]

export function getVaccineInfo(vaccineId: string): VaccineInfo | undefined {
  return vaccineInfoDatabase.find((vaccine) => vaccine.id === vaccineId)
}

export function searchVaccines(query: string): VaccineInfo[] {
  if (!query.trim()) return vaccineInfoDatabase

  const searchTerm = query.toLowerCase()
  return vaccineInfoDatabase.filter(
    (vaccine) =>
      vaccine.name.toLowerCase().includes(searchTerm) ||
      vaccine.shortName.toLowerCase().includes(searchTerm) ||
      vaccine.description.toLowerCase().includes(searchTerm) ||
      vaccine.category.toLowerCase().includes(searchTerm),
  )
}

export function getFAQsByCategory(category?: string): FAQ[] {
  if (!category) return faqDatabase
  return faqDatabase.filter((faq) => faq.category === category)
}

export function searchFAQs(query: string): FAQ[] {
  if (!query.trim()) return faqDatabase

  const searchTerm = query.toLowerCase()
  return faqDatabase.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm) ||
      faq.answer.toLowerCase().includes(searchTerm) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
  )
}
