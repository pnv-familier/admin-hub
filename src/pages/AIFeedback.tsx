import React, { useState } from "react";
import {
  Button,
  Input,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "@/components/common";
import { Search, Filter, Eye, ThumbsUp, ThumbsDown, MessageSquare, Clock, User } from "lucide-react";

interface FeedbackEntry {
  id: string;
  user: string;
  userEmail: string;
  aiFeature: string;
  contextSummary: string;
  aiResponse: string;
  rating: "positive" | "negative" | "neutral";
  createdAt: string;
  conversationId: string;
}

const AIFeedback = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [featureFilter, setFeatureFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackEntry | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const feedbackEntries: FeedbackEntry[] = [
    {
      id: "1",
      user: "Sarah Johnson",
      userEmail: "sarah@example.com",
      aiFeature: "Family Chat Assistant",
      contextSummary: "User asked about planning a family dinner",
      aiResponse: "I'd recommend considering everyone's dietary preferences first. Here are some family-friendly dinner ideas: 1. Build-your-own taco night - allows customization for picky eaters, 2. Homemade pizza party - fun and interactive, 3. Pasta bar with various sauces - easy to make gluten-free options. Would you like me to help you create a shopping list?",
      rating: "positive",
      createdAt: "2024-02-15T10:30:00",
      conversationId: "conv-001",
    },
    {
      id: "2",
      user: "Mike Chen",
      userEmail: "mike@example.com",
      aiFeature: "Activity Suggestions",
      contextSummary: "Requested weekend activity ideas for family",
      aiResponse: "Based on your family's interests, here are some weekend activity ideas: 1. Visit the local science museum - great for curious minds, 2. Nature hike at the nearby trail - good exercise for all ages, 3. Board game tournament at home - budget-friendly fun.",
      rating: "positive",
      createdAt: "2024-02-15T09:15:00",
      conversationId: "conv-002",
    },
    {
      id: "3",
      user: "Emily Davis",
      userEmail: "emily@example.com",
      aiFeature: "Meal Planning",
      contextSummary: "Asked for healthy meal suggestions",
      aiResponse: "Here's a balanced weekly meal plan focusing on nutrition...",
      rating: "neutral",
      createdAt: "2024-02-14T16:45:00",
      conversationId: "conv-003",
    },
    {
      id: "4",
      user: "John Smith",
      userEmail: "john@example.com",
      aiFeature: "Family Chat Assistant",
      contextSummary: "Question about managing screen time",
      aiResponse: "Managing screen time effectively involves setting clear boundaries...",
      rating: "negative",
      createdAt: "2024-02-14T14:20:00",
      conversationId: "conv-004",
    },
    {
      id: "5",
      user: "Lisa Wang",
      userEmail: "lisa@example.com",
      aiFeature: "Budget Helper",
      contextSummary: "Requested budget planning advice",
      aiResponse: "Creating a family budget starts with understanding your income and expenses...",
      rating: "positive",
      createdAt: "2024-02-14T11:00:00",
      conversationId: "conv-005",
    },
    {
      id: "6",
      user: "Robert Brown",
      userEmail: "robert@example.com",
      aiFeature: "Activity Suggestions",
      contextSummary: "Indoor activities for rainy days",
      aiResponse: "Here are some fun indoor activities for the whole family...",
      rating: "positive",
      createdAt: "2024-02-13T15:30:00",
      conversationId: "conv-006",
    },
  ];

  const aiFeatures = ["Family Chat Assistant", "Activity Suggestions", "Meal Planning", "Budget Helper"];

  const filteredEntries = feedbackEntries.filter((entry) => {
    const matchesSearch = entry.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.contextSummary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFeature = featureFilter === "all" || entry.aiFeature === featureFilter;
    const matchesRating = ratingFilter === "all" || entry.rating === ratingFilter;
    return matchesSearch && matchesFeature && matchesRating;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRatingBadge = (rating: FeedbackEntry["rating"]) => {
    const config = {
      positive: { variant: "success" as const, icon: <ThumbsUp className="h-3 w-3" /> },
      negative: { variant: "error" as const, icon: <ThumbsDown className="h-3 w-3" /> },
      neutral: { variant: "secondary" as const, icon: null },
    };
    const { variant, icon } = config[rating];
    return (
      <Badge variant={variant} className="gap-1">
        {icon}
        {rating.charAt(0).toUpperCase() + rating.slice(1)}
      </Badge>
    );
  };

  const handleViewDetail = (entry: FeedbackEntry) => {
    setSelectedFeedback(entry);
    setDetailModalOpen(true);
  };

  const stats = {
    total: feedbackEntries.length,
    positive: feedbackEntries.filter((e) => e.rating === "positive").length,
    negative: feedbackEntries.filter((e) => e.rating === "negative").length,
    neutral: feedbackEntries.filter((e) => e.rating === "neutral").length,
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Feedback Review</h1>
        <p className="text-muted-foreground mt-1">Review AI-generated content and user feedback</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground">Total Feedback</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-status-success">{stats.positive}</div>
          <div className="text-sm text-muted-foreground">Positive</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-status-error">{stats.negative}</div>
          <div className="text-sm text-muted-foreground">Negative</div>
        </Card>
        <Card className="p-4">
          <div className="text-2xl font-bold text-muted-foreground">{stats.neutral}</div>
          <div className="text-sm text-muted-foreground">Neutral</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by user or context..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              className="h-10 px-3 rounded-md border border-input bg-background text-sm"
              value={featureFilter}
              onChange={(e) => setFeatureFilter(e.target.value)}
            >
              <option value="all">All Features</option>
              {aiFeatures.map((feature) => (
                <option key={feature} value={feature}>
                  {feature}
                </option>
              ))}
            </select>
            <select
              className="h-10 px-3 rounded-md border border-input bg-background text-sm"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <div className="animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>AI Feature</TableHead>
              <TableHead className="hidden md:table-cell">Context Summary</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{entry.user}</p>
                      <p className="text-xs text-muted-foreground">{entry.userEmail}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{entry.aiFeature}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell max-w-xs">
                  <p className="text-sm text-muted-foreground truncate">{entry.contextSummary}</p>
                </TableCell>
                <TableCell>{getRatingBadge(entry.rating)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetail(entry)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredEntries.length}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* Detail Modal */}
      <Modal open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <ModalContent size="lg">
          <ModalHeader>
            <ModalTitle>AI Response Detail</ModalTitle>
            <ModalDescription>Full conversation context and AI-generated response</ModalDescription>
          </ModalHeader>
          {selectedFeedback && (
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {/* User Info */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedFeedback.user}</p>
                    <p className="text-sm text-muted-foreground">{selectedFeedback.userEmail}</p>
                  </div>
                </div>
                {getRatingBadge(selectedFeedback.rating)}
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">AI Feature</label>
                  <p className="mt-1 font-medium">{selectedFeedback.aiFeature}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Timestamp</label>
                  <p className="mt-1 font-medium">{new Date(selectedFeedback.createdAt).toLocaleString()}</p>
                </div>
              </div>

              {/* Context */}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Context Summary</label>
                <p className="mt-2 text-sm p-3 bg-muted/50 rounded-lg">{selectedFeedback.contextSummary}</p>
              </div>

              {/* AI Response */}
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  AI Generated Response
                </label>
                <div className="mt-2 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{selectedFeedback.aiResponse}</p>
                </div>
              </div>

              {/* Conversation ID */}
              <div className="text-xs text-muted-foreground">
                Conversation ID: <code className="bg-muted px-1.5 py-0.5 rounded">{selectedFeedback.conversationId}</code>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AIFeedback;
