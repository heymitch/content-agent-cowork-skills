#!/usr/bin/env node

/**
 * Configure Terminal Plugin for Claude Auto-Start
 *
 * Detects OS and updates .obsidian/plugins/terminal/data.json
 * to auto-launch claude when opening the integrated terminal.
 *
 * Usage: node scripts/configure-terminal.js
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const TERMINAL_CONFIG_PATH = path.join(__dirname, '..', '.obsidian', 'plugins', 'terminal', 'data.json');

// Theme shared across all platforms
const THEME = {
  background: "#272b34",
  black: "#1a1e24",
  blue: "#61afef",
  brightBlack: "#5C6370",
  brightBlue: "#61afef",
  brightCyan: "#56b6c2",
  brightGreen: "#98c379",
  brightMagenta: "#c678dd",
  brightRed: "#e06c75",
  brightWhite: "#dcddde",
  brightYellow: "#e5c07b",
  cursor: "#61afef",
  cursorAccent: "#272b34",
  cyan: "#56b6c2",
  foreground: "#dcddde",
  green: "#98c379",
  magenta: "#c678dd",
  red: "#e06c75",
  selectionBackground: "rgba(0, 122, 255, 0.2)",
  white: "#dcddde",
  yellow: "#e5c07b"
};

// Platform-specific configurations
const PLATFORM_CONFIGS = {
  darwin: {
    profileKey: 'darwinIntegratedDefault',
    config: {
      args: ["-l", "-c", `source ~/.zshrc; ${os.homedir()}/.local/bin/claude; exec zsh -l`],
      executable: "/bin/zsh",
      name: "",
      platforms: { darwin: true },
      pythonExecutable: "python3",
      restoreHistory: false,
      rightClickAction: "copyPaste",
      successExitCodes: ["0", "SIGINT", "SIGTERM"],
      terminalOptions: {
        theme: THEME,
        documentOverride: null
      },
      type: "integrated",
      useWin32Conhost: true
    }
  },
  win32: {
    profileKey: 'win32IntegratedDefault',
    config: {
      args: ["-NoExit", "-Command", "claude"],
      executable: "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
      name: "",
      platforms: { win32: true },
      pythonExecutable: "python3",
      restoreHistory: false,
      rightClickAction: "copyPaste",
      successExitCodes: ["0", "SIGINT", "SIGTERM"],
      terminalOptions: {
        theme: THEME,
        documentOverride: null
      },
      type: "integrated",
      useWin32Conhost: true
    }
  },
  linux: {
    profileKey: 'linuxIntegratedDefault',
    config: {
      args: ["-l", "-c", `source ~/.bashrc; ${os.homedir()}/.local/bin/claude; exec bash -l`],
      executable: "/bin/bash",
      name: "",
      platforms: { linux: true },
      pythonExecutable: "python3",
      restoreHistory: false,
      rightClickAction: "copyPaste",
      successExitCodes: ["0", "SIGINT", "SIGTERM"],
      terminalOptions: {
        theme: THEME,
        documentOverride: null
      },
      type: "integrated",
      useWin32Conhost: true
    }
  }
};

function main() {
  const platform = os.platform();
  console.log(`Detected platform: ${platform}`);

  // Check if terminal plugin exists
  if (!fs.existsSync(TERMINAL_CONFIG_PATH)) {
    console.error('❌ Terminal plugin not found at:', TERMINAL_CONFIG_PATH);
    console.error('   Make sure the Terminal plugin is installed in Obsidian.');
    process.exit(1);
  }

  // Read existing config
  let config;
  try {
    const raw = fs.readFileSync(TERMINAL_CONFIG_PATH, 'utf8');
    config = JSON.parse(raw);
  } catch (err) {
    console.error('❌ Failed to read terminal config:', err.message);
    process.exit(1);
  }

  // Get platform-specific settings
  const platformConfig = PLATFORM_CONFIGS[platform];
  if (!platformConfig) {
    console.error(`❌ Unsupported platform: ${platform}`);
    console.error('   Supported: darwin (macOS), win32 (Windows), linux');
    process.exit(1);
  }

  // Update the profile
  if (!config.profiles) {
    config.profiles = {};
  }

  const { profileKey, config: profileConfig } = platformConfig;

  // Check if already configured
  const existing = config.profiles[profileKey];
  if (existing && existing.args && existing.args.some(a => a.includes('claude'))) {
    console.log(`✓ Terminal already configured for Claude on ${platform}`);
    return;
  }

  // Update profile
  config.profiles[profileKey] = {
    ...existing,
    ...profileConfig
  };

  // Write back
  try {
    fs.writeFileSync(TERMINAL_CONFIG_PATH, JSON.stringify(config, null, 2));
    console.log(`✓ Terminal configured for ${platform}`);
    console.log(`  Profile: ${profileKey}`);
    console.log(`  Executable: ${profileConfig.executable}`);
    console.log(`  Args: ${profileConfig.args.join(' ')}`);
    console.log('');
    console.log('⚠️  Restart Obsidian or reload the Terminal plugin to apply changes.');
  } catch (err) {
    console.error('❌ Failed to write terminal config:', err.message);
    process.exit(1);
  }
}

main();
