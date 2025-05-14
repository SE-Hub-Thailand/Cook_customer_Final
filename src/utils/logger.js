// Custom logger that persists logs in localStorage
const MAX_LOG_ENTRIES = 100;

export const loggerTypes = {
  INFO: 'info',
  ERROR: 'error',
  WARNING: 'warning',
  DEBUG: 'debug'
};

// Initialize logs array in localStorage if not exists
const initLogs = () => {
  if (!localStorage.getItem('app_logs')) {
    localStorage.setItem('app_logs', JSON.stringify([]));
  }
};

// Add a log entry to localStorage
export const addLog = (type, message, data = null) => {
  initLogs();
  
  const timestamp = new Date().toISOString();
  const logs = JSON.parse(localStorage.getItem('app_logs') || '[]');
  
  // Create log entry
  const logEntry = {
    timestamp,
    type,
    message,
    data: data ? JSON.stringify(data) : null
  };
  
  // Add to beginning of array for newest first
  logs.unshift(logEntry);
  
  // Limit log size
  if (logs.length > MAX_LOG_ENTRIES) {
    logs.pop();
  }
  
  // Store back in localStorage
  localStorage.setItem('app_logs', JSON.stringify(logs));
  
  // Also log to console
  console[type](`[${timestamp}] ${message}`, data);
  
  return logEntry;
};

// Log levels - updated to accept any data type
export const logInfo = (message, data = null) => addLog(loggerTypes.INFO, message, data);
export const logError = (message, data = null) => addLog(loggerTypes.ERROR, message, data);
export const logWarning = (message, data = null) => addLog(loggerTypes.WARNING, message, data);
export const logDebug = (message, data = null) => addLog(loggerTypes.DEBUG, message, data);

// Get all logs
export const getLogs = () => {
  initLogs();
  return JSON.parse(localStorage.getItem('app_logs') || '[]');
};

// Clear all logs
export const clearLogs = () => {
  localStorage.setItem('app_logs', JSON.stringify([]));
};

export default {
  logInfo,
  logError,
  logWarning,
  logDebug,
  getLogs,
  clearLogs
}; 