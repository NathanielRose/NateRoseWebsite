// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://naterose.io',
  // Jekyll used `permalink: /:title/`, which produces directory-style URLs.
  // Astro's default `directory` format matches it, so old links keep working.
  build: { format: 'directory' },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
      // The 2017 posts label fences informally ("Powershell", "Terminal",
      // "gulp"). Aliasing to canonical Shiki ids restores highlighting
      // without editing the markdown.
      langAlias: {
        'C#': 'csharp',
        Powershell: 'powershell',
        PowerShell: 'powershell',
        Bash: 'bash',
        Terminal: 'bash',
        CommandPrompt: 'bat',
        Docker: 'dockerfile',
        Dockerfile: 'dockerfile',
        Yaml: 'yaml',
        gulp: 'javascript',
      },
    },
  },
});
