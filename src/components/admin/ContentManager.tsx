'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, ExternalLink, Save, X } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'tiktok' | 'instagram' | 'image';
  url: string;
  embedId?: string;
  title: string;
  description: string;
  category: 'featured' | 'gallery';
  createdAt: string;
}

export default function ContentManager() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [newItem, setNewItem] = useState({
    type: 'tiktok' as 'tiktok' | 'instagram' | 'image',
    url: '',
    title: '',
    description: '',
    category: 'featured' as 'featured' | 'gallery'
  });

  // Load existing content
  useEffect(() => {
    const saved = localStorage.getItem('sinco-media-content');
    if (saved) {
      try {
        setMediaItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved content:', e);
      }
    }
  }, []);

  // Save content to localStorage
  const saveContent = (items: MediaItem[]) => {
    localStorage.setItem('sinco-media-content', JSON.stringify(items));
    setMediaItems(items);
  };

  // Extract TikTok/Instagram embed ID from URL
  const extractEmbedId = (url: string, type: 'tiktok' | 'instagram'): string => {
    if (type === 'tiktok') {
      // Extract from URLs like: https://www.tiktok.com/@user/video/123456789
      const match = url.match(/video\/(\d+)/);
      return match ? match[1] : '';
    } else if (type === 'instagram') {
      // Extract from URLs like: https://www.instagram.com/p/ABC123/
      const match = url.match(/\/p\/([^\/]+)/);
      return match ? match[1] : '';
    }
    return '';
  };

  // Authenticate
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sinco-admin-2024') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  // Add new media item
  const addMediaItem = () => {
    if (!newItem.url || !newItem.title) {
      alert('Please fill in all required fields');
      return;
    }

    const embedId = newItem.type !== 'image' ? extractEmbedId(newItem.url, newItem.type) : undefined;
    
    const item: MediaItem = {
      id: Date.now().toString(),
      type: newItem.type,
      url: newItem.url,
      embedId,
      title: newItem.title,
      description: newItem.description,
      category: newItem.category,
      createdAt: new Date().toISOString()
    };

    const updatedItems = [...mediaItems, item];
    saveContent(updatedItems);
    
    // Reset form
    setNewItem({
      type: 'tiktok',
      url: '',
      title: '',
      description: '',
      category: 'featured'
    });
    setShowAddForm(false);
  };

  // Delete media item
  const deleteMediaItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updatedItems = mediaItems.filter(item => item.id !== id);
      saveContent(updatedItems);
    }
  };

  // Update media item
  const updateMediaItem = () => {
    if (!editingItem) return;

    const updatedItems = mediaItems.map(item => 
      item.id === editingItem.id ? editingItem : item
    );
    saveContent(updatedItems);
    setEditingItem(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-900 via-forest-800 to-forest-700 flex items-center justify-center p-4">
        <div className="bg-forest-800 bg-opacity-60 backdrop-blur-md rounded-2xl p-8 border border-sinco-primary border-opacity-30 max-w-md w-full">
          <h1 className="text-2xl font-bold text-sinco-primary mb-6 text-center">
            🐿️ Sinco Admin Panel
          </h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sinco-cream text-sm font-medium mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-forest-700 border border-sinco-primary border-opacity-30 rounded-lg text-sinco-cream focus:outline-none focus:border-sinco-primary focus:border-opacity-60"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sinco-primary hover:bg-sinco-secondary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-900 via-forest-800 to-forest-700 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-forest-800 bg-opacity-60 backdrop-blur-md rounded-2xl p-8 border border-sinco-primary border-opacity-30">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-sinco-primary">
              🐿️ Sinco Content Manager
            </h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-sinco-primary hover:bg-sinco-secondary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Content
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-sinco-primary bg-opacity-10 rounded-lg p-4 mb-8">
            <h3 className="text-sinco-primary font-semibold mb-2">📋 How to Add Content:</h3>
            <ul className="text-sinco-cream text-sm space-y-1">
              <li>• <strong>TikTok:</strong> Copy the full URL from any TikTok post (e.g., https://www.tiktok.com/@sinco.00/video/123456789)</li>
              <li>• <strong>Instagram:</strong> Copy the post URL (e.g., https://www.instagram.com/p/ABC123/)</li>
              <li>• <strong>Images:</strong> Upload to /public/images/ folder and use the filename</li>
              <li>• <strong>Featured:</strong> Shows in "TikTok Viral" tab | <strong>Gallery:</strong> Shows in "Instagram Feed" tab</li>
            </ul>
          </div>

          {/* Add Form */}
          {showAddForm && (
            <div className="bg-forest-700 bg-opacity-60 rounded-lg p-6 mb-8 border border-sinco-accent border-opacity-30">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-sinco-primary">Add New Content</h3>
                <button onClick={() => setShowAddForm(false)} className="text-sinco-cream hover:text-sinco-primary">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sinco-cream text-sm font-medium mb-2">Type</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({...newItem, type: e.target.value as any})}
                    className="w-full px-3 py-2 bg-forest-600 border border-sinco-primary border-opacity-30 rounded-lg text-sinco-cream"
                  >
                    <option value="tiktok">🎵 TikTok Video</option>
                    <option value="instagram">📸 Instagram Post</option>
                    <option value="image">🖼️ Image</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sinco-cream text-sm font-medium mb-2">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value as any})}
                    className="w-full px-3 py-2 bg-forest-600 border border-sinco-primary border-opacity-30 rounded-lg text-sinco-cream"
                  >
                    <option value="featured">Featured (TikTok Tab)</option>
                    <option value="gallery">Gallery (Instagram Tab)</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sinco-cream text-sm font-medium mb-2">URL *</label>
                  <input
                    type="url"
                    value={newItem.url}
                    onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                    className="w-full px-3 py-2 bg-forest-600 border border-sinco-primary border-opacity-30 rounded-lg text-sinco-cream"
                    placeholder="https://www.tiktok.com/@sinco.00/video/123456789"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sinco-cream text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="w-full px-3 py-2 bg-forest-600 border border-sinco-primary border-opacity-30 rounded-lg text-sinco-cream"
                    placeholder="Feeding Time Fun"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sinco-cream text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    className="w-full px-3 py-2 bg-forest-600 border border-sinco-primary border-opacity-30 rounded-lg text-sinco-cream"
                    placeholder="Watch Sinco enjoy breakfast!"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-sinco-cream hover:text-sinco-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addMediaItem}
                  className="bg-sinco-primary hover:bg-sinco-secondary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Add Content
                </button>
              </div>
            </div>
          )}

          {/* Content List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-sinco-primary mb-4">
              Current Content ({mediaItems.length} items)
            </h3>
            
            {mediaItems.length === 0 ? (
              <div className="text-center py-12 text-sinco-cream text-opacity-60">
                No content added yet. Click "Add Content" to get started!
              </div>
            ) : (
              mediaItems.map((item) => (
                <div key={item.id} className="bg-forest-700 bg-opacity-40 rounded-lg p-4 border border-sinco-primary border-opacity-20">
                  {editingItem?.id === item.id ? (
                    // Edit mode
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                          className="px-3 py-2 bg-forest-600 border border-sinco-primary border-opacity-30 rounded text-sinco-cream"
                          placeholder="Title"
                        />
                        <input
                          type="text"
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                          className="px-3 py-2 bg-forest-600 border border-sinco-primary border-opacity-30 rounded text-sinco-cream"
                          placeholder="Description"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingItem(null)}
                          className="px-3 py-1 text-sm text-sinco-cream hover:text-sinco-primary"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={updateMediaItem}
                          className="px-3 py-1 text-sm bg-sinco-primary hover:bg-sinco-secondary text-white rounded"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">
                            {item.type === 'tiktok' ? '🎵' : item.type === 'instagram' ? '📸' : '🖼️'}
                          </span>
                          <h4 className="text-sinco-primary font-semibold">{item.title}</h4>
                          <span className="text-xs px-2 py-1 bg-sinco-accent bg-opacity-20 text-sinco-accent rounded">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-sinco-cream text-opacity-80 text-sm mb-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-xs text-sinco-cream text-opacity-60">
                          <span>Added: {new Date(item.createdAt).toLocaleDateString()}</span>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-sinco-primary"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Original
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-2 text-sinco-cream hover:text-sinco-primary transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMediaItem(item.id)}
                          className="p-2 text-sinco-cream hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Export/Import */}
          <div className="mt-8 pt-8 border-t border-sinco-primary border-opacity-20">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sinco-primary font-semibold mb-1">Data Management</h4>
                <p className="text-sinco-cream text-opacity-60 text-sm">
                  Your content is automatically saved to browser storage
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const data = JSON.stringify(mediaItems, null, 2);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'sinco-content-backup.json';
                    a.click();
                  }}
                  className="px-4 py-2 bg-forest-600 hover:bg-forest-500 text-sinco-cream rounded-lg transition-colors text-sm"
                >
                  Export Data
                </button>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}