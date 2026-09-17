// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://naterose.io',
  // Jekyll used `permalink: /:title/`, which produces directory-style URLs.
  // Astro's default `directory` format matches it, so old links keep working.
  build: { format: 'directory' },
  markdown: {
    shikiConfig: {
      // Dual themes emit --shiki-light/--shiki-dark custom properties, which
      // global.css switches on. A single theme would inline a white code
      // background that stays white on the dark page.
      themes: { light: 'github-light', dark: 'github-dark' },
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
