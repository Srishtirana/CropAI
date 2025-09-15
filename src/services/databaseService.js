// Database Service for storing crop data and recommendations
class DatabaseService {
  constructor() {
    this.dbName = 'CropAI_DB';
    this.version = 3; // Version bump for schema changes (removed user-related tables)
    this.db = null;
    this.initDB();
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Remove any user-related stores from previous versions
        ['users', 'userPreferences', 'userSessions'].forEach(storeName => {
          if (db.objectStoreNames.contains(storeName)) {
            db.deleteObjectStore(storeName);
          }
        });
        
        // Recommendations store - simplified without user references
        if (!db.objectStoreNames.contains('recommendations')) {
          const recStore = db.createObjectStore('recommendations', { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          recStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
        
        // Farm data store - simplified without user references
        if (!db.objectStoreNames.contains('farmData')) {
          db.createObjectStore('farmData', { 
            keyPath: 'id', 
            autoIncrement: true 
          });
        }
        
        // Alerts store - simplified without user references
        if (!db.objectStoreNames.contains('alerts')) {
          const alertStore = db.createObjectStore('alerts', { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          alertStore.createIndex('timestamp', 'timestamp', { unique: false });
          alertStore.createIndex('priority', 'priority', { unique: false });
        }
      };
    });
  }

  // Save a new crop recommendation
  async saveRecommendation(recommendation) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['recommendations'], 'readwrite');
      const store = transaction.objectStore('recommendations');
      
      const recToSave = {
        ...recommendation,
        timestamp: new Date().toISOString(),
        id: Date.now() // Simple ID generation
      };
      
      await store.add(recToSave);
      return recToSave;
    } catch (error) {
      console.error('Error saving recommendation:', error);
      // Fallback to localStorage
      const existing = JSON.parse(localStorage.getItem('recommendations') || '[]');
      existing.unshift(recommendation);
      localStorage.setItem('recommendations', JSON.stringify(existing.slice(0, 50)));
      return recommendation;
    }
  }

  // Get all recommendations, most recent first
  async getRecommendations(limit = 20) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['recommendations'], 'readonly');
      const store = transaction.objectStore('recommendations');
      const index = store.index('timestamp');
      
      return new Promise((resolve, reject) => {
        const request = index.getAll();
        request.onsuccess = () => {
          const results = request.result
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
          resolve(results);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // Fallback to localStorage
      const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
      return recommendations.slice(0, limit);
    }
  }

  // Save farm data
  async saveFarmData(farmData) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['farmData'], 'readwrite');
      const store = transaction.objectStore('farmData');
      
      const dataToSave = {
        ...farmData,
        timestamp: new Date().toISOString(),
        id: farmData.id || Date.now()
      };
      
      await store.put(dataToSave);
      return dataToSave;
    } catch (error) {
      console.error('Error saving farm data:', error);
      throw error;
    }
  }

  // Get all farm data
  async getFarmData() {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['farmData'], 'readonly');
      const store = transaction.objectStore('farmData');
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => {
          const results = request.result
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          resolve(results);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error getting farm data:', error);
      return [];
    }
  }

  // Save a new alert
  async saveAlert(alert) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['alerts'], 'readwrite');
      const store = transaction.objectStore('alerts');
      
      const alertToSave = {
        ...alert,
        timestamp: new Date().toISOString(),
        read: false,
        id: alert.id || Date.now()
      };
      
      await store.put(alertToSave);
      return alertToSave;
    } catch (error) {
      console.error('Error saving alert:', error);
      // Fallback to localStorage
      const existing = JSON.parse(localStorage.getItem('alerts') || '[]');
      existing.unshift(alert);
      localStorage.setItem('alerts', JSON.stringify(existing.slice(0, 100)));
      return alert;
    }
  }

  // Get all alerts, most recent first
  async getAlerts(limit = 20) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['alerts'], 'readonly');
      const store = transaction.objectStore('alerts');
      const index = store.index('timestamp');
      
      return new Promise((resolve, reject) => {
        const request = index.getAll();
        request.onsuccess = () => {
          const results = request.result
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
          resolve(results);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error getting alerts:', error);
      // Fallback to localStorage
      const alerts = JSON.parse(localStorage.getItem('alerts') || '[]');
      return alerts.slice(0, limit);
    }
  }

  // Mark an alert as read
  async markAlertAsRead(alertId) {
    try {
      await this.initDB();
      const transaction = this.db.transaction(['alerts'], 'readwrite');
      const store = transaction.objectStore('alerts');
      
      const alert = await store.get(alertId);
      if (alert) {
        alert.read = true;
        alert.readAt = new Date().toISOString();
        await store.put(alert);
      }
      return alert;
    } catch (error) {
      console.error('Error marking alert as read:', error);
      return null;
    }
  }

  // Clear all local data (for testing or reset purposes)
  async clearAllData() {
    try {
      await this.initDB();
      const transaction = this.db.transaction(
        ['recommendations', 'farmData', 'alerts'], 
        'readwrite'
      );
      
      // Clear all data from each store
      transaction.objectStore('recommendations').clear();
      transaction.objectStore('farmData').clear();
      transaction.objectStore('alerts').clear();
      
      // Also clear localStorage fallbacks
      localStorage.removeItem('recommendations');
      localStorage.removeItem('farmData');
      localStorage.removeItem('alerts');
      
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  }
}

export default new DatabaseService();
