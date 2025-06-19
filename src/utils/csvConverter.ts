export const convertToCSV = (data: any): string => {
  // Handle both single objects and arrays
  let items = Array.isArray(data) ? data : [data];
  
  // If data has a 'table' property, use that instead
  if (!Array.isArray(data) && data.table) {
    items = Array.isArray(data.table) ? data.table : [data.table];
  }

  const headers = [
    'id', 'name', 'provider', 'description', 'tools', 'license', 'github_url', 
    'website_url', 'documentation_url', 'npm_url', 'twitter_url', 'discord_url', 
    'logo', 'category', 'content', 'installation_guide', 'popularity', 'slug', 
    'created_at', 'updated_at', 'last_updated', 'readme_content', 'main_files', 
    'dependencies', 'stars', 'forks'
  ];

  const arrayToString = (arr: any) => {
    return Array.isArray(arr) ? JSON.stringify(arr) : arr || '';
  };

  const formatTools = (tools: any) => {
    if (!Array.isArray(tools)) return '';
    
    const formattedTools = tools.map(tool => {
      if (typeof tool === 'object' && tool.name && tool.description) {
        return JSON.stringify({
          name: tool.name,
          description: tool.description
        });
      }
      return tool;
    });
    
    return JSON.stringify(formattedTools);
  };

  const escapeCsvField = (field: string) => {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  // Process each item and create CSV rows
  const csvRows = items.map(item => {
    const getOrNull = (val: any) => (val === undefined || val === null || val === '' ? 'NULL' : val);
    const csvRow = [
      getOrNull(item.id),
      getOrNull(item.name),
      getOrNull(item.provider),
      getOrNull(item.description),
      item.tools !== undefined ? formatTools(item.tools) : 'NULL',
      getOrNull(item.license),
      getOrNull(item.github_url),
      getOrNull(item.website_url),
      getOrNull(item.documentation_url),
      getOrNull(item.npm_url),
      getOrNull(item.twitter_url),
      getOrNull(item.discord_url),
      getOrNull(item.logo),
      getOrNull(item.category),
      getOrNull(item.content),
      getOrNull(item.installation_guide),
      getOrNull(item.popularity),
      getOrNull(item.slug),
      getOrNull(item.created_at),
      getOrNull(item.updated_at),
      getOrNull(item.last_updated),
      getOrNull(item.readme_content),
      item.main_files !== undefined ? arrayToString(item.main_files) : 'NULL',
      item.dependencies !== undefined ? arrayToString(item.dependencies) : 'NULL',
      getOrNull(item.stars),
      getOrNull(item.forks)
    ];
    return csvRow.map(field => escapeCsvField(String(field))).join(',');
  });

  const csvContent = [
    headers.join(','),
    ...csvRows
  ].join('\n');

  return csvContent;
};

// Utility to flatten a single object with a 'table' property
export function flattenTableObject(obj: any) {
  if (obj && typeof obj === 'object' && obj.table) {
    const flat = { ...obj.table };
    // Flatten tools if present
    if (Array.isArray(flat.tools)) {
      flat.tools = flat.tools.map((tool: any) =>
        tool && tool.table ? { name: tool.table.name, description: tool.table.description } : tool
      );
    }
    return flat;
  }
  return obj;
}

// Utility to flatten an array of such objects
export function flattenTableArray(arr: any[]) {
  return arr.map(flattenTableObject);
}
