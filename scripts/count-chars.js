/**
 * Count Characters - Quick character/word count for all content types
 *
 * Usage:
 *   node scripts/count-chars.js <file-path> [platform]
 *
 * Platform auto-detected from:
 *   1. Frontmatter `platform:` field
 *   2. File path (li-, tw-, ig-, email-)
 *   3. Explicit argument
 *
 * Examples:
 *   node scripts/count-chars.js content/post.md
 *   node scripts/count-chars.js content/post.md twitter
 */

const fs = require('fs');
const path = require('path');

const LIMITS = {
  linkedin: { chars: 2800, label: 'LinkedIn' },
  twitter: { chars: 280, label: 'Twitter/X (per tweet)' },
  bluesky: { chars: 300, label: 'Bluesky (per post)' },
  instagram: { chars: 2200, label: 'Instagram' },
  email: { words: 600, label: 'Email (target)' },
  video: { words: 200, label: 'Video Script (60s)' }
};

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return {};

  const fm = {};
  match[1].split('\n').forEach(line => {
    const [key, ...val] = line.split(':');
    if (key && val.length) {
      fm[key.trim()] = val.join(':').trim();
    }
  });
  return fm;
}

function detectPlatform(filePath, content, explicitPlatform) {
  // 1. Explicit argument wins
  if (explicitPlatform) {
    const p = explicitPlatform.toLowerCase();
    if (p.includes('linked') || p === 'li') return 'linkedin';
    if (p.includes('bluesky') || p === 'bsky' || p === 'bs') return 'bluesky';
    if (p.includes('twit') || p === 'tw' || p === 'x') return 'twitter';
    if (p.includes('insta') || p === 'ig') return 'instagram';
    if (p.includes('email')) return 'email';
    if (p.includes('video')) return 'video';
  }

  // 2. Frontmatter
  const fm = extractFrontmatter(content);
  if (fm.platform) {
    const p = fm.platform.toLowerCase();
    if (p.includes('linked')) return 'linkedin';
    if (p.includes('bluesky') || p === 'bsky') return 'bluesky';
    if (p.includes('twit') || p === 'x') return 'twitter';
    if (p.includes('insta')) return 'instagram';
    if (p.includes('email')) return 'email';
    if (p.includes('video') || p.includes('tiktok') || p.includes('reel') || p.includes('short')) return 'video';
  }

  // 3. File path prefix
  const filename = path.basename(filePath).toLowerCase();
  if (filename.startsWith('li-') || filename.includes('linkedin')) return 'linkedin';
  if (filename.startsWith('bs-') || filename.startsWith('bsky-') || filename.includes('bluesky')) return 'bluesky';
  if (filename.startsWith('tw-') || filename.includes('twitter')) return 'twitter';
  if (filename.startsWith('ig-') || filename.includes('instagram')) return 'instagram';
  if (filename.startsWith('email-') || filename.includes('email')) return 'email';
  if (filename.startsWith('video-') || filename.includes('script')) return 'video';

  // Default to LinkedIn (most common)
  return 'linkedin';
}

function extractPostContent(content) {
  // Remove frontmatter
  content = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Remove metadata section at the end
  content = content.replace(/\n---\n\n## Metadata[\s\S]*$/, '');

  // Remove title lines
  content = content.replace(/^# (LinkedIn Post|Twitter Thread|Email|Instagram|Video Script):.*\n\n/, '');

  return content.trim();
}

function countWords(text) {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

function main() {
  const [,, filePath, explicitPlatform] = process.argv;

  if (!filePath) {
    console.error('Usage: node count-chars.js <file-path> [platform]');
    console.error('Platforms: linkedin, twitter, instagram, email, video');
    process.exit(1);
  }

  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found: ${absolutePath}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(absolutePath, 'utf8');
  const platform = detectPlatform(filePath, rawContent, explicitPlatform);
  const postContent = extractPostContent(rawContent);

  const charCount = postContent.length;
  const wordCount = countWords(postContent);
  const limit = LIMITS[platform];

  console.log('\n' + '='.repeat(60));
  console.log(`Character Count Report - ${limit.label}`);
  console.log('='.repeat(60));
  console.log(`\nFile: ${path.basename(filePath)}`);
  console.log(`Platform: ${platform}`);
  console.log(`Characters: ${charCount.toLocaleString()}`);
  console.log(`Words: ${wordCount.toLocaleString()}`);

  // Check against limit
  if (limit.chars) {
    console.log(`\nLimit: ${limit.chars.toLocaleString()} characters`);
    if (charCount <= limit.chars) {
      const remaining = limit.chars - charCount;
      console.log(`✅ UNDER LIMIT by ${remaining} characters`);
    } else {
      const over = charCount - limit.chars;
      console.log(`⚠️  OVER LIMIT by ${over} characters`);
      console.log(`   Need to trim: ~${Math.ceil(over / 5)} words`);
    }
  } else if (limit.words) {
    console.log(`\nTarget: ~${limit.words} words`);
    if (wordCount <= limit.words) {
      console.log(`✅ Within target (${wordCount}/${limit.words} words)`);
    } else {
      const over = wordCount - limit.words;
      console.log(`⚠️  Over target by ${over} words`);
    }
  }

  // Thread detection for Twitter/Bluesky
  if (platform === 'twitter' && charCount > 280) {
    const estimatedTweets = Math.ceil(charCount / 260); // Account for numbering
    console.log(`\n📝 Thread detected: ~${estimatedTweets} tweets`);
    console.log(`   Avg chars per tweet: ${Math.round(charCount / estimatedTweets)}`);
  }
  if (platform === 'bluesky' && charCount > 300) {
    const estimatedPosts = Math.ceil(charCount / 280); // Account for numbering
    console.log(`\n📝 Thread detected: ~${estimatedPosts} posts`);
    console.log(`   Avg chars per post: ${Math.round(charCount / estimatedPosts)}`);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  // Exit code for scripting
  if (limit.chars && charCount > limit.chars) process.exit(1);
  if (limit.words && wordCount > limit.words * 1.2) process.exit(1); // 20% buffer for word limits
  process.exit(0);
}

main();
