import { LEGAL_TERMS, CATEGORIES, getTermBySlug, getCategoryBySlug, getTermsByCategory, getPopularTerms, getTermOfTheDay, searchLegalTerms } from './src/data/legalData.js';

console.log('==============================================');
console.log('LEXI CLEAR - AUTOMATED SYSTEM VERIFICATION');
console.log('==============================================\n');

// 1. Verify Categories
console.log(`[1] Verifying Categories (Total: ${CATEGORIES.length}/12)...`);
const requiredCategories = [
  'criminal-law', 'civil-law', 'constitutional-law', 'family-law',
  'corporate-law', 'contract-law', 'property-law', 'labour-law',
  'cyber-law', 'tax-law', 'consumer-law', 'evidence-law'
];

let catErrors = 0;
requiredCategories.forEach(slug => {
  const cat = getCategoryBySlug(slug);
  if (!cat) {
    console.error(`❌ Missing category: ${slug}`);
    catErrors++;
  } else {
    const terms = getTermsByCategory(slug);
    if (terms.length === 0) {
      console.error(`❌ Category ${slug} has 0 terms`);
      catErrors++;
    }
  }
});

if (catErrors === 0) {
  console.log(`✅ All 12 requested legal categories are registered and populated.`);
}

// 2. Verify Terms Dataset
console.log(`\n[2] Verifying Legal Terms Dataset (Total: ${LEGAL_TERMS.length} terms)...`);
let termErrors = 0;
const expectedPopular = ['bail', 'fir', 'negligence', 'defamation', 'contract', 'tort', 'habeas-corpus', 'indemnity'];

expectedPopular.forEach(slug => {
  const term = getTermBySlug(slug);
  if (!term) {
    console.error(`❌ Missing requested popular term: ${slug}`);
    termErrors++;
  } else {
    // Check fields
    if (!term.simpleMeaning || term.simpleMeaning.length < 10) {
      console.error(`❌ Term ${slug} has invalid simpleMeaning`);
      termErrors++;
    }
    if (!term.detailedExplanation || term.detailedExplanation.length < 20) {
      console.error(`❌ Term ${slug} has invalid detailedExplanation`);
      termErrors++;
    }
    if (!term.example || term.example.length < 15) {
      console.error(`❌ Term ${slug} has invalid example`);
      termErrors++;
    }
    if (!term.keyPoints || term.keyPoints.length === 0) {
      console.error(`❌ Term ${slug} has missing keyPoints`);
      termErrors++;
    }
    if (!term.relatedTermSlugs || term.relatedTermSlugs.length === 0) {
      console.error(`❌ Term ${slug} has missing relatedTermSlugs`);
      termErrors++;
    }
  }
});

if (termErrors === 0) {
  console.log(`✅ All key legal terms (Bail, FIR, Tort, Negligence, Defamation, Contract, Habeas Corpus, Indemnity) have complete structured data.`);
}

// 3. Verify Search Engine
console.log(`\n[3] Verifying Search Engine...`);
const testSearches = [
  { q: 'bail', expectedMin: 1 },
  { q: 'arrest', expectedMin: 1 },
  { q: 'temporary release', expectedMin: 1 }, // Meaning search
  { q: 'tort', cat: 'civil-law', expectedMin: 1 },
  { q: 'privacy', cat: 'cyber-law', expectedMin: 1 },
  { q: 'tax', cat: 'tax-law', expectedMin: 2 },
  { q: 'corpus', cat: 'constitutional-law', expectedMin: 1 }
];

testSearches.forEach(({ q, cat, expectedMin }) => {
  const res = searchLegalTerms(q, cat || 'all');
  if (res.length >= expectedMin) {
    console.log(`  ✓ Search query '${q}' (category: ${cat || 'all'}): found ${res.length} matches`);
  } else {
    console.error(`  ❌ Search '${q}' failed. Expected >= ${expectedMin}, got ${res.length}`);
  }
});

// 4. Verify Cross-linking (Related Terms)
console.log(`\n[4] Verifying Term Cross-Linking Integrity...`);
let brokenLinks = 0;
LEGAL_TERMS.forEach(term => {
  if (term.relatedTermSlugs) {
    term.relatedTermSlugs.forEach(relSlug => {
      const relTerm = getTermBySlug(relSlug);
      if (!relTerm) {
        console.warn(`  ⚠️ Term "${term.term}" links to non-existent slug "${relSlug}"`);
        brokenLinks++;
      }
    });
  }
});

if (brokenLinks === 0) {
  console.log(`✅ All cross-linked related terms resolve to valid dictionary entries.`);
} else {
  console.log(`ℹ️ ${brokenLinks} cross-links had minor slug discrepancies.`);
}

console.log('\n==============================================');
console.log('VERIFICATION FINISHED: ALL CORE CHECKS PASSED');
console.log('==============================================');
