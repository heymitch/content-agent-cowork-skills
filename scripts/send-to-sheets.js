/**
 * Send to Google Sheets - Content Calendar Integration
 *
 * This script sends generated content to a Google Sheets content calendar.
 *
 * Usage:
 *   node scripts/send-to-sheets.js <file-path> [scheduled-date] [status]
 *
 * Example:
 *   node scripts/send-to-sheets.js content/12-december-2025/02/ai-automation-linkedin.md "2025-12-05 09:00" "Scheduled"
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configuration from environment
const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

/**
 * Parse frontmatter from markdown file
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return { frontmatter: {}, body: content };

  const frontmatterStr = match[1];
  const body = content.slice(match[0].length).trim();

  const frontmatter = {};
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      let value = valueParts.join(':').trim();
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key.trim()] = value;
    }
  });

  return { frontmatter, body };
}

/**
 * Extract hook (first 200 characters) from content
 */
function extractHook(content) {
  // Remove markdown formatting for hook
  const cleanContent = content
    .replace(/^#.*$/gm, '') // Remove headers
    .replace(/\*\*/g, '')   // Remove bold
    .replace(/\*/g, '')     // Remove italic
    .replace(/\n+/g, ' ')   // Replace newlines with spaces
    .trim();

  return cleanContent.substring(0, 200) + (cleanContent.length > 200 ? '...' : '');
}

/**
 * Initialize Google Sheets API client
 */
async function getAuthClient() {
  if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    throw new Error('Google service account credentials not configured. Check .env file.');
  }

  const auth = new google.auth.JWT(
    SERVICE_ACCOUNT_EMAIL,
    null,
    PRIVATE_KEY,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  await auth.authorize();
  return auth;
}

/**
 * Append row to Google Sheet
 */
async function appendToSheet(auth, rowData) {
  const sheets = google.sheets({ version: 'v4', auth });

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'A:I', // Columns A through I
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [rowData]
    }
  });

  // Extract the row number from the updated range
  const updatedRange = response.data.updates.updatedRange;
  const rowMatch = updatedRange.match(/(\d+)$/);
  return rowMatch ? parseInt(rowMatch[1]) : null;
}

/**
 * Update frontmatter in file to mark as synced
 */
function updateFileSynced(filePath, rowNumber, scheduledDate) {
  let content = fs.readFileSync(filePath, 'utf8');

  const { frontmatter, body } = parseFrontmatter(content);

  // Update frontmatter
  frontmatter.sheets_synced = 'true';
  if (rowNumber) frontmatter.sheets_row = rowNumber.toString();
  if (scheduledDate) frontmatter.scheduled_date = scheduledDate;

  // Rebuild frontmatter
  const newFrontmatter = Object.entries(frontmatter)
    .map(([key, value]) => `${key}: "${value}"`)
    .join('\n');

  const newContent = `---\n${newFrontmatter}\n---\n\n${body}`;

  fs.writeFileSync(filePath, newContent);
}


/**
 * Main function
 */
async function main() {
  const [,, filePath, scheduledDate, status] = process.argv;

  if (!filePath) {
    console.error('Usage: node send-to-sheets.js <file-path> [scheduled-date] [status]');
    process.exit(1);
  }

  if (!SHEET_ID) {
    console.error('Error: GOOGLE_SHEETS_ID not set in .env');
    process.exit(1);
  }

  // Read and parse the content file
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`Error: File not found: ${absolutePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(absolutePath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(content);

  // Prepare row data
  // Columns: Date | Platform | Title/Hook | Full Content | Status | File Path | AI Score | Grade | Notes
  const rowData = [
    scheduledDate || frontmatter.date || new Date().toISOString().split('T')[0],
    frontmatter.platform || 'unknown',
    frontmatter.title || extractHook(body),
    body.substring(0, 50000), // Google Sheets cell limit
    status || frontmatter.status || 'Draft',
    filePath,
    frontmatter.ai_score || '',
    frontmatter.quality_grade || '',
    '' // Notes (empty by default)
  ];

  try {
    // Publish to Google Sheets (based on CALENDAR_TYPE)
    const calendarType = process.env.CALENDAR_TYPE || 'sheets';

    if (calendarType === 'sheets') {
      console.log('=== Publishing to Google Sheets ===');
      console.log('Authenticating with Google Sheets...');
      const auth = await getAuthClient();

      console.log('Appending to sheet...');
      const rowNumber = await appendToSheet(auth, rowData);

      console.log('Updating local file...');
      updateFileSynced(absolutePath, rowNumber, scheduledDate);

      console.log('\n✓ Successfully sent to content calendar!');
      console.log(`  Sheet: https://docs.google.com/spreadsheets/d/${SHEET_ID}`);
      console.log(`  Row: ${rowNumber}`);
      console.log(`  Platform: ${rowData[1]}`);
      console.log(`  Status: ${rowData[4]}`);
    } else if (calendarType === 'notion') {
      console.log('\n⚠️  Notion publishing not yet implemented');
      console.log('   Set CALENDAR_TYPE=sheets to use Google Sheets');
      console.log('   Supabase publishing completed successfully');
    } else if (calendarType === 'airtable') {
      console.log('\n⚠️  Airtable publishing not yet implemented');
      console.log('   Set CALENDAR_TYPE=sheets to use Google Sheets');
      console.log('   Supabase publishing completed successfully');
    } else {
      console.error(`\n❌ Unknown CALENDAR_TYPE: ${calendarType}`);
      console.error('   Valid options: sheets, notion, airtable');
      console.error('   Supabase publishing completed successfully');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Publishing failed:', error.message);
    if (error.message.includes('credentials')) {
      console.error('\nMake sure your .env file has:');
      console.error('  GOOGLE_SHEETS_ID=your-sheet-id');
      console.error('  GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@project.iam.gserviceaccount.com');
      console.error('  GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n..."');
    }
    process.exit(1);
  }
}

main();
