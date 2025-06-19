# json-to-csv-converter

## Overview

**json-to-csv-converter** is a web application that allows users to upload JSON files (arrays or single objects) and convert them into clean, structured CSV files. It is ideal for data analysis, reporting, and database imports. The app ensures data integrity by mapping your JSON data to a fixed set of CSV columns, filling missing fields with `NULL` for clarity.

## Features
- Upload JSON files (single object or array of objects)
- Supports JSON with a `table` property at the top level and in the `tools` array (these are automatically flattened)
- Converts to CSV with a fixed column structure
- Missing fields are filled with `NULL`
- Actionable error messages and user guidance
- Download the resulting CSV instantly
- Modern, responsive UI built with React, TypeScript, Tailwind CSS, and shadcn-ui

## Screenshots
<!-- Replace the src with your actual screenshot paths -->
![Upload JSON](./screenshots/upload-json.png)
![CSV Download](./screenshots/csv-download.png)

## How It Works
1. **Upload** your JSON file (max 10MB, `.json` extension).
2. The app parses and validates your data.
3. If your JSON uses a `table` property (e.g., `{ "table": { ...fields } }`), the app will automatically flatten it for you, including flattening the `tools` array if present.
4. If valid, you can process and download the CSV.
5. If there are issues, the app provides clear error messages and solutions.

## CSV Columns
The output CSV will always include these columns (missing fields will be filled with `NULL`):

- id
- name
- provider
- description
- tools
- license
- github_url
- website_url
- documentation_url
- npm_url
- twitter_url
- discord_url
- logo
- category
- content
- installation_guide
- popularity
- slug
- created_at
- updated_at
- last_updated
- readme_content
- main_files
- dependencies
- stars
- forks

## Quick Start for Users
1. Go to the app in your browser.
2. Drag and drop or select your JSON file.
3. Click "Process File".
4. Download your CSV.

## Example JSON Structure (with `table` property)
```json
[
  {
    "table": {
      "name": "mcp-aiven",
      "provider": "Aiven-Open",
      "description": "Model Context Protocol (MCP) server that exposes Aiven cloud services...",
      "tools": [
        { "table": { "name": "list_projects", "description": "List all projects on your Aiven account." } },
        { "table": { "name": "list_services", "description": "List all services in a specific Aiven project." } }
      ],
      "license": "Apache License 2.0",
      "github_url": "https://github.com/Aiven-Open/mcp-aiven",
      "category": "Enterprise",
      "content": "# Skip the Infrastructure Juggling Act ...",
      "installation_guide": "1. Clone the repository: ...",
      "popularity": 7,
      "slug": "mcp-aiven",
      "main_files": ["mcp_aiven/mcp_server.py"],
      "dependencies": [],
      "stars": 7,
      "forks": 7
    }
  }
]
```
**Note:** The app will automatically flatten the `table` property and the `tools` array for CSV conversion. Any missing field will be filled with `NULL` in the CSV.

---

# Developer Documentation

## Tech Stack
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-ui](https://ui.shadcn.com/) (UI components)

## Project Structure
```
json-to-csv-converter/
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries
│   ├── pages/             # Page components (Index, NotFound)
│   ├── utils/             # CSV conversion logic
│   └── main.tsx           # App entry point
├── index.html             # HTML template
├── package.json           # Project metadata and scripts
└── ...
```

## Installation
1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd json-to-csv-converter
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Testing in Development
- Upload various JSON files to test error handling and conversion.
- Try files with missing fields, invalid JSON, or large size to see error messages.
- Use the sample JSON link in the UI for reference.
- Test with JSON files that use the `table` property and nested `tools` arrays.

## Building for Production
```sh
npm run build
# or
yarn build
```
The output will be in the `dist/` directory.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| **Unsupported file type** | Upload a file with a `.json` extension. |
| **File too large** | Upload a file smaller than 10MB. Split your data if needed. |
| **Invalid JSON format** | Check your file with [JSONLint](https://jsonlint.com/) and ensure it is valid JSON. |
| **Empty or invalid data** | The JSON should be an array of objects, each with the required fields. See the sample JSON above. |
| **Missing fields in CSV** | Any missing field in your JSON will be filled with `NULL` in the CSV. |
| **Other errors** | Double-check your data format. If the problem persists, contact support. |

## Contributing
- Fork the repo and create a feature branch.
- Make your changes and add tests if needed.
- Open a pull request with a clear description.

## License
MIT License. See [LICENSE](LICENSE) for details.

## Credits
- Built with [Lovable](https://lovable.dev/), [React](https://react.dev/), [shadcn-ui](https://ui.shadcn.com/), and [Tailwind CSS](https://tailwindcss.com/).
