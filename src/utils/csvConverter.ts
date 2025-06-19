
export const convertToCSV = (data: any): string => {
  const tableData = data.table || data;
  
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

  const csvRow = [
    tableData.id || '',
    tableData.name || '',
    tableData.provider || '',
    tableData.description || '',
    formatTools(tableData.tools),
    tableData.license || '',
    tableData.github_url || '',
    tableData.website_url || '',
    tableData.documentation_url || '',
    tableData.npm_url || '',
    tableData.twitter_url || '',
    tableData.discord_url || '',
    tableData.logo || '',
    tableData.category || '',
    tableData.content || '',
    tableData.installation_guide || '',
    tableData.popularity || '',
    tableData.slug || '',
    tableData.created_at || '',
    tableData.updated_at || '',
    tableData.last_updated || '',
    tableData.readme_content || '',
    arrayToString(tableData.main_files),
    arrayToString(tableData.dependencies),
    tableData.stars || '',
    tableData.forks || ''
  ];

  const escapeCsvField = (field: string) => {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  const csvContent = [
    headers.join(','),
    csvRow.map(field => escapeCsvField(String(field))).join(',')
  ].join('\n');

  return csvContent;
};
