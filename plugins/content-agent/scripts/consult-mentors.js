#!/usr/bin/env node
/**
 * Consult Mentors - Local Training Search
 *
 * "Getting Cole's input" / "Consulting with Dickie & Cole"
 *
 * This script searches local training content for STRUCTURAL patterns.
 * It's designed to inspire "how to write" not "what to write about".
 *
 * Usage:
 *   node scripts/consult-mentors.js <platform> [focus-area]
 *
 * Examples:
 *   node scripts/consult-mentors.js linkedin
 *   node scripts/consult-mentors.js twitter hooks
 *   node scripts/consult-mentors.js linkedin formatting
 *
 * Focus areas:
 *   - hooks: Opening lines that grab attention
 *   - structure: Post organization and flow
 *   - formatting: Visual layout, spacing, lists
 *   - closers: CTAs and ending patterns
 *   - all: Everything (default)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Training directories
const TRAINING_DIR = path.join(__dirname, '..', 'training', 'examples');
const PROMPTS_DIR = path.join(__dirname, '..', 'prompts');

// Search patterns by focus area
const FOCUS_PATTERNS = {
  hooks: ['hook', 'opening', 'first line', 'attention', 'scroll', 'stop'],
  structure: ['structure', 'flow', 'section', 'organize', 'format'],
  formatting: ['format', 'spacing', 'bullet', 'list', 'paragraph', 'visual'],
  closers: ['cta', 'close', 'ending', 'call to action', 'engage', 'comment'],
  all: [] // Match everything
};

/**
 * Read all markdown files from a directory recursively
 */
function readMarkdownFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      files.push(...readMarkdownFiles(fullPath));
    } else if (item.name.endsWith('.md') && !item.name.startsWith('.')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const { data: frontmatter, content: body } = matter(content);

        if (body.trim()) {
          files.push({
            path: fullPath,
            relativePath: path.relative(path.join(__dirname, '..'), fullPath),
            frontmatter,
            content: body.trim(),
            hook: extractHook(body),
            closer: extractCloser(body)
          });
        }
      } catch (err) {
        // Skip files that can't be read
      }
    }
  }

  return files;
}

/**
 * Extract the hook (first meaningful line) from content
 */
function extractHook(content) {
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
  return lines[0] || '';
}

/**
 * Extract the closer (last meaningful lines) from content
 */
function extractCloser(content) {
  const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
  return lines.slice(-3).join('\n');
}

/**
 * Score content relevance to focus area
 */
function scoreRelevance(file, focus) {
  if (focus === 'all') return 1;

  const patterns = FOCUS_PATTERNS[focus] || [];
  const searchText = (file.content + ' ' + JSON.stringify(file.frontmatter)).toLowerCase();

  let score = 0;
  for (const pattern of patterns) {
    if (searchText.includes(pattern)) {
      score++;
    }
  }

  // Boost if frontmatter has tags matching focus
  if (file.frontmatter?.tags?.some(t => patterns.includes(t.toLowerCase()))) {
    score += 2;
  }

  return score;
}

/**
 * Format output for a single example
 */
function formatExample(file, index) {
  const tags = file.frontmatter?.tags?.join(', ') || 'none';
  const platform = file.frontmatter?.platform || 'unknown';
  const score = file.frontmatter?.human_score || 'N/A';

  return `
### Example ${index + 1}
**File:** ${file.relativePath}
**Platform:** ${platform}
**Tags:** ${tags}
**Score:** ${score}

**Hook:**
> ${file.hook}

**Content Preview:**
${file.content.slice(0, 500)}${file.content.length > 500 ? '...' : ''}

**Closer:**
> ${file.closer}

---`;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const platform = args[0]?.toLowerCase() || 'linkedin';
  const focus = args[1]?.toLowerCase() || 'all';

  console.log(`\n🎯 Consulting mentors for ${platform} ${focus}...\n`);

  // Check for prompts first
  const promptsPath = path.join(PROMPTS_DIR, focus === 'hooks' ? 'hooks' : 'frameworks');
  if (fs.existsSync(promptsPath)) {
    const promptFiles = fs.readdirSync(promptsPath).filter(f => f.endsWith('.md'));
    if (promptFiles.length > 0) {
      console.log(`📚 **Prompt Templates Available:** ${promptFiles.length}`);
      console.log(`   Check: prompts/${focus === 'hooks' ? 'hooks' : 'frameworks'}/\n`);
    }
  }

  // Search training examples
  const platformDir = path.join(TRAINING_DIR, platform);
  let files = readMarkdownFiles(platformDir);

  // If no platform-specific files, search all
  if (files.length === 0) {
    files = readMarkdownFiles(TRAINING_DIR);
  }

  if (files.length === 0) {
    console.log(`❌ No training examples found for ${platform}.`);
    console.log(`   Add examples with: /rag:add-training`);
    console.log(`   Or check: training/examples/${platform}/`);
    return;
  }

  // Score and sort by relevance
  files = files
    .map(f => ({ ...f, relevance: scoreRelevance(f, focus) }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5); // Top 5 results

  console.log(`📊 **Found ${files.length} relevant examples**\n`);

  // Output results
  files.forEach((file, i) => {
    console.log(formatExample(file, i));
  });

  // Summary
  console.log('\n## Key Patterns Observed\n');

  if (focus === 'hooks' || focus === 'all') {
    console.log('**Hooks:**');
    files.slice(0, 3).forEach(f => {
      console.log(`- "${f.hook.slice(0, 80)}..."`);
    });
  }

  if (focus === 'closers' || focus === 'all') {
    console.log('\n**Closers:**');
    files.slice(0, 3).forEach(f => {
      const closerLine = f.closer.split('\n')[0];
      console.log(`- "${closerLine.slice(0, 80)}..."`);
    });
  }

  console.log('\n---');
  console.log('Use these patterns as inspiration for your next post.');
  console.log('Reference specific examples: "Use the hook style from Example 1"');
}

main().catch(console.error);
