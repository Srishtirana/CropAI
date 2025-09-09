import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, AlertCircle, CheckCircle, Clock, Calendar, Droplets, Sun } from 'lucide-react';

const AlertsReminders = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  // Mock alerts and reminders data
  const alerts = [
    {
      id: 1,
      type: 'weather',
      priority: 'high',
      title: 'बारिश की चेतावनी',
      message: 'अगले 2 दिनों में भारी बारिश की संभावना है। फसल की सुरक्षा के लिए तैयार रहें।',
      timestamp: new Date('2024-01-15T10:30:00'),
      icon: <Droplets className="w-5 h-5" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      type: 'pest',
      priority: 'medium',
      title: 'कीट नियंत्रण',
      message: 'आपके क्षेत्र में कीटों की गतिविधि बढ़ रही है। निवारक उपाय करें।',
      timestamp: new Date('2024-01-14T14:20:00'),
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 3,
      type: 'irrigation',
      priority: 'low',
      title: 'सिंचाई का समय',
      message: 'गेहूं की फसल को आज सिंचाई की आवश्यकता है।',
      timestamp: new Date('2024-01-13T08:00:00'),
      icon: <Droplets className="w-5 h-5" />,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 4,
      type: 'harvest',
      priority: 'medium',
      title: 'कटाई का समय',
      message: 'गेहूं की फसल कटाई के लिए तैयार है। अगले सप्ताह कटाई करें।',
      timestamp: new Date('2024-01-12T16:45:00'),
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 5,
      type: 'fertilizer',
      priority: 'low',
      title: 'उर्वरक का समय',
      message: 'अगले सप्ताह नाइट्रोजन उर्वरक डालने का समय है।',
      timestamp: new Date('2024-01-11T12:30:00'),
      icon: <Sun className="w-5 h-5" />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    }
  ];

  const reminders = [
    {
      id: 1,
      title: 'साप्ताहिक फसल निरीक्षण',
      time: 'हर रविवार सुबह 9:00 बजे',
      type: 'weekly',
      isActive: true
    },
    {
      id: 2,
      title: 'मासिक मिट्टी परीक्षण',
      time: 'हर महीने की 1 तारीख',
      type: 'monthly',
      isActive: true
    },
    {
      id: 3,
      title: 'कीट नियंत्रण स्प्रे',
      time: 'हर 15 दिन',
      type: 'biweekly',
      isActive: false
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    if (filter === 'high') return alert.priority === 'high';
    if (filter === 'medium') return alert.priority === 'medium';
    if (filter === 'low') return alert.priority === 'low';
    return true;
  });

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'उच्च';
      case 'medium': return 'मध्यम';
      case 'low': return 'कम';
      default: return priority;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>वापस जाएं</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Bell className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">अलर्ट और रिमाइंडर</h1>
                <p className="text-sm text-gray-600">फसल से जुड़ी सभी सूचनाएं</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl p-4 shadow-sm border mb-6">
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'सभी', count: alerts.length },
              { key: 'high', label: 'उच्च', count: alerts.filter(a => a.priority === 'high').length },
              { key: 'medium', label: 'मध्यम', count: alerts.filter(a => a.priority === 'medium').length },
              { key: 'low', label: 'कम', count: alerts.filter(a => a.priority === 'low').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Alerts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">अलर्ट्स</h2>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`${alert.bgColor} ${alert.borderColor} border-2 rounded-xl p-4`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${alert.color} flex-shrink-0`}>
                    {alert.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{alert.title}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                        {getPriorityText(alert.priority)}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{alert.message}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{alert.timestamp.toLocaleString('hi-IN')}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reminders Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">रिमाइंडर</h2>
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className={`bg-white border-2 rounded-xl p-4 ${
                  reminder.isActive ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      reminder.isActive ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div>
                      <h3 className="font-bold text-gray-800">{reminder.title}</h3>
                      <p className="text-sm text-gray-600">{reminder.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      reminder.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {reminder.isActive ? 'सक्रिय' : 'निष्क्रिय'}
                    </span>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Clock className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Reminder */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-xl font-bold text-gray-800 mb-4">नया रिमाइंडर जोड़ें</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                रिमाइंडर का नाम
              </label>
              <input
                type="text"
                placeholder="उदाहरण: सिंचाई का समय"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                समय
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>दैनिक</option>
                <option>साप्ताहिक</option>
                <option>मासिक</option>
                <option>कस्टम</option>
              </select>
            </div>
          </div>
          <button className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors">
            रिमाइंडर जोड़ें
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsReminders;
