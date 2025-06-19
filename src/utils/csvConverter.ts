
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
    const csvRow = [
      item.id || '',
      item.name || '',
      item.provider || '',
      item.description || '',
      formatTools(item.tools),
      item.license || '',
      item.github_url || '',
      item.website_url || '',
      item.documentation_url || '',
      item.npm_url || '',
      item.twitter_url || '',
      item.discord_url || '',
      item.logo || '',
      item.category || '',
      item.content || '',
      item.installation_guide || '',
      item.popularity || '',
      item.slug || '',
      item.created_at || '',
      item.updated_at || '',
      item.last_updated || '',
      item.readme_content || '',
      arrayToString(item.main_files),
      arrayToString(item.dependencies),
      item.stars || '',
      item.forks || ''
    ];

    return csvRow.map(field => escapeCsvField(String(field))).join(',');
  });

  const csvContent = [
    headers.join(','),
    ...csvRows
  ].join('\n');

  return csvContent;
};
