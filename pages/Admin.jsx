import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, FileText, Trophy, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('articles');
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //  Fetch all articles and quizzes
  const { data: articles = [], isLoading: articlesLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: () => base44.entities.Article.list('-created_date'),
  });

  const { data: quizzes = [], isLoading: quizzesLoading } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => base44.entities.Quiz.list('-created_date'),
  });

  // Mutations
  const createArticleMutation = useMutation({
    mutationFn: (data) => base44.entities.Article.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      setIsDialogOpen(false);
      setEditingItem(null);
    },
  });

  const updateArticleMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Article.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      setIsDialogOpen(false);
      setEditingItem(null);
    },
  });

  const deleteArticleMutation = useMutation({
    mutationFn: (id) => base44.entities.Article.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['articles']),
  });

  const createQuizMutation = useMutation({
    mutationFn: (data) => base44.entities.Quiz.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['quizzes']);
      setIsDialogOpen(false);
      setEditingItem(null);
    },
  });

  const updateQuizMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Quiz.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['quizzes']);
      setIsDialogOpen(false);
      setEditingItem(null);
    },
  });

  const deleteQuizMutation = useMutation({
    mutationFn: (id) => base44.entities.Quiz.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['quizzes']),
  });

  const openNewArticle = () => {
    setEditingItem({ type: 'article', data: { title: '', category: 'christianity', argument_type: 'strong', summary: '', content: '', image_url: '' } });
    setIsDialogOpen(true);
  };

  const openEditArticle = (article) => {
    setEditingItem({ type: 'article', data: { ...article }, id: article.id });
    setIsDialogOpen(true);
  };

  const openNewQuiz = () => {
    setEditingItem({ type: 'quiz', data: { title: '', category: 'christianity', description: '', questions: [], image_url: '' } });
    setIsDialogOpen(true);
  };

  const openEditQuiz = (quiz) => {
    setEditingItem({ type: 'quiz', data: { ...quiz }, id: quiz.id });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingItem.type === 'article') {
      if (editingItem.id) {
        updateArticleMutation.mutate({ id: editingItem.id, data: editingItem.data });
      } else {
        createArticleMutation.mutate(editingItem.data);
      }
    } else {
      if (editingItem.id) {
        updateQuizMutation.mutate({ id: editingItem.id, data: editingItem.data });
      } else {
        createQuizMutation.mutate(editingItem.data);
      }
    }
  };

  const updateEditingData = (field, value) => {
    setEditingItem({
      ...editingItem,
      data: { ...editingItem.data, [field]: value }
    });
  };

  // Quiz question management
  const addQuestion = () => {
    const newQuestions = [...(editingItem.data.questions || []), {
      question: '',
      options: ['', '', '', ''],
      correct_index: 0,
      explanation: ''
    }];
    updateEditingData('questions', newQuestions);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...editingItem.data.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    updateEditingData('questions', newQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...editingItem.data.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    updateEditingData('questions', newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = editingItem.data.questions.filter((_, i) => i !== index);
    updateEditingData('questions', newQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a1f36] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage articles and quizzes</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-white shadow-sm">
              <TabsTrigger value="articles" className="data-[state=active]:bg-[#1a1f36] data-[state=active]:text-white">
                <FileText className="w-4 h-4 mr-2" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="quizzes" className="data-[state=active]:bg-[#1a1f36] data-[state=active]:text-white">
                <Trophy className="w-4 h-4 mr-2" />
                Quizzes
              </TabsTrigger>
            </TabsList>

            <Button 
              onClick={activeTab === 'articles' ? openNewArticle : openNewQuiz}
              className="bg-[#c9a227] hover:bg-[#d4ad32] text-[#1a1f36]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add {activeTab === 'articles' ? 'Article' : 'Quiz'}
            </Button>
          </div>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <div className="grid gap-4">
              {articlesLoading ? (
                <p className="text-gray-500">Loading articles...</p>
              ) : articles.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No articles yet. Click "Add Article" to create one.</p>
                  </CardContent>
                </Card>
              ) : (
                articles.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              article.argument_type === 'bad' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                            }`}>
                              {article.argument_type === 'bad' ? 'Bad Argument' : 'Strong Argument'}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 capitalize">
                              {article.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-[#1a1f36]">{article.title}</h3>
                          {article.summary && (
                            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{article.summary}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="ghost" size="icon" onClick={() => openEditArticle(article)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => deleteArticleMutation.mutate(article.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Quizzes Tab */}
          <TabsContent value="quizzes">
            <div className="grid gap-4">
              {quizzesLoading ? (
                <p className="text-gray-500">Loading quizzes...</p>
              ) : quizzes.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No quizzes yet. Click "Add Quiz" to create one.</p>
                  </CardContent>
                </Card>
              ) : (
                quizzes.map((quiz) => (
                  <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#c9a227]/20 text-[#c9a227]">
                              {quiz.questions?.length || 0} Questions
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 capitalize">
                              {quiz.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-[#1a1f36]">{quiz.title}</h3>
                          {quiz.description && (
                            <p className="text-gray-500 text-sm mt-1">{quiz.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="ghost" size="icon" onClick={() => openEditQuiz(quiz)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => deleteQuizMutation.mutate(quiz.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingItem?.id ? 'Edit' : 'Create'} {editingItem?.type === 'article' ? 'Article' : 'Quiz'}
            </DialogTitle>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-6 py-4">
              {/* Common Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input
                    value={editingItem.data.title}
                    onChange={(e) => updateEditingData('title', e.target.value)}
                    placeholder="Enter title..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <Select 
                      value={editingItem.data.category} 
                      onValueChange={(value) => updateEditingData('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="islam">Islam</SelectItem>
                        <SelectItem value="atheism">Atheism</SelectItem>
                        <SelectItem value="christianity">Christianity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {editingItem.type === 'article' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Argument Type</label>
                      <Select 
                        value={editingItem.data.argument_type} 
                        onValueChange={(value) => updateEditingData('argument_type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bad">Bad Argument</SelectItem>
                          <SelectItem value="strong">Strong Argument</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingItem.type === 'article' ? 'Summary' : 'Description'}
                  </label>
                  <Textarea
                    value={editingItem.type === 'article' ? editingItem.data.summary : editingItem.data.description}
                    onChange={(e) => updateEditingData(editingItem.type === 'article' ? 'summary' : 'description', e.target.value)}
                    placeholder={`Enter ${editingItem.type === 'article' ? 'summary' : 'description'}...`}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
                  <Input
                    value={editingItem.data.image_url}
                    onChange={(e) => updateEditingData('image_url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Article Content */}
              {editingItem.type === 'article' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown)</label>
                  <Textarea
                    value={editingItem.data.content}
                    onChange={(e) => updateEditingData('content', e.target.value)}
                    placeholder="Write your article content in Markdown..."
                    rows={10}
                  />
                </div>
              )}

              {/* Quiz Questions */}
              {editingItem.type === 'quiz' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">Questions</label>
                    <Button variant="outline" size="sm" onClick={addQuestion}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Question
                    </Button>
                  </div>

                  {editingItem.data.questions?.map((question, qIndex) => (
                    <Card key={qIndex} className="bg-gray-50">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-sm font-medium text-gray-500">Question {qIndex + 1}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => removeQuestion(qIndex)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <Input
                            value={question.question}
                            onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                            placeholder="Enter question..."
                          />

                          <div className="space-y-2">
                            {question.options.map((option, oIndex) => (
                              <div key={oIndex} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${qIndex}`}
                                  checked={question.correct_index === oIndex}
                                  onChange={() => updateQuestion(qIndex, 'correct_index', oIndex)}
                                  className="w-4 h-4 text-[#c9a227]"
                                />
                                <Input
                                  value={option}
                                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                  placeholder={`Option ${oIndex + 1}`}
                                  className="flex-1"
                                />
                              </div>
                            ))}
                          </div>

                          <Textarea
                            value={question.explanation}
                            onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                            placeholder="Explanation (shown after answer)..."
                            rows={2}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Save Button */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-[#c9a227] hover:bg-[#d4ad32] text-[#1a1f36]"
                  disabled={createArticleMutation.isPending || updateArticleMutation.isPending || createQuizMutation.isPending || updateQuizMutation.isPending}
                >
                  {editingItem.id ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );

}
