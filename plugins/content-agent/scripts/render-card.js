/**
 * Render Card - HTML template to PNG using Playwright
 *
 * Usage:
 *   node scripts/render-card.js <template> <output> [options]
 *
 * Templates: quote, stat, tip, list, hook
 *
 * Examples:
 *   node scripts/render-card.js quote output.png --text "Your quote here" --author "Name"
 *   node scripts/render-card.js stat output.png --number "73%" --label "of buyers read 3+ pieces"
 *   node scripts/render-card.js tip output.png --text "Your tip goes here"
 *   node scripts/render-card.js list output.png --title "5 Things" --items "One,Two,Three,Four,Five"
 *
 * Options:
 *   --bg       Background color (default from brand-style or #0A0A0A)
 *   --fg       Foreground/text color (default #FFFFFF)
 *   --accent   Accent color (default #00D4FF)
 *   --width    Image width (default 1200)
 *   --height   Image height (default 1200 for square, 628 for wide)
 *   --style    Style preset: dark, light, brand (default: dark)
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    template: args[0],
    output: args[1],
    options: {}
  };

  for (let i = 2; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const value = args[i + 1];
      result.options[key] = value;
      i++;
    }
  }

  return result;
}

// Load brand style if available
function loadBrandStyle() {
  const stylePath = path.join(process.cwd(), 'inspiration/brand-style.md');
  const defaults = {
    bg: '#0A0A0A',
    fg: '#FFFFFF',
    accent: '#00D4FF'
  };

  if (!fs.existsSync(stylePath)) {
    return defaults;
  }

  try {
    const content = fs.readFileSync(stylePath, 'utf8');
    // Extract hex codes from markdown
    const hexMatches = content.match(/#[0-9A-Fa-f]{6}/g) || [];
    if (hexMatches.length >= 3) {
      return {
        fg: hexMatches[0] || defaults.fg,
        accent: hexMatches[1] || defaults.accent,
        bg: hexMatches[2] || defaults.bg
      };
    }
  } catch (e) {
    // Ignore errors, use defaults
  }

  return defaults;
}

// Template definitions
const templates = {
  quote: (opts) => `
    <div style="
      width: ${opts.width}px;
      height: ${opts.height}px;
      background: ${opts.bg};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px;
      box-sizing: border-box;
      font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
    ">
      <div style="
        font-size: 48px;
        color: ${opts.accent};
        margin-bottom: 30px;
      ">"</div>
      <div style="
        font-size: 42px;
        font-weight: 600;
        color: ${opts.fg};
        text-align: center;
        line-height: 1.4;
        max-width: 900px;
      ">${opts.text || 'Your quote here'}</div>
      <div style="
        font-size: 24px;
        color: ${opts.fg}88;
        margin-top: 40px;
      ">— ${opts.author || 'Author'}</div>
    </div>
  `,

  stat: (opts) => `
    <div style="
      width: ${opts.width}px;
      height: ${opts.height}px;
      background: ${opts.bg};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px;
      box-sizing: border-box;
      font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
    ">
      <div style="
        font-size: 160px;
        font-weight: 800;
        color: ${opts.accent};
        line-height: 1;
      ">${opts.number || '73%'}</div>
      <div style="
        font-size: 32px;
        font-weight: 500;
        color: ${opts.fg};
        text-align: center;
        margin-top: 30px;
        max-width: 700px;
        line-height: 1.4;
      ">${opts.label || 'of people agree with this stat'}</div>
    </div>
  `,

  tip: (opts) => `
    <div style="
      width: ${opts.width}px;
      height: ${opts.height}px;
      background: ${opts.bg};
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 80px;
      box-sizing: border-box;
      font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
    ">
      <div style="
        font-size: 24px;
        font-weight: 700;
        color: ${opts.accent};
        text-transform: uppercase;
        letter-spacing: 2px;
        margin-bottom: 30px;
      ">💡 Pro Tip</div>
      <div style="
        font-size: 38px;
        font-weight: 600;
        color: ${opts.fg};
        line-height: 1.5;
        max-width: 1000px;
      ">${opts.text || 'Your tip goes here. Keep it to 2-3 lines for best readability.'}</div>
    </div>
  `,

  list: (opts) => {
    const items = (opts.items || 'One,Two,Three').split(',');
    const itemsHtml = items.map((item, i) => `
      <div style="
        display: flex;
        align-items: flex-start;
        margin-bottom: 24px;
      ">
        <div style="
          font-size: 28px;
          font-weight: 800;
          color: ${opts.accent};
          margin-right: 20px;
          min-width: 40px;
        ">${i + 1}.</div>
        <div style="
          font-size: 28px;
          font-weight: 500;
          color: ${opts.fg};
        ">${item.trim()}</div>
      </div>
    `).join('');

    return `
      <div style="
        width: ${opts.width}px;
        height: ${opts.height}px;
        background: ${opts.bg};
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 80px;
        box-sizing: border-box;
        font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
      ">
        <div style="
          font-size: 48px;
          font-weight: 800;
          color: ${opts.fg};
          margin-bottom: 50px;
        ">${opts.title || 'Title Here'}</div>
        ${itemsHtml}
      </div>
    `;
  },

  hook: (opts) => `
    <div style="
      width: ${opts.width}px;
      height: ${opts.height}px;
      background: ${opts.bg};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 80px;
      box-sizing: border-box;
      font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
    ">
      <div style="
        font-size: 56px;
        font-weight: 800;
        color: ${opts.fg};
        text-align: center;
        line-height: 1.3;
        max-width: 1000px;
      ">${opts.text || 'Your hook goes here'}</div>
      ${opts.subtext ? `
        <div style="
          font-size: 28px;
          color: ${opts.accent};
          margin-top: 40px;
          text-align: center;
        ">${opts.subtext}</div>
      ` : ''}
    </div>
  `
};

async function renderCard(template, output, options) {
  const brandStyle = loadBrandStyle();

  // Merge options with defaults
  const opts = {
    width: parseInt(options.width) || 1200,
    height: parseInt(options.height) || 1200,
    bg: options.bg || brandStyle.bg,
    fg: options.fg || brandStyle.fg,
    accent: options.accent || brandStyle.accent,
    ...options
  };

  // Apply style presets
  if (options.style === 'light') {
    opts.bg = '#FFFFFF';
    opts.fg = '#1A1A1A';
  }

  const templateFn = templates[template];
  if (!templateFn) {
    console.error(`Unknown template: ${template}`);
    console.error(`Available: ${Object.keys(templates).join(', ')}`);
    process.exit(1);
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0;">
      ${templateFn(opts)}
    </body>
    </html>
  `;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: opts.width, height: opts.height });
  await page.setContent(html);

  // Wait for fonts to load
  await page.waitForTimeout(500);

  await page.screenshot({
    path: output,
    type: 'png'
  });

  await browser.close();

  console.log(`✅ Card rendered: ${output}`);
  console.log(`   Size: ${opts.width}x${opts.height}`);
  console.log(`   Colors: bg=${opts.bg}, fg=${opts.fg}, accent=${opts.accent}`);
}

// Main
const { template, output, options } = parseArgs();

if (!template || !output) {
  console.log(`
Usage: node scripts/render-card.js <template> <output> [options]

Templates:
  quote   - Quote card with author
  stat    - Big number with label
  tip     - Pro tip with icon
  list    - Numbered list with title
  hook    - Bold statement (carousel cover)

Options:
  --text      Main text content
  --author    Author name (quote template)
  --number    Big number (stat template)
  --label     Description text (stat template)
  --title     Title (list template)
  --items     Comma-separated items (list template)
  --subtext   Secondary text (hook template)
  --bg        Background color
  --fg        Foreground/text color
  --accent    Accent color
  --width     Image width (default 1200)
  --height    Image height (default 1200)
  --style     Preset: dark, light

Examples:
  node scripts/render-card.js quote card.png --text "Great ideas need wings" --author "Mitch"
  node scripts/render-card.js stat card.png --number "3x" --label "more engagement with carousels"
  node scripts/render-card.js list card.png --title "5 Mistakes" --items "No hook,Too long,Wrong audience,No CTA,Generic advice"
`);
  process.exit(1);
}

renderCard(template, output, options);
